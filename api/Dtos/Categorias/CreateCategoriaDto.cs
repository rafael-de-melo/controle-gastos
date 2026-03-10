using api.Enums;

namespace api.Dtos.Categorias;

public class CreateCategoriaDto
{
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }
}
