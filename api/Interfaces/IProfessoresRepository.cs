
using api.Entities;

namespace api.Interfaces;

public interface IProfessoresRepository
{
    // Traz todos professor armazenados no store
    IReadOnlyList<Professor> findAll();
}