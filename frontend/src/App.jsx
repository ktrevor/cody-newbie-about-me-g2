import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load messages from backend
  const loadMessages = async () => {
    let res = await fetch("http://127.0.0.1:5000/messages");
    let data = await res.json();
    setMessages(data);
  };

  // Send new message
  const sendMessage = async () => {
    if (!input.trim()) return;
    await fetch("http://127.0.0.1:5000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });
    setInput("");
    loadMessages();
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Frontend ↔ Backend ↔ Database Demo</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        style={{ padding: "0.5rem", width: "70%" }}
      />
      <button onClick={sendMessage} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
        Send
      </button>
      <h2>Messages</h2>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;