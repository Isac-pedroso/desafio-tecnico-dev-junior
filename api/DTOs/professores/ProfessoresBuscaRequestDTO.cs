using System.ComponentModel.DataAnnotations;


namespace api.DTOs.professores;

public class ProfessoresBuscaRequestDTO
{
    [Required(ErrorMessage = "Informe o idioma.")]
    public string idioma { get; set; } = string.Empty;
    [Required(ErrorMessage = "Informe pelo menos um dia.")]
    [MinLength(1)]
    public List<string> dias { get; set; } = new();
    public TimeOnly inicioFaixa { get; set; }

    public TimeOnly fimFaixa { get; set; }
    [Range(1, 480, ErrorMessage = "A duração deve estar entre 1 e 480 minutos.")]
    public int duracaoMinutos { get; set; }
}