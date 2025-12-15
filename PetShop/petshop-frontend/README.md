# 🎨 Frontend - PetShop

Interface administrativa moderna desenvolvida em React para gestão completa de petshops.

## 🚀 Tecnologias

- **React 18** - Biblioteca principal
- **React Router DOM** - Roteamento
- **Axios** - Requisições HTTP
- **React Toastify** - Notificações
- **Lucide React** - Ícones
- **Date-fns** - Manipulação de datas
- **Vite** - Build tool

## 📁 Estrutura

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.jsx      # Layout principal com sidebar
│   ├── Layout.css
│   └── PrivateRoute.jsx # Proteção de rotas
├── contexts/           # Context API
│   └── AuthContext.jsx # Gerenciamento de autenticação
├── pages/              # Páginas da aplicação
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Clientes.jsx
│   ├── Pets.jsx
│   ├── Servicos.jsx
│   ├── Profissionais.jsx
│   ├── Agendamentos.jsx
│   ├── AgendamentoPublico.jsx
│   └── Relatorios.jsx
├── services/           # Configuração de serviços
│   └── api.js         # Cliente Axios configurado
├── App.jsx            # Componente raiz com rotas
├── main.jsx           # Entry point
└── index.css          # Estilos globais
```

## 🎯 Funcionalidades

### Autenticação
- Login com JWT
- Armazenamento seguro de tokens
- Redirecionamento automático ao expirar
- Contexto global de usuário

### Dashboard
- Cards com estatísticas principais
- Gráfico de serviços mais utilizados
- Profissionais mais ocupados
- Filtros por período

### Gestão de Clientes
- Listagem com busca
- Cadastro completo
- Edição inline
- Soft delete

### Gestão de Pets
- Listagem por cliente
- Vínculo automático com cliente
- Informações detalhadas
- Histórico de atendimentos

### Gestão de Serviços
- Catálogo completo
- Preços e durações
- Ativação/desativação
- Descrições detalhadas

### Agendamentos
- Calendário visual
- Filtros por status
- Confirmação/cancelamento
- Validação de conflitos
- Integração com WhatsApp

### Agendamento Público
- Página sem autenticação
- Formulário simplificado
- Criação automática de cliente/pet
- Escolha de horários disponíveis

## 🎨 Design System

### Cores Principais
- **Primary:** #4f46e5 (Indigo)
- **Success:** #10b981 (Green)
- **Warning:** #f59e0b (Amber)
- **Danger:** #ef4444 (Red)
- **Info:** #3b82f6 (Blue)

### Componentes

#### Buttons
```jsx
<button className="btn btn-primary">Salvar</button>
<button className="btn btn-secondary">Cancelar</button>
<button className="btn btn-success">Confirmar</button>
<button className="btn btn-danger">Excluir</button>
```

#### Cards
```jsx
<div className="card">
  <div className="card-header">Título</div>
  <div>Conteúdo</div>
</div>
```

#### Forms
```jsx
<div className="form-group">
  <label className="form-label">Nome</label>
  <input className="form-input" type="text" />
</div>
```

#### Modals
```jsx
{showModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Título do Modal</h2>
      {/* Conteúdo */}
      <div className="modal-actions">
        <button className="btn btn-secondary">Cancelar</button>
        <button className="btn btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
)}
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=https://localhost:7000/api
```

### Proxy de Desenvolvimento

O Vite está configurado para fazer proxy para a API:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1920x1080+)
- Laptop (1366x768+)
- Tablet (768x1024+)
- Mobile (375x667+)

## 🔒 Autenticação

### Fluxo de Login
1. Usuário envia credenciais
2. API retorna token JWT
3. Token é armazenado no localStorage
4. Token é adicionado em todas as requisições
5. Ao expirar, usuário é redirecionado ao login

### Proteção de Rotas
```jsx
<Route element={<PrivateRoute />}>
  <Route element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    {/* Outras rotas protegidas */}
  </Route>
</Route>
```

## 🎯 Melhorias Futuras

- [ ] Tema escuro
- [ ] Drag-and-drop na agenda
- [ ] Upload de fotos dos pets
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] PWA (Progressive Web App)
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Multi-idioma (i18n)
- [ ] Modo offline

## 🐛 Troubleshooting

### Erro de CORS
Certifique-se de que a API está rodando e configurada corretamente.

### Erro de certificado SSL
Execute no PowerShell:
```powershell
dotnet dev-certs https --trust
```

### Módulos não encontrados
```bash
npm install
```

### Porta em uso
Mude a porta em `vite.config.js`:
```javascript
server: {
  port: 3001
}
```

## 📚 Documentação Adicional

- [React](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com)
- [Vite](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

**Interface desenvolvida com foco em usabilidade e performance**
