namespace PetShop.Core.Entities;

public class Agendamento
{
    public int Id { get; set; }
    public DateTime DataHora { get; set; }
    public string Status { get; set; } = "Agendado"; // Agendado, Confirmado, EmAndamento, Concluido, Cancelado
    public string Observacoes { get; set; } = string.Empty;
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
    public bool NotificacaoEnviada { get; set; } = false;
    public bool LembreteEnviado { get; set; } = false;
    
    // Relacionamentos
    public int PetId { get; set; }
    public Pet Pet { get; set; } = null!;
    
    public int ServicoId { get; set; }
    public Servico Servico { get; set; } = null!;
    
    public int ProfissionalId { get; set; }
    public Profissional Profissional { get; set; } = null!;
}
