
namespace api.Entities;

public class AulaMarcada
{
    public string Dia { get; set; } = string.Empty;
    public TimeOnly Inicio { get; set; }
    public int DuracaoMinutos { get; set; }
}
