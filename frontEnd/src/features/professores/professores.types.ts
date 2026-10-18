
export type BuscarProfessorForm = {
  idioma: "Inglês" | "Espanhol" | "Francês";
  dias: string[];
  inicioFaixa: string;
  fimFaixa: string;
  duracaoMinutos: number;
};

export type ProfessorElegivel = {
  id: number;
  nome: string;
  aulasNaSemana: number;
  horarios: string[];
};

export type ProfessorNaoElegivel = {
  id: number;
  nome: string;
  motivo: string[];
};

export type BuscarProfessorResponse = {
  professores: ProfessorElegivel[];
  naoElegiveis: ProfessorNaoElegivel[];
};