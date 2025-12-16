using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContratosController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public ContratosController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contrato>>> GetContratos()
        {
            return await _context.Contratos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contrato>> GetContrato(string id)
        {
            var contrato = await _context.Contratos.FindAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }
            return contrato;
        }

        [HttpPost]
        public async Task<ActionResult<Contrato>> CreateContrato(Contrato contrato)
        {
            if (string.IsNullOrEmpty(contrato.Id))
            {
                contrato.Id = Guid.NewGuid().ToString();
            }
            
            _context.Contratos.Add(contrato);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContrato), new { id = contrato.Id }, contrato);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContrato(string id, Contrato contrato)
        {
            if (id != contrato.Id)
            {
                return BadRequest();
            }

            _context.Entry(contrato).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContratoExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContrato(string id)
        {
            var contrato = await _context.Contratos.FindAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }

            _context.Contratos.Remove(contrato);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContratoExists(string id)
        {
            return _context.Contratos.Any(e => e.Id == id);
        }
    }
}
