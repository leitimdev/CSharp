namespace ImobiliariaAPI.Models
{
    public class Imovel
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Codigo { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty; // apartamento, casa, terreno, comercial
        public string Endereco { get; set; } = string.Empty;
        public string Cidade { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
        public decimal ValorVenda { get; set; }
        public decimal? ValorLocacao { get; set; }
        public int Area { get; set; }
        public int Quartos { get; set; }
        public int Banheiros { get; set; }
        public int Vagas { get; set; }
        public string Status { get; set; } = "disponivel"; // disponivel, reservado, vendido, alugado
        public string Descricao { get; set; } = string.Empty;
    }
}
