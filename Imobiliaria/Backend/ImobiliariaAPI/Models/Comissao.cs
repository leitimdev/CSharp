namespace ImobiliariaAPI.Models
{
    public class Comissao
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string CorretorNome { get; set; } = string.Empty;
        public string ContratoId { get; set; } = string.Empty;
        public decimal ValorVenda { get; set; }
        public decimal Percentual { get; set; }
        public decimal ValorComissao { get; set; }
        public string Status { get; set; } = "pendente"; // pendente, pago
        public string DataVenda { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string? DataPagamento { get; set; }
    }
}
