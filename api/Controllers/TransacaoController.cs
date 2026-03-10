using api.Dtos.Transacoes;
using api.Services.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("transacoes")]
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoService _service;

    public TransacaoController(ITransacaoService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<TransacaoResponseDto>> Criar(CreateTransacaoDto dto)
    {
        try
        {
            var transacao = await _service.CriarAsync(dto);
            return Ok(transacao);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<TransacaoResponseDto>>> Listar()
    {
        var transacoes = await _service.ListarAsync();
        return Ok(transacoes);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remover(int id)
    {
        var removido = await _service.RemoverAsync(id);

        if (!removido)
            return NotFound();

        return NoContent();
    }
}
