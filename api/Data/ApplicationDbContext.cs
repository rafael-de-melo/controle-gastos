using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Pessoa>(entity =>
        {
            entity.ToTable("Pessoas");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Idade)
                .IsRequired();

            entity.HasMany(e => e.Transacoes)
                .WithOne(e => e.Pessoa)
                .HasForeignKey(e => e.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.ToTable("Categorias");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Descricao)
                .IsRequired()
                .HasMaxLength(400);

            entity.Property(e => e.Finalidade)
                .IsRequired();

            entity.HasMany(e => e.Transacoes)
                .WithOne(e => e.Categoria)
                .HasForeignKey(e => e.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Transacao>(entity =>
        {
            entity.ToTable("Transacoes");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Descricao)
                .IsRequired()
                .HasMaxLength(400);

            entity.Property(e => e.Valor)
                .IsRequired()
                .HasPrecision(18, 2);

            entity.Property(e => e.Data)
                .IsRequired();

            entity.Property(e => e.Tipo)
                .IsRequired();

            entity.Property(e => e.PessoaId)
                .IsRequired();

            entity.Property(e => e.CategoriaId)
                .IsRequired();
        });
    }
}
