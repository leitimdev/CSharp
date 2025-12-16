using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailTemplatesController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public EmailTemplatesController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmailTemplate>>> GetEmailTemplates()
        {
            return await _context.EmailTemplates.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmailTemplate>> GetEmailTemplate(string id)
        {
            var template = await _context.EmailTemplates.FindAsync(id);
            if (template == null)
            {
                return NotFound();
            }
            return template;
        }

        [HttpPost]
        public async Task<ActionResult<EmailTemplate>> CreateEmailTemplate(EmailTemplate template)
        {
            if (string.IsNullOrEmpty(template.Id))
            {
                template.Id = Guid.NewGuid().ToString();
            }
            
            _context.EmailTemplates.Add(template);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmailTemplate), new { id = template.Id }, template);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmailTemplate(string id, EmailTemplate template)
        {
            if (id != template.Id)
            {
                return BadRequest();
            }

            _context.Entry(template).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmailTemplateExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmailTemplate(string id)
        {
            var template = await _context.EmailTemplates.FindAsync(id);
            if (template == null)
            {
                return NotFound();
            }

            _context.EmailTemplates.Remove(template);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmailTemplateExists(string id)
        {
            return _context.EmailTemplates.Any(e => e.Id == id);
        }
    }
}
