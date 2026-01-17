import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true, // important for cookies auth
  autoConnect: false,
});

export default socket;
