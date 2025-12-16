using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImobiliariaAPI.Data;
using ImobiliariaAPI.Models;

namespace ImobiliariaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly ImobiliariaDbContext _context;

        public TransacoesController(ImobiliariaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
        {
            return await _context.Transacoes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transacao>> GetTransacao(string id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
            {
                return NotFound();
            }
            return transacao;
        }

        [HttpPost]
        public async Task<ActionResult<Transacao>> CreateTransacao(Transacao transacao)
        {
            if (string.IsNullOrEmpty(transacao.Id))
            {
                transacao.Id = Guid.NewGuid().ToString();
            }
            
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransacao), new { id = transacao.Id }, transacao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransacao(string id, Transacao transacao)
        {
            if (id != transacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(transacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransacaoExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransacao(string id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);
            if (transacao == null)
            {
                return NotFound();
            }

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("resumo")]
        public async Task<ActionResult<object>> GetResumo()
        {
            var transacoes = await _context.Transacoes.ToListAsync();
            
            var receitas = transacoes.Where(t => t.Tipo == "receita" && t.Status == "concluido").Sum(t => t.Valor);
            var despesas = transacoes.Where(t => t.Tipo == "despesa" && t.Status == "concluido").Sum(t => t.Valor);
            var saldo = receitas - despesas;

            var resumo = new
            {
                receitas,
                despesas,
                saldo,
                transacoes = transacoes.OrderByDescending(t => t.Data).Take(10)
            };

            return Ok(resumo);
        }

        private bool TransacaoExists(string id)
        {
            return _context.Transacoes.Any(e => e.Id == id);
        }
    }
}
