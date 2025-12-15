using PetShop.Core.DTOs;

namespace PetShop.Core.Interfaces;

public interface IAgendamentoService
{
    Task<AgendamentoDto> CriarAsync(CriarAgendamentoDto dto);
    Task<AgendamentoDto> CriarAgendamentoPublicoAsync(AgendamentoPublicoDto dto);
    Task<AgendamentoDto?> ObterPorIdAsync(int id);
    Task<List<AgendamentoDto>> ListarAsync(DateTime? dataInicio = null, DateTime? dataFim = null);
    Task<List<AgendamentoDto>> ListarPorProfissionalAsync(int profissionalId, DateTime data);
    Task<AgendamentoDto?> AtualizarAsync(int id, AtualizarAgendamentoDto dto);
    Task<bool> CancelarAsync(int id);
    Task<bool> ConfirmarAsync(int id);
    Task<bool> VerificarDisponibilidadeAsync(DateTime dataHora, int profissionalId, int duracaoMinutos);
    Task<List<DateTime>> ObterHorariosDisponiveisAsync(int profissionalId, int servicoId, DateTime data);
}
