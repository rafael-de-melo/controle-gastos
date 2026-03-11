using api.Data;
using api.Dtos.Relatorios;
using api.Enums;
using api.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class RelatorioService : IRelatorioService
{
    private readonly ApplicationDbContext _context;

    public RelatorioService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TotaisPorPessoaResponseDto> ObterTotaisPorPessoaAsync()
    {
        var pessoasComTotais = await _context.Pessoas
            .AsNoTracking()
            .Select(p => new TotaisPorPessoaDto
            {
                PessoaId = p.Id,
                NomePessoa = p.Nome,
                TotalReceitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0,
                TotalDespesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0
            })
            .ToListAsync();

        foreach (var item in pessoasComTotais)
        {
            item.Saldo = item.TotalReceitas - item.TotalDespesas;
        }

        var response = new TotaisPorPessoaResponseDto
        {
            Pessoas = pessoasComTotais,
            TotalGeralReceitas = pessoasComTotais.Sum(x => x.TotalReceitas),
            TotalGeralDespesas = pessoasComTotais.Sum(x => x.TotalDespesas)
        };

        response.SaldoGeral = response.TotalGeralReceitas - response.TotalGeralDespesas;

        return response;
    }

    public async Task<TotaisPorCategoriaResponseDto> ObterTotaisPorCategoriaAsync()
    {
        var categoriasComTotais = await _context.Categorias
            .AsNoTracking()
            .Select(c => new TotaisPorCategoriaDto
            {
                CategoriaId = c.Id,
                DescricaoCategoria = c.Descricao,

                TotalReceitas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0,

                TotalDespesas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0
            })
            .ToListAsync();

        foreach (var item in categoriasComTotais)
        {
            item.Saldo = item.TotalReceitas - item.TotalDespesas;
        }

        var response = new TotaisPorCategoriaResponseDto
        {
            Categorias = categoriasComTotais,
            TotalGeralReceitas = categoriasComTotais.Sum(x => x.TotalReceitas),
            TotalGeralDespesas = categoriasComTotais.Sum(x => x.TotalDespesas)
        };

        response.SaldoGeral = response.TotalGeralReceitas - response.TotalGeralDespesas;

        return response;
    }
}
