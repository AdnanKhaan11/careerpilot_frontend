import api from "./api";

//------------------------------------------------------
// Streaming Chat
//------------------------------------------------------

export async function streamMessage(
  { message, conversationId },
  { onStart, onChunk, onTool, onComplete, onError },
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/chat/stream`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },

        body: JSON.stringify({
          message,
          conversation_id: conversationId,
        }),
      },
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
