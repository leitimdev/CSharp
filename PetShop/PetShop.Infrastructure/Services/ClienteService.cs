using Microsoft.EntityFrameworkCore;
using PetShop.Core.DTOs;
using PetShop.Core.Entities;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;

namespace PetShop.Infrastructure.Services;

public class ClienteService : IClienteService
{
    private readonly PetShopDbContext _context;

    public ClienteService(PetShopDbContext context)
    {
        _context = context;
    }

    public async Task<ClienteDto> CriarAsync(CriarClienteDto dto)
    {
        var cliente = new Cliente
        {
            Nome = dto.Nome,
            Telefone = dto.Telefone,
            Email = dto.Email,
            Endereco = dto.Endereco,
            CPF = dto.CPF,
            DataCadastro = DateTime.UtcNow
        };

        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();

        return MapearParaDto(cliente);
    }

    public async Task<ClienteDto?> ObterPorIdAsync(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        return cliente == null ? null : MapearParaDto(cliente);
    }

    public async Task<List<ClienteDto>> ListarAsync()
    {
        return await _context.Clientes
            .Where(c => c.Ativo)
            .Select(c => MapearParaDto(c))
            .ToListAsync();
    }

    public async Task<ClienteDto?> AtualizarAsync(int id, AtualizarClienteDto dto)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if (cliente == null) return null;

        cliente.Nome = dto.Nome;
        cliente.Telefone = dto.Telefone;
        cliente.Email = dto.Email;
        cliente.Endereco = dto.Endereco;
        cliente.CPF = dto.CPF;
        cliente.Ativo = dto.Ativo;

        await _context.SaveChangesAsync();
        return MapearParaDto(cliente);
    }

    public async Task<bool> DeletarAsync(int id)
    {
        var cliente = await _context.Clientes.FindAsync(id);
        if (cliente == null) return false;

        cliente.Ativo = false;
        await _context.SaveChangesAsync();
        return true;
    }

    private static ClienteDto MapearParaDto(Cliente cliente)
    {
        return new ClienteDto
        {
            Id = cliente.Id,
            Nome = cliente.Nome,
            Telefone = cliente.Telefone,
            Email = cliente.Email,
            Endereco = cliente.Endereco,
            CPF = cliente.CPF,
            DataCadastro = cliente.DataCadastro,
            Ativo = cliente.Ativo
        };
    }
}
