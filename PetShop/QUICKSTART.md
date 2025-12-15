# 🚀 Guia Rápido de Início

## Iniciar o Backend

1. Abra um terminal PowerShell na pasta do projeto:
```powershell
cd y:\GitHub\CSharp\PetShop\PetShop.API
dotnet run
```

2. Aguarde a mensagem: `🐾 PetShop API está rodando!`

3. Acesse o Swagger: https://localhost:7000/swagger

## Iniciar o Frontend

1. Abra outro terminal PowerShell:
```powershell
cd y:\GitHub\CSharp\PetShop\petshop-frontend
npm install
npm run dev
```

2. Acesse: http://localhost:3000

## Primeiro Acesso

1. Use as credenciais padrão:
   - Email: `admin@petshop.com`
   - Senha: `Admin@123`

2. Explore o sistema:
   - Dashboard com estatísticas
   - Cadastre clientes e pets
   - Crie serviços e profissionais
   - Configure horários disponíveis
   - Faça agendamentos

## Testar Agendamento Público

Acesse diretamente: http://localhost:3000/agendar

Não precisa de login! Simula o que um cliente veria.

## Estrutura de Testes

### 1. Cadastrar um Cliente
- Nome: João Silva
- Telefone: (11) 98765-4321
- Email: joao@email.com

### 2. Cadastrar um Pet
- Nome: Rex
- Espécie: Cachorro
- Raça: Labrador
- Cliente: João Silva

### 3. Cadastrar um Serviço
- Nome: Banho e Tosa
- Preço: R$ 80,00
- Duração: 60 minutos

### 4. Cadastrar um Profissional
- Nome: Maria Santos
- Telefone: (11) 99999-8888
- Especialidade: Groomer

### 5. Adicionar Horários ao Profissional
- Segunda a Sexta: 09:00 - 18:00
- Sábado: 09:00 - 14:00

### 6. Criar um Agendamento
- Pet: Rex
- Serviço: Banho e Tosa
- Profissional: Maria Santos
- Data/Hora: Escolha uma data futura

## Configurar WhatsApp (Opcional)

Edite `appsettings.json`:
```json
{
  "WhatsApp": {
    "ApiKey": "sua-chave-twilio",
    "ApiUrl": "https://api.twilio.com/2010-04-01"
  }
}
```

Descomente o código em `WhatsAppService.cs` para ativar o envio real.

## Troubleshooting

### Erro de certificado SSL
Execute no PowerShell:
```powershell
dotnet dev-certs https --trust
```

### Porta já em uso
Mude a porta em `launchSettings.json` ou `vite.config.js`

### Banco de dados não cria
Delete o arquivo `petshop.db` e execute novamente

## Endpoints Úteis

- API: https://localhost:7000
- Swagger: https://localhost:7000/swagger
- Frontend Admin: http://localhost:3000
- Agendamento Público: http://localhost:3000/agendar

## Dados de Teste

O sistema cria automaticamente:
- ✅ Usuário admin (admin@petshop.com)
- ⚠️ Você deve criar: clientes, pets, serviços e profissionais

## Dica: Insomnia/Postman

Importe a coleção do Swagger para testar a API diretamente.

---

**Pronto! Seu sistema de gestão para PetShop está funcionando! 🐾**
