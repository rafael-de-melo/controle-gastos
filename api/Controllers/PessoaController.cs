using api.Dtos.Pessoas;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("pessoas")]
public class PessoaController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoaController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpPost]
    public async Task<ActionResult<PessoaResponseDto>> Criar(CreatePessoaDto dto)
    {
        try
        {
            var pessoa = await _pessoaService.CriarAsync(dto);
            return CreatedAtAction(nameof(ObterPorId), new { id = pessoa.Id }, pessoa);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<PessoaResponseDto>>> Listar()
    {
        var pessoas = await _pessoaService.ListarAsync();
        return Ok(pessoas);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PessoaResponseDto>> ObterPorId(int id)
    {
        var pessoa = await _pessoaService.ObterPorIdAsync(id);

        if (pessoa is null)
            return NotFound();

        return Ok(pessoa);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, UpdatePessoaDto dto)
    {
        try
        {
            var atualizado = await _pessoaService.AtualizarAsync(id, dto);

            if (!atualizado)
                return NotFound();

            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Remover(int id)
    {
        var removido = await _pessoaService.RemoverAsync(id);

        if (!removido)
            return NotFound();

        return NoContent();
    }
}
