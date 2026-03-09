using api.Enums;

namespace api.Entities;

public class Categoria
{
    public int Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public FinalidadeCategoria Finalidade { get; set; }

    public List<Transacao> Transacoes { get; set; } = new();

    private Categoria() { }

    public Categoria(string descricao, FinalidadeCategoria finalidade)
    {
        Descricao = descricao?.Trim() ?? throw new ArgumentNullException(nameof(descricao));
        Finalidade = finalidade;
    }

    public void Atualizar(string descricao, FinalidadeCategoria finalidade)
    {
        Descricao = descricao?.Trim() ?? throw new ArgumentNullException(nameof(descricao));
        Finalidade = finalidade;
    }
}
