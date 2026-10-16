
using api.DTOs.professores;

namespace api.Interfaces;

public interface IProfessoresServices
{
    ProfessoresBuscaResponseDTO buscarProfessores(ProfessoresBuscaRequestDTO request);
}