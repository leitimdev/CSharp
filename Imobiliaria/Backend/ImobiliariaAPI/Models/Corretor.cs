namespace ImobiliariaAPI.Models
{
    public class Corretor
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Nome { get; set; } = string.Empty;
        public string Creci { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public decimal ComissaoAtual { get; set; }
        public int Vendas { get; set; }
    }
}
