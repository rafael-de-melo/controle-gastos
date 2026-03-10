using api.Dtos.Relatorios;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("relatorios")]
public class RelatoriosController : ControllerBase
{
    private readonly IRelatorioService _service;

    public RelatoriosController(IRelatorioService service)
    {
        _service = service;
    }

    [HttpGet("totais-por-pessoa")]
    public async Task<ActionResult<TotaisPorPessoaResponseDto>> ObterTotaisPorPessoa()
    {
        var relatorio = await _service.ObterTotaisPorPessoaAsync();
        return Ok(relatorio);
    }
}
