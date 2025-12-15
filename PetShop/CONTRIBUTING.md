# 🤝 Contribuindo para o Sistema PetShop

Obrigado pelo interesse em contribuir! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 📜 Código de Conduta

### Nosso Compromisso

Estamos comprometidos em fornecer uma experiência acolhedora e inspiradora para todos.

### Comportamento Esperado

- Use linguagem acolhedora e inclusiva
- Respeite diferentes pontos de vista
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

### Comportamento Inaceitável

- Uso de linguagem ou imagens sexualizadas
- Trolling, comentários insultuosos ou depreciativos
- Assédio público ou privado
- Publicar informações privadas de terceiros
- Outras condutas consideradas inapropriadas

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
git clone https://github.com/seu-usuario/petshop.git
cd petshop
```

### 2. Crie uma Branch

```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

### 3. Faça suas Alterações

- Escreva código limpo e bem documentado
- Siga os padrões de código do projeto
- Adicione testes quando apropriado
- Atualize a documentação se necessário

### 4. Commit suas Alterações

Use commits semânticos:

```bash
git commit -m "feat: adiciona sistema de notificações"
git commit -m "fix: corrige erro ao criar agendamento"
git commit -m "docs: atualiza README com novas instruções"
```

#### Tipos de Commit

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas gerais

### 5. Push para o GitHub

```bash
git push origin feature/nova-funcionalidade
```

### 6. Abra um Pull Request

- Descreva as mudanças claramente
- Referencie issues relacionadas
- Inclua screenshots se aplicável
- Aguarde revisão

## 💻 Padrões de Código

### Backend (C#)

#### Nomenclatura

```csharp
// Classes: PascalCase
public class ClienteService { }

// Métodos: PascalCase
public async Task<Cliente> ObterPorIdAsync(int id) { }

// Variáveis privadas: _camelCase
private readonly PetShopDbContext _context;

// Propriedades: PascalCase
public string Nome { get; set; }

// Constantes: UPPER_CASE
private const string DEFAULT_CONNECTION = "Data Source=petshop.db";
```

#### Boas Práticas

- Use `async/await` para operações assíncronas
- Sempre use injeção de dependência
- DTOs para transferência de dados
- Validações no backend
- Try-catch apropriados
- Logging de erros
- Comentários em código complexo

```csharp
// ❌ Ruim
public Cliente Get(int id) {
    return context.Clientes.Find(id);
}

// ✅ Bom
public async Task<ClienteDto?> ObterPorIdAsync(int id)
{
    var cliente = await _context.Clientes.FindAsync(id);
    return cliente == null ? null : MapearParaDto(cliente);
}
```

### Frontend (React)

#### Nomenclatura

```javascript
// Componentes: PascalCase
export default function ClientesList() { }

// Funções: camelCase
async function loadClientes() { }

// Variáveis: camelCase
const [clientes, setClientes] = useState([])

// Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://localhost:7000/api'

// Arquivos de componentes: PascalCase.jsx
// ClientesList.jsx, Dashboard.jsx
```

#### Boas Práticas

- Componentes funcionais com hooks
- Use destructuring
- PropTypes ou TypeScript
- Evite inline styles (use CSS)
- Loading states
- Error handling
- Comentários explicativos

```javascript
// ❌ Ruim
function List(props) {
  return <div>{props.items.map(i => <div>{i}</div>)}</div>
}

// ✅ Bom
export default function ItemList({ items, onItemClick }) {
  if (!items?.length) {
    return <EmptyState message="Nenhum item encontrado" />
  }

  return (
    <ul className="item-list">
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}
```

## 🔄 Processo de Desenvolvimento

### 1. Planejamento

- Discuta grandes mudanças via issues
- Defina escopo e requisitos
- Verifique se já não está sendo feito

### 2. Desenvolvimento

- Escreva código limpo
- Siga os padrões estabelecidos
- Comente código complexo
- Faça commits pequenos e frequentes

### 3. Testes

- Teste localmente
- Verifique em diferentes navegadores
- Teste em mobile
- Execute testes automatizados

### 4. Documentação

- Atualize README se necessário
- Documente novas APIs
- Adicione comentários
- Atualize CHANGELOG

### 5. Review

- Submeta Pull Request
- Responda a comentários
- Faça ajustes solicitados
- Aguarde aprovação

## 🐛 Reportando Bugs

### Antes de Reportar

- Verifique se o bug já foi reportado
- Tente reproduzir em ambiente limpo
- Colete informações necessárias

### Como Reportar

Crie uma issue com:

```markdown
**Descrição**
Descrição clara do bug

**Passos para Reproduzir**
1. Acesse '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Comportamento Atual**
O que realmente acontece

**Screenshots**
Se aplicável

**Ambiente**
- OS: Windows 11
- Navegador: Chrome 120
- Versão do .NET: 8.0
- Node: 20.10.0

**Informações Adicionais**
Qualquer contexto extra
```

## 💡 Sugerindo Melhorias

### Antes de Sugerir

- Verifique se já não foi sugerido
- Verifique o roadmap do projeto
- Pense na viabilidade técnica

### Como Sugerir

Crie uma issue com:

```markdown
**Resumo da Funcionalidade**
Descrição breve

**Motivação**
Por que isso seria útil?

**Descrição Detalhada**
Como funcionaria?

**Alternativas Consideradas**
Outras formas de fazer

**Informações Adicionais**
Mockups, exemplos, referências
```

## 📚 Recursos Úteis

### Documentação

- [ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [React](https://react.dev)
- [React Router](https://reactrouter.com)

### Ferramentas

- [Visual Studio Code](https://code.visualstudio.com)
- [Visual Studio 2022](https://visualstudio.microsoft.com)
- [Postman](https://postman.com)
- [Git](https://git-scm.com)

## ❓ Dúvidas

Tem dúvidas? Abra uma issue com a label `question` ou entre em contato.

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---

**Obrigado por contribuir! 🐾**
