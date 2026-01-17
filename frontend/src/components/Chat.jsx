import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket/socket";
import { useSearchParams } from "react-router-dom";
import {
  socketConnected,
  socketDisconnected,
  addMessage,
  clearChat,
} from "../features/chat/chatSlice";
import { fetchChats } from "../features/chat/chatActions";

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef(null);

  const productId = searchParams.get("productId");
  const ownerId = searchParams.get("ownerId");

  const [text, setText] = useState("");

  // 🔥 FETCH CHAT HISTORY (ONLY ONCE)
  useEffect(() => {
    if (!productId) return;

    dispatch(clearChat());
    dispatch(fetchChats(productId));
  }, [productId, dispatch]);

  // 🔥 SOCKET CONNECTION (ONLY ONCE)
  useEffect(() => {
  if (!user || !productId) return;

  socket.connect();

  socket.on("connect", () => {
    dispatch(socketConnected());

    // ✅ JOIN PRODUCT ROOM
    socket.emit("joinRoom", { productId });
  });

  socket.on("receiveMessage", (data) => {
  dispatch(addMessage({
    ...data,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }));
});

  socket.on("disconnect", () => {
    dispatch(socketDisconnected());
  });

  return () => {
    socket.off("receiveMessage");
    socket.disconnect();
  };
}, [user, productId, dispatch]);


  // 🔥 AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const sendMessage = () => {
  if (!text.trim()) return;

  socket.emit("sendMessage", {
    message: text,
    senderId: user.user._id,
    receiverId: ownerId,
    productId,
  });

  setText("");
};

  return (
    <div style={page}>
      <div style={chatContainer}>
        <div style={header}>
          <h3 style={{ margin: 0 }}>💬 Product Chat</h3>
          <span style={status}>Online</span>
        </div>

        <div style={messagesBox}>
          {messages.length === 0 && (
            <p style={{ textAlign: "center", color: "#888" }}>
              No messages yet
            </p>
          )}

          {messages.map((msg, i) => {
            const senderId =
              typeof msg.sender === "object" ? msg.sender._id : msg.sender;

            const isMe = senderId === user.user._id;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    background: isMe ? "#4f46e5" : "#e5e7eb",
                    color: isMe ? "#fff" : "#000",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    maxWidth: "70%",
                  }}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div style={inputContainer}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            style={input}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} style={sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;





const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f3f4f6",
};

const chatContainer = {
  width: "400px",
  height: "550px",
  background: "#fff",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const header = {
  padding: "15px",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const status = {
  fontSize: "12px",
  color: "green",
};

const messagesBox = {
  flex: 1,
  padding: "15px",
  overflowY: "auto",
  background: "#f9fafb",
};

const inputContainer = {
  display: "flex",
  padding: "10px",
  borderTop: "1px solid #e5e7eb",
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
};

const sendBtn = {
  marginLeft: "8px",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
};






