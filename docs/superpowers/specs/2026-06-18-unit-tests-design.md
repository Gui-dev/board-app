# Plano de Testes Unitários — Frontend

## Escopo

Infraestrutura de testes + testes para os alvos iniciais do frontend. Sem testes de API (Hono).

### Alvos

| Alvo | Arquivos | Tipo |
|------|----------|------|
| button | `src/components/button.tsx` | Componente presentacional |
| card | `src/components/card.tsx` | Compound component presentacional |
| input | `src/components/input.tsx` | Componente presentacional |
| sections | `src/components/sections.tsx` | Compound component presentacional |
| auth-client | `src/lib/auth-client.ts` | Lib (Better Auth client) |
| api-env | `src/utils/api-env.ts` | Utilitário |
| env-client | `src/utils/env-client.ts` | Utilitário |

## Infraestrutura

### Dependências (devDependencies)

- `vitest` — test runner
- `@vitejs/plugin-react` — transform JSX nos testes
- `jsdom` — ambiente DOM para componentes
- `@testing-library/react` — renderização de componentes
- `@testing-library/jest-dom` — matchers DOM (toBeInTheDocument, etc.)
- `@testing-library/user-event` — interações realísticas (vs fireEvent)
- `msw` — mock de fetch para chamadas de API

### Arquivos de Configuração

**`vitest.config.ts`** (raiz do projeto):
- `environment: 'jsdom'`
- Alias `@/` → `./src/*`
- `setupFiles: ['./src/test/setup.ts']`
- `globals: true` (describe, it, expect globais)

**`src/test/setup.ts`**:
- `import '@testing-library/jest-dom/vitest'` — matchers DOM
- `vi.mock('next/navigation')` — mock de roteamento
- `vi.mock('next/image')` — mock de otimização de imagem
- MSW lifecycle: `beforeAll/afterEach/afterAll` com `server.listen/reset/close`

### MSW

**`src/test/msw/server.ts`**:
- `setupServer(...handlers)` — servidor MSW

**`src/test/msw/handlers.ts`**:
- Handlers vazios inicialmente; estrutura preparada para expansão

## Nomeação e Localização

Testes co-localizados com o arquivo fonte, padrão `[nome].spec.tsx` (componentes) / `[nome].spec.ts` (lib/utils).

Formato:
- `describe('<Button />')` / `describe('authClient')`
- `it('should render correctly')` / `it('should ...')` em inglês

## Planos de Teste

### `button.spec.tsx`

| Teste | Descrição |
|-------|-----------|
| renders as a button element | Verifica que `<button>` é renderizado com o texto passado via children |
| renders as disabled | Quando `disabled` é true, o botão tem atributo disabled e não responde a clique |
| merges custom className | `className` customizado é mergeado com o default via twMerge |

### `input.spec.tsx`

| Teste | Descrição |
|-------|-----------|
| renders as an input element | Verifica que `<input>` é renderizado com placeholder passado |
| accepts value and onChange | Simula digitação com `userEvent.type()` e verifica o callback |
| merges custom className | `className` customizado é mergeado com o default via twMerge |

### `card.spec.tsx`

| Teste | Descrição |
|-------|-----------|
| renders Card.Root as a link | Verifica `<a>` com href |
| renders Card.Header children | Verifica que conteúdo filho aparece no header |
| renders Card.Title as heading | Verifica `<h3>` com o texto |
| renders Card.Number | Verifica que o número aparece |
| renders Card.Footer | Verifica que conteúdo filho aparece no footer |

### `sections.spec.tsx`

| Teste | Descrição |
|-------|-----------|
| renders Section.Root as a section | Verifica `<section>` com className |
| renders Section.Header | Verifica conteúdo filho no header |
| renders Section.Title as heading | Verifica `<h2>` com o texto |
| renders Section.IssueCount | Verifica o contador (children) |
| renders Section.Content | Verifica conteúdo filho no content |

### `auth-client.spec.ts`

| Teste | Descrição |
|-------|-----------|
| exports authClient object | Verifica que `authClient` é exportado como objeto |
| exports authClient.useSession | Verifica que `useSession` é uma função |

### `api-env.spec.ts`

| Teste | Descrição |
|-------|-----------|
| exports API env getter | Verifica que a função exportada existe |
| returns value from env | Verifica que retorna `process.env` mocado |

### `env-client.spec.ts`

| Teste | Descrição |
|-------|-----------|
| exports client env getter | Verifica que a função exportada existe |
| returns value from env | Verifica que retorna `process.env` mocado |

## Queries

- Preferir `getByRole` e `getByLabelText`
- `getByText` como fallback
- `testId` apenas em último caso (evitar)

## Interação

- Sempre `userEvent.setup()` → `user.click()`, `user.type()`
- Nunca `fireEvent`

## Fora do Escopo (futuro)

- Testes do componente `header.tsx` (auth + search com debounce + NuqsAdapter)
- Testes do `page.tsx` (server component)
- Testes de API (Hono routes)
- Testes de hooks (quando `src/hooks/` existir)
