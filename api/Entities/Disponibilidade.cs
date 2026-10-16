
namespace api.Entities;

public class Disponibilidade
{
    public string Dia { get; set; } = string.Empty;
    public TimeOnly Inicio { get; set; }
    public TimeOnly Fim { get; set; }
}
