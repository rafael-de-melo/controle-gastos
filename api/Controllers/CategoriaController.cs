using api.Dtos.Categorias;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("categorias")]
public class CategoriasController : ControllerBase
{
    private readonly ICategoriaService _service;

    public CategoriasController(ICategoriaService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<CategoriaResponseDto>> Criar(CreateCategoriaDto dto)
    {
        try
        {
            var categoria = await _service.CriarAsync(dto);
            return Ok(categoria);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<CategoriaResponseDto>>> Listar()
    {
        var categorias = await _service.ListarAsync();
        return Ok(categorias);
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
