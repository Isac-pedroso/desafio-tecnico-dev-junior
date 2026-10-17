import { use } from "react";
import LayoutIndex from "../LayoutIndex";
const LayoutSelector: React.FC = () => {
    // Valida se o usuario esta conectado
    
    const authenticated = localStorage.getItem("auth") === "true";
    
    // Se o usuario nao estiver conectado retorna layout padrao
    if(!authenticated) {
        return <LayoutIndex />
    }
}

export default LayoutSelector;