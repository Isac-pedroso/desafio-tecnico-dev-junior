
import type {
  ProfessorNaoElegivel,
} from "../../features/professores/professores.types";

type Props = {
  data: ProfessorNaoElegivel[];
};

export default function TabelaProfessoresNaoElegiveis({ data }: Props) {
  return (
    <div className="buscar-table-card">
      <div className="buscar-table-heading">
        <span className="buscar-dot muted" />

        <h3>Professores não elegíveis</h3>

        <span className="buscar-counter">
          {data.length}
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
            {data.map((professor) => (
              <tr key={professor.id}>
                <td>
                  <div className="buscar-professor">
                    <span className="buscar-avatar muted">
                      {professor.nome.charAt(0)}
                    </span>

                    <strong>{professor.nome}</strong>
                  </div>
                </td>

                <td className="buscar-motivo">
                  {professor.motivo}
                </td>

                <td>
                  <span className="buscar-status nao-elegivel">
                    Não elegível
                  </span>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
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
  );
}
