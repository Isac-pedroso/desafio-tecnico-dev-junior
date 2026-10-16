
namespace api.DTOs.professores;
public class ProfessoresBuscaResponseDTO
{
    public List<ProfessorBuscaResponseDTO> professores {get; set;} = new();
    public List<ProfessorNaoElegiveisBuscaResponseDTO> naoElegiveis {get; set;} = new();
}