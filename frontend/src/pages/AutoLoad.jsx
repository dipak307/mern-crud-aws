import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { authStart, authSuccess, authFail } from "../features/auth/authSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch(authStart());

        const res = await api.get("/auth/me");

        dispatch(authSuccess(res.data));
      } catch (err) {
        dispatch(authFail(null));
      }
    };

    loadUser();
  }, [dispatch]);

  return children;
};

export default AuthLoader;
