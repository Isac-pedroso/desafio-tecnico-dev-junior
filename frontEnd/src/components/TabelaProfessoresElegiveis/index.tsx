
import type {
  ProfessorElegivel,
} from "../../features/professores/professores.types";

type Props = {
  data: ProfessorElegivel[];
};

export default function TabelaProfessoresElegiveis({ data }: Props) {
  return (
    <div className="buscar-table-card">
      <div className="buscar-table-heading">
        <span className="buscar-dot success" />

        <h3>Professores elegíveis</h3>

        <span className="buscar-counter">
          {data.length}
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
            {data.map((professor) => (
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

            {data.length === 0 && (
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
  );
}
