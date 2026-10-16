using api.DTOs.professores;
using api.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/professores")]
public class ProfessoresController : ControllerBase{
    private readonly IProfessoresServices _service;
    public ProfessoresController(IProfessoresServices service)
    {
        _service = service;
    }

    [HttpPost("busca")]
    public ActionResult<ProfessoresBuscaResponseDTO> buscarProfessores([FromBody] ProfessoresBuscaRequestDTO requestDTO)
    {
        try{
            var professores = _service.buscarProfessores(requestDTO);
            return Ok(professores);
        }catch(ArgumentException e){
            return BadRequest(new {mensagem = e.Message});
        }
    }
}