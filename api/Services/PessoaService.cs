using api.Data;
using api.Dtos.Pessoas;
using api.Entities;
using api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class PessoaService : IPessoaService
{
    private readonly ApplicationDbContext _context;

    public PessoaService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PessoaResponseDto> CriarAsync(CreatePessoaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nome))
            throw new ArgumentException("O nome é obrigatório.");

        if (dto.Nome.Length > 200)
            throw new ArgumentException("O nome deve ter no máximo 200 caracteres.");

        if (dto.Idade < 0)
            throw new ArgumentException("A idade não pode ser negativa.");

        var pessoa = new Pessoa
        {
            Nome = dto.Nome.Trim(),
            Idade = dto.Idade
        };

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return new PessoaResponseDto
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        };
    }

    public async Task<List<PessoaResponseDto>> ListarAsync()
    {
        return await _context.Pessoas
            .AsNoTracking()
            .Select(p => new PessoaResponseDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade
            })
            .ToListAsync();
    }

    public async Task<PessoaResponseDto?> ObterPorIdAsync(int id)
    {
        return await _context.Pessoas
            .AsNoTracking()
            .Where(p => p.Id == id)
            .Select(p => new PessoaResponseDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade
            })
            .FirstOrDefaultAsync();
    }

    public async Task<bool> AtualizarAsync(int id, UpdatePessoaDto dto)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa is null)
            return false;

        if (string.IsNullOrWhiteSpace(dto.Nome))
            throw new ArgumentException("O nome é obrigatório.");

        if (dto.Nome.Length > 200)
            throw new ArgumentException("O nome deve ter no máximo 200 caracteres.");

        if (dto.Idade < 0)
            throw new ArgumentException("A idade não pode ser negativa.");

        pessoa.Nome = dto.Nome.Trim();
        pessoa.Idade = dto.Idade;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoverAsync(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa is null)
            return false;

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return true;
    }
}
