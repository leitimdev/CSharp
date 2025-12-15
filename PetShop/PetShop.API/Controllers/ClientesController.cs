using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Core.DTOs;
using PetShop.Core.Interfaces;

namespace PetShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ClientesController : ControllerBase
{
    private readonly IClienteService _clienteService;

    public ClientesController(IClienteService clienteService)
    {
        _clienteService = clienteService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ClienteDto>>> GetAll()
    {
        var clientes = await _clienteService.ListarAsync();
        return Ok(clientes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ClienteDto>> GetById(int id)
    {
        var cliente = await _clienteService.ObterPorIdAsync(id);
        
        if (cliente == null)
            return NotFound();

        return Ok(cliente);
    }

    [HttpPost]
    public async Task<ActionResult<ClienteDto>> Create([FromBody] CriarClienteDto dto)
    {
        var cliente = await _clienteService.CriarAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = cliente.Id }, cliente);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ClienteDto>> Update(int id, [FromBody] AtualizarClienteDto dto)
    {
        var cliente = await _clienteService.AtualizarAsync(id, dto);
        
        if (cliente == null)
            return NotFound();

        return Ok(cliente);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var sucesso = await _clienteService.DeletarAsync(id);
        
        if (!sucesso)
            return NotFound();

        return NoContent();
    }
}
