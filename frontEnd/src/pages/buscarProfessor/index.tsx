import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type {
  BuscarProfessorForm,
  BuscarProfessorResponse,
} from "../../features/professores/professores.types";
import "./style.css";
import { ProfessoresServices } from "../../features/professores/professores.services";
import SelectOption from "../../components/ui/SelectOption";
import Button from "../../components/ui/Button";
import TabelaProfessoresElegiveis from "../../components/TabelaProfessoresElegiveis";
import TabelaProfessoresNaoElegiveis from "../../components/TabelaProfessoresNaoElegiveis";
import Input from "../../components/ui/input";
import { useBuscarProfessores } from "../../features/professores/professores.hooks";

const diasSemana = [
  { label: "Seg", value: "segunda" },
  { label: "Ter", value: "terca" },
  { label: "Qua", value: "quarta" },
  { label: "Qui", value: "quinta" },
  { label: "Sex", value: "sexta" },
  { label: "Sáb", value: "sabado" },
  { label: "Dom", value: "domingo" },
];

const idiomas = [
  { label: "Inglês", value: "Inglês" },
  { label: "Espanhol", value: "Espanhol" },
  { label: "Francês", value: "Francês" },
];

const duracoes = [
  { label: "30 minutos", value: 30 },
  { label: "45 minutos", value: 45 },
  { label: "60 minutos", value: 60 },
  { label: "90 minutos", value: 90 },
  { label: "120 minutos", value: 120 },
];

export default function BuscarProfessor() {
  const [resultado, setResultado] =
    useState<BuscarProfessorResponse | null>(null);
  const { mutateAsync: buscarProfessores } = useBuscarProfessores();

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

  async function handleBuscar(data: BuscarProfessorForm) {
    try {
      const response = await buscarProfessores(data);

      setResultado(response);
    } catch (error) {
      console.log("Error busca: ", error);
    }
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

          <form onSubmit={handleSubmit(handleBuscar)}>
            <div className="buscar-form-grid">
              <div className="buscar-field">
                <SelectOption
                  label="Idioma desejado"
                  data={idiomas}
                  {...register("idioma", {
                    required: "Selecione um idioma.",
                  })}
                />

                {errors.idioma && (
                  <span className="buscar-error">
                    {errors.idioma.message}
                  </span>
                )}
              </div>

              <div className="buscar-field">
                <SelectOption
                  label="Duração da aula"
                  data={duracoes}
                  {...register("duracaoMinutos", {
                    required: "Selecione uma duração.",
                    valueAsNumber: true,
                  })}
                />

                {errors.duracaoMinutos && (
                  <span className="buscar-error">
                    {errors.duracaoMinutos.message}
                  </span>
                )}
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
                            className={`buscar-dia ${selecionado ? "ativo" : ""
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
                <Input
                  label="Horário inicial"
                  type="time"
                  erro={errors.inicioFaixa?.message}
                  {...register("inicioFaixa", {
                    required: "Informe o horário inicial.",
                  })}
                />
              </div>

              <div className="buscar-field">
                <Input
                  label="Horário final"
                  type="time"
                  erro={errors.fimFaixa?.message}
                  {...register("fimFaixa", {
                    required: "Informe o horário final.",
                    validate: (value) =>
                      value > inicioFaixa ||
                      "O horário final deve ser maior que o inicial.",
                  })}
                />
              </div>
            </div>

            <div className="buscar-form-footer">
              <span>Todos os campos são obrigatórios.</span>
              <Button
                texto="Buscar professores"
                classe="primary"
                icone="→"
                type="submit"
              />
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
                Preencha os filtros acima e clique em buscar
                para visualizar os professores.
              </p>
            </div>
          ) : (
            <>
              <TabelaProfessoresElegiveis
                data={resultado.professores}
              />

              <TabelaProfessoresNaoElegiveis
                data={resultado.naoElegiveis}
              />
            </>
          )}
        </section>

      </div>
    </main>
  );
}
