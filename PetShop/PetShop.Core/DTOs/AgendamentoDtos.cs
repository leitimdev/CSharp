namespace PetShop.Core.DTOs;

public class AgendamentoDto
{
    public int Id { get; set; }
    public DateTime DataHora { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Observacoes { get; set; } = string.Empty;
    public int PetId { get; set; }
    public string NomePet { get; set; } = string.Empty;
    public string NomeCliente { get; set; } = string.Empty;
    public string TelefoneCliente { get; set; } = string.Empty;
    public int ServicoId { get; set; }
    public string NomeServico { get; set; } = string.Empty;
    public decimal PrecoServico { get; set; }
    public int DuracaoMinutos { get; set; }
    public int ProfissionalId { get; set; }
    public string NomeProfissional { get; set; } = string.Empty;
    public DateTime DataCriacao { get; set; }
}

public class CriarAgendamentoDto
{
    public DateTime DataHora { get; set; }
    public string Observacoes { get; set; } = string.Empty;
    public int PetId { get; set; }
    public int ServicoId { get; set; }
    public int ProfissionalId { get; set; }
}

public class AtualizarAgendamentoDto
{
    public DateTime DataHora { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Observacoes { get; set; } = string.Empty;
    public int ServicoId { get; set; }
    public int ProfissionalId { get; set; }
}

public class AgendamentoPublicoDto
{
    public DateTime DataHora { get; set; }
    public string NomeCliente { get; set; } = string.Empty;
    public string TelefoneCliente { get; set; } = string.Empty;
    public string EmailCliente { get; set; } = string.Empty;
    public string NomePet { get; set; } = string.Empty;
    public string EspeciePet { get; set; } = string.Empty;
    public int ServicoId { get; set; }
    public int? ProfissionalId { get; set; }
}
