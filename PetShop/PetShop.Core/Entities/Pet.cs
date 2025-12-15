namespace PetShop.Core.Entities;

public class Pet
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Especie { get; set; } = string.Empty; // Cachorro, Gato, etc
    public string Raca { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string Sexo { get; set; } = string.Empty; // Macho, Fêmea
    public decimal? Peso { get; set; }
    public string Cor { get; set; } = string.Empty;
    public string Observacoes { get; set; } = string.Empty;
    public bool Ativo { get; set; } = true;
    
    // Relacionamento
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; } = null!;
    public ICollection<Agendamento> Agendamentos { get; set; } = new List<Agendamento>();
}
