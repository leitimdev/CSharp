namespace PetShop.Core.DTOs;

public class PetDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Especie { get; set; } = string.Empty;
    public string Raca { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string Sexo { get; set; } = string.Empty;
    public decimal? Peso { get; set; }
    public string Cor { get; set; } = string.Empty;
    public string Observacoes { get; set; } = string.Empty;
    public int ClienteId { get; set; }
    public string NomeCliente { get; set; } = string.Empty;
    public bool Ativo { get; set; }
}

public class CriarPetDto
{
    public string Nome { get; set; } = string.Empty;
    public string Especie { get; set; } = string.Empty;
    public string Raca { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string Sexo { get; set; } = string.Empty;
    public decimal? Peso { get; set; }
    public string Cor { get; set; } = string.Empty;
    public string Observacoes { get; set; } = string.Empty;
    public int ClienteId { get; set; }
}

public class AtualizarPetDto
{
    public string Nome { get; set; } = string.Empty;
    public string Especie { get; set; } = string.Empty;
    public string Raca { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string Sexo { get; set; } = string.Empty;
    public decimal? Peso { get; set; }
    public string Cor { get; set; } = string.Empty;
    public string Observacoes { get; set; } = string.Empty;
    public bool Ativo { get; set; }
}
