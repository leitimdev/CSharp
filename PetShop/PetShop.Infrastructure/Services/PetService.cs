using Microsoft.EntityFrameworkCore;
using PetShop.Core.DTOs;
using PetShop.Core.Entities;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;

namespace PetShop.Infrastructure.Services;

public class PetService : IPetService
{
    private readonly PetShopDbContext _context;

    public PetService(PetShopDbContext context)
    {
        _context = context;
    }

    public async Task<PetDto> CriarAsync(CriarPetDto dto)
    {
        var pet = new Pet
        {
            Nome = dto.Nome,
            Especie = dto.Especie,
            Raca = dto.Raca,
            DataNascimento = dto.DataNascimento,
            Sexo = dto.Sexo,
            Peso = dto.Peso,
            Cor = dto.Cor,
            Observacoes = dto.Observacoes,
            ClienteId = dto.ClienteId
        };

        _context.Pets.Add(pet);
        await _context.SaveChangesAsync();

        return await MapearParaDtoAsync(pet);
    }

    public async Task<PetDto?> ObterPorIdAsync(int id)
    {
        var pet = await _context.Pets
            .Include(p => p.Cliente)
            .FirstOrDefaultAsync(p => p.Id == id);

        return pet == null ? null : await MapearParaDtoAsync(pet);
    }

    public async Task<List<PetDto>> ListarAsync()
    {
        var pets = await _context.Pets
            .Include(p => p.Cliente)
            .Where(p => p.Ativo)
            .ToListAsync();

        var dtos = new List<PetDto>();
        foreach (var pet in pets)
        {
            dtos.Add(await MapearParaDtoAsync(pet));
        }
        return dtos;
    }

    public async Task<List<PetDto>> ListarPorClienteAsync(int clienteId)
    {
        var pets = await _context.Pets
            .Include(p => p.Cliente)
            .Where(p => p.ClienteId == clienteId && p.Ativo)
            .ToListAsync();

        var dtos = new List<PetDto>();
        foreach (var pet in pets)
        {
            dtos.Add(await MapearParaDtoAsync(pet));
        }
        return dtos;
    }

    public async Task<PetDto?> AtualizarAsync(int id, AtualizarPetDto dto)
    {
        var pet = await _context.Pets
            .Include(p => p.Cliente)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pet == null) return null;

        pet.Nome = dto.Nome;
        pet.Especie = dto.Especie;
        pet.Raca = dto.Raca;
        pet.DataNascimento = dto.DataNascimento;
        pet.Sexo = dto.Sexo;
        pet.Peso = dto.Peso;
        pet.Cor = dto.Cor;
        pet.Observacoes = dto.Observacoes;
        pet.Ativo = dto.Ativo;

        await _context.SaveChangesAsync();
        return await MapearParaDtoAsync(pet);
    }

    public async Task<bool> DeletarAsync(int id)
    {
        var pet = await _context.Pets.FindAsync(id);
        if (pet == null) return false;

        pet.Ativo = false;
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<PetDto> MapearParaDtoAsync(Pet pet)
    {
        if (pet.Cliente == null)
        {
            var cliente = await _context.Clientes.FindAsync(pet.ClienteId);
            pet.Cliente = cliente!;
        }

        return new PetDto
        {
            Id = pet.Id,
            Nome = pet.Nome,
            Especie = pet.Especie,
            Raca = pet.Raca,
            DataNascimento = pet.DataNascimento,
            Sexo = pet.Sexo,
            Peso = pet.Peso,
            Cor = pet.Cor,
            Observacoes = pet.Observacoes,
            ClienteId = pet.ClienteId,
            NomeCliente = pet.Cliente?.Nome ?? "",
            Ativo = pet.Ativo
        };
    }
}
