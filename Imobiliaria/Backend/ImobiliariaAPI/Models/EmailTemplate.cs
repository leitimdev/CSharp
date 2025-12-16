namespace ImobiliariaAPI.Models
{
    public class EmailTemplate
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Nome { get; set; } = string.Empty;
        public string Assunto { get; set; } = string.Empty;
        public string Corpo { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty; // parecer_visita, proposta, followup, contrato
        public bool Ativo { get; set; } = true;
    }
}
