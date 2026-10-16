using System.Text.Json;
using api.Converters;
using api.Entities;

namespace api.Data;

public class ProfessoresInitializer
{
    private readonly ProfessoresStore _store;
    private readonly IWebHostEnvironment _environment;

    public ProfessoresInitializer(ProfessoresStore store, IWebHostEnvironment environment)
    {
        _store = store;
        _environment = environment;
    }

    public void inicializar()
    {
        var caminho = Path.Combine(
           _environment.ContentRootPath,
           "Data",
           "professores.json"
       );

        if (!File.Exists(caminho))
        {
            throw new FileNotFoundException(
                "Arquivo de professores não encontrado.",
                caminho
            );
        }

        var json = File.ReadAllText(caminho);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        options.Converters.Add(new TimeOnlyJsonConverter());

        
        var dados = JsonSerializer.Deserialize<ProfessoresData>(
            json,
            options
        );

        if (dados?.Professores == null)
        {
            throw new InvalidOperationException(
                "Não foi possível carregar os professores."
            );
        }

        _store.Carregar(dados.Professores);

        Console.WriteLine(
            $"[INIT] {dados.Professores.Count} professores carregados."
        );
    }
}