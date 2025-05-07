import { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import type { Message } from "../types";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: input,
        timestamp: new Date(),
      },
    ]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "This is a sample response.",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                borderRadius: 12,
                padding: "8px 16px",
                background: message.role === "user" ? "#0ea5e9" : "#222",
                color: message.role === "user" ? "#fff" : "#fff",
                fontSize: 14,
              }}
            >
              <p style={{ margin: 0 }}>{message.content}</p>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: "#222",
                borderRadius: 12,
                padding: "8px 16px",
              }}
            >
              <p style={{ margin: 0, color: "#ccc", fontSize: 14 }}>
                Thinking...
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ padding: 16, borderTop: "1px solid #333" }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input-field"
            style={{ flex: 1 }}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ display: "flex", alignItems: "center" }}
            disabled={isLoading}
          >
            <PaperAirplaneIcon style={{ height: 20, width: 20 }} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
