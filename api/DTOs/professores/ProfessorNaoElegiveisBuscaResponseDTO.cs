


namespace api.DTOs.professores;

public class ProfessorNaoElegiveisBuscaResponseDTO
{

    public long id { get; set; }
    public string nome { get; set; } = string.Empty;
    public List<string> motivo {get; set; } = [];

}