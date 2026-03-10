using api.Dtos.Categorias;

namespace api.Services.Interfaces;

public interface ICategoriaService
{
    Task<CategoriaResponseDto> CriarAsync(CreateCategoriaDto dto);
    Task<List<CategoriaResponseDto>> ListarAsync();
    Task<bool> RemoverAsync(int id);
}
