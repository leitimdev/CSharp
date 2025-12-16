using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public LeadsController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeads()
        {
            return await _context.Leads.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> GetLead(string id)
        {
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }
            return lead;
        }

        [HttpPost]
        public async Task<ActionResult<Lead>> CreateLead(Lead lead)
        {
            if (string.IsNullOrEmpty(lead.Id))
            {
                lead.Id = Guid.NewGuid().ToString();
            }
            
            _context.Leads.Add(lead);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLead), new { id = lead.Id }, lead);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLead(string id, Lead lead)
        {
            if (id != lead.Id)
            {
                return BadRequest();
            }

            _context.Entry(lead).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeadExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(string id)
        {
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            _context.Leads.Remove(lead);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("funil")]
        public async Task<ActionResult<object>> GetFunnelData()
        {
            var leads = await _context.Leads.ToListAsync();
            
            var funnelData = new[]
            {
                new { etapa = "Novo", quantidade = leads.Count(l => l.EtapaFunil == "novo") },
                new { etapa = "Contato", quantidade = leads.Count(l => l.EtapaFunil == "contato") },
                new { etapa = "Visita", quantidade = leads.Count(l => l.EtapaFunil == "visita") },
                new { etapa = "Proposta", quantidade = leads.Count(l => l.EtapaFunil == "proposta") },
                new { etapa = "Negociação", quantidade = leads.Count(l => l.EtapaFunil == "negociacao") },
                new { etapa = "Fechamento", quantidade = leads.Count(l => l.EtapaFunil == "fechamento") }
            };

            return Ok(funnelData);
        }

        [HttpGet("temperatura")]
        public async Task<ActionResult<object>> GetTemperatureData()
        {
            var leads = await _context.Leads.ToListAsync();
            
            var temperatureData = new
            {
                frio = leads.Count(l => l.Temperatura == "frio"),
                morno = leads.Count(l => l.Temperatura == "morno"),
                quente = leads.Count(l => l.Temperatura == "quente")
            };

            return Ok(temperatureData);
        }

        private bool LeadExists(string id)
        {
            return _context.Leads.Any(e => e.Id == id);
        }
    }
}
