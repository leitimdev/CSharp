using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Core.DTOs;
using PetShop.Core.Interfaces;

namespace PetShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServicosController : ControllerBase
{
    private readonly IServicoService _servicoService;

    public ServicosController(IServicoService servicoService)
    {
        _servicoService = servicoService;
    }

    [HttpGet]
    [AllowAnonymous] // Permitir acesso público para agendamento online
    public async Task<ActionResult<List<ServicoDto>>> GetAll()
    {
        var servicos = await _servicoService.ListarAsync();
        return Ok(servicos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServicoDto>> GetById(int id)
    {
        var servico = await _servicoService.ObterPorIdAsync(id);
        
        if (servico == null)
            return NotFound();

        return Ok(servico);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ServicoDto>> Create([FromBody] CriarServicoDto dto)
    {
        var servico = await _servicoService.CriarAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = servico.Id }, servico);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ServicoDto>> Update(int id, [FromBody] AtualizarServicoDto dto)
    {
        var servico = await _servicoService.AtualizarAsync(id, dto);
        
        if (servico == null)
            return NotFound();

        return Ok(servico);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Delete(int id)
    {
        var sucesso = await _servicoService.DeletarAsync(id);
        
        if (!sucesso)
            return NotFound();

        return NoContent();
    }
}
