
namespace api.DTOs.professores;
public class ProfessoresBuscaResponseDTO
{
    public List<ProfessorBuscaResponseDTO> professores {get; set;} = new();
    public List<ProfessorNaoElegiveisBuscaResponseDTO> naoElegiveis {get; set;} = new();

    public ProfessoresBuscaResponseDTO(List<ProfessorBuscaResponseDTO> profs, List<ProfessorNaoElegiveisBuscaResponseDTO> nLegiveis)
    {
        professores = profs;
        naoElegiveis = nLegiveis;
    }
}