import React from "react";
import { Navigate } from "react-router-dom";
import AuthUser from "../helpers/AuthUser";

export default function GuestCheck({ com }) {
    const { getToken } = AuthUser();
    return !getToken() ? com : <Navigate to="/" />;
}
