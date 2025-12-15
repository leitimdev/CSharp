using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PetShop.Core.DTOs;
using PetShop.Core.Entities;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace PetShop.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly PetShopDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(PetShopDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email == request.Email && u.Ativo);

        if (usuario == null || !BCrypt.Net.BCrypt.Verify(request.Senha, usuario.SenhaHash))
            return null;

        var token = GerarToken(usuario);

        return new LoginResponse
        {
            Token = token,
            Nome = usuario.Nome,
            Email = usuario.Email,
            Role = usuario.Role
        };
    }

    public async Task<UsuarioDto> CriarUsuarioAsync(CriarUsuarioDto dto)
    {
        var usuarioExistente = await _context.Usuarios
            .AnyAsync(u => u.Email == dto.Email);

        if (usuarioExistente)
            throw new InvalidOperationException("Email já cadastrado");

        var usuario = new Usuario
        {
            Nome = dto.Nome,
            Email = dto.Email,
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
            Role = dto.Role,
            DataCriacao = DateTime.UtcNow
        };

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return new UsuarioDto
        {
            Id = usuario.Id,
            Nome = usuario.Nome,
            Email = usuario.Email,
            Role = usuario.Role,
            Ativo = usuario.Ativo
        };
    }

    public async Task<UsuarioDto?> ObterUsuarioPorIdAsync(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null) return null;

        return new UsuarioDto
        {
            Id = usuario.Id,
            Nome = usuario.Nome,
            Email = usuario.Email,
            Role = usuario.Role,
            Ativo = usuario.Ativo
        };
    }

    public async Task<List<UsuarioDto>> ListarUsuariosAsync()
    {
        return await _context.Usuarios
            .Select(u => new UsuarioDto
            {
                Id = u.Id,
                Nome = u.Nome,
                Email = u.Email,
                Role = u.Role,
                Ativo = u.Ativo
            })
            .ToListAsync();
    }

    private string GerarToken(Usuario usuario)
    {
        var jwtKey = _configuration["Jwt:Key"] ?? "ChaveSecretaSuperSeguraParaDesenvolvimento123!@#";
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "PetShopAPI";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "PetShopApp";

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
            new Claim(ClaimTypes.Name, usuario.Nome),
            new Claim(ClaimTypes.Email, usuario.Email),
            new Claim(ClaimTypes.Role, usuario.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
