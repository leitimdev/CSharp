using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CorretoresController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public CorretoresController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Corretor>>> GetCorretores()
        {
            return await _context.Corretores.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Corretor>> GetCorretor(string id)
        {
            var corretor = await _context.Corretores.FindAsync(id);
            if (corretor == null)
            {
                return NotFound();
            }
            return corretor;
        }

        [HttpPost]
        public async Task<ActionResult<Corretor>> CreateCorretor(Corretor corretor)
        {
            if (string.IsNullOrEmpty(corretor.Id))
            {
                corretor.Id = Guid.NewGuid().ToString();
            }
            
            _context.Corretores.Add(corretor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCorretor), new { id = corretor.Id }, corretor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCorretor(string id, Corretor corretor)
        {
            if (id != corretor.Id)
            {
                return BadRequest();
            }

            _context.Entry(corretor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CorretorExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCorretor(string id)
        {
            var corretor = await _context.Corretores.FindAsync(id);
            if (corretor == null)
            {
                return NotFound();
            }

            _context.Corretores.Remove(corretor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CorretorExists(string id)
        {
            return _context.Corretores.Any(e => e.Id == id);
        }
    }
}
