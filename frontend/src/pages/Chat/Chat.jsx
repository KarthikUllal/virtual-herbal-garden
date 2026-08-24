import { useEffect, useState } from "react";
import { createConversation, sendMessage } from "../../services/chat.service";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createNewConversation = async () => {
      try {
        const response = await createConversation();

        setConversationId(response.data._id);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    };

    createNewConversation();
  }, []);

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
      const response = await sendMessage(conversationId, text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.content,
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">Virtual Herbal Garden AI</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-3 ${
                message.role === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
               <ReactMarkdown>
    {message.content}
</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && <div className="text-gray-500">AI is thinking...</div>}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask something..."
            className="flex-1 rounded-lg border px-4 py-2"
          />

          <button
            onClick={handleSend}
            disabled={loading || !conversationId}
            className="rounded-lg bg-green-600 px-5 py-2 text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
