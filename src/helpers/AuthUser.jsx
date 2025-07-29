import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const stringToken = sessionStorage.getItem('token')
        const userToken = JSON.parse(stringToken);
        return userToken;
    }
    
    const getUser = () => {
        const stringUser = sessionStorage.getItem('user')
        const userUser = JSON.parse(stringUser);
        return userUser;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const logout = () => {
        sessionStorage.clear();
        navigate('/login')
    }

    const saveToken = (user, token) => {
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
        navigate('/')
    };

    const saveUser = (user) => {
        if (user) {
            if (user.status == 'inactive') {
                toast.error("This account is deactivated!");
                logout();
            }
        }
        
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const http = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    });

    return {
        setToken:saveToken,
        logout,
        token,
        user,
        getToken,
        getUser,
        setUser: saveUser,
        http,
    };
}
