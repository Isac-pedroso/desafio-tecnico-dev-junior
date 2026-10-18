import api from "../../services/api/api";
import type { BuscarProfessorForm } from "./professores.types";


export class ProfessoresServices {

    static async buscarProfessores(form: BuscarProfessorForm){
        if(!form)
            throw Error("Campos invalidos !");
        const response = await api.post("/api/professores/busca", form);
        console.log(response)
        return response;
    }
}