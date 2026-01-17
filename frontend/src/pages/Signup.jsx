import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import api from "../services/api.js";
import { authStart, authSuccess, authFail } from "../features/auth/authSlice.js";
import './Modern.css';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [data,setData] = useState({
        username:"",
        email:"",
        password:"",
        role:""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
       const {name,value} = e.target;
       setData((prev)=>({
            ...prev,
            [name]:value
        
       }))
    }

    const handleRegister = async (e) => { 
        e.preventDefault();
        try {
            dispatch(authStart());
            const res = await api.post('/auth/signup',data);
            dispatch(authSuccess(res.data));
            setData({
                username: "",
                email: "",
                password: "",
                role: ""
                });
            navigate('/');
        } catch (error) {
            console.log(error);
            dispatch(authFail( error.response?.data?.message || "Register failed"));
        }
    }



    return (
        <div class="auth-container">
        <form class="auth-form">
            <h2>Register</h2>

            <label style={{textAlign:"start"}}>Username</label>
            <input type="text"  value={data.username} placeholder="Enter username" name="username" onChange={handleChange} />

            <label style={{textAlign:"start"}}>Email</label>
            <input type="email" value={data.email} placeholder="Enter email" name="email" onChange={handleChange} />

            <label style={{textAlign:"start"}}>Password</label>
            <input type="password" value={data.password} placeholder="Enter password" name="password" onChange={handleChange} />

            <label style={{textAlign:"start"}}>Role</label>
            <select onChange={handleChange}  name="role">
            <option value="">Select Role</option>
            <option value="OWNER">Owner</option>
            <option value="USER">User</option>
            </select>

            <button type="submit" onClick={handleRegister}>Register</button>
            <Link to="/">Already have an account? Login</Link>
        </form>
        </div>
    
    )
}

export default Register;