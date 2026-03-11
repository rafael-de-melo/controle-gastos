namespace api.Dtos.Relatorios;

public class TotaisPorCategoriaResponseDto
{
    public List<TotaisPorCategoriaDto> Categorias { get; set; } = new();

    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoGeral { get; set; }
}
