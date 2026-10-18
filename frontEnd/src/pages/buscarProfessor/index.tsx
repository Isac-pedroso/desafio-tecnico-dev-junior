import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type {
  BuscarProfessorForm,
  BuscarProfessorResponse,
} from "../../features/professores/professores.types";
import "./style.css";
import { ProfessoresServices } from "../../features/professores/professores.services";

const diasSemana = [
  { label: "Seg", value: "segunda" },
  { label: "Ter", value: "terca" },
  { label: "Qua", value: "quarta" },
  { label: "Qui", value: "quinta" },
  { label: "Sex", value: "sexta" },
  { label: "Sáb", value: "sabado" },
  { label: "Dom", value: "domingo" },
];

const dadosExemplo: BuscarProfessorResponse = {
  professores: [
    {
      id: 1,
      nome: "Ana",
      aulasNaSemana: 1,
      horarios: ["18:00"],
    },
    {
      id: 4,
      nome: "Diego",
      aulasNaSemana: 1,
      horarios: ["18:00", "18:15", "18:30", "18:45", "19:00"],
    },
  ],
  naoElegiveis: [
    { id: 2, nome: "Bruno", motivo: "Não leciona o idioma solicitado." },
    { id: 3, nome: "Carla", motivo: "Agenda bloqueada." },
    { id: 5, nome: "Elisa", motivo: "Não leciona o idioma solicitado." },
    { id: 6, nome: "Fábio", motivo: "Não leciona o idioma solicitado." },
    { id: 7, nome: "Gabriela", motivo: "Não leciona o idioma solicitado." },
    { id: 8, nome: "Heitor", motivo: "Não leciona o idioma solicitado." },
  ],
};

export default function BuscarProfessor() {
  const [resultado, setResultado] =
    useState<BuscarProfessorResponse | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BuscarProfessorForm>({
    defaultValues: {
      idioma: "Espanhol",
      dias: ["segunda"],
      inicioFaixa: "18:00",
      fimFaixa: "20:00",
      duracaoMinutos: 60,
    },
  });

  const inicioFaixa = watch("inicioFaixa");

  function handleSalvar(data: BuscarProfessorForm) {
    console.log("Body da busca:", data);

    ProfessoresServices.buscarProfessores(data);
    // Simulação do retorno da API
    setResultado(dadosExemplo);
  }

  return (
    <main className="buscar-page">
      <div className="buscar-container">
        <header className="buscar-header">
          <div className="buscar-header-icon">✦</div>
          <div>
            <span className="buscar-eyebrow">ESCOLA DE IDIOMAS</span>
            <h1>Encontre seu professor</h1>
            <p>
              Informe suas preferências e encontre os professores
              disponíveis para você.
            </p>
          </div>
        </header>

        <section className="buscar-card">
          <div className="buscar-section-heading">
            <div>
              <h2>Preferências da aula</h2>
              <p>Preencha os filtros para consultar a disponibilidade.</p>
            </div>
            <span className="buscar-step">01 / Busca</span>
          </div>

          <form onSubmit={handleSubmit(handleSalvar)}>
            <div className="buscar-form-grid">
              <div className="buscar-field">
                <label htmlFor="idioma">Idioma desejado</label>
                <select id="idioma" {...register("idioma", {
                  required: "Selecione um idioma.",
                })}>
                  <option value="Inglês">Inglês</option>
                  <option value="Espanhol">Espanhol</option>
                  <option value="Francês">Francês</option>
                </select>
                {errors.idioma && (
                  <span className="buscar-error">{errors.idioma.message}</span>
                )}
              </div>

              <div className="buscar-field">
                <label htmlFor="duracaoMinutos">Duração da aula</label>
                <select
                  id="duracaoMinutos"
                  {...register("duracaoMinutos", {
                    valueAsNumber: true,
                    required: "Selecione uma duração.",
                  })}
                >
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>60 minutos</option>
                  <option value={90}>90 minutos</option>
                  <option value={120}>120 minutos</option>
                </select>
              </div>

              <div className="buscar-field buscar-field-full">
                <label>Dias da semana</label>
                <Controller
                  name="dias"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || "Selecione pelo menos um dia.",
                  }}
                  render={({ field }) => (
                    <div className="buscar-dias">
                      {diasSemana.map((dia) => {
                        const selecionado = field.value.includes(dia.value);

                        return (
                          <button
                            key={dia.value}
                            type="button"
                            aria-pressed={selecionado}
                            className={`buscar-dia ${
                              selecionado ? "ativo" : ""
                            }`}
                            onClick={() => {
                              field.onChange(
                                selecionado
                                  ? field.value.filter((d) => d !== dia.value)
                                  : [...field.value, dia.value]
                              );
                            }}
                          >
                            {dia.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.dias && (
                  <span className="buscar-error">{errors.dias.message}</span>
                )}
              </div>

              <div className="buscar-field">
                <label htmlFor="inicioFaixa">Horário inicial</label>
                <input
                  id="inicioFaixa"
                  type="time"
                  {...register("inicioFaixa", {
                    required: "Informe o horário inicial.",
                  })}
                />
                {errors.inicioFaixa && (
                  <span className="buscar-error">
                    {errors.inicioFaixa.message}
                  </span>
                )}
              </div>

              <div className="buscar-field">
                <label htmlFor="fimFaixa">Horário final</label>
                <input
                  id="fimFaixa"
                  type="time"
                  {...register("fimFaixa", {
                    required: "Informe o horário final.",
                    validate: (value) =>
                      value > inicioFaixa ||
                      "O horário final deve ser maior que o inicial.",
                  })}
                />
                {errors.fimFaixa && (
                  <span className="buscar-error">{errors.fimFaixa.message}</span>
                )}
              </div>
            </div>

            <div className="buscar-form-footer">
              <span>Todos os campos são obrigatórios.</span>
              <button type="submit" className="buscar-submit">
                Buscar professores <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>

        <section className="buscar-results">
          <div className="buscar-results-heading">
            <div>
              <h2>Resultados da busca</h2>
              <p>Confira a disponibilidade dos professores.</p>
            </div>
            {resultado && (
              <span className="buscar-results-count">
                {resultado.professores.length} disponíveis
              </span>
            )}
          </div>

          {!resultado ? (
            <div className="buscar-empty">
              <div className="buscar-empty-icon">⌕</div>
              <h3>Sua busca começa aqui</h3>
              <p>
                Preencha os filtros acima e clique em buscar para
                visualizar os professores.
              </p>
            </div>
          ) : (
            <>
              <div className="buscar-table-card">
                <div className="buscar-table-heading">
                  <span className="buscar-dot success" />
                  <h3>Professores elegíveis</h3>
                  <span className="buscar-counter">
                    {resultado.professores.length}
                  </span>
                </div>

                <div className="buscar-table-scroll">
                  <table className="buscar-table">
                    <thead>
                      <tr>
                        <th>Professor</th>
                        <th>Aulas na semana</th>
                        <th>Horários disponíveis</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.professores.map((professor) => (
                        <tr key={professor.id}>
                          <td>
                            <div className="buscar-professor">
                              <span className="buscar-avatar">
                                {professor.nome.charAt(0)}
                              </span>
                              <strong>{professor.nome}</strong>
                            </div>
                          </td>
                          <td>{professor.aulasNaSemana}</td>
                          <td>
                            <div className="buscar-horarios">
                              {professor.horarios.map((horario) => (
                                <span
                                  key={horario}
                                  className="buscar-horario"
                                >
                                  {horario}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <span className="buscar-status elegivel">
                              Elegível
                            </span>
                          </td>
                        </tr>
                      ))}
                      {resultado.professores.length === 0 && (
                        <tr>
                          <td colSpan={4} className="buscar-table-empty">
                            Nenhum professor disponível para esses filtros.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="buscar-table-card">
                <div className="buscar-table-heading">
                  <span className="buscar-dot muted" />
                  <h3>Professores não elegíveis</h3>
                  <span className="buscar-counter">
                    {resultado.naoElegiveis.length}
                  </span>
                </div>

                <div className="buscar-table-scroll">
                  <table className="buscar-table">
                    <thead>
                      <tr>
                        <th>Professor</th>
                        <th>Motivo</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.naoElegiveis.map((professor) => (
                        <tr key={professor.id}>
                          <td>
                            <div className="buscar-professor">
                              <span className="buscar-avatar muted">
                                {professor.nome.charAt(0)}
                              </span>
                              <strong>{professor.nome}</strong>
                            </div>
                          </td>
                          <td className="buscar-motivo">{professor.motivo}</td>
                          <td>
                            <span className="buscar-status nao-elegivel">
                              Não elegível
                            </span>
                          </td>
                        </tr>
                      ))}
                      {resultado.naoElegiveis.length === 0 && (
                        <tr>
                          <td colSpan={3} className="buscar-table-empty">
                            Nenhum professor não elegível.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
