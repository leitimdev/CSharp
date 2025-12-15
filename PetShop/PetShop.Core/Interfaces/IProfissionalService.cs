using PetShop.Core.DTOs;

namespace PetShop.Core.Interfaces;

public interface IProfissionalService
{
    Task<ProfissionalDto> CriarAsync(CriarProfissionalDto dto);
    Task<ProfissionalDto?> ObterPorIdAsync(int id);
    Task<List<ProfissionalDto>> ListarAsync();
    Task<ProfissionalDto?> AtualizarAsync(int id, AtualizarProfissionalDto dto);
    Task<bool> DeletarAsync(int id);
    Task<HorarioDisponivelDto> AdicionarHorarioAsync(CriarHorarioDisponivelDto dto);
    Task<List<HorarioDisponivelDto>> ObterHorariosPorProfissionalAsync(int profissionalId);
    Task<bool> RemoverHorarioAsync(int horarioId);
}
