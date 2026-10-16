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
        validarFiltros(request);

        // Mapeia os filtros
        var professores = _repository.findAll();
        foreach(Professor professor in professores)
        {
            Console.WriteLine(professor);
        }
        // Retornar o resposne dto
        return new();
    }

    private static void validarFiltros(ProfessoresBuscaRequestDTO request)
    {
        if (string.IsNullOrWhiteSpace(request.idioma))
            throw new ArgumentException("Informe o idioma.");

        if (request.dias == null || request.dias.Count == 0)
            throw new ArgumentException("Informe pelo menos um dia.");

        if (request.inicioFaixa >= request.fimFaixa)
            throw new ArgumentException("Faixa de horário inválida.");
        if(request.inicioFaixa.Equals(request.fimFaixa))
        throw new ArgumentException("As faixas de horarios não podem ser iguais. Faixa de horario fim deve ser maior que de inicio.");
        if (request.duracaoMinutos <= 0)
            throw new ArgumentException("Duração inválida.");
    }
}