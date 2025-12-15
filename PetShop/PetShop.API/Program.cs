using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PetShop.Core.Interfaces;
using PetShop.Infrastructure.Data;
using PetShop.Infrastructure.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configurar Swagger com autenticação JWT
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "PetShop API", 
        Version = "v1",
        Description = "API completa para gestão de PetShop com agendamento e integração WhatsApp"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header usando Bearer scheme. Exemplo: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Configurar DbContext
builder.Services.AddDbContext<PetShopDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    
    if (string.IsNullOrEmpty(connectionString))
    {
        // Usar SQLite por padrão para facilitar desenvolvimento
        options.UseSqlite("Data Source=petshop.db");
    }
    else
    {
        options.UseSqlServer(connectionString);
    }
});

// Configurar JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "ChaveSecretaSuperSeguraParaDesenvolvimento123!@#";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "PetShopAPI";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "PetShopApp";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Registrar serviços
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IClienteService, ClienteService>();
builder.Services.AddScoped<IPetService, PetService>();
builder.Services.AddScoped<IServicoService, ServicoService>();
builder.Services.AddScoped<IProfissionalService, ProfissionalService>();
builder.Services.AddScoped<IAgendamentoService, AgendamentoService>();
builder.Services.AddScoped<IWhatsAppService, WhatsAppService>();

var app = builder.Build();

// Configurar Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "PetShop API V1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Criar banco de dados e dados iniciais
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PetShopDbContext>();
    var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
    
    // Aplicar migrations
    context.Database.EnsureCreated();
    
    // Criar usuário admin padrão se não existir
    if (!context.Usuarios.Any())
    {
        await authService.CriarUsuarioAsync(new PetShop.Core.DTOs.CriarUsuarioDto
        {
            Nome = "Administrador",
            Email = "admin@petshop.com",
            Senha = "Admin@123",
            Role = "Admin"
        });

        Console.WriteLine("✓ Usuário admin criado: admin@petshop.com / Admin@123");
        
        // Popular banco com dados de exemplo
        await SeedData.SeedAsync(context);
    }
}

Console.WriteLine("🐾 PetShop API está rodando!");
Console.WriteLine($"📝 Swagger disponível em: {(app.Environment.IsDevelopment() ? "https://localhost:7000" : "")}/swagger");

app.Run();
