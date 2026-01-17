import api from "../../services/api";
import { chatStart, chatSuccess, chatFail } from "./chatSlice";

export const fetchChats = (productId) => async (dispatch) => {
  try {
    dispatch(chatStart());
    const res = await api.get(`/chat/${productId}`);
    dispatch(chatSuccess(res.data));
  } catch (err) {
    dispatch(chatFail("Failed to load chats"));
  }
};
