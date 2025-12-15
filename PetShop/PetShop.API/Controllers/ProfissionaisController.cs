using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Core.DTOs;
using PetShop.Core.Interfaces;

namespace PetShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfissionaisController : ControllerBase
{
    private readonly IProfissionalService _profissionalService;

    public ProfissionaisController(IProfissionalService profissionalService)
    {
        _profissionalService = profissionalService;
    }

    [HttpGet]
    [AllowAnonymous] // Permitir acesso público para agendamento online
    public async Task<ActionResult<List<ProfissionalDto>>> GetAll()
    {
        var profissionais = await _profissionalService.ListarAsync();
        return Ok(profissionais);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProfissionalDto>> GetById(int id)
    {
        var profissional = await _profissionalService.ObterPorIdAsync(id);
        
        if (profissional == null)
            return NotFound();

        return Ok(profissional);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProfissionalDto>> Create([FromBody] CriarProfissionalDto dto)
    {
        var profissional = await _profissionalService.CriarAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = profissional.Id }, profissional);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProfissionalDto>> Update(int id, [FromBody] AtualizarProfissionalDto dto)
    {
        var profissional = await _profissionalService.AtualizarAsync(id, dto);
        
        if (profissional == null)
            return NotFound();

        return Ok(profissional);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(int id)
    {
        var sucesso = await _profissionalService.DeletarAsync(id);
        
        if (!sucesso)
            return NotFound();

        return NoContent();
    }

    [HttpGet("{id}/horarios")]
    public async Task<ActionResult<List<HorarioDisponivelDto>>> GetHorarios(int id)
    {
        var horarios = await _profissionalService.ObterHorariosPorProfissionalAsync(id);
        return Ok(horarios);
    }

    [HttpPost("horarios")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<HorarioDisponivelDto>> AddHorario([FromBody] CriarHorarioDisponivelDto dto)
    {
        var horario = await _profissionalService.AdicionarHorarioAsync(dto);
        return Ok(horario);
    }

    [HttpDelete("horarios/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteHorario(int id)
    {
        var sucesso = await _profissionalService.RemoverHorarioAsync(id);
        
        if (!sucesso)
            return NotFound();

        return NoContent();
    }
}
