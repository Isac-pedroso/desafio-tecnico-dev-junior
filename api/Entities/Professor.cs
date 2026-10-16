namespace api.Entities;

public class Professor
{

    public long id { get; set; }
    public string nome { get; set; } = string.Empty;

    public List<string> Idiomas { get; set; } = new();

    public bool AgendaBloqueada { get; set; } = false;

    public List<Disponibilidade> Disponibilidade { get; set; } = new();

    public List<AulaMarcada> AulasMarcadas { get; set; } = new();

}