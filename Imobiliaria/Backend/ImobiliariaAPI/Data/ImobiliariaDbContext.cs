using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Data
{
    public class ImobiliariaDbContext : DbContext
    {
        public ImobiliariaDbContext(DbContextOptions<ImobiliariaDbContext> options) : base(options)
        {
        }

        public DbSet<Lead> Leads { get; set; }
        public DbSet<Imovel> Imoveis { get; set; }
        public DbSet<Contrato> Contratos { get; set; }
        public DbSet<Comissao> Comissoes { get; set; }
        public DbSet<Corretor> Corretores { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }
        public DbSet<EmailTemplate> EmailTemplates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed de dados iniciais
            modelBuilder.Entity<Lead>().HasData(
                new Lead
                {
                    Id = "1",
                    Nome = "João Silva",
                    Email = "joao@email.com",
                    Telefone = "(11) 99999-9999",
                    ImovelInteresse = "Apartamento 3 quartos",
                    Origem = "Site",
                    Temperatura = "quente",
                    EtapaFunil = "proposta",
                    DataCriacao = "2024-01-15",
                    UltimaInteracao = "2024-01-20",
                    Responsavel = "Carlos Mendes"
                },
                new Lead
                {
                    Id = "2",
                    Nome = "Maria Santos",
                    Email = "maria@email.com",
                    Telefone = "(11) 98888-8888",
                    ImovelInteresse = "Casa 4 quartos",
                    Origem = "Indicação",
                    Temperatura = "morno",
                    EtapaFunil = "visita",
                    DataCriacao = "2024-01-18",
                    UltimaInteracao = "2024-01-19",
                    Responsavel = "Ana Paula"
                }
            );

            modelBuilder.Entity<Imovel>().HasData(
                new Imovel
                {
                    Id = "1",
                    Codigo = "IMO-001",
                    Tipo = "apartamento",
                    Endereco = "Rua das Flores, 123",
                    Cidade = "São Paulo",
                    Estado = "SP",
                    ValorVenda = 450000,
                    ValorLocacao = 2500,
                    Area = 85,
                    Quartos = 3,
                    Banheiros = 2,
                    Vagas = 2,
                    Status = "disponivel",
                    Descricao = "Apartamento moderno em ótima localização"
                },
                new Imovel
                {
                    Id = "2",
                    Codigo = "IMO-002",
                    Tipo = "casa",
                    Endereco = "Av. Principal, 456",
                    Cidade = "São Paulo",
                    Estado = "SP",
                    ValorVenda = 850000,
                    ValorLocacao = 4500,
                    Area = 180,
                    Quartos = 4,
                    Banheiros = 3,
                    Vagas = 3,
                    Status = "disponivel",
                    Descricao = "Casa espaçosa com quintal"
                }
            );

            modelBuilder.Entity<Corretor>().HasData(
                new Corretor
                {
                    Id = "1",
                    Nome = "Carlos Mendes",
                    Creci = "12345-F",
                    Email = "carlos@imobiliaria.com",
                    Telefone = "(11) 97777-7777",
                    ComissaoAtual = 15000,
                    Vendas = 8
                },
                new Corretor
                {
                    Id = "2",
                    Nome = "Ana Paula",
                    Creci = "67890-F",
                    Email = "ana@imobiliaria.com",
                    Telefone = "(11) 96666-6666",
                    ComissaoAtual = 12000,
                    Vendas = 6
                }
            );

            modelBuilder.Entity<EmailTemplate>().HasData(
                new EmailTemplate
                {
                    Id = "1",
                    Nome = "Parecer de Visita",
                    Assunto = "Obrigado pela visita ao imóvel {{codigo_imovel}}",
                    Corpo = "Olá {{nome_cliente}},\n\nObrigado por visitar o imóvel {{codigo_imovel}}. Esperamos que tenha gostado!\n\nEstamos à disposição para esclarecer qualquer dúvida.",
                    Tipo = "parecer_visita",
                    Ativo = true
                },
                new EmailTemplate
                {
                    Id = "2",
                    Nome = "Confirmação de Proposta",
                    Assunto = "Sua proposta foi recebida",
                    Corpo = "Olá {{nome_cliente}},\n\nRecebemos sua proposta para o imóvel {{codigo_imovel}}.\n\nEm breve entraremos em contato.",
                    Tipo = "proposta",
                    Ativo = true
                }
            );
        }
    }
}
