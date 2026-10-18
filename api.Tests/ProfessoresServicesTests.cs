
using Xunit;
using Moq;
using api.Services;
using api.Interfaces;
using api.Entities;
using api.DTOs;
using api.DTOs.professores;

public class ProfessoresServicesTests
{
    private readonly Mock<IProfessoresRepository> _repositoryMock;
    private readonly ProfessoresServices _service;

    public ProfessoresServicesTests()
    {
        _repositoryMock = new Mock<IProfessoresRepository>();

        _service = new ProfessoresServices(
            _repositoryMock.Object
        );
    }

    [Fact]
    public void BuscarProfessores_AgendaBloqueada_DeveSerNaoElegivel()
    {
        // Arrange: preparar os dados
        var professores = new List<Professor>
        {
            new Professor
            {
                id = 1,
                nome = "Carla",
                Idiomas = new List<string> { "Espanhol" },
                AgendaBloqueada = true,
                Disponibilidade = new(),
                AulasMarcadas = new()
            }
        };

        _repositoryMock
            .Setup(r => r.findAll())
            .Returns(professores);

        var request = new ProfessoresBuscaRequestDTO
        {
            idioma = "Espanhol",
            dias = new List<string> { "segunda" },
            inicioFaixa = new TimeOnly(18, 0),
            fimFaixa = new TimeOnly(20, 0),
            duracaoMinutos = 60
        };

        // Act: executar o método
        var resultado = _service.buscarProfessores(request);

        // Assert: verificar o resultado
        Assert.Empty(resultado.professores);
        Assert.Single(resultado.naoElegiveis);

        Assert.Contains(
            "Agenda bloqueada.",
            resultado.naoElegiveis[0].motivo
        );
    }



    [Theory]
    [InlineData(0)]
    [InlineData(-10)]
    [InlineData(481)]
    [InlineData(600)]
    public void BuscarProfessores_DuracaoInvalida_DeveLancarExcecao(
        int duracao
    )
    {
        // Arrange
        var request = new ProfessoresBuscaRequestDTO
        {
            idioma = "Espanhol",
            dias = new List<string> { "segunda" },
            inicioFaixa = new TimeOnly(18, 0),
            fimFaixa = new TimeOnly(20, 0),
            duracaoMinutos = duracao
        };

        // Act + Assert
        Assert.Throws<ArgumentException>(() =>
            _service.buscarProfessores(request)
        );
    }



    [Fact]
    public void BuscarProfessores_IdiomaIncompativel_DeveSerNaoElegivel()
    {
        // Arrange
        var professores = new List<Professor>
    {
        new Professor
        {
            id = 1,
            nome = "Ana",
            Idiomas = new() { "Inglês" },
            AgendaBloqueada = false,
            Disponibilidade = new(),
            AulasMarcadas = new()
        }
    };

        _repositoryMock
            .Setup(r => r.findAll())
            .Returns(professores);

        var request = CriarRequestValido();

        // Act
        var resultado = _service.buscarProfessores(request);

        // Assert
        Assert.Empty(resultado.professores);
        Assert.Single(resultado.naoElegiveis);

        Assert.Contains(
            "Não ensina o idioma.",
            resultado.naoElegiveis[0].motivo
        );
    }

    [Fact]
    public void BuscarProfessores_DuasRestricoes_DeveRetornarDoisMotivos()
    {
        // Arrange
        var professores = new List<Professor>
    {
        new Professor
        {
            id = 2,
            nome = "Carla",
            Idiomas = new() { "Inglês" },
            AgendaBloqueada = true,
            Disponibilidade = new(),
            AulasMarcadas = new()
        }
    };

        _repositoryMock
            .Setup(r => r.findAll())
            .Returns(professores);

        var request = CriarRequestValido();

        // Act
        var resultado = _service.buscarProfessores(request);

        // Assert
        Assert.Empty(resultado.professores);
        var professor = Assert.Single(resultado.naoElegiveis);

        Assert.Contains("Não ensina o idioma.", professor.motivo);
        Assert.Contains("Agenda bloqueada.", professor.motivo);
        Assert.Equal(3, professor.motivo.Count);
    }

    [Fact]
    public void BuscarProfessores_SemDisponibilidadeNoDia_DeveSerNaoElegivel()
    {
        // Arrange
        var professores = new List<Professor>
    {
        new Professor
        {
            id = 3,
            nome = "Bruno",
            Idiomas = new() { "Espanhol" },
            AgendaBloqueada = false,
            Disponibilidade = new(),
            AulasMarcadas = new()
        }
    };

        _repositoryMock
            .Setup(r => r.findAll())
            .Returns(professores);

        var request = CriarRequestValido();

        // Act
        var resultado = _service.buscarProfessores(request);

        // Assert
        Assert.Empty(resultado.professores);

        var professor = Assert.Single(resultado.naoElegiveis);

        Assert.Contains(
            "Sem disponibilidade nos dias solicitados.",
            professor.motivo
        );
    }

    [Fact]
    public void BuscarProfessores_SemDiasInformados_DeveLancarExcecao()
    {
        // Arrange
        var request = CriarRequestValido();
        request.dias = new List<string>();

        // Act + Assert
        Assert.Throws<ArgumentException>(() =>
            _service.buscarProfessores(request)
        );
    }








    private static ProfessoresBuscaRequestDTO CriarRequestValido()
    {
        return new ProfessoresBuscaRequestDTO
        {
            idioma = "Espanhol",
            dias = new List<string> { "segunda" },
            inicioFaixa = new TimeOnly(18, 0),
            fimFaixa = new TimeOnly(20, 0),
            duracaoMinutos = 60
        };
    }
}
