# 🎯 Repositório C# - Projetos e Soluções

[![.NET](https://img.shields.io/badge/.NET-8.0-purple.svg)](https://dotnet.microsoft.com/)
[![C#](https://img.shields.io/badge/C%23-11.0-blue.svg)](https://docs.microsoft.com/en-us/dotnet/csharp/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Este repositório contém uma coleção de projetos desenvolvidos em C# com diferentes propósitos, demonstrando conhecimento em arquiteturas modernas, padrões de design e tecnologias diversificadas. Cada projeto foi desenvolvido com foco em boas práticas, escalabilidade e manutenibilidade.

---

## 📂 Índice de Projetos

1. [🏦 Desafio-BancoDigital](#-desafio-bancodigital) - Sistema Bancário com Microserviços
2. [📄 JuntaPDF](#-juntapdf) - Aplicativo Desktop para Mesclar PDFs
3. [🐾 PetShop](#-petshop) - Sistema de Gestão e Agendamento

---

## 🏦 Desafio-BancoDigital

[![.NET](https://img.shields.io/badge/.NET-8.0-purple.svg)](https://dotnet.microsoft.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](https://www.docker.com/)
[![Oracle](https://img.shields.io/badge/Oracle-21c-red.svg)](https://www.oracle.com/database/)
[![Kafka](https://img.shields.io/badge/Apache-Kafka-orange.svg)](https://kafka.apache.org/)

### 📌 Descrição

Sistema bancário completo desenvolvido com **arquitetura de microserviços**, implementando operações de conta corrente e transferências bancárias com alta performance, segurança e escalabilidade. O projeto demonstra conhecimento avançado em **Clean Architecture**, **CQRS**, **Event-Driven Architecture** e **containerização**.

### ✨ Funcionalidades Principais

#### 🏦 Gestão de Contas Correntes
- ✅ Cadastro e autenticação de contas
- ✅ Consulta de dados da conta
- ✅ Ativação e inativação de contas
- ✅ Validação de CPF e dados obrigatórios

#### 💰 Movimentações Financeiras
- ✅ Débitos e créditos em tempo real
- ✅ Consulta de saldo instantânea
- ✅ Extrato detalhado com histórico
- ✅ Validação de saldo suficiente

#### 💸 Sistema de Transferências
- ✅ Transferências entre contas
- ✅ Controle de idempotência
- ✅ Validação de contas origem e destino
- ✅ Histórico completo de transferências
- ✅ Comunicação assíncrona via Kafka

### 🛠️ Stack Tecnológica

<details>
<summary><b>Backend & Framework</b></summary>

- **.NET 8.0** - Framework principal
- **C# 11** - Linguagem de programação
- **ASP.NET Core Web API** - Framework web RESTful
</details>

<details>
<summary><b>Arquitetura & Padrões</b></summary>

- **Clean Architecture** - Organização em camadas (Domain, Application, Infrastructure, API)
- **CQRS Pattern** - Separação de comandos e consultas
- **MediatR** (v12.2.0) - Implementação do Mediator Pattern
- **DDD** - Domain Driven Design
- **Repository Pattern** - Abstração de acesso a dados
- **Event-Driven Architecture** - Comunicação baseada em eventos
</details>

<details>
<summary><b>Banco de Dados & ORM</b></summary>

- **Oracle Database 21c XE** - Banco de dados enterprise
- **Dapper** (v2.1.35) - Micro ORM de alta performance
- **Oracle.ManagedDataAccess.Core** (v23.9.1) - Driver .NET para Oracle
</details>

<details>
<summary><b>Mensageria</b></summary>

- **Apache Kafka** (v7.4.0) - Message Broker para comunicação assíncrona
- **Confluent Platform** - Ecossistema Kafka completo
- **Zookeeper** - Coordenação de serviços
- **Kafka UI** - Interface visual para gerenciamento
</details>

<details>
<summary><b>Segurança</b></summary>

- **JWT Bearer Authentication** - Autenticação stateless
- **BCrypt.Net-Next** (v4.0.3) - Hash seguro de senhas com salt
- **System.IdentityModel.Tokens.Jwt** (v7.1.2) - Geração e validação de tokens
- **Microsoft.AspNetCore.Authentication.JwtBearer** (v8.0.0)
</details>

<details>
<summary><b>DevOps & Containers</b></summary>

- **Docker** - Containerização de aplicações
- **Docker Compose** - Orquestração de múltiplos containers
- **Multi-stage Dockerfile** - Otimização de imagens Docker
- **Docker Networks** - Isolamento e comunicação entre serviços
- **Docker Volumes** - Persistência de dados
</details>

<details>
<summary><b>Documentação & Monitoramento</b></summary>

- **Swagger/OpenAPI** (v6.4.0) - Documentação automática e interativa
- **Health Checks** - Monitoramento de saúde dos serviços
- **API Testing** - Arquivos `.http` para testes de endpoints
</details>

### 📦 Microserviços

| Microserviço | Porta | Responsabilidades |
|-------------|-------|-------------------|
| **Api_ContaCorrente** | 5222 | Gestão de contas, autenticação JWT, movimentações, consultas |
| **Api_Transferencia** | 5037 | Transferências, validações, controle de idempotência, histórico |

### 🏗️ Arquitetura

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │
       ├──────────────────┬──────────────────┐
       ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ API Conta    │   │ API Transf.  │   │   Swagger    │
│  Corrente    │   │              │   │    UI        │
└──────┬───────┘   └──────┬───────┘   └──────────────┘
       │                   │
       └────────┬──────────┘
                ▼
         ┌──────────────┐
         │    Kafka     │
         │  (Eventos)   │
         └──────┬───────┘
                │
         ┌──────┴───────┐
         ▼              ▼
    ┌─────────┐   ┌─────────┐
    │ Oracle  │   │  Logs   │
    │   DB    │   │         │
    └─────────┘   └─────────┘
```

**Camadas (Clean Architecture):**
```
📂 Microserviço
├── 🎮 API Layer          → Controllers, Program.cs
├── 📋 Application Layer  → Commands, Queries, Handlers, DTOs
├── 🏢 Domain Layer       → Entities, ValueObjects, Interfaces
└── 🔧 Infrastructure     → Repositories, Data, Services Externos
```

### 🚀 Como Executar

#### Via Docker Compose (Recomendado)

```powershell
# Navegar até o diretório
cd Desafio-BancoDigital

# Iniciar todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Parar serviços
docker-compose down
```

#### Endpoints Disponíveis

| Serviço | URL | Swagger |
|---------|-----|---------|
| API Conta Corrente | http://localhost:5222 | http://localhost:5222/swagger |
| API Transferência | http://localhost:5037 | http://localhost:5037/swagger |
| Kafka UI | http://localhost:8080 | - |
| Oracle Database | localhost:1521 | - |

### 📖 Documentação Completa

Para mais detalhes sobre endpoints, exemplos de requisições, configuração do Kafka e troubleshooting, consulte o [README completo do projeto](./Desafio-BancoDigital/README.md).

---

## 📄 JuntaPDF

[![.NET](https://img.shields.io/badge/.NET-8.0-purple.svg)](https://dotnet.microsoft.com/)
[![Windows Forms](https://img.shields.io/badge/WinForms-Desktop-blue.svg)](https://docs.microsoft.com/dotnet/desktop/winforms/)
[![iText 7](https://img.shields.io/badge/iText-7-orange.svg)](https://itextpdf.com/)

### 📌 Descrição

Aplicativo **desktop Windows Forms** para mesclar múltiplos arquivos PDF de forma simples, rápida e **100% offline**. Desenvolvido para oferecer máxima proteção de dados, eliminando riscos de vazamento ao processar documentos localmente sem necessidade de upload para servidores externos.

**Aplicativo Desktop para Mesclagem de Arquivos PDF**

Uma aplicação Windows Forms simples, eficiente e segura para mesclar múltiplos arquivos PDF em um único documento, desenvolvida para uso local sem riscos de vazamento de dados.

#### 🎯 Funcionalidades Principais
- Mesclagem de múltiplos arquivos PDF em um único documento
- Validação automática da integridade dos arquivos PDF
- Interface gráfica intuitiva e amigável
- Barra de progresso durante operações de mesclagem
- Visualização de informações dos arquivos (páginas, tamanho)
- Tratamento robusto de erros e exceções
- Funcionamento 100% local (sem envio de dados para nuvem)

#### 🛠️ Stack Tecnológica

**Framework & Linguagem:**
- **.NET 8.0** - Framework principal
- **C# 12.0** - Linguagem de programação
- **.NET 8.0-windows** - Target framework para Windows

**Interface Gráfica:**
- **Windows Forms** - Framework de UI desktop
- **System.Windows.Forms** - Componentes de interface

**Bibliotecas de PDF:**
- **iText 7** (v9.3.0) - Biblioteca principal para manipulação de PDFs
- **itext.bouncy-castle-adapter** (v9.3.0) - Adaptador para criptografia
- **iTextSharp-LGPL-BouncyCastle** (v4.1.7) - Suporte adicional

**Arquitetura:**
- **Service Layer Pattern** - Separação de lógica de negócio
- **Async/Await** - Programação assíncrona para responsividade
- **Interface-based Design** - IPdfMergerService para abstração

#### 📁 Estrutura do Projeto

```
JuntaPDF/
├── WinFormsApp1/
│   ├── Models/
│   │   └── PdfDocument.cs          # Modelo de documento PDF
│   ├── Services/
│   │   ├── IPdfMergerService.cs    # Interface do serviço
│   │   └── PdfMergerService.cs     # Implementação do serviço
│   ├── Form1.cs                     # Formulário principal
│   └── Program.cs                   # Ponto de entrada
```

#### 🚀 Como Executar

```powershell
# Navegar até o diretório do projeto
cd JuntaPDF

# Restaurar dependências
dotnet restore

# Compilar o projeto
dotnet build

# Executar a aplicação
dotnet run --project WinFormsApp1/WinFormsApp1.csproj
```

Ou abrir o projeto no Visual Studio e executar (F5).

### 🎯 Casos de Uso

- **Empresas**: Unificar documentos fiscais, contratos e relatórios
- **Escritórios Jurídicos**: Consolidar documentação em processos
- **Profissionais Autônomos**: Organizar portfólios e propostas
- **Estudantes**: Combinar materiais de estudo e trabalhos acadêmicos
- **Home Office**: Gerenciar documentos pessoais com segurança

### ✨ Diferenciais

- **🔒 Segurança Total**: Processamento 100% local, sem envio de dados para nuvem
- **💰 Gratuito**: Solução open-source sem custos ou limitações
- **⚡ Eficiente**: Interface responsiva com feedback visual de progresso
- **🏗️ Profissional**: Arquitetura limpa com separação de responsabilidades
- **📦 Leve**: Aplicação pequena e rápida para instalação

### 📖 Documentação Completa

Para mais detalhes técnicos e troubleshooting, consulte o [README completo do projeto](./JuntaPDF/README.md).

---

## 🐾 PetShop

[![.NET](https://img.shields.io/badge/.NET-8.0-purple.svg)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)](https://reactjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57.svg?logo=sqlite)](https://www.sqlite.org/)

### 📌 Descrição

Sistema web **full-stack completo** de gestão e agendamento para petshops, desenvolvido com **ASP.NET Core** no backend e **React** no frontend. Oferece solução integrada para gerenciar clientes, pets, serviços, profissionais e agendamentos com interface moderna e intuitiva.

O projeto inclui **integração com WhatsApp** para notificações automáticas, sistema de relatórios e dashboard, além de permitir agendamento online público sem necessidade de login.

### ✨ Funcionalidades Principais

#### 👥 Gestão Administrativa
- ✅ **Autenticação JWT** com níveis de permissão (Admin/Funcionário)
- ✅ **Gestão de Clientes** - Cadastro completo com dados de contato
- ✅ **Cadastro de Pets** - Vinculados aos clientes com raça, espécie, idade
- ✅ **Gerenciamento de Serviços** - Preço, duração e descrição detalhada
- ✅ **Cadastro de Profissionais** - Horários disponíveis por dia da semana
- ✅ **Controle de Usuários** - Criação de contas Admin/Funcionário

#### 📅 Sistema de Agendamento
- ✅ **Agendamento Manual** - Pelo painel administrativo
- ✅ **Agendamento Online Público** - Sem necessidade de login
- ✅ **Validação Automática** - Verifica horários disponíveis
- ✅ **Prevenção de Conflitos** - Sistema inteligente de agenda
- ✅ **Confirmação e Cancelamento** - Gerenciamento completo
- ✅ **Agenda Visual** - Filtros por data e profissional
- ✅ **Histórico Completo** - Todos os atendimentos registrados

#### 📱 Integração WhatsApp
- ✅ **Confirmação Automática** - Ao criar agendamento
- ✅ **Lembrete Antes do Horário** - Notificação prévia
- ✅ **Notificação de Cancelamento** - Alerta ao cliente
- ✅ **Mensagens Personalizadas** - Templates customizáveis
- ✅ **Preparado para APIs** - Twilio, WhatsApp Cloud API (Meta)

#### 📊 Relatórios e Dashboard
- ✅ **Dashboard Completo** - Visão geral do negócio
- ✅ **Agendamentos por Dia** - Análise temporal
- ✅ **Faturamento por Serviço** - Receita detalhada
- ✅ **Clientes Frequentes** - Top clientes
- ✅ **Serviços Mais Utilizados** - Ranking de popularidade
- ✅ **Profissionais Mais Ocupados** - Análise de ocupação

### 🛠️ Stack Tecnológica

<details>
<summary><b>Backend (ASP.NET Core 8.0)</b></summary>

**Framework & Linguagem:**
- **ASP.NET Core 8.0** - Framework web
- **C# 11** - Linguagem de programação
- **.NET 8.0 SDK** - Plataforma de desenvolvimento

**Banco de Dados:**
- **Entity Framework Core** - ORM
- **SQLite** - Banco de dados (desenvolvimento)
- **SQL Server** - Suporte para produção
- **Migrations** - Versionamento de schema

**Autenticação & Segurança:**
- **JWT Bearer Authentication** - Tokens stateless
- **BCrypt.Net** - Hash de senhas com salt
- **Authorization Policies** - Controle de acesso por roles

**Documentação:**
- **Swagger/OpenAPI** - Documentação interativa da API
- **XML Comments** - Documentação de endpoints
</details>

<details>
<summary><b>Frontend (React 18)</b></summary>

**Framework & Bibliotecas:**
- **React 18** - Biblioteca de UI
- **Vite** - Build tool e dev server rápido
- **React Router DOM** - Roteamento SPA

**Estado & Contexto:**
- **Context API** - Gerenciamento de estado de autenticação
- **React Hooks** - useState, useEffect, useContext

**HTTP & APIs:**
- **Axios** - Cliente HTTP para API
- **Interceptors** - Injeção automática de tokens JWT

**UI & Experiência:**
- **Lucide React** - Biblioteca de ícones modernos
- **React Toastify** - Notificações toast elegantes
- **Date-fns** - Manipulação de datas
- **CSS Modules** - Estilização componentizada
</details>

<details>
<summary><b>Arquitetura & Padrões</b></summary>

**Backend:**
- **Clean Architecture** - Separação em camadas
- **Repository Pattern** - Abstração de dados
- **Dependency Injection** - Inversão de controle
- **DTOs** - Data Transfer Objects
- **Service Layer** - Lógica de negócio

**Frontend:**
- **Component-based Architecture** - Componentes reutilizáveis
- **Context Pattern** - Estado global
- **Custom Hooks** - Lógica reutilizável
- **Route Protection** - Rotas privadas com autenticação
</details>

### 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (React)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Public  │  │  Admin   │  │ Reports  │     │
│  │  Pages   │  │  Panel   │  │Dashboard │     │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘     │
└───────┼─────────────┼─────────────┼────────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │ HTTP/HTTPS (Axios)
                      ▼
        ┌─────────────────────────────┐
        │   ASP.NET Core Web API      │
        │  ┌──────────────────────┐   │
        │  │    Controllers       │   │
        │  │  (Auth, Cliente,     │   │
        │  │   Pet, Agendamento)  │   │
        │  └──────────┬───────────┘   │
        │             ▼               │
        │  ┌──────────────────────┐   │
        │  │   PetShop.Core       │   │
        │  │  (Entities, DTOs,    │   │
        │  │   Interfaces)        │   │
        │  └──────────┬───────────┘   │
        │             ▼               │
        │  ┌──────────────────────┐   │
        │  │ PetShop.Infra        │   │
        │  │  (DbContext, Repos,  │   │
        │  │   Services)          │   │
        │  └──────────┬───────────┘   │
        └─────────────┼────────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │  SQLite/SQL      │
            │    Server DB     │
            └──────────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │  WhatsApp API    │
            │ (Twilio/Meta)    │
            └──────────────────┘
```

### 📁 Estrutura do Projeto

```
PetShop/
├── PetShop.API/                      # Camada de Apresentação
│   ├── Controllers/
│   │   ├── AuthController.cs        # Autenticação e autorização
│   │   ├── ClientesController.cs    # Gestão de clientes
│   │   ├── PetsController.cs        # Gestão de pets
│   │   ├── ServicosController.cs    # Catálogo de serviços
│   │   ├── ProfissionaisController.cs
│   │   ├── AgendamentosController.cs
│   │   └── RelatoriosController.cs  # Dashboard e relatórios
│   ├── Program.cs                   # Configuração da aplicação
│   └── appsettings.json            # Configurações
│
├── PetShop.Core/                    # Camada de Domínio
│   ├── Entities/                    # Entidades do domínio
│   │   ├── Cliente.cs
│   │   ├── Pet.cs
│   │   ├── Servico.cs
│   │   ├── Profissional.cs
│   │   ├── Agendamento.cs
│   │   └── Usuario.cs
│   ├── DTOs/                        # Data Transfer Objects
│   │   ├── ClienteDto.cs
│   │   ├── AgendamentoDto.cs
│   │   ├── RelatorioDto.cs
│   │   └── ...
│   └── Interfaces/                  # Contratos
│       ├── IClienteRepository.cs
│       ├── IWhatsAppService.cs
│       └── ...
│
├── PetShop.Infrastructure/          # Camada de Infraestrutura
│   ├── Data/
│   │   └── PetShopContext.cs       # DbContext do EF Core
│   └── Services/
│       ├── ClienteRepository.cs     # Implementações
│       ├── WhatsAppService.cs       # Integração WhatsApp
│       └── ...
│
└── petshop-frontend/                # Frontend React
    ├── src/
    │   ├── components/              # Componentes reutilizáveis
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── ...
    │   ├── contexts/
    │   │   └── AuthContext.jsx     # Contexto de autenticação
    │   ├── pages/                  # Páginas da aplicação
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Clientes.jsx
    │   │   ├── Agendamentos.jsx
    │   │   ├── AgendamentoPublico.jsx
    │   │   └── ...
    │   ├── services/
    │   │   └── api.js              # Configuração Axios
    │   └── App.jsx                 # Rotas principais
    ├── package.json
    └── vite.config.js
```

### 🚀 Como Executar

#### Opção 1: Execução Rápida com Scripts PowerShell

```powershell
# Navegar até o diretório
cd PetShop

# Iniciar Backend + Frontend simultaneamente
.\start-all.ps1

# OU iniciar separadamente
.\start-backend.ps1   # Backend na porta 7000/5000
.\start-frontend.ps1  # Frontend na porta 3000
```

#### Opção 2: Execução Manual

**Backend:**
```powershell
cd PetShop\PetShop.API
dotnet restore
dotnet run
```

**Frontend:**
```powershell
cd PetShop\petshop-frontend
npm install
npm run dev
```

#### Endpoints Disponíveis

| Serviço | URL | Documentação |
|---------|-----|--------------|
| Backend API | https://localhost:7000 | https://localhost:7000/swagger |
| Frontend App | http://localhost:3000 | - |

### 🔑 Credenciais Padrão

**Usuário Admin:**
- **Email**: `admin@petshop.com`
- **Senha**: `Admin@123`

### 📡 Principais Endpoints da API

<details>
<summary><b>Autenticação</b></summary>

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Criar novo usuário (Admin)
- `GET /api/auth/usuarios` - Listar usuários (Admin)
</details>

<details>
<summary><b>Clientes & Pets</b></summary>

- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente
- `GET /api/pets/cliente/{id}` - Pets do cliente
- `POST /api/pets` - Cadastrar pet
</details>

<details>
<summary><b>Agendamentos</b></summary>

- `GET /api/agendamentos` - Listar agendamentos
- `POST /api/agendamentos` - Criar agendamento (autenticado)
- `POST /api/agendamentos/publico` - Criar agendamento público (sem auth)
- `GET /api/agendamentos/horarios-disponiveis` - Verificar disponibilidade
- `POST /api/agendamentos/{id}/confirmar` - Confirmar
- `POST /api/agendamentos/{id}/cancelar` - Cancelar
</details>

<details>
<summary><b>Relatórios</b></summary>

- `GET /api/relatorios/dashboard` - Dashboard completo (Admin)
- `GET /api/relatorios/agendamentos-por-dia` - Por dia (Admin)
- `GET /api/relatorios/faturamento-por-servico` - Faturamento (Admin)
- `GET /api/relatorios/clientes-frequentes` - Top clientes (Admin)
</details>

### 🎨 Interface e Experiência

- **🎨 Design Responsivo** - Funciona perfeitamente em desktop e mobile
- **🌙 Tema Moderno** - Interface limpa com paleta de cores profissional
- **🧭 Navegação Intuitiva** - Sidebar com acesso rápido a todas funcionalidades
- **💬 Feedback Visual** - Toasts informativos para todas ações
- **✅ Validações** - Em tempo real no frontend e backend
- **🔒 Rotas Protegidas** - Redirecionamento automático para login

### 🔧 Configurações

**Backend (appsettings.json):**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=petshop.db"
  },
  "Jwt": {
    "Key": "sua-chave-secreta-super-segura-aqui",
    "Issuer": "PetShopAPI",
    "Audience": "PetShopApp"
  },
  "WhatsApp": {
    "ApiKey": "sua-api-key-twilio-ou-meta",
    "ApiUrl": "https://api.twilio.com"
  }
}
```

**Frontend (api.js):**
```javascript
const api = axios.create({
  baseURL: 'https://localhost:7000/api'
});
```

### 📱 Integração WhatsApp

O sistema está **preparado para integração** com:

1. **Twilio API** - Serviço de mensagens SMS/WhatsApp
2. **WhatsApp Cloud API (Meta)** - API oficial do WhatsApp
3. **Outras APIs Compatíveis** - Estrutura extensível

**Para ativar:**
1. Configure as credenciais no `appsettings.json`
2. Descomente o código no `WhatsAppService.cs`
3. Implemente o cliente HTTP da API escolhida

### 🎯 Casos de Uso

- **Petshops Pequenos e Médios** - Gestão completa do negócio
- **Clínicas Veterinárias** - Agendamento de consultas
- **Pet Grooming** - Controle de banho e tosa
- **Hotéis para Pets** - Reservas e check-in/out
- **Adestramento** - Agendamento de sessões

### ✨ Diferenciais

- **📦 Solução Completa** - Frontend + Backend integrados
- **🚀 Moderna** - Tecnologias atuais (React 18, .NET 8)
- **🔐 Segura** - JWT, BCrypt, validações
- **📊 Analítica** - Dashboard com relatórios gerenciais
- **💬 Comunicação** - Integração WhatsApp preparada
- **🌐 Web** - Acesso de qualquer dispositivo
- **🎯 UX Focado** - Interface pensada para facilitar o dia a dia

### 🚀 Próximas Melhorias Planejadas

- [ ] Integração com pagamento online (Stripe/PagSeguro)
- [ ] Sistema de avaliações e feedbacks
- [ ] Aplicativo mobile (React Native)
- [ ] Sistema de fidelidade/pontos
- [ ] Galeria de fotos dos pets
- [ ] Histórico médico veterinário
- [ ] Notificações push
- [ ] Chat em tempo real

### 📖 Documentação Completa

Para guias detalhados, configuração avançada e troubleshooting:

- [README Principal](./PetShop/README.md)
- [Documentação da API](./PetShop/API_DOCS.md)
- [Guia de Início Rápido](./PetShop/QUICKSTART.md)
- [Resumo Executivo](./PetShop/EXECUTIVE_SUMMARY.md)
- [Contribuindo](./PetShop/CONTRIBUTING.md)
- [Changelog](./PetShop/CHANGELOG.md)

---

## 📊 Resumo Comparativo

| Projeto | Tipo | Framework | Principais Tecnologias | Propósito |
|---------|------|-----------|------------------------|-----------|
| **Desafio-BancoDigital** | Web API (Microserviços) | .NET 8.0 | ASP.NET Core, Oracle, Kafka, Docker | Sistema bancário enterprise com transferências |
| **JuntaPDF** | Desktop App | .NET 8.0 | Windows Forms, iText 7 | Mesclagem offline de arquivos PDF |
| **PetShop** | Full-Stack Web | .NET 8.0 + React 18 | ASP.NET Core, EF Core, SQLite, React | Gestão completa de petshop com agendamentos |

---

## 🎓 Conceitos e Padrões Demonstrados

### 🏦 Desafio-BancoDigital
- ✅ **Microservices Architecture** - Serviços independentes e escaláveis
- ✅ **Clean Architecture** - Separação clara de responsabilidades
- ✅ **CQRS Pattern** - Separação de comandos e consultas
- ✅ **Domain Driven Design (DDD)** - Modelagem focada no domínio
- ✅ **Repository Pattern** - Abstração de persistência
- ✅ **Event-Driven Architecture** - Comunicação assíncrona via eventos
- ✅ **Containerization** - Docker e Docker Compose
- ✅ **Message Broker** - Apache Kafka para mensageria
- ✅ **JWT Authentication** - Autenticação stateless
- ✅ **API Documentation** - Swagger/OpenAPI
- ✅ **Health Checks** - Monitoramento de saúde

### 📄 JuntaPDF
- ✅ **Service Layer Pattern** - Lógica de negócio isolada
- ✅ **Interface-based Design** - Abstrações para testabilidade
- ✅ **Async/Await Programming** - UI responsiva
- ✅ **Error Handling** - Tratamento robusto de exceções
- ✅ **Desktop Application** - Windows Forms moderno
- ✅ **PDF Manipulation** - Processamento avançado de documentos

### 🐾 PetShop
- ✅ **Full-Stack Development** - Backend + Frontend integrados
- ✅ **RESTful API Design** - Endpoints bem estruturados
- ✅ **Entity Framework Core** - ORM moderno
- ✅ **JWT Authentication** - Segurança com tokens
- ✅ **Role-Based Authorization** - Controle de acesso
- ✅ **Dependency Injection** - Inversão de controle
- ✅ **Repository Pattern** - Camada de dados abstraída
- ✅ **DTOs (Data Transfer Objects)** - Transferência segura
- ✅ **React Component Architecture** - UI componentizada
- ✅ **Context API** - Gerenciamento de estado
- ✅ **Protected Routes** - Rotas autenticadas
- ✅ **API Integration** - Axios com interceptors

---

## 🛠️ Pré-requisitos Gerais

Para executar os projetos deste repositório:

### 🏦 Desafio-BancoDigital
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/downloads)

### 📄 JuntaPDF
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Visual Studio 2022** (recomendado) ou VS Code
- **Windows OS** (requisito do Windows Forms)

### 🐾 PetShop
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm ou yarn** - Gerenciador de pacotes JavaScript
- **Visual Studio 2022** ou VS Code (recomendado)

---

## 📖 Documentação Adicional

Cada projeto possui documentação detalhada com instruções específicas:

### 🏦 Desafio-BancoDigital
- [README Principal](./Desafio-BancoDigital/README.md) - Documentação completa
- [Docker Guide](./Desafio-BancoDigital/README-Docker.md) - Guia de containerização
- Scripts de gerenciamento Docker incluídos

### 📄 JuntaPDF
- [README Principal](./JuntaPDF/README.md) - Guia de uso e instalação

### 🐾 PetShop
- [README Principal](./PetShop/README.md) - Documentação completa
- [API Documentation](./PetShop/API_DOCS.md) - Detalhes dos endpoints
- [Quick Start Guide](./PetShop/QUICKSTART.md) - Início rápido
- [Executive Summary](./PetShop/EXECUTIVE_SUMMARY.md) - Visão executiva
- [Contributing Guide](./PetShop/CONTRIBUTING.md) - Como contribuir
- [Changelog](./PetShop/CHANGELOG.md) - Histórico de versões

---

## 🚀 Como Clonar e Executar

```powershell
# Clonar o repositório
git clone https://github.com/seu-usuario/CSharp.git
cd CSharp

# Executar Desafio-BancoDigital (Docker)
cd Desafio-BancoDigital
docker-compose up -d

# Executar JuntaPDF
cd ../JuntaPDF
dotnet run --project WinFormsApp1

# Executar PetShop
cd ../PetShop
# Terminal 1 - Backend
cd PetShop.API
dotnet run

# Terminal 2 - Frontend
cd ../petshop-frontend
npm install
npm run dev
```

---

## 💡 Destaques Técnicos

### 🏦 Desafio-BancoDigital
- **Performance**: Uso de Dapper para queries otimizadas
- **Escalabilidade**: Arquitetura de microserviços independentes
- **Resiliência**: Kafka para comunicação assíncrona confiável
- **Containerização**: Deploy simplificado com Docker Compose

### 📄 JuntaPDF
- **Segurança**: Processamento 100% offline
- **Usabilidade**: Interface intuitiva para usuários não técnicos
- **Performance**: Operações assíncronas para UI responsiva

### 🐾 PetShop
- **Integração**: Frontend e Backend perfeitamente sincronizados
- **Escalabilidade**: Preparado para migrar de SQLite para SQL Server
- **Extensibilidade**: Integração WhatsApp facilmente configurável
- **UX**: Interface moderna com feedback instantâneo

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do repositório
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas alterações (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

---

## 📝 Licença

Este repositório contém projetos educacionais e de demonstração. Consulte cada projeto individual para informações específicas sobre licenciamento.

---

## 👨‍💻 Autor

Desenvolvido com dedicação para demonstrar boas práticas de desenvolvimento em C# e .NET.

**Tecnologias Favoritas:** C#, .NET, Clean Architecture, Microservices, Docker, Windows Forms

---

**Última Atualização:** Dezembro 2025
