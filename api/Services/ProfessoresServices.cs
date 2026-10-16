using api.DTOs.professores;
using api.Entities;
using api.Interfaces;

namespace api.Services;

public class ProfessoresServices : IProfessoresServices
{
    private readonly IProfessoresRepository _repository;

    public ProfessoresServices(IProfessoresRepository repository)
    {
        _repository = repository;
    }
    public ProfessoresBuscaResponseDTO buscarProfessores(ProfessoresBuscaRequestDTO request)
    {
        // Mapeia os filtros


        // Retornar o resposne dto
        return new();
    }
}