namespace api.Entities;

public class Pessoa
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public int Idade { get; set; }

    public List<Transacao> Transacoes { get; set; } = new();

    public Pessoa() { }

    public Pessoa(string nome, int idade)
    {
        Nome = nome?.Trim() ?? throw new ArgumentNullException(nameof(nome));
        Idade = idade;
    }

    public void Atualizar(string nome, int idade)
    {
        Nome = nome?.Trim() ?? throw new ArgumentNullException(nameof(nome));
        Idade = idade;
    }
}
