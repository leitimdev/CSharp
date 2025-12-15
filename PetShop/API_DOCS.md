# 📡 Documentação da API - PetShop

## Base URL
```
https://localhost:7000/api
```

## Autenticação

A API usa **JWT Bearer Token** para autenticação.

### Como autenticar:

1. Faça login para obter o token:
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@petshop.com",
  "senha": "Admin@123"
}
```

2. Use o token nas requisições:
```http
GET /api/clientes
Authorization: Bearer {seu-token-aqui}
```

### Resposta do Login:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "nome": "Administrador",
  "email": "admin@petshop.com",
  "role": "Admin"
}
```

## Endpoints Públicos (sem autenticação)

### Listar Serviços
```http
GET /api/servicos
```

### Listar Profissionais
```http
GET /api/profissionais
```

### Verificar Disponibilidade
```http
GET /api/agendamentos/verificar-disponibilidade?dataHora=2024-12-20T14:00:00&profissionalId=1&duracaoMinutos=60
```

### Obter Horários Disponíveis
```http
GET /api/agendamentos/horarios-disponiveis?profissionalId=1&servicoId=1&data=2024-12-20
```

### Criar Agendamento Público
```http
POST /api/agendamentos/publico
Content-Type: application/json

{
  "nomeCliente": "João Silva",
  "telefoneCliente": "(11) 98765-4321",
  "emailCliente": "joao@email.com",
  "nomePet": "Rex",
  "especiePet": "Cachorro",
  "servicoId": 1,
  "profissionalId": 1,
  "dataHora": "2024-12-20T14:00:00"
}
```

## Endpoints Administrativos (requer autenticação)

### Clientes

#### Listar Todos
```http
GET /api/clientes
Authorization: Bearer {token}
```

#### Obter por ID
```http
GET /api/clientes/{id}
Authorization: Bearer {token}
```

#### Criar
```http
POST /api/clientes
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "email": "joao@email.com",
  "endereco": "Rua Exemplo, 123",
  "cpf": "123.456.789-00"
}
```

#### Atualizar
```http
PUT /api/clientes/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva",
  "telefone": "(11) 98765-4321",
  "email": "joao@email.com",
  "endereco": "Rua Exemplo, 123",
  "cpf": "123.456.789-00",
  "ativo": true
}
```

#### Deletar
```http
DELETE /api/clientes/{id}
Authorization: Bearer {token}
```

### Pets

#### Listar Todos
```http
GET /api/pets
Authorization: Bearer {token}
```

#### Listar por Cliente
```http
GET /api/pets/cliente/{clienteId}
Authorization: Bearer {token}
```

#### Criar
```http
POST /api/pets
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Rex",
  "especie": "Cachorro",
  "raca": "Labrador",
  "dataNascimento": "2020-05-15",
  "sexo": "Macho",
  "peso": 25.5,
  "cor": "Amarelo",
  "observacoes": "Muito dócil",
  "clienteId": 1
}
```

### Agendamentos

#### Listar com Filtros
```http
GET /api/agendamentos?dataInicio=2024-12-01&dataFim=2024-12-31
Authorization: Bearer {token}
```

#### Criar
```http
POST /api/agendamentos
Authorization: Bearer {token}
Content-Type: application/json

{
  "dataHora": "2024-12-20T14:00:00",
  "petId": 1,
  "servicoId": 1,
  "profissionalId": 1,
  "observacoes": "Pet com medo de barulho"
}
```

#### Confirmar
```http
POST /api/agendamentos/{id}/confirmar
Authorization: Bearer {token}
```

#### Cancelar
```http
POST /api/agendamentos/{id}/cancelar
Authorization: Bearer {token}
```

### Relatórios (somente Admin)

#### Dashboard Completo
```http
GET /api/relatorios/dashboard?dataInicio=2024-12-01&dataFim=2024-12-31
Authorization: Bearer {token}
```

Resposta:
```json
{
  "periodo": {
    "dataInicio": "2024-12-01T00:00:00",
    "dataFim": "2024-12-31T23:59:59"
  },
  "totais": {
    "totalAgendamentos": 150,
    "agendamentosConcluidos": 120,
    "agendamentosCancelados": 10,
    "agendamentosPendentes": 20
  },
  "financeiro": {
    "faturamentoTotal": 12000.00,
    "faturamentoEstimado": 14000.00
  },
  "servicosMaisUtilizados": [
    {
      "servicoId": 1,
      "nomeServico": "Banho e Tosa",
      "quantidade": 80,
      "faturamento": 6400.00
    }
  ],
  "profissionaisMaisOcupados": [
    {
      "profissionalId": 1,
      "nomeProfissional": "Maria Santos",
      "quantidade": 95
    }
  ]
}
```

#### Clientes Frequentes
```http
GET /api/relatorios/clientes-frequentes?top=10
Authorization: Bearer {token}
```

## Códigos de Status HTTP

- `200 OK` - Sucesso
- `201 Created` - Recurso criado
- `204 No Content` - Sucesso sem conteúdo (delete)
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

## Mensagens de Erro

```json
{
  "message": "Descrição do erro"
}
```

Exemplos:
- `"Horário não disponível"`
- `"Email ou senha inválidos"`
- `"Serviço não encontrado"`

## Tipos de Status de Agendamento

- `Agendado` - Criado, aguardando confirmação
- `Confirmado` - Cliente confirmou presença
- `EmAndamento` - Serviço está sendo realizado
- `Concluido` - Serviço finalizado
- `Cancelado` - Agendamento cancelado

## Integração WhatsApp

As mensagens são enviadas automaticamente quando:

1. **Agendamento criado** → Confirmação
2. **1 dia antes** → Lembrete (via job automático)
3. **Agendamento cancelado** → Notificação

### Formato das Mensagens

#### Confirmação:
```
🐾 *Agendamento Confirmado - PetShop*

Olá *João Silva*!

Seu agendamento foi confirmado com sucesso:

📅 Data: 20/12/2024
🕐 Horário: 14:00
🐕 Pet: Rex
✂️ Serviço: Banho e Tosa
👤 Profissional: Maria Santos
💰 Valor: R$ 80,00

Por favor, chegue com 10 minutos de antecedência.
```

## Paginação

Por padrão, as listagens retornam todos os registros ativos. Para grandes volumes, implemente paginação:

```http
GET /api/clientes?page=1&pageSize=20
```

## CORS

A API aceita requisições de qualquer origem em desenvolvimento. Em produção, configure domínios específicos.

## Rate Limiting

Sem limite em desenvolvimento. Em produção, implemente rate limiting para prevenir abuso.

## Versionamento

Versão atual: `v1`

Futuras versões terão prefixo: `/api/v2/...`

## Suporte

Para dúvidas sobre a API:
- Acesse o Swagger: https://localhost:7000/swagger
- Consulte o README.md
- Veja exemplos no frontend

---

**Documentação gerada automaticamente via Swagger/OpenAPI**
