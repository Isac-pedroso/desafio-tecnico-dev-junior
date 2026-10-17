import { Navigate, Outlet } from "react-router-dom";


export default function PublicRoute(){
    const authenticated = localStorage.getItem("auth") === "true";

    if(authenticated){
        // return <Navigate to="/home" />
    }

    return <Outlet />
}