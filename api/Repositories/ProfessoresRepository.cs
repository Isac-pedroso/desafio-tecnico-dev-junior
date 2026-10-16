using api.Data;
using api.Entities;
using api.Interfaces;

namespace api.Repositories;
public class ProfessoresRepository : IProfessoresRepository
{
    private readonly ProfessoresStore _store;

    public ProfessoresRepository(ProfessoresStore store)
    {
        _store = store;
    }

    public IReadOnlyList<Professor> findAll()
    {
        return _store.Professores;
    }
}