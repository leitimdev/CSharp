namespace ImobiliariaAPI.Models
{
    public class Contrato
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Tipo { get; set; } = string.Empty; // venda, locacao
        public string ImovelId { get; set; } = string.Empty;
        public string ClienteNome { get; set; } = string.Empty;
        public string ClienteEmail { get; set; } = string.Empty;
        public string ClienteTelefone { get; set; } = string.Empty;
        public string ClienteCPF { get; set; } = string.Empty;
        public decimal ValorTotal { get; set; }
        public string DataInicio { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string? DataFim { get; set; }
        public string Status { get; set; } = "pendente"; // ativo, pendente, cancelado, concluido
    }
}
