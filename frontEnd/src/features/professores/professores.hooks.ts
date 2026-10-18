import { useMutation } from "@tanstack/react-query";
import type { BuscarProfessorForm, BuscarProfessorResponse } from "./professores.types";
import { ProfessoresServices } from "./professores.services";
import { useLoading } from "../../providers/LoadingProvider";
import { isAxiosError } from "axios";


export function useBuscarProfessores() {
    const { showLoading, hideLoading, setErrorLoading, setSuccessLoading, setMsgLoading } = useLoading();

    return useMutation<BuscarProfessorResponse, Error, BuscarProfessorForm>({
        mutationFn: ProfessoresServices.buscarProfessores,
        onMutate: () => {
            showLoading("Buscando professores...");
        },
        onError: (error) => {

            let msg = error?.message;

            if (isAxiosError(error)) {
                const data = error?.response?.data;
                msg = typeof data === "string" ? data : data.message ?? data.title ?? error.message;
            }
            setErrorLoading(error?.message || "Ocorreu um problema ao buscar os professores.");
        },
        onSuccess: () => {
            setSuccessLoading("Busca concluida com sucesso.");
        },
        onSettled: (_data, error) => {
            const qtdProfessores = _data?.professores.length;
            if(!qtdProfessores){
                setMsgLoading("Nenhum professor encontrado")
            }
            hideLoading(error ? 2000 : qtdProfessores ? 800 : 2000);
        }
    })
}