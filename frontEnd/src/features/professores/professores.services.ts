import api from "../../services/api/api";
import type { BuscarProfessorForm, BuscarProfessorResponse } from "./professores.types";


export class ProfessoresServices {

    static async buscarProfessores(form: BuscarProfessorForm): Promise<BuscarProfessorResponse> {

        this.validForm

        const response = await api.post<BuscarProfessorResponse>("/api/professores/busca", form);

        return response.data;
    }

    private static validForm(form: BuscarProfessorForm): void {
        if (!form) {
            throw new Error("Campos inválidos.");
        }

        if (!form.idioma?.trim()) {
            throw new Error("Informe o idioma.");
        }

        if (!form.dias || form.dias.length === 0) {
            throw new Error("Informe pelo menos um dia.");
        }

        if (form.inicioFaixa === form.fimFaixa) {
            throw new Error(
                "Os horários de início e fim não podem ser iguais."
            );
        }

        if (form.inicioFaixa > form.fimFaixa) {
            throw new Error(
                "O horário final deve ser maior que o inicial."
            );
        }

        if (
            !Number.isFinite(form.duracaoMinutos) ||
            form.duracaoMinutos <= 0
        ) {
            throw new Error("Duração inválida.");
        }

        if (form.duracaoMinutos > 480) {
            throw new Error(
                "A duração máxima permitida é de 480 minutos."
            );
        }
    }
}