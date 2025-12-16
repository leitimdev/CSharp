using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public DashboardController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStats()
        {
            var leads = await _context.Leads.ToListAsync();
            var contratos = await _context.Contratos.ToListAsync();
            var transacoes = await _context.Transacoes.ToListAsync();
            var comissoes = await _context.Comissoes.ToListAsync();

            var receitas = transacoes.Where(t => t.Tipo == "receita" && t.Status == "concluido").Sum(t => t.Valor);
            var comissoesPendentes = comissoes.Where(c => c.Status == "pendente").Sum(c => c.ValorComissao);

            var stats = new
            {
                leadsNovos = leads.Count,
                visitasAgendadas = leads.Count(l => l.EtapaFunil == "visita"),
                propostasAbertas = leads.Count(l => l.EtapaFunil == "proposta"),
                contratosAtivos = contratos.Count(c => c.Status == "ativo"),
                faturamentoMes = receitas,
                comissoesPendentes = comissoesPendentes
            };

            return Ok(stats);
        }

        [HttpGet("funil")]
        public async Task<ActionResult<object>> GetFunnelData()
        {
            var leads = await _context.Leads.ToListAsync();
            
            var funnelData = new[]
            {
                new { etapa = "Leads", quantidade = leads.Count, valor = 0 },
                new { etapa = "Contato", quantidade = leads.Count(l => l.EtapaFunil == "contato"), valor = 0 },
                new { etapa = "Visita", quantidade = leads.Count(l => l.EtapaFunil == "visita"), valor = 0 },
                new { etapa = "Proposta", quantidade = leads.Count(l => l.EtapaFunil == "proposta"), valor = 12600000 },
                new { etapa = "Negociação", quantidade = leads.Count(l => l.EtapaFunil == "negociacao"), valor = 8100000 },
                new { etapa = "Fechamento", quantidade = leads.Count(l => l.EtapaFunil == "fechamento"), valor = 5400000 }
            };

            return Ok(funnelData);
        }

        [HttpGet("vendas")]
        public async Task<ActionResult<object>> GetSalesData()
        {
            // Simulando dados de vendas mensais
            var salesData = new[]
            {
                new { mes = "Jan", vendas = 8, receita = 3600000 },
                new { mes = "Fev", vendas = 12, receita = 5400000 },
                new { mes = "Mar", vendas = 15, receita = 6750000 },
                new { mes = "Abr", vendas = 10, receita = 4500000 },
                new { mes = "Mai", vendas = 18, receita = 8100000 },
                new { mes = "Jun", vendas = 22, receita = 9900000 }
            };

            return Ok(salesData);
        }
    }
}
