# Mais Imobiliária 🏢

Uma plataforma modular completa para gestão imobiliária desenvolvida em React + TypeScript.

## 🚀 Funcionalidades

### 📊 Dashboard
- Visão geral com métricas em tempo real
- Gráficos de performance
- Leads recentes
- Evolução de vendas

### 🎯 5 Módulos Principais

#### 1. Pré-Vendas
- Gestão completa de leads
- Filtros por temperatura (frio, morno, quente)
- Cadastro rápido de novos leads
- Acompanhamento de origem

#### 2. Comercial
- Catálogo de imóveis
- Status de disponibilidade
- Busca avançada
- Informações detalhadas

#### 3. Administrativo
- Gestão de usuários
- Documentação
- Agenda e calendário
- Configurações do sistema

#### 4. Financeiro
- Controle de receitas e despesas
- Gráficos financeiros
- Métodos de pagamento
- Transações recentes
- Pagamento automático

#### 5. Pós-Venda
- Acompanhamento de clientes
- Pesquisa de satisfação
- Follow-up automatizado
- Feedbacks

### 📈 Funil de Vendas
- Pipeline visual completo
- 6 etapas: Novo → Contato → Visita → Proposta → Negociação → Fechamento
- **Termômetro de Leads** com classificação por temperatura
- Métricas de conversão
- Otimização do funil

### 🔗 Integrações com Portais
- ZapImóveis
- VivaReal
- OLX Imóveis
- ImovelWeb
- Sincronização automática
- WhatsApp Business
- Google Calendar
- Stripe (pagamentos)

### 📄 Gestão de Contratos
- Contratos de venda
- Contratos de locação
- Templates personalizáveis
- Download em PDF
- Status de contratos

### 💰 Controle de Comissões
- Cálculo automático
- Ranking de corretores
- Comissões pendentes
- Configuração de percentuais
- Histórico de pagamentos

### 📧 E-mails Automáticos
- Templates personalizados
- Parecer de visitas automático
- Envio de propostas
- Follow-up automatizado
- Confirmação de contratos
- Variáveis dinâmicas
- Histórico de envios

### 🤖 Pré-Atendimento Automatizado
- Respostas automáticas
- Qualificação de leads
- Distribuição inteligente

## 🛠️ Tecnologias

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router** - Navegação
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones
- **Context API** - Gerenciamento de estado

### Backend
- **ASP.NET Core 8** - Framework Web API
- **Entity Framework Core 8** - ORM
- **SQLite** - Banco de dados
- **C#** - Linguagem de programação

## 📦 Instalação e Execução

### Backend (C# API)

\`\`\`bash
# Entre na pasta do backend
cd Backend/ImobiliariaAPI

# Restaure as dependências
dotnet restore

# Execute o backend
dotnet run --urls=http://localhost:5000
\`\`\`

O backend estará rodando em: **http://localhost:5000**
Swagger UI disponível em: **http://localhost:5000/swagger**

### Frontend (React)

\`\`\`bash
# Entre na pasta raiz do projeto
cd Imobiliaria

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
\`\`\`

O frontend estará rodando em: **http://localhost:5173**

### Executar Ambos Simultaneamente

**Windows PowerShell:**
\`\`\`powershell
# Terminal 1 - Backend
cd Backend/ImobiliariaAPI
dotnet run --urls=http://localhost:5000

# Terminal 2 - Frontend
npm run dev
\`\`\`

## 🎯 Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
Backend/
└── ImobiliariaAPI/
    ├── Controllers/          # Controllers da API
    │   ├── LeadsController.cs
    │   ├── ImoveisController.cs
    │   ├── ContratosController.cs
    │   ├── ComissoesController.cs
    │   ├── CorretoresController.cs
    │   ├── TransacoesController.cs
    │   ├── EmailTemplatesController.cs
    │   └── DashboardController.cs
    ├── Models/              # Modelos de dados
    │   ├── Lead.cs
    │   ├── Imovel.cs
    │   ├── Contrato.cs
    │   ├── Comissao.cs
    │   ├── Corretor.cs
    │   ├── Transacao.cs
    │   └── EmailTemplate.cs
    ├── Data/                # DbContext
    │   └── ImobiliariaDbContext.cs
    ├── Program.cs           # Configuração da API
    ├── appsettings.json     # Configurações
    └── imobiliaria.db       # Banco SQLite (gerado automaticamente)

src/
├── components/          # Componentes reutilizáveis
│   └── Layout/         # Layout principal
├── contexts/           # Contextos React
│   └── AppContext.tsx
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx
│   ├── PreVendas.tsx
│   ├── Comercial.tsx
│   ├── Administrativo.tsx
│   ├── Financeiro.tsx
│   ├── PosVenda.tsx
│   ├── FunilVendas.tsx
│   ├── Integracoes.tsx
│   ├── Contratos.tsx
│   ├── Comissoes.tsx
│   └── EmailAutomatico.tsx
├── services/           # Serviços de API
│   └── api.ts
├── types/              # Definições TypeScript
│   └── index.ts
├── App.tsx            # Componente principal
├── main.tsx           # Entry point
└── index.css          # Estilos globais
\`\`\`

## 🔌 Endpoints da API

### Leads
- `GET /api/leads` - Listar todos os leads
- `GET /api/leads/{id}` - Obter lead específico
- `POST /api/leads` - Criar novo lead
- `PUT /api/leads/{id}` - Atualizar lead
- `DELETE /api/leads/{id}` - Deletar lead
- `GET /api/leads/funil` - Dados do funil de vendas
- `GET /api/leads/temperatura` - Dados de temperatura dos leads

### Imóveis
- `GET /api/imoveis` - Listar todos os imóveis
- `GET /api/imoveis/{id}` - Obter imóvel específico
- `POST /api/imoveis` - Criar novo imóvel
- `PUT /api/imoveis/{id}` - Atualizar imóvel
- `DELETE /api/imoveis/{id}` - Deletar imóvel

### Contratos
- `GET /api/contratos` - Listar todos os contratos
- `GET /api/contratos/{id}` - Obter contrato específico
- `POST /api/contratos` - Criar novo contrato
- `PUT /api/contratos/{id}` - Atualizar contrato
- `DELETE /api/contratos/{id}` - Deletar contrato

### Comissões
- `GET /api/comissoes` - Listar todas as comissões
- `GET /api/comissoes/{id}` - Obter comissão específica
- `POST /api/comissoes` - Criar nova comissão
- `PUT /api/comissoes/{id}` - Atualizar comissão
- `DELETE /api/comissoes/{id}` - Deletar comissão
- `GET /api/comissoes/ranking` - Ranking de corretores

### Transações
- `GET /api/transacoes` - Listar todas as transações
- `GET /api/transacoes/{id}` - Obter transação específica
- `POST /api/transacoes` - Criar nova transação
- `PUT /api/transacoes/{id}` - Atualizar transação
- `DELETE /api/transacoes/{id}` - Deletar transação
- `GET /api/transacoes/resumo` - Resumo financeiro

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas do dashboard
- `GET /api/dashboard/funil` - Dados do funil de vendas
- `GET /api/dashboard/vendas` - Dados de vendas mensais

### Email Templates
- `GET /api/emailtemplates` - Listar templates
- `GET /api/emailtemplates/{id}` - Obter template específico
- `POST /api/emailtemplates` - Criar novo template
- `PUT /api/emailtemplates/{id}` - Atualizar template
- `DELETE /api/emailtemplates/{id}` - Deletar template

## 🎨 Temas e Cores

- **Primary**: Blue (#0ea5e9)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)
- **Purple**: Purple (#8b5cf6)

## 📊 Funcionalidades Detalhadas

### Funil de Vendas com Termômetro
O funil de vendas possui visualização em barras horizontais mostrando:
- Quantidade de leads em cada etapa
- Taxa de conversão entre etapas
- Valor total em negociação

O termômetro de leads classifica por temperatura:
- **🔥 Quente** - Leads com alta probabilidade de conversão
- **🌡️ Morno** - Leads em andamento
- **❄️ Frio** - Leads que precisam de aquecimento

### Sistema de Automação
- **Parecer de Visitas**: Enviado automaticamente após visita
- **Propostas**: Notificação imediata ao cliente
- **Follow-up**: Após 3 dias sem resposta
- **Pagamentos**: Processamento automático com Stripe

### Otimização do Funil
Métricas calculadas automaticamente:
- Tempo médio no funil
- Taxa de abandono por etapa
- Valor médio do deal
- Taxa de conversão global

## 🔒 Segurança

- Autenticação de usuários
- Controle de permissões por módulo
- Logs de atividades
- Backup automático de dados

## 🌐 Integrações Futuras

- [ ] CRM Salesforce
- [ ] Assinaturas eletrônicas (DocuSign)
- [ ] Chatbot com IA
- [ ] App Mobile
- [ ] Integração com ERPs

## 📱 Responsivo

Interface totalmente responsiva para:
- Desktop
- Tablet
- Mobile

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

Desenvolvido com ❤️ para revolucionar a gestão imobiliária.

## 📞 Suporte

Para suporte, envie um email para suporte@maisimobiliaria.com.br

---

**Mais Imobiliária** - Gestão Imobiliária Completa 🏢
