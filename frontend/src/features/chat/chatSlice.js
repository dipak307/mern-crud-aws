import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    connected: false,
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    socketConnected: (state) => {
      state.connected = true;
    },

    socketDisconnected: (state) => {
      state.connected = false;
    },

    chatStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    chatSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    chatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearChat: (state) => {
      state.messages = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  socketConnected,
  socketDisconnected,
  chatStart,
  chatSuccess,
  addMessage,
  chatFail,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
