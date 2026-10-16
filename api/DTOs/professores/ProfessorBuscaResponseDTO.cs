

namespace api.DTOs.professores;


public class ProfessorBuscaResponseDTO
{
    
    public long id { get; set; }
    public string nome { get; set; } = string.Empty;

    public int aulasNaSemana { get; set; }

    public List<TimeOnly> horarios {get; set;} = new();

}