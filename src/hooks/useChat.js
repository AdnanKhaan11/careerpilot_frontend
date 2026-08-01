import { useEffect, useState } from "react";

import {
  deleteConversation,
  getConversation,
  getConversations,
  renameConversation,
  streamMessage,
} from "../services/chatService";

export default function useChat() {
  const [conversations, setConversations] = useState([]);

  const [activeConversation, setActiveConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  //----------------------------------------------------
  // Load conversation list
  //----------------------------------------------------

  async function loadConversations() {
    try {
      setLoading(true);

      const response = await getConversations();

      // console.log("========== GET CONVERSATIONS ==========");
      // console.log(response);
      // console.log("success:", response.success);
      // console.log("conversations:", response.conversations);

      setConversations(
        Array.isArray(response.conversations) ? response.conversations : [],
      );
    } catch (error) {
      console.error(error);

      setConversations([]);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateConversationTitle(id, title) {
    try {
      await renameConversation(id, title);

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === id ? { ...conversation, title } : conversation,
        ),
      );

      if (activeConversation?.id === id) {
        setActiveConversation((previous) => ({
          ...previous,
          title,
        }));
      }
    } catch (error) {
      setError(error.message);
    }
  }

  async function removeConversation(id) {
    try {
      await deleteConversation(id);

      setConversations((previous) =>
        previous.filter((conversation) => conversation.id !== id),
      );

      if (activeConversation?.id === id) {
        newConversation();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  //----------------------------------------------------
  // Load single conversation
  //----------------------------------------------------

  async function loadConversation(id) {
    try {
      setLoading(true);

      const response = await getConversation(id);

      setActiveConversation(response.conversation);

      setMessages(response.turns);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //----------------------------------------------------
  // Start New Chat
  //----------------------------------------------------

  function newConversation() {
    setActiveConversation(null);

    setMessages([]);

    setError("");
  }

  //----------------------------------------------------
  // Send Message
  //----------------------------------------------------

  async function submitMessage(text) {
    if (!text.trim() || sending) return;

    try {
      setSending(true);
      setError("");

      //--------------------------------------------------
      // User message
      //--------------------------------------------------

      const userMessage = {
        role: "user",
        content: text,
      };

      //--------------------------------------------------
      // Placeholder assistant message
      //--------------------------------------------------

      const assistantMessage = {
        role: "assistant",
        content: "",
        streaming: true,
      };

      //--------------------------------------------------
      // Show messages immediately
      //--------------------------------------------------

      setMessages((previous) => [...previous, userMessage, assistantMessage]);

      //--------------------------------------------------
      // Start streaming
      //--------------------------------------------------

      await streamMessage(
        {
          message: text,
          conversationId: activeConversation?.id,
        },
        {
          //--------------------------------------------------
          // Conversation created
          //--------------------------------------------------

          onStart(conversation) {
            if (conversation) {
              setActiveConversation(conversation);
            }
          },

          //--------------------------------------------------
          // Stream token
          //--------------------------------------------------

          onChunk(chunk) {
            setMessages((previous) => {
              const updated = [...previous];

              const lastIndex = updated.length - 1;

              updated[lastIndex] = {
                ...updated[lastIndex],
                content: updated[lastIndex].content + chunk,
              };

              return updated;
            });
          },

          //--------------------------------------------------
          // Tool execution
          //--------------------------------------------------

          onTool(tool) {
            console.log("Tool:", tool);
          },

          //--------------------------------------------------
          // Stream finished
          //--------------------------------------------------

          onComplete(data) {
            //--------------------------------------------------
            // Update conversation
            //--------------------------------------------------

            if (data?.conversation) {
              setActiveConversation(data.conversation);
            }

            //--------------------------------------------------
            // Replace placeholder with final backend message
            //--------------------------------------------------

            setMessages((previous) => {
              const updated = [...previous];

              const lastIndex = updated.length - 1;

              updated[lastIndex] = {
                ...updated[lastIndex],
                ...(data?.message ?? {}),
                role: "assistant",
                streaming: false,
              };

              return updated;
            });

            //--------------------------------------------------
            // Refresh sidebar
            //--------------------------------------------------

            loadConversations();
          },

          //--------------------------------------------------
          // Stream error
          //--------------------------------------------------

          onError(error) {
            setError(error.message);

            setMessages((previous) => {
              const updated = [...previous];

              const lastIndex = updated.length - 1;

              updated[lastIndex] = {
                role: "assistant",
                content:
                  "⚠️ Something went wrong while generating the response.",
                streaming: false,
              };

              return updated;
            });
          },
        },
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  }

  //----------------------------------------------------

  useEffect(() => {
    loadConversations();
  }, []);

  //----------------------------------------------------

  return {
    conversations,

    activeConversation,

    messages,

    loading,

    sending,

    error,

    loadConversation,

    loadConversations,

    submitMessage,

    newConversation,

    updateConversationTitle,

    removeConversation,
  };
}
