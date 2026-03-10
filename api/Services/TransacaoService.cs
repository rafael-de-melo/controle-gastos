using api.Data;
using api.Dtos.Transacoes;
using api.Entities;
using api.Enums;
using api.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class TransacaoService : ITransacaoService
{
    private readonly ApplicationDbContext _context;

    public TransacaoService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TransacaoResponseDto> CriarAsync(CreateTransacaoDto dto)
    {
        await ValidarDtoAsync(dto);

        var transacao = new Transacao
        {
            Descricao = dto.Descricao.Trim(),
            Valor = dto.Valor,
            Data = dto.Data,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId,
            CategoriaId = dto.CategoriaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return new TransacaoResponseDto
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Data = transacao.Data,
            Tipo = transacao.Tipo,
            PessoaId = transacao.PessoaId,
            CategoriaId = transacao.CategoriaId
        };
    }

    public async Task<List<TransacaoResponseDto>> ListarAsync()
    {
        return await _context.Transacoes
            .AsNoTracking()
            .Select(t => new TransacaoResponseDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Data = t.Data,
                Tipo = t.Tipo,
                PessoaId = t.PessoaId,
                CategoriaId = t.CategoriaId
            })
            .ToListAsync();
    }

    public async Task<bool> RemoverAsync(int id)
    {
        var transacao = await _context.Transacoes.FindAsync(id);

        if (transacao is null)
            return false;

        _context.Transacoes.Remove(transacao);
        await _context.SaveChangesAsync();

        return true;
    }

    private async Task ValidarDtoAsync(CreateTransacaoDto dto)
    {
        if (dto.Valor <= 0)
            throw new ArgumentException("Valor deve ser positivo.");

        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId) ?? throw new ArgumentException("Pessoa não encontrada.");

        var categoria = await _context.Categorias.FindAsync(dto.CategoriaId) ?? throw new ArgumentException("Categoria não encontrada.");

        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
            throw new ArgumentException("Menores de idade só podem registrar despesas.");

        if (categoria.Finalidade == FinalidadeCategoria.Despesa && dto.Tipo == TipoTransacao.Receita)
            throw new ArgumentException("Categoria incompatível com receita.");

        if (categoria.Finalidade == FinalidadeCategoria.Receita && dto.Tipo == TipoTransacao.Despesa)
            throw new ArgumentException("Categoria incompatível com despesa.");
    }
}
