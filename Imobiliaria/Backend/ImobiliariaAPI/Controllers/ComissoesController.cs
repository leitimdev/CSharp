using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComissoesController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public ComissoesController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comissao>>> GetComissoes()
        {
            return await _context.Comissoes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Comissao>> GetComissao(string id)
        {
            var comissao = await _context.Comissoes.FindAsync(id);
            if (comissao == null)
            {
                return NotFound();
            }
            return comissao;
        }

        [HttpPost]
        public async Task<ActionResult<Comissao>> CreateComissao(Comissao comissao)
        {
            if (string.IsNullOrEmpty(comissao.Id))
            {
                comissao.Id = Guid.NewGuid().ToString();
            }
            
            // Calcular valor da comissão
            comissao.ValorComissao = comissao.ValorVenda * (comissao.Percentual / 100);
            
            _context.Comissoes.Add(comissao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComissao), new { id = comissao.Id }, comissao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComissao(string id, Comissao comissao)
        {
            if (id != comissao.Id)
            {
                return BadRequest();
            }

            // Recalcular valor da comissão
            comissao.ValorComissao = comissao.ValorVenda * (comissao.Percentual / 100);

            _context.Entry(comissao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComissaoExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComissao(string id)
        {
            var comissao = await _context.Comissoes.FindAsync(id);
            if (comissao == null)
            {
                return NotFound();
            }

            _context.Comissoes.Remove(comissao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ranking")]
        public async Task<ActionResult<object>> GetRanking()
        {
            var corretores = await _context.Corretores
                .OrderByDescending(c => c.ComissaoAtual)
                .ToListAsync();

            return Ok(corretores);
        }

        private bool ComissaoExists(string id)
        {
            return _context.Comissoes.Any(e => e.Id == id);
        }
    }
}
