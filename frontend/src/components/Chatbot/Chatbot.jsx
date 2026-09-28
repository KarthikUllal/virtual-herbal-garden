import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { ExternalLink } from "lucide-react";

import {
  createConversation,
  sendMessage,
  getMessages,
} from "../../services/chat.service";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const openChat = async () => {
    setIsOpen(true);

    if (conversationId) {
      return;
    }

    try {
      const storedConversationId =
        localStorage.getItem("conversationId");

      if (storedConversationId) {
        setConversationId(storedConversationId);

        const response =
          await getMessages(storedConversationId);

        setMessages(response.data);

        return;
      }

      const response = await createConversation();

      const newConversationId = response.data._id;

      setConversationId(newConversationId);

      localStorage.setItem(
        "conversationId",
        newConversationId
      );
    } catch (error) {
      console.error(
        "Failed to open conversation:",
        error
      );
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleNewChat = async () => {
    if (loading) {
      return;
    }

    try {
      const response = await createConversation();

      const newConversationId = response.data._id;

      setConversationId(newConversationId);
      setMessages([]);
      setInput("");

      localStorage.setItem(
        "conversationId",
        newConversationId
      );
    } catch (error) {
      console.error(
        "Failed to create new conversation:",
        error
      );
    }
  };

  const handleSend = async () => {
    const text = input.trim();

    if (!text || !conversationId || loading) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await sendMessage(
        conversationId,
        text
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.content,
          sources: response.data.sources || [],
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className="
              absolute
              bottom-16
              right-0
              whitespace-nowrap
              rounded-xl
              bg-white
              px-3
              py-2
              text-sm
              font-medium
              text-gray-700
              shadow-lg
              ring-1
              ring-gray-200
            "
          >
            Ask Herbal AI
          </div>

          <button
            onClick={openChat}
            title="Open Herbal AI"
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-green-600
              text-2xl
              text-white
              shadow-xl
              ring-4
              ring-white
              transition
              duration-200
              hover:scale-110
              hover:bg-green-700
            "
          >
            <span className="relative">
              🌿

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-3
                  w-3
                  rounded-full
                  bg-white
                  ring-2
                  ring-green-600
                "
              />
            </span>
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="
            fixed
            bottom-0
            right-0
            z-50
            flex
            h-[100dvh]
            w-full
            flex-col
            overflow-hidden
            bg-white
            shadow-2xl
            sm:bottom-6
            sm:right-6
            sm:h-[550px]
            sm:w-[380px]
            sm:rounded-2xl
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              bg-green-600
              px-4
              py-3
              text-white
            "
          >
            <div>
              <h2 className="font-semibold">
                Herbal AI
              </h2>

              <p className="text-xs text-green-100">
                Virtual Herbal Garden
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNewChat}
                disabled={loading}
                className="
                  rounded-lg
                  px-2
                  py-1
                  text-xs
                  transition
                  hover:bg-green-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                + New Chat
              </button>

              <button
                onClick={closeChat}
                className="
                  text-xl
                  hover:text-green-100
                "
              >
                ×
              </button>
            </div>
          </div>

          <div
            className="
              flex-1
              space-y-3
              overflow-y-auto
              bg-gray-50
              p-4
            "
          >
            {messages.length === 0 && (
              <div
                className="
                  mt-10
                  text-center
                  text-sm
                  text-gray-500
                "
              >
                <div className="mb-2 text-3xl">
                  🌿
                </div>

                <p className="font-medium">
                  Hello!
                </p>

                <p className="mt-1">
                  Ask me anything about plants,
                  herbs, cultivation and more.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`
                  flex
                  ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }
                `}
              >
                <div
                  className={`
                    min-w-0
                    max-w-[85%]
                    overflow-hidden
                    break-words
                    rounded-2xl
                    px-3
                    py-2
                    text-sm
                    ${
                      message.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-800 shadow-sm"
                    }
                  `}
                >
                  {message.role === "assistant" ? (
                    <>
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="mb-2 text-lg font-bold">
                              {children}
                            </h1>
                          ),

                          h2: ({ children }) => (
                            <h2 className="mb-2 mt-3 text-base font-bold">
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3 className="mb-1 mt-3 text-sm font-bold">
                              {children}
                            </h3>
                          ),

                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">
                              {children}
                            </p>
                          ),

                          ul: ({ children }) => (
                            <ul className="mb-2 ml-5 list-disc space-y-1">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="mb-2 ml-5 list-decimal space-y-1">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li>{children}</li>
                          ),

                          strong: ({ children }) => (
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),

                          a: ({ children, href }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                break-all
                                text-green-600
                                underline
                                hover:text-green-800
                              "
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>

                      {message.sources &&
                        message.sources.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                            {message.sources.map(
                              (source) => (
                                <a
                                  key={source.id}
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={source.title}
                                  className="
                                    inline-flex
                                    max-w-full
                                    items-center
                                    gap-1.5
                                    rounded-md
                                    border
                                    border-indigo-200
                                    bg-white
                                    px-2.5
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-indigo-600
                                    transition
                                    hover:bg-indigo-50
                                    hover:border-indigo-300
                                  "
                                >
                                  <ExternalLink
                                    size={12}
                                    className="shrink-0"
                                  />

                                  <span className="max-w-[210px] truncate">
                                    {source.title}
                                  </span>
                                </a>
                              )
                            )}
                          </div>
                        )}
                    </>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />

                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          <div
            className="
              border-t
              bg-white
              p-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                rows={1}
                disabled={!conversationId || loading}
                className="
                  max-h-24
                  flex-1
                  resize-none
                  rounded-xl
                  border
                  border-gray-300
                  px-3
                  py-2
                  text-sm
                  outline-none
                  focus:border-green-500
                "
              />

              <button
                onClick={handleSend}
                disabled={
                  !input.trim() ||
                  !conversationId ||
                  loading
                }
                className="
                  rounded-xl
                  bg-green-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-green-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;