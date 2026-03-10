using api.Data;
using api.Dtos.Categorias;
using api.Entities;
using api.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class CategoriaService : ICategoriaService
{
    private readonly ApplicationDbContext _context;

    public CategoriaService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CategoriaResponseDto> CriarAsync(CreateCategoriaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Descricao))
            throw new ArgumentException("Descrição é obrigatória.");

        if (dto.Descricao.Length > 400)
            throw new ArgumentException("Descrição deve ter no máximo 400 caracteres.");

        var categoria = new Categoria
        {
            Descricao = dto.Descricao.Trim(),
            Finalidade = dto.Finalidade
        };

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        return new CategoriaResponseDto
        {
            Id = categoria.Id,
            Descricao = categoria.Descricao,
            Finalidade = categoria.Finalidade
        };
    }

    public async Task<List<CategoriaResponseDto>> ListarAsync()
    {
        return await _context.Categorias
            .AsNoTracking()
            .Select(c => new CategoriaResponseDto
            {
                Id = c.Id,
                Descricao = c.Descricao,
                Finalidade = c.Finalidade
            })
            .ToListAsync();
    }

    public async Task<bool> RemoverAsync(int id)
    {
        var categoria = await _context.Categorias.FindAsync(id);

        if (categoria is null)
            return false;

        _context.Categorias.Remove(categoria);
        await _context.SaveChangesAsync();

        return true;
    }
}
