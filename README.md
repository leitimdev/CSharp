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

#### ✨ Diferenciais

- **Segurança**: Processamento 100% local, sem envio de dados para nuvem
- **Gratuito**: Solução open-source sem custos adicionais
- **Eficiente**: Interface responsiva com feedback visual de progresso
- **Profissional**: Arquitetura organizada com separação de responsabilidades

---

## 📊 Resumo Comparativo

| Projeto | Tipo | Framework | Principais Tecnologias | Propósito |
|---------|------|-----------|------------------------|-----------|
| **Desafio-BancoDigital** | Web API (Microserviços) | .NET 8.0 | ASP.NET Core, Oracle, Kafka, Docker | Sistema bancário com transferências |
| **JuntaPDF** | Desktop App | .NET 8.0 | Windows Forms, iText 7 | Mesclagem de arquivos PDF |

---

## 🎓 Conceitos e Padrões Demonstrados

### Desafio-BancoDigital
- ✅ Microservices Architecture
- ✅ Clean Architecture
- ✅ CQRS Pattern
- ✅ Domain Driven Design (DDD)
- ✅ Repository Pattern
- ✅ Event-Driven Architecture
- ✅ Containerization with Docker
- ✅ Message Broker (Kafka)
- ✅ JWT Authentication
- ✅ API Documentation (Swagger)
- ✅ Health Checks

### JuntaPDF
- ✅ Service Layer Pattern
- ✅ Interface-based Design
- ✅ Async/Await Programming
- ✅ Error Handling
- ✅ Desktop Application Development
- ✅ PDF Manipulation

---

## 🛠️ Pré-requisitos Gerais

Para executar os projetos deste repositório, você precisará:

### Para Desafio-BancoDigital:
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/downloads)

### Para JuntaPDF:
- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Visual Studio 2022** (recomendado) ou VS Code
- **Windows OS** (requisito do Windows Forms)

---

## 📖 Documentação Adicional

Cada projeto possui seu próprio README.md detalhado com instruções específicas de instalação, configuração e uso:

- [README - Desafio-BancoDigital](./Desafio-BancoDigital/README.md)
- [README - JuntaPDF](./JuntaPDF/README.md)

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
