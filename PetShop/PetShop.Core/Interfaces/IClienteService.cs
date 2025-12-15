using PetShop.Core.DTOs;

namespace PetShop.Core.Interfaces;

public interface IClienteService
{
    Task<ClienteDto> CriarAsync(CriarClienteDto dto);
    Task<ClienteDto?> ObterPorIdAsync(int id);
    Task<List<ClienteDto>> ListarAsync();
    Task<ClienteDto?> AtualizarAsync(int id, AtualizarClienteDto dto);
    Task<bool> DeletarAsync(int id);
}
