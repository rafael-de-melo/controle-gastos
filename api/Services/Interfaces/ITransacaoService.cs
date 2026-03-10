using api.Dtos.Transacoes;

namespace api.Services.Interfaces;

public interface ITransacaoService
{
    Task<TransacaoResponseDto> CriarAsync(CreateTransacaoDto dto);
    Task<List<TransacaoResponseDto>> ListarAsync();
    Task<bool> RemoverAsync(int id);
}
