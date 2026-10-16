using System.ComponentModel.DataAnnotations;


namespace api.DTOs.professores;

public class ProfessoresBuscaRequestDTO
{
    [Required]
    public string idioma { get; set; } = string.Empty;
    [Required]
    [MinLength(1)]
    public List<string> dias { get; set; } = new();
    public TimeOnly inicioFaixa { get; set; }

    public TimeOnly fimFaixa { get; set; }
    [Range(1, 480)]
    public int duracaoMinutos { get; set; }
}