
import { useDispatch } from "react-redux";
import api from "../services/api";
import { authStart, authSuccess, authFail } from "../features/auth/authSlice";
import './Modern.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {

    const [data,setData] = useState({
        email:"",
        password:""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name,value} = e.target;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(authStart());
            const res = await api.post('/auth/login',data);
            dispatch(authSuccess(res.data));
            setData({
                email: "",
                password: ""
            });
            navigate('/home');
        } catch (error) {
            console.log(error);
            dispatch(authFail( error.response?.data?.message || "Login failed"));
        }
    }

    return (
        <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <label>Email</label>
            <input type="email" value={data.email} placeholder="Enter email" name="email" onChange={handleChange} />
            <label>Password</label>
            <input type="password" value={data.password} placeholder="Enter password" name="password" onChange={handleChange} />

            <button type="submit">Login</button>
            <Link to="/signup">Don't have an account? Sign Up</Link>
        </form>
        </div>

    )
}

export default Login;