# 🐾 Sistema de Gestão e Agendamento para PetShop

Sistema web completo desenvolvido em ASP.NET Core e React para gestão de petshops, incluindo agendamento inteligente e integração com WhatsApp.

## 📋 Funcionalidades

### Área Administrativa
- ✅ Autenticação JWT com níveis de permissão (Admin e Funcionários)
- ✅ Gestão completa de clientes e seus dados
- ✅ Cadastro de pets vinculados aos clientes
- ✅ Gerenciamento de serviços (preço, duração, descrição)
- ✅ Cadastro de profissionais e horários disponíveis
- ✅ Agenda visual com filtros por data e profissional
- ✅ Histórico completo de atendimentos
- ✅ Relatórios (agendamentos, serviços mais utilizados, faturamento)

### Sistema de Agendamento
- ✅ Agendamento manual pelo painel administrativo
- ✅ Agendamento online público (sem necessidade de login)
- ✅ Validação automática de horários disponíveis
- ✅ Prevenção de conflitos de agenda
- ✅ Confirmação e cancelamento de agendamentos

### Integração WhatsApp
- ✅ Confirmação automática de agendamento
- ✅ Lembrete antes do horário
- ✅ Notificação de cancelamento
- ✅ Mensagens personalizadas
- ✅ Estrutura preparada para integração com APIs (Twilio, WhatsApp Cloud API)

## 🏗️ Arquitetura

### Backend (ASP.NET Core 8.0)
```
PetShop/
├── PetShop.API/              # Controllers e Program.cs
├── PetShop.Core/             # Entidades, DTOs e Interfaces
└── PetShop.Infrastructure/   # DbContext e Services
```

**Tecnologias:**
- ASP.NET Core 8.0 Web API
- Entity Framework Core (SQLite/SQL Server)
- JWT Authentication
- BCrypt para hash de senhas
- Swagger/OpenAPI

### Frontend (React + Vite)
```
petshop-frontend/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── contexts/         # Context API (Auth)
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Configuração da API
│   └── App.jsx          # Rotas principais
```

**Tecnologias:**
- React 18
- React Router DOM
- Axios
- React Toastify
- Lucide React (ícones)
- Date-fns

## 🚀 Como Executar

### Pré-requisitos
- .NET 8.0 SDK
- Node.js 18+
- Visual Studio 2022 ou VS Code

### Backend

1. Navegue até a pasta do projeto:
```powershell
cd y:\GitHub\CSharp\PetShop
```

2. Restaure as dependências:
```powershell
dotnet restore
```

3. Execute a API:
```powershell
cd PetShop.API
dotnet run
```

A API estará disponível em:
- HTTPS: https://localhost:7000
- HTTP: http://localhost:5000
- Swagger: https://localhost:7000/swagger

### Frontend

1. Navegue até a pasta do frontend:
```powershell
cd petshop-frontend
```

2. Instale as dependências:
```powershell
npm install
```

3. Execute o servidor de desenvolvimento:
```powershell
npm run dev
```

O frontend estará disponível em: http://localhost:3000

## 🔑 Credenciais Padrão

**Usuário Admin:**
- Email: `admin@petshop.com`
- Senha: `Admin@123`

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Criar usuário (Admin)
- `GET /api/auth/usuarios` - Listar usuários (Admin)

### Clientes
- `GET /api/clientes` - Listar clientes
- `GET /api/clientes/{id}` - Obter cliente
- `POST /api/clientes` - Criar cliente
- `PUT /api/clientes/{id}` - Atualizar cliente
- `DELETE /api/clientes/{id}` - Deletar cliente

### Pets
- `GET /api/pets` - Listar pets
- `GET /api/pets/{id}` - Obter pet
- `GET /api/pets/cliente/{clienteId}` - Listar pets do cliente
- `POST /api/pets` - Criar pet
- `PUT /api/pets/{id}` - Atualizar pet
- `DELETE /api/pets/{id}` - Deletar pet

### Serviços
- `GET /api/servicos` - Listar serviços (público)
- `GET /api/servicos/{id}` - Obter serviço
- `POST /api/servicos` - Criar serviço (Admin)
- `PUT /api/servicos/{id}` - Atualizar serviço (Admin)
- `DELETE /api/servicos/{id}` - Deletar serviço (Admin)

### Profissionais
- `GET /api/profissionais` - Listar profissionais (público)
- `GET /api/profissionais/{id}` - Obter profissional
- `GET /api/profissionais/{id}/horarios` - Horários do profissional
- `POST /api/profissionais` - Criar profissional (Admin)
- `POST /api/profissionais/horarios` - Adicionar horário (Admin)
- `PUT /api/profissionais/{id}` - Atualizar profissional (Admin)
- `DELETE /api/profissionais/{id}` - Deletar profissional (Admin)
- `DELETE /api/profissionais/horarios/{id}` - Remover horário (Admin)

### Agendamentos
- `GET /api/agendamentos` - Listar agendamentos
- `GET /api/agendamentos/{id}` - Obter agendamento
- `GET /api/agendamentos/profissional/{id}` - Agendamentos do profissional
- `POST /api/agendamentos` - Criar agendamento
- `POST /api/agendamentos/publico` - Criar agendamento público (sem auth)
- `PUT /api/agendamentos/{id}` - Atualizar agendamento
- `POST /api/agendamentos/{id}/confirmar` - Confirmar agendamento
- `POST /api/agendamentos/{id}/cancelar` - Cancelar agendamento
- `GET /api/agendamentos/horarios-disponiveis` - Horários disponíveis (público)
- `GET /api/agendamentos/verificar-disponibilidade` - Verificar disponibilidade (público)

### Relatórios
- `GET /api/relatorios/dashboard` - Dashboard completo (Admin)
- `GET /api/relatorios/agendamentos-por-dia` - Agendamentos por dia (Admin)
- `GET /api/relatorios/faturamento-por-servico` - Faturamento por serviço (Admin)
- `GET /api/relatorios/clientes-frequentes` - Clientes frequentes (Admin)

## 🔧 Configuração

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=petshop.db"
  },
  "Jwt": {
    "Key": "SuaChaveSecretaAqui",
    "Issuer": "PetShopAPI",
    "Audience": "PetShopApp"
  },
  "WhatsApp": {
    "ApiKey": "sua-api-key",
    "ApiUrl": "https://api.whatsapp.com"
  }
}
```

### Banco de Dados

O sistema usa SQLite por padrão para facilitar o desenvolvimento. Para produção, configure o SQL Server no `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=PetShop;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

## 📱 Integração WhatsApp

O serviço de WhatsApp está preparado para integração com:

1. **Twilio API**
2. **WhatsApp Cloud API (Meta)**
3. **Outras APIs compatíveis**

Para ativar, configure as credenciais em `appsettings.json`:

```json
{
  "WhatsApp": {
    "ApiKey": "sua-chave-api",
    "ApiUrl": "https://api.twilio.com" // ou URL da API escolhida
  }
}
```

O código comentado no `WhatsAppService.cs` contém exemplos de integração.

## 🎨 Interface

- **Design responsivo** - Funciona em desktop e mobile
- **Tema moderno** - Interface limpa e intuitiva
- **Navegação simples** - Sidebar com acesso rápido
- **Feedback visual** - Toasts para ações do usuário
- **Validações** - Campos obrigatórios e validações em tempo real

## 🔒 Segurança

- Autenticação JWT com tokens seguros
- Senhas criptografadas com BCrypt
- Roles (Admin/Funcionário) para controle de acesso
- Validações no backend e frontend
- CORS configurado adequadamente
- HTTPS habilitado

## 📊 Relatórios Disponíveis

- Total de agendamentos (por período)
- Agendamentos concluídos vs cancelados
- Faturamento total e estimado
- Serviços mais utilizados
- Profissionais mais ocupados
- Clientes frequentes
- Agendamentos por dia

## 🚀 Próximas Melhorias

- [ ] Integração com pagamento online (Stripe/PagSeguro)
- [ ] Sistema de avaliações e feedbacks
- [ ] Aplicativo mobile (React Native)
- [ ] Sistema de fidelidade/pontos
- [ ] Galeria de fotos dos pets
- [ ] Histórico médico dos pets
- [ ] Notificações push
- [ ] Chat em tempo real

## 📝 Licença

Este projeto foi desenvolvido para uso educacional e comercial.

## 👨‍💻 Desenvolvido com

- ASP.NET Core 8.0
- React 18
- Entity Framework Core
- JWT Authentication
- SQLite/SQL Server
- Vite
- Axios

---

**Desenvolvido para otimizar a gestão de petshops com foco em usabilidade e eficiência.**
