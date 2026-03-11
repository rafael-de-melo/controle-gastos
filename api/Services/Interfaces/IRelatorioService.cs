using api.Dtos.Relatorios;

namespace api.Services.Interfaces;

public interface IRelatorioService
{
    Task<TotaisPorPessoaResponseDto> ObterTotaisPorPessoaAsync();
    Task<TotaisPorCategoriaResponseDto> ObterTotaisPorCategoriaAsync();
}
