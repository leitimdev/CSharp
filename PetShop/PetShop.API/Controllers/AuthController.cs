using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Core.DTOs;
using PetShop.Core.Interfaces;

namespace PetShop.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        
        if (response == null)
            return Unauthorized(new { message = "Email ou senha inválidos" });

        return Ok(response);
    }

    [HttpPost("register")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UsuarioDto>> Register([FromBody] CriarUsuarioDto dto)
    {
        try
        {
            var usuario = await _authService.CriarUsuarioAsync(dto);
            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, usuario);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("usuarios/{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UsuarioDto>> GetUsuario(int id)
    {
        var usuario = await _authService.ObterUsuarioPorIdAsync(id);
        
        if (usuario == null)
            return NotFound();

        return Ok(usuario);
    }

    [HttpGet("usuarios")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<UsuarioDto>>> GetUsuarios()
    {
        var usuarios = await _authService.ListarUsuariosAsync();
        return Ok(usuarios);
    }
}
