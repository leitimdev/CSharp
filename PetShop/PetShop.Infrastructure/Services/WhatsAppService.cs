using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;

namespace PetShop.Infrastructure.Services;

public class WhatsAppService : IWhatsAppService
{
    private readonly PetShopDbContext _context;
    private readonly IConfiguration _configuration;

    public WhatsAppService(PetShopDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task EnviarConfirmacaoAgendamentoAsync(int agendamentoId)
    {
        var agendamento = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Include(a => a.Servico)
            .Include(a => a.Profissional)
            .FirstOrDefaultAsync(a => a.Id == agendamentoId);

        if (agendamento == null) return;

        var mensagem = $@"🐾 *Agendamento Confirmado - PetShop*

Olá *{agendamento.Pet.Cliente.Nome}*!

Seu agendamento foi confirmado com sucesso:

📅 Data: {agendamento.DataHora:dd/MM/yyyy}
🕐 Horário: {agendamento.DataHora:HH:mm}
🐕 Pet: {agendamento.Pet.Nome}
✂️ Serviço: {agendamento.Servico.Nome}
👤 Profissional: {agendamento.Profissional.Nome}
💰 Valor: R$ {agendamento.Servico.Preco:F2}

Por favor, chegue com 10 minutos de antecedência.

Em caso de dúvidas, entre em contato conosco!";

        await EnviarMensagemWhatsAppAsync(agendamento.Pet.Cliente.Telefone, mensagem);
    }

    public async Task EnviarLembreteAgendamentoAsync(int agendamentoId)
    {
        var agendamento = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Include(a => a.Servico)
            .FirstOrDefaultAsync(a => a.Id == agendamentoId);

        if (agendamento == null) return;

        var mensagem = $@"🔔 *Lembrete de Agendamento - PetShop*

Olá *{agendamento.Pet.Cliente.Nome}*!

Lembramos que você tem um agendamento amanhã:

📅 Data: {agendamento.DataHora:dd/MM/yyyy}
🕐 Horário: {agendamento.DataHora:HH:mm}
🐕 Pet: {agendamento.Pet.Nome}
✂️ Serviço: {agendamento.Servico.Nome}

Nos vemos lá! 🐾";

        await EnviarMensagemWhatsAppAsync(agendamento.Pet.Cliente.Telefone, mensagem);

        agendamento.LembreteEnviado = true;
        await _context.SaveChangesAsync();
    }

    public async Task EnviarCancelamentoAgendamentoAsync(int agendamentoId)
    {
        var agendamento = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Include(a => a.Servico)
            .FirstOrDefaultAsync(a => a.Id == agendamentoId);

        if (agendamento == null) return;

        var mensagem = $@"❌ *Agendamento Cancelado - PetShop*

Olá *{agendamento.Pet.Cliente.Nome}*!

Seu agendamento foi cancelado:

📅 Data: {agendamento.DataHora:dd/MM/yyyy}
🕐 Horário: {agendamento.DataHora:HH:mm}
🐕 Pet: {agendamento.Pet.Nome}
✂️ Serviço: {agendamento.Servico.Nome}

Se desejar reagendar, entre em contato conosco!";

        await EnviarMensagemWhatsAppAsync(agendamento.Pet.Cliente.Telefone, mensagem);
    }

    public async Task ProcessarLembretesAutomaticosAsync()
    {
        // Buscar agendamentos para amanhã que ainda não receberam lembrete
        var amanha = DateTime.Today.AddDays(1);
        var amanhaFim = amanha.AddDays(1);

        var agendamentos = await _context.Agendamentos
            .Include(a => a.Pet).ThenInclude(p => p.Cliente)
            .Where(a => a.DataHora >= amanha 
                && a.DataHora < amanhaFim
                && !a.LembreteEnviado
                && a.Status != "Cancelado")
            .ToListAsync();

        foreach (var agendamento in agendamentos)
        {
            try
            {
                await EnviarLembreteAgendamentoAsync(agendamento.Id);
            }
            catch (Exception)
            {
                // Log do erro, mas continua processando os demais
            }
        }
    }

    private async Task EnviarMensagemWhatsAppAsync(string telefone, string mensagem)
    {
        // Implementação real dependerá da API escolhida (Twilio, WhatsApp Cloud API, etc.)
        
        var whatsappApiKey = _configuration["WhatsApp:ApiKey"];
        var whatsappApiUrl = _configuration["WhatsApp:ApiUrl"];

        if (string.IsNullOrEmpty(whatsappApiKey) || string.IsNullOrEmpty(whatsappApiUrl))
        {
            // Modo desenvolvimento - apenas loga a mensagem
            Console.WriteLine($"[WhatsApp Mock] Para: {telefone}");
            Console.WriteLine($"[WhatsApp Mock] Mensagem: {mensagem}");
            Console.WriteLine("---");
            return;
        }

        // Exemplo de implementação com Twilio:
        /*
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, whatsappApiUrl);
        request.Headers.Add("Authorization", $"Bearer {whatsappApiKey}");
        
        var content = new StringContent(JsonSerializer.Serialize(new
        {
            to = $"whatsapp:{telefone}",
            body = mensagem
        }), Encoding.UTF8, "application/json");
        
        request.Content = content;
        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        */

        // Exemplo com WhatsApp Cloud API:
        /*
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, 
            $"{whatsappApiUrl}/messages");
        request.Headers.Add("Authorization", $"Bearer {whatsappApiKey}");
        
        var content = new StringContent(JsonSerializer.Serialize(new
        {
            messaging_product = "whatsapp",
            to = telefone.Replace("+", "").Replace("-", "").Replace(" ", ""),
            type = "text",
            text = new { body = mensagem }
        }), Encoding.UTF8, "application/json");
        
        request.Content = content;
        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        */

        await Task.CompletedTask;
    }
}
