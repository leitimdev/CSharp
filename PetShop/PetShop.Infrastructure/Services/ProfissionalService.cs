using Microsoft.EntityFrameworkCore;
using PetShop.Core.DTOs;
using PetShop.Core.Entities;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;

namespace PetShop.Infrastructure.Services;

public class ProfissionalService : IProfissionalService
{
    private readonly PetShopDbContext _context;

    public ProfissionalService(PetShopDbContext context)
    {
        _context = context;
    }

    public async Task<ProfissionalDto> CriarAsync(CriarProfissionalDto dto)
    {
        var profissional = new Profissional
        {
            Nome = dto.Nome,
            Telefone = dto.Telefone,
            Email = dto.Email,
            Especialidade = dto.Especialidade
        };

        _context.Profissionais.Add(profissional);
        await _context.SaveChangesAsync();

        return MapearParaDto(profissional);
    }

    public async Task<ProfissionalDto?> ObterPorIdAsync(int id)
    {
        var profissional = await _context.Profissionais.FindAsync(id);
        return profissional == null ? null : MapearParaDto(profissional);
    }

    public async Task<List<ProfissionalDto>> ListarAsync()
    {
        return await _context.Profissionais
            .Where(p => p.Ativo)
            .Select(p => MapearParaDto(p))
            .ToListAsync();
    }

    public async Task<ProfissionalDto?> AtualizarAsync(int id, AtualizarProfissionalDto dto)
    {
        var profissional = await _context.Profissionais.FindAsync(id);
        if (profissional == null) return null;

        profissional.Nome = dto.Nome;
        profissional.Telefone = dto.Telefone;
        profissional.Email = dto.Email;
        profissional.Especialidade = dto.Especialidade;
        profissional.Ativo = dto.Ativo;

        await _context.SaveChangesAsync();
        return MapearParaDto(profissional);
    }

    public async Task<bool> DeletarAsync(int id)
    {
        var profissional = await _context.Profissionais.FindAsync(id);
        if (profissional == null) return false;

        profissional.Ativo = false;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<HorarioDisponivelDto> AdicionarHorarioAsync(CriarHorarioDisponivelDto dto)
    {
        var horario = new HorarioDisponivel
        {
            ProfissionalId = dto.ProfissionalId,
            DiaSemana = dto.DiaSemana,
            HoraInicio = dto.HoraInicio,
            HoraFim = dto.HoraFim
        };

        _context.HorariosDisponiveis.Add(horario);
        await _context.SaveChangesAsync();

        return MapearHorarioParaDto(horario);
    }

    public async Task<List<HorarioDisponivelDto>> ObterHorariosPorProfissionalAsync(int profissionalId)
    {
        return await _context.HorariosDisponiveis
            .Where(h => h.ProfissionalId == profissionalId)
            .Select(h => MapearHorarioParaDto(h))
            .ToListAsync();
    }

    public async Task<bool> RemoverHorarioAsync(int horarioId)
    {
        var horario = await _context.HorariosDisponiveis.FindAsync(horarioId);
        if (horario == null) return false;

        _context.HorariosDisponiveis.Remove(horario);
        await _context.SaveChangesAsync();
        return true;
    }

    private static ProfissionalDto MapearParaDto(Profissional profissional)
    {
        return new ProfissionalDto
        {
            Id = profissional.Id,
            Nome = profissional.Nome,
            Telefone = profissional.Telefone,
            Email = profissional.Email,
            Especialidade = profissional.Especialidade,
            Ativo = profissional.Ativo
        };
    }

    private static HorarioDisponivelDto MapearHorarioParaDto(HorarioDisponivel horario)
    {
        return new HorarioDisponivelDto
        {
            Id = horario.Id,
            ProfissionalId = horario.ProfissionalId,
            DiaSemana = horario.DiaSemana,
            HoraInicio = horario.HoraInicio,
            HoraFim = horario.HoraFim
        };
    }
}
