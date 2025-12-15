using PetShop.Core.DTOs;

namespace PetShop.Core.Interfaces;

public interface IServicoService
{
    Task<ServicoDto> CriarAsync(CriarServicoDto dto);
    Task<ServicoDto?> ObterPorIdAsync(int id);
    Task<List<ServicoDto>> ListarAsync();
    Task<ServicoDto?> AtualizarAsync(int id, AtualizarServicoDto dto);
    Task<bool> DeletarAsync(int id);
}
