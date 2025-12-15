using PetShop.Core.DTOs;

namespace PetShop.Core.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<UsuarioDto> CriarUsuarioAsync(CriarUsuarioDto dto);
    Task<UsuarioDto?> ObterUsuarioPorIdAsync(int id);
    Task<List<UsuarioDto>> ListarUsuariosAsync();
}
