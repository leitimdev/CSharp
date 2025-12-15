using PetShop.Core.DTOs;

namespace PetShop.Core.Interfaces;

public interface IPetService
{
    Task<PetDto> CriarAsync(CriarPetDto dto);
    Task<PetDto?> ObterPorIdAsync(int id);
    Task<List<PetDto>> ListarAsync();
    Task<List<PetDto>> ListarPorClienteAsync(int clienteId);
    Task<PetDto?> AtualizarAsync(int id, AtualizarPetDto dto);
    Task<bool> DeletarAsync(int id);
}
