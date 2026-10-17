import { Outlet } from "react-router-dom";
import "../LayoutStyle/layoutGeral.style.css"

export default function LayoutIndex(){
    return (
        <>
            <div className="content-principal">
                <Outlet/>
            </div>
        </>
    )
}