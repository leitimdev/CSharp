using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Core.DTOs;
using PetShop.Core.Interfaces;

namespace PetShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PetsController : ControllerBase
{
    private readonly IPetService _petService;

    public PetsController(IPetService petService)
    {
        _petService = petService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PetDto>>> GetAll()
    {
        var pets = await _petService.ListarAsync();
        return Ok(pets);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PetDto>> GetById(int id)
    {
        var pet = await _petService.ObterPorIdAsync(id);
        
        if (pet == null)
            return NotFound();

        return Ok(pet);
    }

    [HttpGet("cliente/{clienteId}")]
    public async Task<ActionResult<List<PetDto>>> GetByCliente(int clienteId)
    {
        var pets = await _petService.ListarPorClienteAsync(clienteId);
        return Ok(pets);
    }

    [HttpPost]
    public async Task<ActionResult<PetDto>> Create([FromBody] CriarPetDto dto)
    {
        var pet = await _petService.CriarAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PetDto>> Update(int id, [FromBody] AtualizarPetDto dto)
    {
        var pet = await _petService.AtualizarAsync(id, dto);
        
        if (pet == null)
            return NotFound();

        return Ok(pet);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var sucesso = await _petService.DeletarAsync(id);
        
        if (!sucesso)
            return NotFound();

        return NoContent();
    }
}
