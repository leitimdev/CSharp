namespace PetShop.Core.Entities;

public class HorarioDisponivel
{
    public int Id { get; set; }
    public int ProfissionalId { get; set; }
    public DayOfWeek DiaSemana { get; set; }
    public TimeSpan HoraInicio { get; set; }
    public TimeSpan HoraFim { get; set; }
    
    // Relacionamento
    public Profissional Profissional { get; set; } = null!;
}
