import Chat from "../models/chat.model.js";
import Product from "../models/product.model.js";

export const getChatsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const chats = await Chat.find({ product: productId }).sort({ createdAt: 1 });

    const safeChats = chats.map(chat => ({
      ...chat.toObject(),
      createdAt: chat.createdAt.toISOString(),
      updatedAt: chat.updatedAt.toISOString(),
    }));

    res.json(safeChats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};


