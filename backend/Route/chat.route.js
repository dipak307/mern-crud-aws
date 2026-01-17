import express from "express";
import { getChatsByProduct } from "../controllers/chat.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import ownerOnly from "../middleware/role.middleware.js";

const routerChat = express.Router();

routerChat.get("/:productId", authenticate, getChatsByProduct);
routerChat.get("/owner-message", authenticate,ownerOnly, getChatsByProduct);

export default routerChat;
