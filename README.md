# 🎯 Repositório C# - Projetos e Soluções

Este repositório contém projetos desenvolvidos em C# com diferentes propósitos e tecnologias. Abaixo, você encontrará uma descrição detalhada de cada projeto, suas funcionalidades e as tecnologias utilizadas.

---

## 📂 Estrutura de Projetos

### 🏦 [Desafio-BancoDigital](./Desafio-BancoDigital)

**Sistema Bancário Completo com Arquitetura de Microserviços**

Um sistema bancário robusto desenvolvido em .NET 8 que implementa operações de conta corrente e transferências bancárias com alta performance, segurança e escalabilidade.

#### 🎯 Funcionalidades Principais
- Gestão completa de contas correntes (cadastro, autenticação, consulta)
- Sistema de transferências entre contas com controle de idempotência
- Movimentações financeiras (débitos e créditos) com histórico
- Autenticação JWT com criptografia BCrypt
- Comunicação assíncrona entre microserviços via Apache Kafka
- Containerização completa com Docker e Docker Compose

#### 🛠️ Stack Tecnológica

**Backend & Framework:**
- **.NET 8.0** - Framework principal
- **C# 11** - Linguagem de programação
- **ASP.NET Core Web API** - Framework web

**Arquitetura & Padrões:**
- **Clean Architecture** - Organização de código em camadas
- **CQRS Pattern** - Command Query Responsibility Segregation
- **MediatR** (v12.2.0) - Mediator Pattern
- **DDD** - Domain Driven Design
- **Repository Pattern** - Abstração de dados

**Banco de Dados & ORM:**
- **Oracle Database 21c XE** - Banco de dados relacional
- **Dapper** (v2.1.35) - Micro ORM de alta performance
- **Oracle.ManagedDataAccess.Core** (v23.9.1) - Driver .NET para Oracle

**Mensageria & Eventos:**
- **Apache Kafka** (v7.4.0) - Message Broker
- **Confluent Platform** - Ecossistema Kafka completo
- **Zookeeper** - Coordenação de serviços Kafka
- **Kafka UI** - Interface de gerenciamento

**Segurança:**
- **JWT Bearer Authentication** - Autenticação stateless
- **BCrypt.Net-Next** (v4.0.3) - Hash seguro de senhas
- **System.IdentityModel.Tokens.Jwt** (v7.1.2) - Geração de tokens
- **Microsoft.AspNetCore.Authentication.JwtBearer** (v8.0.0)

**DevOps & Containers:**
- **Docker** - Containerização de aplicações
- **Docker Compose** - Orquestração de múltiplos containers
- **Multi-stage Dockerfile** - Otimização de imagens

**Documentação & Testes:**
- **Swagger/OpenAPI** (v6.4.0) - Documentação automática de API
- **Health Checks** - Monitoramento de saúde dos serviços
- **API Testing** - Arquivos .http para testes

#### 📦 Microserviços

1. **Api_ContaCorrente**
   - Gerenciamento de contas correntes
   - Autenticação e autorização de usuários
   - Operações de depósito e saque
   - Consulta de saldo e extrato

2. **Api_Transferencia**
   - Transferências entre contas
   - Validação de saldo e limites
   - Controle de idempotência
   - Registro de histórico de transferências

#### 🚀 Como Executar

```powershell
# Navegar até o diretório do projeto
cd Desafio-BancoDigital

# Iniciar todos os serviços com Docker Compose
docker-compose up -d

# Verificar status dos containers
docker-compose ps

# Acessar as APIs
# Api_ContaCorrente: http://localhost:5001
# Api_Transferencia: http://localhost:5002
# Swagger ContaCorrente: http://localhost:5001/swagger
# Swagger Transferencia: http://localhost:5002/swagger
```

---

### 📄 [JuntaPDF](./JuntaPDF)

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
