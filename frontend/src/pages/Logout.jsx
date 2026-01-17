import { useDispatch } from "react-redux";
import api from "../services/api";
import { logoutSuccess } from "../features/auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    dispatch(logoutSuccess());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
