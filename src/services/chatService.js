import api from "./api";

//------------------------------------------------------
// Streaming Chat
//------------------------------------------------------

export async function streamMessage(
  { message, conversationId, files = [] },
  { onStart, onChunk, onTool, onComplete, onError },
) {
  try {
    const hasFiles = files.length > 0;

    // With attachments we must send multipart/form-data so the browser can attach
    // the raw file bytes — and the "Content-Type" header must be OMITTED so the
    // browser can set its own boundary. Without attachments, behavior is byte-for-byte
    // identical to before (same JSON body, same headers).
    const requestInit = hasFiles
      ? {
          method: "POST",
          headers: { Accept: "text/event-stream" },
          body: buildAttachmentFormData({ message, conversationId, files }),
        }
      : {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({
            message,
            conversation_id: conversationId,
          }),
        };

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/chat/stream`,
      requestInit,
    );

    if (!response.ok) {
      throw new Error("Failed to connect to server.");
    }

    if (!response.body) {
      throw new Error("Streaming is not supported.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    //------------------------------------------------------

    function processEvent(rawEvent) {
      if (!rawEvent.trim()) return;

      let eventName = "";
      let dataString = "";

      const lines = rawEvent.split("\n");

      for (const line of lines) {
        if (line.startsWith("event:")) {
          eventName = line.slice(6).trim();
        }

        if (line.startsWith("data:")) {
          dataString += line.slice(5).trim();
        }
      }

      if (!dataString) return;

      try {
        const data = JSON.parse(dataString);

        switch (eventName) {
          case "start":
            onStart?.(data.conversation);
            break;

          case "tool":
            onTool?.(data);
            break;

          case "text":
            onChunk?.(data.delta ?? "");
            break;

          case "done":
            onComplete?.(data);
            break;

          case "error":
            onError?.(new Error(data.error || "Unknown error"));
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Invalid SSE event:", rawEvent);
      }
    }

    //------------------------------------------------------

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, {
        stream: true,
      });

      const events = buffer.split("\n\n");

      buffer = events.pop() || "";

      for (const event of events) {
        processEvent(event);
      }
    }

    //------------------------------------------------------
    // Process remaining buffered event
    //------------------------------------------------------

    buffer += decoder.decode();

    if (buffer.trim()) {
      processEvent(buffer);
    }
  } catch (error) {
    onError?.(error);
  }
}

//------------------------------------------------------
// Conversations
//------------------------------------------------------

export async function getConversations() {
  const response = await api.get("/conversations");

  return response.data;
}

export async function getConversation(id) {
  const response = await api.get(`/conversations/${id}`);

  return response.data;
}

export async function renameConversation(id, title) {
  const response = await api.patch(`/conversations/${id}`, {
    title,
  });

  return response.data;
}

export async function deleteConversation(id) {
  const response = await api.delete(`/conversations/${id}`);

  return response.data;
}

//------------------------------------------------------
// Attachments
//------------------------------------------------------

// NOTE: This assumes the backend's POST /chat/stream endpoint accepts
// multipart/form-data with a "message", "conversation_id", and one "files"
// entry per attached file (FastAPI: UploadFile = File(...)/List[UploadFile]).
// If the backend instead expects a separate upload endpoint that returns a
// file reference, point this function at that endpoint and adjust the field
// names to match its contract.
function buildAttachmentFormData({ message, conversationId, files }) {
  const formData = new FormData();

  formData.append("message", message ?? "");

  if (conversationId) {
    formData.append("conversation_id", conversationId);
  }

  files.forEach((file) => {
    formData.append("files", file, file.name);
  });

  return formData;
}
