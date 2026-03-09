using api.Enums;

namespace api.Entities;

public class Transacao
{
    public int Id { get; set; }

    public string Descricao { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public DateTime Data { get; set; }

    public TipoTransacao Tipo { get; set; }

    public int PessoaId { get; set; }
    public Pessoa Pessoa { get; set; } = null!;

    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; } = null!;

    private Transacao() { }

    public Transacao(
        string descricao,
        decimal valor,
        DateTime data,
        TipoTransacao tipo,
        int pessoaId,
        int categoriaId)
    {
        Descricao = descricao?.Trim() ?? throw new ArgumentNullException(nameof(descricao));
        Valor = valor;
        Data = data;
        Tipo = tipo;
        PessoaId = pessoaId;
        CategoriaId = categoriaId;
    }
}
