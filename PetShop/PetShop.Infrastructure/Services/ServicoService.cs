using Microsoft.EntityFrameworkCore;
using PetShop.Core.DTOs;
using PetShop.Core.Entities;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;

namespace PetShop.Infrastructure.Services;

public class ServicoService : IServicoService
{
    private readonly PetShopDbContext _context;

    public ServicoService(PetShopDbContext context)
    {
        _context = context;
    }

    public async Task<ServicoDto> CriarAsync(CriarServicoDto dto)
    {
        var servico = new Servico
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Preco = dto.Preco,
            DuracaoMinutos = dto.DuracaoMinutos
        };

        _context.Servicos.Add(servico);
        await _context.SaveChangesAsync();

        return MapearParaDto(servico);
    }

    public async Task<ServicoDto?> ObterPorIdAsync(int id)
    {
        var servico = await _context.Servicos.FindAsync(id);
        return servico == null ? null : MapearParaDto(servico);
    }

    public async Task<List<ServicoDto>> ListarAsync()
    {
        return await _context.Servicos
            .Where(s => s.Ativo)
            .Select(s => MapearParaDto(s))
            .ToListAsync();
    }

    public async Task<ServicoDto?> AtualizarAsync(int id, AtualizarServicoDto dto)
    {
        var servico = await _context.Servicos.FindAsync(id);
        if (servico == null) return null;

        servico.Nome = dto.Nome;
        servico.Descricao = dto.Descricao;
        servico.Preco = dto.Preco;
        servico.DuracaoMinutos = dto.DuracaoMinutos;
        servico.Ativo = dto.Ativo;

        await _context.SaveChangesAsync();
        return MapearParaDto(servico);
    }

    public async Task<bool> DeletarAsync(int id)
    {
        var servico = await _context.Servicos.FindAsync(id);
        if (servico == null) return false;

        servico.Ativo = false;
        await _context.SaveChangesAsync();
        return true;
    }

    private static ServicoDto MapearParaDto(Servico servico)
    {
        return new ServicoDto
        {
            Id = servico.Id,
            Nome = servico.Nome,
            Descricao = servico.Descricao,
            Preco = servico.Preco,
            DuracaoMinutos = servico.DuracaoMinutos,
            Ativo = servico.Ativo
        };
    }
}
