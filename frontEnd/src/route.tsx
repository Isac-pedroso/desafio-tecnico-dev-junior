import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import LayoutSelector from "./components/layout/LayoutSelector";
import { BuscarProfessor } from "./pages/buscarProfessor";


export default function AppRoutes() {

    return (
        <>
            <Routes>
                
                {/* ROTAS PUBLICAS */}
                <Route element={<PublicRoute />}>
                    <Route path="/" index element={<BuscarProfessor />} />
                    <Route path="/buscarProfessor" element={<BuscarProfessor />} />
                </Route>

                {/* ROTAS PRIVADAS */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<LayoutSelector />}>
                        {/* Aqui vai todas rotas privadas */}
                    </Route>
                </Route>
            </Routes>
        </>
    )
}
