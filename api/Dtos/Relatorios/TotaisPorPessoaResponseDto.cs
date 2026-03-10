namespace api.Dtos.Relatorios;

public class TotaisPorPessoaResponseDto
{
    public List<TotaisPorPessoaDto> Pessoas { get; set; } = new();
    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoGeral { get; set; }
}
