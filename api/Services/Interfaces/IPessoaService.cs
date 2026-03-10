using api.Dtos.Pessoas;

namespace api.Services.Interfaces;

public interface IPessoaService
{
    Task<PessoaResponseDto> CriarAsync(CreatePessoaDto dto);
    Task<List<PessoaResponseDto>> ListarAsync();
    Task<PessoaResponseDto?> ObterPorIdAsync(int id);
    Task<bool> AtualizarAsync(int id, UpdatePessoaDto dto);
    Task<bool> RemoverAsync(int id);
}
