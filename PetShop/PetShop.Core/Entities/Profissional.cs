namespace PetShop.Core.Entities;

public class Profissional
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Especialidade { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
    
    // Relacionamento
    public ICollection<Agendamento> Agendamentos { get; set; } = new List<Agendamento>();
    public ICollection<HorarioDisponivel> HorariosDisponiveis { get; set; } = new List<HorarioDisponivel>();
}
