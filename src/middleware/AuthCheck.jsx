import React from "react";
import { Navigate } from "react-router-dom";
import AuthUser from "../helpers/AuthUser";


export default function AuthCheck({ com }) {
    const { getToken , getUser } = AuthUser();

    return getToken() ? com : <Navigate to="/login" />;
}

