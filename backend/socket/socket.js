import { Server } from "socket.io";
import Chat from "../models/chat.model.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    // 🔥 JOIN PRODUCT ROOM
    socket.on("joinRoom", ({ productId }) => {
      socket.join(productId);
      console.log(`📦 Joined room: ${productId}`);
    });

    // 🔥 SEND MESSAGE
   socket.on("sendMessage", async ({ productId, senderId, receiverId, message }) => {
  const chat = await Chat.create({
    product: productId,
    sender: senderId,
    receiver: receiverId,
    message,
  });

  io.to(productId).emit("receiveMessage", {
    ...chat.toObject(),
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
  });
});


    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};

export default initSocket;
