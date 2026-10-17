import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
    return (
        <>
        {/* Aqui incluimos um header ou outro componente para navegação */}
            <div className="content-principal-admin">
                <Outlet/>
            </div>
        </>
    )
}