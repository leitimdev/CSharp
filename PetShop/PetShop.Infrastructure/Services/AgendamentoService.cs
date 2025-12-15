using Microsoft.EntityFrameworkCore;
using PetShop.Core.DTOs;
using PetShop.Core.Entities;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;

namespace PetShop.Infrastructure.Services;

public class AgendamentoService : IAgendamentoService
{
    private readonly PetShopDbContext _context;
    private readonly IWhatsAppService _whatsAppService;

    public AgendamentoService(PetShopDbContext context, IWhatsAppService whatsAppService)
    {
        _context = context;
        _whatsAppService = whatsAppService;
    }

    public async Task<AgendamentoDto> CriarAsync(CriarAgendamentoDto dto)
    {
        var servico = await _context.Servicos.FindAsync(dto.ServicoId);
        if (servico == null)
            throw new InvalidOperationException("Serviço não encontrado");

        var disponivel = await VerificarDisponibilidadeAsync(
            dto.DataHora, dto.ProfissionalId, servico.DuracaoMinutos);

        if (!disponivel)
            throw new InvalidOperationException("Horário não disponível");

        var agendamento = new Agendamento
        {
            DataHora = dto.DataHora,
            Observacoes = dto.Observacoes,
            PetId = dto.PetId,
            ServicoId = dto.ServicoId,
            ProfissionalId = dto.ProfissionalId,
            Status = "Agendado",
            DataCriacao = DateTime.UtcNow
        };

        _context.Agendamentos.Add(agendamento);
        await _context.SaveChangesAsync();

        // Enviar confirmação via WhatsApp
        try
        {
            await _whatsAppService.EnviarConfirmacaoAgendamentoAsync(agendamento.Id);
            agendamento.NotificacaoEnviada = true;
            await _context.SaveChangesAsync();
        }
        catch
        {
            // Log do erro, mas não falha o agendamento
        }

        return await MapearParaDtoAsync(agendamento);
    }

    public async Task<AgendamentoDto> CriarAgendamentoPublicoAsync(AgendamentoPublicoDto dto)
    {
        // Buscar ou criar cliente
        var cliente = await _context.Clientes
            .FirstOrDefaultAsync(c => c.Telefone == dto.TelefoneCliente);

        if (cliente == null)
        {
            cliente = new Cliente
            {
                Nome = dto.NomeCliente,
                Telefone = dto.TelefoneCliente,
                Email = dto.EmailCliente,
                DataCadastro = DateTime.UtcNow
            };
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
        }

        // Buscar ou criar pet
        var pet = await _context.Pets
            .FirstOrDefaultAsync(p => p.Nome == dto.NomePet && p.ClienteId == cliente.Id);

        if (pet == null)
        {
            pet = new Pet
            {
                Nome = dto.NomePet,
                Especie = dto.EspeciePet,
                ClienteId = cliente.Id
            };
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();
        }

        var servico = await _context.Servicos.FindAsync(dto.ServicoId);
        if (servico == null)
            throw new InvalidOperationException("Serviço não encontrado");

        int profissionalId = dto.ProfissionalId ?? await ObterProfissionalDisponivelAsync(
            dto.DataHora, servico.DuracaoMinutos);

        var agendamentoDto = new CriarAgendamentoDto
        {
            DataHora = dto.DataHora,
            PetId = pet.Id,
            ServicoId = dto.ServicoId,
            ProfissionalId = profissionalId
        };

        return await CriarAsync(agendamentoDto);
    }

    public async Task<AgendamentoDto?> ObterPorIdAsync(int id)
    {
        var agendamento = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Include(a => a.Servico)
            .Include(a => a.Profissional)
            .FirstOrDefaultAsync(a => a.Id == id);

        return agendamento == null ? null : await MapearParaDtoAsync(agendamento);
    }

    public async Task<List<AgendamentoDto>> ListarAsync(DateTime? dataInicio = null, DateTime? dataFim = null)
    {
        var query = _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Include(a => a.Servico)
            .Include(a => a.Profissional)
            .Where(a => a.Status != "Cancelado");

        if (dataInicio.HasValue)
            query = query.Where(a => a.DataHora >= dataInicio.Value);

        if (dataFim.HasValue)
            query = query.Where(a => a.DataHora <= dataFim.Value);

        var agendamentos = await query.OrderBy(a => a.DataHora).ToListAsync();

        var dtos = new List<AgendamentoDto>();
        foreach (var agendamento in agendamentos)
        {
            dtos.Add(await MapearParaDtoAsync(agendamento));
        }
        return dtos;
    }

    public async Task<List<AgendamentoDto>> ListarPorProfissionalAsync(int profissionalId, DateTime data)
    {
        var dataInicio = data.Date;
        var dataFim = dataInicio.AddDays(1);

        var agendamentos = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Include(a => a.Servico)
            .Include(a => a.Profissional)
            .Where(a => a.ProfissionalId == profissionalId 
                && a.DataHora >= dataInicio 
                && a.DataHora < dataFim
                && a.Status != "Cancelado")
            .OrderBy(a => a.DataHora)
            .ToListAsync();

        var dtos = new List<AgendamentoDto>();
        foreach (var agendamento in agendamentos)
        {
            dtos.Add(await MapearParaDtoAsync(agendamento));
        }
        return dtos;
    }

    public async Task<AgendamentoDto?> AtualizarAsync(int id, AtualizarAgendamentoDto dto)
    {
        var agendamento = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Include(a => a.Servico)
            .Include(a => a.Profissional)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (agendamento == null) return null;

        var servico = await _context.Servicos.FindAsync(dto.ServicoId);
        if (servico == null)
            throw new InvalidOperationException("Serviço não encontrado");

        // Verificar disponibilidade se mudou data/hora ou profissional
        if (agendamento.DataHora != dto.DataHora || agendamento.ProfissionalId != dto.ProfissionalId)
        {
            var disponivel = await VerificarDisponibilidadeInternoAsync(
                dto.DataHora, dto.ProfissionalId, servico.DuracaoMinutos, id);

            if (!disponivel)
                throw new InvalidOperationException("Horário não disponível");
        }

        agendamento.DataHora = dto.DataHora;
        agendamento.Status = dto.Status;
        agendamento.Observacoes = dto.Observacoes;
        agendamento.ServicoId = dto.ServicoId;
        agendamento.ProfissionalId = dto.ProfissionalId;

        await _context.SaveChangesAsync();
        return await MapearParaDtoAsync(agendamento);
    }

    public async Task<bool> CancelarAsync(int id)
    {
        var agendamento = await _context.Agendamentos.FindAsync(id);
        if (agendamento == null) return false;

        agendamento.Status = "Cancelado";
        await _context.SaveChangesAsync();

        try
        {
            await _whatsAppService.EnviarCancelamentoAgendamentoAsync(id);
        }
        catch
        {
            // Log do erro
        }

        return true;
    }

    public async Task<bool> ConfirmarAsync(int id)
    {
        var agendamento = await _context.Agendamentos.FindAsync(id);
        if (agendamento == null) return false;

        agendamento.Status = "Confirmado";
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> VerificarDisponibilidadeAsync(
        DateTime dataHora, int profissionalId, int duracaoMinutos)
    {
        return await VerificarDisponibilidadeInternoAsync(dataHora, profissionalId, duracaoMinutos, null);
    }

    private async Task<bool> VerificarDisponibilidadeInternoAsync(
        DateTime dataHora, int profissionalId, int duracaoMinutos, int? agendamentoIdExcluir = null)
    {
        // Verificar se o profissional existe e está ativo
        var profissional = await _context.Profissionais.FindAsync(profissionalId);
        if (profissional == null || !profissional.Ativo)
            return false;

        // Verificar se está dentro do horário disponível do profissional
        var diaSemana = dataHora.DayOfWeek;
        var hora = dataHora.TimeOfDay;
        var horaFim = hora.Add(TimeSpan.FromMinutes(duracaoMinutos));

        var horarioDisponivel = await _context.HorariosDisponiveis
            .AnyAsync(h => h.ProfissionalId == profissionalId 
                && h.DiaSemana == diaSemana
                && h.HoraInicio <= hora 
                && h.HoraFim >= horaFim);

        if (!horarioDisponivel)
            return false;

        // Verificar conflitos com outros agendamentos
        var dataHoraFim = dataHora.AddMinutes(duracaoMinutos);

        var conflito = await _context.Agendamentos
            .Include(a => a.Servico)
            .Where(a => a.ProfissionalId == profissionalId 
                && a.Status != "Cancelado"
                && (agendamentoIdExcluir == null || a.Id != agendamentoIdExcluir))
            .AnyAsync(a => 
                (a.DataHora < dataHoraFim && a.DataHora.AddMinutes(a.Servico.DuracaoMinutos) > dataHora));

        return !conflito;
    }

    public async Task<List<DateTime>> ObterHorariosDisponiveisAsync(
        int profissionalId, int servicoId, DateTime data)
    {
        var servico = await _context.Servicos.FindAsync(servicoId);
        if (servico == null)
            throw new InvalidOperationException("Serviço não encontrado");

        var diaSemana = data.DayOfWeek;
        var horariosDisponiveis = await _context.HorariosDisponiveis
            .Where(h => h.ProfissionalId == profissionalId && h.DiaSemana == diaSemana)
            .ToListAsync();

        var horarios = new List<DateTime>();

        foreach (var horarioDisponivel in horariosDisponiveis)
        {
            var horaAtual = horarioDisponivel.HoraInicio;
            while (horaAtual.Add(TimeSpan.FromMinutes(servico.DuracaoMinutos)) <= horarioDisponivel.HoraFim)
            {
                var dataHora = data.Date.Add(horaAtual);
                
                if (dataHora > DateTime.Now && 
                    await VerificarDisponibilidadeAsync(dataHora, profissionalId, servico.DuracaoMinutos))
                {
                    horarios.Add(dataHora);
                }

                horaAtual = horaAtual.Add(TimeSpan.FromMinutes(30)); // Intervalos de 30 minutos
            }
        }

        return horarios.OrderBy(h => h).ToList();
    }

    private async Task<int> ObterProfissionalDisponivelAsync(DateTime dataHora, int duracaoMinutos)
    {
        var profissionais = await _context.Profissionais
            .Where(p => p.Ativo)
            .ToListAsync();

        foreach (var profissional in profissionais)
        {
            if (await VerificarDisponibilidadeAsync(dataHora, profissional.Id, duracaoMinutos))
                return profissional.Id;
        }

        throw new InvalidOperationException("Nenhum profissional disponível para este horário");
    }

    private async Task<AgendamentoDto> MapearParaDtoAsync(Agendamento agendamento)
    {
        if (agendamento.Pet?.Cliente == null)
        {
            agendamento = await _context.Agendamentos
                .Include(a => a.Pet).ThenInclude(p => p.Cliente)
                .Include(a => a.Servico)
                .Include(a => a.Profissional)
                .FirstAsync(a => a.Id == agendamento.Id);
        }

        return new AgendamentoDto
        {
            Id = agendamento.Id,
            DataHora = agendamento.DataHora,
            Status = agendamento.Status,
            Observacoes = agendamento.Observacoes,
            PetId = agendamento.PetId,
            NomePet = agendamento.Pet.Nome,
            NomeCliente = agendamento.Pet.Cliente.Nome,
            TelefoneCliente = agendamento.Pet.Cliente.Telefone,
            ServicoId = agendamento.ServicoId,
            NomeServico = agendamento.Servico.Nome,
            PrecoServico = agendamento.Servico.Preco,
            DuracaoMinutos = agendamento.Servico.DuracaoMinutos,
            ProfissionalId = agendamento.ProfissionalId,
            NomeProfissional = agendamento.Profissional.Nome,
            DataCriacao = agendamento.DataCriacao
        };
    }
}
