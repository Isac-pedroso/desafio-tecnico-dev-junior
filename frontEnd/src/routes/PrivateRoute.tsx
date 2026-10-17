import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";

export default function PrivateRoute() {
    const authenticated = localStorage.getItem("auth") === "true";
    
    return authenticated ? <Outlet /> : <Navigate to="/login" replace/>;
}