using Microsoft.EntityFrameworkCore;
using PetShop.Core.Entities;

namespace PetShop.Infrastructure.Data;

public class PetShopDbContext : DbContext
{
    public PetShopDbContext(DbContextOptions<PetShopDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Pet> Pets { get; set; }
    public DbSet<Servico> Servicos { get; set; }
    public DbSet<Profissional> Profissionais { get; set; }
    public DbSet<HorarioDisponivel> HorariosDisponiveis { get; set; }
    public DbSet<Agendamento> Agendamentos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurações Usuario
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Role).IsRequired().HasMaxLength(50);
        });

        // Configurações Cliente
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Telefone).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.CPF).HasMaxLength(14);
            entity.HasMany(e => e.Pets)
                .WithOne(e => e.Cliente)
                .HasForeignKey(e => e.ClienteId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configurações Pet
        modelBuilder.Entity<Pet>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Especie).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Raca).HasMaxLength(100);
            entity.Property(e => e.Sexo).HasMaxLength(10);
            entity.Property(e => e.Cor).HasMaxLength(50);
            entity.Property(e => e.Peso).HasColumnType("decimal(5,2)");
        });

        // Configurações Servico
        modelBuilder.Entity<Servico>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Preco).HasColumnType("decimal(10,2)");
        });

        // Configurações Profissional
        modelBuilder.Entity<Profissional>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nome).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Telefone).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.HasMany(e => e.HorariosDisponiveis)
                .WithOne(e => e.Profissional)
                .HasForeignKey(e => e.ProfissionalId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configurações HorarioDisponivel
        modelBuilder.Entity<HorarioDisponivel>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        // Configurações Agendamento
        modelBuilder.Entity<Agendamento>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
            entity.HasOne(e => e.Pet)
                .WithMany(e => e.Agendamentos)
                .HasForeignKey(e => e.PetId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Servico)
                .WithMany(e => e.Agendamentos)
                .HasForeignKey(e => e.ServicoId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Profissional)
                .WithMany(e => e.Agendamentos)
                .HasForeignKey(e => e.ProfissionalId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
