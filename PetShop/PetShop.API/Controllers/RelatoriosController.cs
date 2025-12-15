using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetShop.Infrastructure.Data;

namespace PetShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class RelatoriosController : ControllerBase
{
    private readonly PetShopDbContext _context;

    public RelatoriosController(PetShopDbContext context)
    {
        _context = context;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult> GetDashboard(
        [FromQuery] DateTime? dataInicio = null,
        [FromQuery] DateTime? dataFim = null)
    {
        dataInicio ??= DateTime.Today.AddMonths(-1);
        dataFim ??= DateTime.Today.AddDays(1);

        var agendamentos = await _context.Agendamentos
            .Include(a => a.Servico)
            .Where(a => a.DataHora >= dataInicio && a.DataHora <= dataFim)
            .ToListAsync();

        var totalAgendamentos = agendamentos.Count;
        var agendamentosConcluidos = agendamentos.Count(a => a.Status == "Concluido");
        var agendamentosCancelados = agendamentos.Count(a => a.Status == "Cancelado");
        var agendamentosPendentes = agendamentos.Count(a => a.Status == "Agendado" || a.Status == "Confirmado");

        var faturamentoTotal = agendamentos
            .Where(a => a.Status == "Concluido")
            .Sum(a => a.Servico.Preco);

        var faturamentoEstimado = agendamentos
            .Where(a => a.Status != "Cancelado")
            .Sum(a => a.Servico.Preco);

        var servicosMaisUtilizados = agendamentos
            .GroupBy(a => new { a.ServicoId, a.Servico.Nome })
            .Select(g => new
            {
                ServicoId = g.Key.ServicoId,
                NomeServico = g.Key.Nome,
                Quantidade = g.Count(),
                Faturamento = g.Sum(a => a.Servico.Preco)
            })
            .OrderByDescending(s => s.Quantidade)
            .Take(10)
            .ToList();

        var profissionaisMaisOcupados = agendamentos
            .Where(a => a.Status != "Cancelado")
            .GroupBy(a => new { a.ProfissionalId, a.Profissional.Nome })
            .Select(g => new
            {
                ProfissionalId = g.Key.ProfissionalId,
                NomeProfissional = g.Key.Nome,
                Quantidade = g.Count()
            })
            .OrderByDescending(p => p.Quantidade)
            .Take(10)
            .ToList();

        return Ok(new
        {
            Periodo = new { DataInicio = dataInicio, DataFim = dataFim },
            Totais = new
            {
                TotalAgendamentos = totalAgendamentos,
                AgendamentosConcluidos = agendamentosConcluidos,
                AgendamentosCancelados = agendamentosCancelados,
                AgendamentosPendentes = agendamentosPendentes
            },
            Financeiro = new
            {
                FaturamentoTotal = faturamentoTotal,
                FaturamentoEstimado = faturamentoEstimado
            },
            ServicosMaisUtilizados = servicosMaisUtilizados,
            ProfissionaisMaisOcupados = profissionaisMaisOcupados
        });
    }

    [HttpGet("agendamentos-por-dia")]
    public async Task<ActionResult> GetAgendamentosPorDia(
        [FromQuery] DateTime? dataInicio = null,
        [FromQuery] DateTime? dataFim = null)
    {
        dataInicio ??= DateTime.Today.AddMonths(-1);
        dataFim ??= DateTime.Today.AddDays(1);

        var agendamentosPorDia = await _context.Agendamentos
            .Where(a => a.DataHora >= dataInicio && a.DataHora <= dataFim)
            .GroupBy(a => a.DataHora.Date)
            .Select(g => new
            {
                Data = g.Key,
                Total = g.Count(),
                Concluidos = g.Count(a => a.Status == "Concluido"),
                Cancelados = g.Count(a => a.Status == "Cancelado")
            })
            .OrderBy(d => d.Data)
            .ToListAsync();

        return Ok(agendamentosPorDia);
    }

    [HttpGet("faturamento-por-servico")]
    public async Task<ActionResult> GetFaturamentoPorServico(
        [FromQuery] DateTime? dataInicio = null,
        [FromQuery] DateTime? dataFim = null)
    {
        dataInicio ??= DateTime.Today.AddMonths(-1);
        dataFim ??= DateTime.Today.AddDays(1);

        var faturamento = await _context.Agendamentos
            .Include(a => a.Servico)
            .Where(a => a.DataHora >= dataInicio 
                && a.DataHora <= dataFim 
                && a.Status == "Concluido")
            .GroupBy(a => new { a.ServicoId, a.Servico.Nome, a.Servico.Preco })
            .Select(g => new
            {
                ServicoId = g.Key.ServicoId,
                NomeServico = g.Key.Nome,
                Quantidade = g.Count(),
                PrecoUnitario = g.Key.Preco,
                FaturamentoTotal = g.Sum(a => a.Servico.Preco)
            })
            .OrderByDescending(s => s.FaturamentoTotal)
            .ToListAsync();

        return Ok(faturamento);
    }

    [HttpGet("clientes-frequentes")]
    public async Task<ActionResult> GetClientesFrequentes(
        [FromQuery] DateTime? dataInicio = null,
        [FromQuery] DateTime? dataFim = null,
        [FromQuery] int top = 20)
    {
        dataInicio ??= DateTime.Today.AddMonths(-3);
        dataFim ??= DateTime.Today.AddDays(1);

        var clientesFrequentes = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Where(a => a.DataHora >= dataInicio 
                && a.DataHora <= dataFim 
                && a.Status != "Cancelado")
            .GroupBy(a => new 
            { 
                ClienteId = a.Pet.ClienteId, 
                NomeCliente = a.Pet.Cliente.Nome,
                TelefoneCliente = a.Pet.Cliente.Telefone
            })
            .Select(g => new
            {
                ClienteId = g.Key.ClienteId,
                NomeCliente = g.Key.NomeCliente,
                Telefone = g.Key.TelefoneCliente,
                TotalAgendamentos = g.Count(),
                UltimoAgendamento = g.Max(a => a.DataHora)
            })
            .OrderByDescending(c => c.TotalAgendamentos)
            .Take(top)
            .ToListAsync();

        return Ok(clientesFrequentes);
    }
}
