using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Core.DTOs;
using PetShop.Core.Interfaces;

namespace PetShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AgendamentosController : ControllerBase
{
    private readonly IAgendamentoService _agendamentoService;

    public AgendamentosController(IAgendamentoService agendamentoService)
    {
        _agendamentoService = agendamentoService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<AgendamentoDto>>> GetAll(
        [FromQuery] DateTime? dataInicio = null,
        [FromQuery] DateTime? dataFim = null)
    {
        var agendamentos = await _agendamentoService.ListarAsync(dataInicio, dataFim);
        return Ok(agendamentos);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<AgendamentoDto>> GetById(int id)
    {
        var agendamento = await _agendamentoService.ObterPorIdAsync(id);
        
        if (agendamento == null)
            return NotFound();

        return Ok(agendamento);
    }

    [HttpGet("profissional/{profissionalId}")]
    [Authorize]
    public async Task<ActionResult<List<AgendamentoDto>>> GetByProfissional(
        int profissionalId,
        [FromQuery] DateTime data)
    {
        var agendamentos = await _agendamentoService.ListarPorProfissionalAsync(profissionalId, data);
        return Ok(agendamentos);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<AgendamentoDto>> Create([FromBody] CriarAgendamentoDto dto)
    {
        try
        {
            var agendamento = await _agendamentoService.CriarAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = agendamento.Id }, agendamento);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("publico")]
    [AllowAnonymous]
    public async Task<ActionResult<AgendamentoDto>> CreatePublico([FromBody] AgendamentoPublicoDto dto)
    {
        try
        {
            var agendamento = await _agendamentoService.CriarAgendamentoPublicoAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = agendamento.Id }, agendamento);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<AgendamentoDto>> Update(int id, [FromBody] AtualizarAgendamentoDto dto)
    {
        try
        {
            var agendamento = await _agendamentoService.AtualizarAsync(id, dto);
            
            if (agendamento == null)
                return NotFound();

            return Ok(agendamento);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("{id}/cancelar")]
    [Authorize]
    public async Task<ActionResult> Cancel(int id)
    {
        var sucesso = await _agendamentoService.CancelarAsync(id);
        
        if (!sucesso)
            return NotFound();

        return NoContent();
    }

    [HttpPost("{id}/confirmar")]
    [Authorize]
    public async Task<ActionResult> Confirm(int id)
    {
        var sucesso = await _agendamentoService.ConfirmarAsync(id);
        
        if (!sucesso)
            return NotFound();

        return NoContent();
    }

    [HttpGet("horarios-disponiveis")]
    [AllowAnonymous]
    public async Task<ActionResult<List<DateTime>>> GetHorariosDisponiveis(
        [FromQuery] int profissionalId,
        [FromQuery] int servicoId,
        [FromQuery] DateTime data)
    {
        var horarios = await _agendamentoService.ObterHorariosDisponiveisAsync(
            profissionalId, servicoId, data);
        return Ok(horarios);
    }

    [HttpGet("verificar-disponibilidade")]
    [AllowAnonymous]
    public async Task<ActionResult<bool>> VerificarDisponibilidade(
        [FromQuery] DateTime dataHora,
        [FromQuery] int profissionalId,
        [FromQuery] int duracaoMinutos)
    {
        var disponivel = await _agendamentoService.VerificarDisponibilidadeAsync(
            dataHora, profissionalId, duracaoMinutos);
        return Ok(new { disponivel });
    }
}
