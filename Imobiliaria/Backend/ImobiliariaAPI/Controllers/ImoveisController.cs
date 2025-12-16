using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImoveisController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public ImoveisController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Imovel>>> GetImoveis()
        {
            return await _context.Imoveis.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Imovel>> GetImovel(string id)
        {
            var imovel = await _context.Imoveis.FindAsync(id);
            if (imovel == null)
            {
                return NotFound();
            }
            return imovel;
        }

        [HttpPost]
        public async Task<ActionResult<Imovel>> CreateImovel(Imovel imovel)
        {
            if (string.IsNullOrEmpty(imovel.Id))
            {
                imovel.Id = Guid.NewGuid().ToString();
            }
            
            _context.Imoveis.Add(imovel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetImovel), new { id = imovel.Id }, imovel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateImovel(string id, Imovel imovel)
        {
            if (id != imovel.Id)
            {
                return BadRequest();
            }

            _context.Entry(imovel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImovelExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImovel(string id)
        {
            var imovel = await _context.Imoveis.FindAsync(id);
            if (imovel == null)
            {
                return NotFound();
            }

            _context.Imoveis.Remove(imovel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImovelExists(string id)
        {
            return _context.Imoveis.Any(e => e.Id == id);
        }
    }
}
