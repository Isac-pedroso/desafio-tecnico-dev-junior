using System.Collections;
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


        var elegiveis = new List<ProfessorBuscaResponseDTO>();
        var naoElegiveis = new List<ProfessorNaoElegiveisBuscaResponseDTO>();

        foreach (Professor p in professores)
        {
            List<string> motivos = new List<string>();


            if (!p.Idiomas.Any(i =>
                i.Equals(
                    request.idioma.Trim(),
                    StringComparison.OrdinalIgnoreCase)))
            {
                motivos.Add("Não ensina o idioma.");
            }

            if (p.AgendaBloqueada)
            {
                motivos.Add("Agenda bloqueada.");
            }

            if (!p.Disponibilidade.Any(d =>
                request.dias.Any(dia =>
                    dia.Trim().Equals(
                        d.Dia,
                        StringComparison.OrdinalIgnoreCase))))
            {
                motivos.Add("Sem disponibilidade nos dias solicitados.");
            }

            if (motivos.Count != 0)
            {
                naoElegiveis.Add(new ProfessorNaoElegiveisBuscaResponseDTO
                {
                    id = p.id,
                    nome = p.nome,
                    motivo = motivos
                });
                continue;
            }

            var horarios = p.Disponibilidade
            .Where(d => request.dias.Any(dia =>
                dia.Trim().Equals(
                    d.Dia,
                    StringComparison.OrdinalIgnoreCase)))
            .SelectMany(d =>
                obterHorariosLivres(p, d, request))
            .Distinct()
            .OrderBy(h => h)
            .ToList();


            if (horarios.Count == 0)
            {
                naoElegiveis.Add(new ProfessorNaoElegiveisBuscaResponseDTO
                {
                    id = p.id,
                    nome = p.nome,
                    motivo = ["Sem horário em comum nos dias pedidos."]
                });

                continue;
            }

            elegiveis.Add(new ProfessorBuscaResponseDTO
            {
                id = p.id,
                nome = p.nome,
                aulasNaSemana = p.AulasMarcadas.Count,
                horarios = horarios
            });
        }

        return new ProfessoresBuscaResponseDTO(elegiveis, naoElegiveis);
    }

    private static void validarFiltros(ProfessoresBuscaRequestDTO request)
    {
        if (string.IsNullOrWhiteSpace(request.idioma))
            throw new ArgumentException("Informe o idioma.");

        if (request.dias == null || request.dias.Count == 0)
            throw new ArgumentException("Informe pelo menos um dia.");

        if (request.inicioFaixa == request.fimFaixa)
            throw new ArgumentException(
                "Os horários de início e fim não podem ser iguais.");

        if (request.inicioFaixa > request.fimFaixa)
            throw new ArgumentException(
                "O horário final deve ser maior que o inicial.");

        if (request.duracaoMinutos <= 0)
            throw new ArgumentException("Duração inválida.");

        if (request.duracaoMinutos > 480)
            throw new ArgumentException(
                "A duração máxima permitida é de 480 minutos.");
    }


    private static List<TimeOnly> obterHorariosLivres(
        Professor professor,
        Disponibilidade disponibilidade,
        ProfessoresBuscaRequestDTO request)
    {
        var horarios = new List<TimeOnly>();

        var inicio = disponibilidade.Inicio.ToTimeSpan();
        var fim = disponibilidade.Fim.ToTimeSpan();

        var inicioFaixa = request.inicioFaixa.ToTimeSpan();
        var fimFaixa = request.fimFaixa.ToTimeSpan();

        if (inicio < inicioFaixa)
            inicio = inicioFaixa;

        if (fim > fimFaixa)
            fim = fimFaixa;

        var duracao = TimeSpan.FromMinutes(request.duracaoMinutos);

        if (fim - inicio < duracao)
            return horarios;

        // 2. Recupera aulas ocupadas no dia
        var aulas = professor.AulasMarcadas
            .Where(a => a.Dia.Equals(
                disponibilidade.Dia,
                StringComparison.OrdinalIgnoreCase))
            .ToList();

        var intervalo = TimeSpan.FromMinutes(15);

        // Alinha o primeiro horário ao próximo múltiplo de 15 min
        var resto = inicio.Ticks % intervalo.Ticks;

        if (resto != 0)
            inicio += TimeSpan.FromTicks(intervalo.Ticks - resto);

        for (var horario = inicio;
             horario + duracao <= fim;
             horario += intervalo)
        {
            var fimHorario = horario + duracao;

            // 5. Verifica conflitos com aulas marcadas
            var possuiConflito = aulas.Any(a =>
            {
                var inicioAula = a.Inicio.ToTimeSpan();

                var fimAula = inicioAula +
                    TimeSpan.FromMinutes(a.DuracaoMinutos);

                return horario < fimAula &&
                       fimHorario > inicioAula;
            });

            if (!possuiConflito)
            {
                horarios.Add(
                    TimeOnly.FromTimeSpan(horario)
                );
            }
        }

        return horarios;
    }
}