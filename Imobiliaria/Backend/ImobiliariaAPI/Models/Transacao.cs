namespace ImobiliariaAPI.Models
{
    public class Transacao
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Tipo { get; set; } = string.Empty; // receita, despesa
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public string Data { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string Categoria { get; set; } = string.Empty;
        public string MetodoPagamento { get; set; } = string.Empty;
        public string Status { get; set; } = "pendente"; // pendente, concluido, cancelado
    }
}
