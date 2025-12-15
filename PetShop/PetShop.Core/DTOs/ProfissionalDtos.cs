namespace PetShop.Core.DTOs;

public class ProfissionalDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Especialidade { get; set; } = string.Empty;
    public bool Ativo { get; set; }
}

public class CriarProfissionalDto
{
    public string Nome { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Especialidade { get; set; } = string.Empty;
}

public class AtualizarProfissionalDto
{
    public string Nome { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Especialidade { get; set; } = string.Empty;
    public bool Ativo { get; set; }
}

public class HorarioDisponivelDto
{
    public int Id { get; set; }
    public int ProfissionalId { get; set; }
    public DayOfWeek DiaSemana { get; set; }
    public TimeSpan HoraInicio { get; set; }
    public TimeSpan HoraFim { get; set; }
}

public class CriarHorarioDisponivelDto
{
    public int ProfissionalId { get; set; }
    public DayOfWeek DiaSemana { get; set; }
    public TimeSpan HoraInicio { get; set; }
    public TimeSpan HoraFim { get; set; }
}
