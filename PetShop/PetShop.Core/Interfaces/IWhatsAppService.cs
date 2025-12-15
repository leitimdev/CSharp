namespace PetShop.Core.Interfaces;

public interface IWhatsAppService
{
    Task EnviarConfirmacaoAgendamentoAsync(int agendamentoId);
    Task EnviarLembreteAgendamentoAsync(int agendamentoId);
    Task EnviarCancelamentoAgendamentoAsync(int agendamentoId);
    Task ProcessarLembretesAutomaticosAsync();
}
