namespace ImobiliariaAPI.Models
{
    public class Lead
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string ImovelInteresse { get; set; } = string.Empty;
        public string Origem { get; set; } = string.Empty;
        public string Temperatura { get; set; } = "frio"; // frio, morno, quente
        public string EtapaFunil { get; set; } = "novo"; // novo, contato, visita, proposta, negociacao, fechamento
        public string DataCriacao { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string UltimaInteracao { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string Responsavel { get; set; } = string.Empty;
    }
}
