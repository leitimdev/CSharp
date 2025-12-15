using Microsoft.EntityFrameworkCore;
using PetShop.Infrastructure.Data;
using PetShop.Core.Entities;

namespace PetShop.Infrastructure.Data;

public static class SeedData
{
    public static async Task SeedAsync(PetShopDbContext context)
    {
        // Já existe dados? Não fazer nada
        if (await context.Clientes.AnyAsync())
            return;

        Console.WriteLine("📦 Populando banco de dados com dados de exemplo...");

        // Serviços
        var servicos = new List<Servico>
        {
            new() { Nome = "Banho", Descricao = "Banho completo com shampoo e condicionador", Preco = 50.00m, DuracaoMinutos = 45 },
            new() { Nome = "Tosa", Descricao = "Tosa completa com acabamento", Preco = 60.00m, DuracaoMinutos = 60 },
            new() { Nome = "Banho e Tosa", Descricao = "Pacote completo banho + tosa", Preco = 100.00m, DuracaoMinutos = 90 },
            new() { Nome = "Corte de Unhas", Descricao = "Corte e lixamento de unhas", Preco = 20.00m, DuracaoMinutos = 15 },
            new() { Nome = "Limpeza de Ouvidos", Descricao = "Higienização completa dos ouvidos", Preco = 25.00m, DuracaoMinutos = 20 },
            new() { Nome = "Hidratação", Descricao = "Hidratação profunda dos pelos", Preco = 80.00m, DuracaoMinutos = 60 },
            new() { Nome = "Consulta Veterinária", Descricao = "Consulta geral com veterinário", Preco = 120.00m, DuracaoMinutos = 30 },
            new() { Nome = "Vacinação", Descricao = "Aplicação de vacinas", Preco = 80.00m, DuracaoMinutos = 15 }
        };
        context.Servicos.AddRange(servicos);

        // Profissionais
        var profissionais = new List<Profissional>
        {
            new() { Nome = "Maria Santos", Telefone = "(11) 99999-1111", Email = "maria@petshop.com", Especialidade = "Groomer" },
            new() { Nome = "João Silva", Telefone = "(11) 99999-2222", Email = "joao@petshop.com", Especialidade = "Tosador" },
            new() { Nome = "Dra. Ana Costa", Telefone = "(11) 99999-3333", Email = "ana@petshop.com", Especialidade = "Veterinária" }
        };
        context.Profissionais.AddRange(profissionais);
        await context.SaveChangesAsync();

        // Horários dos profissionais
        var horarios = new List<HorarioDisponivel>();
        foreach (var prof in profissionais)
        {
            // Segunda a Sexta
            for (int i = 1; i <= 5; i++)
            {
                horarios.Add(new HorarioDisponivel
                {
                    ProfissionalId = prof.Id,
                    DiaSemana = (DayOfWeek)i,
                    HoraInicio = new TimeSpan(9, 0, 0),
                    HoraFim = new TimeSpan(18, 0, 0)
                });
            }
            // Sábado
            horarios.Add(new HorarioDisponivel
            {
                ProfissionalId = prof.Id,
                DiaSemana = DayOfWeek.Saturday,
                HoraInicio = new TimeSpan(9, 0, 0),
                HoraFim = new TimeSpan(14, 0, 0)
            });
        }
        context.HorariosDisponiveis.AddRange(horarios);

        // Clientes
        var clientes = new List<Cliente>
        {
            new() { Nome = "Carlos Oliveira", Telefone = "(11) 98765-1111", Email = "carlos@email.com", Endereco = "Rua das Flores, 123", CPF = "111.222.333-44" },
            new() { Nome = "Fernanda Lima", Telefone = "(11) 98765-2222", Email = "fernanda@email.com", Endereco = "Av. Principal, 456", CPF = "222.333.444-55" },
            new() { Nome = "Roberto Souza", Telefone = "(11) 98765-3333", Email = "roberto@email.com", Endereco = "Rua do Comércio, 789", CPF = "333.444.555-66" },
            new() { Nome = "Juliana Alves", Telefone = "(11) 98765-4444", Email = "juliana@email.com", Endereco = "Praça Central, 321", CPF = "444.555.666-77" },
            new() { Nome = "Paulo Mendes", Telefone = "(11) 98765-5555", Email = "paulo@email.com", Endereco = "Rua Nova, 654", CPF = "555.666.777-88" }
        };
        context.Clientes.AddRange(clientes);
        await context.SaveChangesAsync();

        // Pets
        var pets = new List<Pet>
        {
            new() { Nome = "Rex", Especie = "Cachorro", Raca = "Labrador", Sexo = "Macho", Peso = 28.5m, Cor = "Amarelo", ClienteId = clientes[0].Id },
            new() { Nome = "Mel", Especie = "Cachorro", Raca = "Golden Retriever", Sexo = "Fêmea", Peso = 25.0m, Cor = "Dourado", ClienteId = clientes[0].Id },
            new() { Nome = "Luna", Especie = "Gato", Raca = "Siamês", Sexo = "Fêmea", Peso = 4.2m, Cor = "Creme", ClienteId = clientes[1].Id },
            new() { Nome = "Thor", Especie = "Cachorro", Raca = "Pastor Alemão", Sexo = "Macho", Peso = 32.0m, Cor = "Preto e Marrom", ClienteId = clientes[2].Id },
            new() { Nome = "Miau", Especie = "Gato", Raca = "Persa", Sexo = "Macho", Peso = 5.5m, Cor = "Branco", ClienteId = clientes[2].Id },
            new() { Nome = "Bolinha", Especie = "Cachorro", Raca = "Poodle", Sexo = "Fêmea", Peso = 8.0m, Cor = "Branco", ClienteId = clientes[3].Id },
            new() { Nome = "Bob", Especie = "Cachorro", Raca = "Bulldog", Sexo = "Macho", Peso = 22.0m, Cor = "Bege", ClienteId = clientes[4].Id },
            new() { Nome = "Princesa", Especie = "Gato", Raca = "Angorá", Sexo = "Fêmea", Peso = 3.8m, Cor = "Cinza", ClienteId = clientes[4].Id }
        };
        context.Pets.AddRange(pets);
        await context.SaveChangesAsync();

        // Alguns agendamentos de exemplo (próximos dias)
        var hoje = DateTime.Today;
        var agendamentos = new List<Agendamento>
        {
            new() 
            { 
                PetId = pets[0].Id, 
                ServicoId = servicos[2].Id, 
                ProfissionalId = profissionais[0].Id,
                DataHora = hoje.AddDays(2).AddHours(10),
                Status = "Agendado",
                NotificacaoEnviada = false
            },
            new() 
            { 
                PetId = pets[2].Id, 
                ServicoId = servicos[0].Id, 
                ProfissionalId = profissionais[1].Id,
                DataHora = hoje.AddDays(3).AddHours(14),
                Status = "Agendado",
                NotificacaoEnviada = false
            },
            new() 
            { 
                PetId = pets[3].Id, 
                ServicoId = servicos[6].Id, 
                ProfissionalId = profissionais[2].Id,
                DataHora = hoje.AddDays(1).AddHours(11),
                Status = "Confirmado",
                NotificacaoEnviada = true
            },
            new() 
            { 
                PetId = pets[5].Id, 
                ServicoId = servicos[1].Id, 
                ProfissionalId = profissionais[0].Id,
                DataHora = hoje.AddDays(4).AddHours(15),
                Status = "Agendado",
                NotificacaoEnviada = false
            },
            // Alguns agendamentos passados
            new() 
            { 
                PetId = pets[1].Id, 
                ServicoId = servicos[2].Id, 
                ProfissionalId = profissionais[0].Id,
                DataHora = hoje.AddDays(-5).AddHours(10),
                Status = "Concluido",
                NotificacaoEnviada = true
            },
            new() 
            { 
                PetId = pets[4].Id, 
                ServicoId = servicos[0].Id, 
                ProfissionalId = profissionais[1].Id,
                DataHora = hoje.AddDays(-3).AddHours(14),
                Status = "Concluido",
                NotificacaoEnviada = true
            }
        };
        context.Agendamentos.AddRange(agendamentos);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Banco de dados populado com sucesso!");
        Console.WriteLine($"  - {servicos.Count} serviços");
        Console.WriteLine($"  - {profissionais.Count} profissionais");
        Console.WriteLine($"  - {clientes.Count} clientes");
        Console.WriteLine($"  - {pets.Count} pets");
        Console.WriteLine($"  - {agendamentos.Count} agendamentos");
    }
}
