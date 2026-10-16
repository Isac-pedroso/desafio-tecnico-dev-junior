using api.Entities;

namespace api.Data;

public class ProfessoresStore
{
    private List<Professor> _professores = new();

    public IReadOnlyList<Professor> Professores => _professores;

    public void Carregar(List<Professor> professores)
    {
        _professores = professores;
    }
}