# Frontend Unit Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up Vitest + RTL + MSW testing infrastructure and write unit tests for button, card, input, sections, auth-client, api-env, and env-client.

**Architecture:** Tests co-located with source files. Vitest with jsdom environment, React Testing Library for component rendering, MSW for API mocking. No tests for the complex header component (deferred).

**Tech Stack:** Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, MSW, jsdom, @vitejs/plugin-react

---

## File Structure

### Files to Create

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Vitest configuration (jsdom, path alias, setup) |
| `src/test/setup.ts` | Global test setup (jest-dom, MSW lifecycle, Next.js mocks) |
| `src/test/msw/server.ts` | MSW server instance |
| `src/test/msw/handlers.ts` | MSW request handlers (empty, for future expansion) |
| `src/components/button.spec.tsx` | Button component tests |
| `src/components/input.spec.tsx` | Input component tests |
| `src/components/card.spec.tsx` | Card compound component tests |
| `src/components/sections.spec.tsx` | Section compound component tests |
| `src/lib/auth-client.spec.ts` | auth-client module tests |
| `src/utils/api-env.spec.ts` | api-env module tests |
| `src/utils/env-client.spec.ts` | env-client module tests |

### Files to Modify

| File | Change |
|------|--------|
| `package.json` | Add devDependencies + test scripts |

---

### Task 1: Install Dependencies

- [ ] **Step 1: Install vitest and test packages**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event msw
```

Expected: packages added to devDependencies in package.json.

- [ ] **Step 2: Verify installation**

```bash
pnpm ls -r --depth=0 -D | grep -E 'vitest|testing-library|msw|jsdom'
```

Expected: all packages listed.

---

### Task 2: Create Vitest Config

**Files:**
- Create: `vitest.config.ts`

- [ ] **Step 1: Write vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
```

- [ ] **Step 2: Verify vitest can start**

```bash
pnpm vitest --version
```

Expected: prints vitest version number.

---

### Task 3: Create Test Infrastructure

**Files:**
- Create: `src/test/setup.ts`
- Create: `src/test/msw/server.ts`
- Create: `src/test/msw/handlers.ts`

- [ ] **Step 1: Create MSW handlers file**

```ts
import { http } from 'msw'

export const handlers = [
  // Add API handlers here as needed
]
```

- [ ] **Step 2: Create MSW server**

```ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

- [ ] **Step 3: Create test setup file**

```ts
import '@testing-library/jest-dom/vitest'
import { server } from './msw/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

- [ ] **Step 4: Verify setup works**

Create a temporary test file to confirm vitest runs:

```bash
pnpm vitest run --reporter=verbose 2>&1 | head -20
```

Expected: "No test files found" or similar (no errors from setup file).

---

### Task 4: Write Button Tests

**Files:**
- Create: `src/components/button.spec.tsx`

- [ ] **Step 1: Write button test file**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('<Button />', () => {
  it('renders as a button element with children', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('renders as disabled when disabled prop is passed', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    )

    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('merges custom className with default classes', () => {
    render(<Button className="custom-class">Styled</Button>)
    const button = screen.getByRole('button', { name: /styled/i })
    expect(button.className).toContain('custom-class')
  })
})
```

- [ ] **Step 2: Run tests to verify**

```bash
pnpm vitest run src/components/button.spec.tsx --reporter=verbose
```

Expected: 3 tests, all PASS.

---

### Task 5: Write Input Tests

**Files:**
- Create: `src/components/input.spec.tsx`

- [ ] **Step 1: Write input test file**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('<Input />', () => {
  it('renders as an input element with placeholder', () => {
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    expect(input).toBeInTheDocument()
  })

  it('accepts value and fires onChange on user input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'a')
    expect(handleChange).toHaveBeenCalled()
  })

  it('merges custom className with default classes', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('custom-class')
  })
})
```

- [ ] **Step 2: Run tests to verify**

```bash
pnpm vitest run src/components/input.spec.tsx --reporter=verbose
```

Expected: 3 tests, all PASS.

---

### Task 6: Write Card Tests

**Files:**
- Create: `src/components/card.spec.tsx`

- [ ] **Step 1: Write card test file**

```tsx
import { render, screen } from '@testing-library/react'
import { Card } from './card'

describe('<Card />', () => {
  it('renders Card.Root as a link with href', () => {
    render(<Card.Root>Link</Card.Root>)
    const link = screen.getByRole('link', { name: /link/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders Card.Header children', () => {
    render(<Card.Header><span>Header content</span></Card.Header>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('renders Card.Title text', () => {
    render(<Card.Title>Issue Title</Card.Title>)
    expect(screen.getByText('Issue Title')).toBeInTheDocument()
  })

  it('renders Card.Number text', () => {
    render(<Card.Number>ECO-001</Card.Number>)
    expect(screen.getByText('ECO-001')).toBeInTheDocument()
  })

  it('renders Card.Footer children', () => {
    render(<Card.Footer><span>Footer content</span></Card.Footer>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify**

```bash
pnpm vitest run src/components/card.spec.tsx --reporter=verbose
```

Expected: 5 tests, all PASS.

---

### Task 7: Write Sections Tests

**Files:**
- Create: `src/components/sections.spec.tsx`

- [ ] **Step 1: Write sections test file**

```tsx
import { render, screen } from '@testing-library/react'
import { Section } from './sections'

describe('<Section />', () => {
  it('renders Section.Root with children', () => {
    render(<Section.Root>Content</Section.Root>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders Section.Header children', () => {
    render(<Section.Header><span>Header</span></Section.Header>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('renders Section.Title text', () => {
    render(<Section.Title>To Do</Section.Title>)
    expect(screen.getByText('To Do')).toBeInTheDocument()
  })

  it('renders Section.IssueCount text', () => {
    render(<Section.IssueCount>3</Section.IssueCount>)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders Section.Content children', () => {
    render(<Section.Content><span>Card list</span></Section.Content>)
    expect(screen.getByText('Card list')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify**

```bash
pnpm vitest run src/components/sections.spec.tsx --reporter=verbose
```

Expected: 5 tests, all PASS.

---

### Task 8: Write auth-client Tests

**Files:**
- Create: `src/lib/auth-client.spec.ts`

- [ ] **Step 1: Write auth-client test file**

```ts
import { describe, it, expect } from 'vitest'

describe('authClient', () => {
  it('exports an authClient object', async () => {
    const { authClient } = await import('./auth-client')
    expect(authClient).toBeDefined()
    expect(typeof authClient).toBe('object')
  })

  it('exports useSession as a function', async () => {
    const { authClient } = await import('./auth-client')
    expect(typeof authClient.useSession).toBe('function')
  })
})
```

- [ ] **Step 2: Run tests to verify**

```bash
pnpm vitest run src/lib/auth-client.spec.ts --reporter=verbose
```

Expected: 2 tests, all PASS.

---

### Task 9: Write api-env Tests

**Files:**
- Create: `src/utils/api-env.spec.ts`

- [ ] **Step 1: Write api-env test file**

```ts
import { describe, it, expect, beforeEach } from 'vitest'

describe('apiEnv', () => {
  beforeEach(() => {
    process.env.DATABASE_URL = 'https://example.com/db'
    process.env.BETTER_AUTH_SECRET = 'a'.repeat(32)
    process.env.BETTER_AUTH_URL = 'https://example.com/auth'
    process.env.GITHUB_CLIENT_ID = 'client-id'
    process.env.GITHUB_CLIENT_SECRET = 'client-secret'
  })

  it('exports apiEnv with parsed environment variables', async () => {
    const { apiEnv } = await import('./api-env')
    expect(apiEnv.DATABASE_URL).toBe('https://example.com/db')
    expect(apiEnv.BETTER_AUTH_SECRET).toBe('a'.repeat(32))
    expect(apiEnv.BETTER_AUTH_URL).toBe('https://example.com/auth')
    expect(apiEnv.GITHUB_CLIENT_ID).toBe('client-id')
    expect(apiEnv.GITHUB_CLIENT_SECRET).toBe('client-secret')
  })
})
```

- [ ] **Step 2: Run tests to verify**

```bash
pnpm vitest run src/utils/api-env.spec.ts --reporter=verbose
```

Expected: 1 test, PASS.

---

### Task 10: Write env-client Tests

**Files:**
- Create: `src/utils/env-client.spec.ts`

- [ ] **Step 1: Write env-client test file**

```ts
import { describe, it, expect } from 'vitest'

describe('envClient', () => {
  it('exports envClient with default API URL when env not set', async () => {
    // Ensure NEXT_PUBLIC_API_URL is not set
    delete process.env.NEXT_PUBLIC_API_URL

    // Need to clear module cache so Zod re-parses with fresh env
    const { envClient } = await import('./env-client')
    expect(envClient.NEXT_PUBLIC_API_URL).toBe('http://localhost:3000')
  })

  it('exports envClient with custom API URL when env is set', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com'

    const { envClient } = await import('./env-client')
    expect(envClient.NEXT_PUBLIC_API_URL).toBe('https://api.example.com')
  })
})
```

Note: Zod parses process.env at import time and caches the result via module cache. The second test may need `vi.resetModules()` or the two imports may conflict. If the second test fails, restructure into separate `it` blocks with `vi.resetModules()` before each import.

- [ ] **Step 2: Run tests to verify**

```bash
pnpm vitest run src/utils/env-client.spec.ts --reporter=verbose
```

Expected: 2 tests, all PASS.

If tests fail due to module caching issues, restructure as:

```ts
import { describe, it, expect, beforeEach } from 'vitest'

describe('envClient', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('uses default API URL when env is not set', async () => {
    delete process.env.NEXT_PUBLIC_API_URL
    const { envClient } = await import('./env-client')
    expect(envClient.NEXT_PUBLIC_API_URL).toBe('http://localhost:3000')
  })

  it('uses custom API URL when env is set', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com'
    const { envClient } = await import('./env-client')
    expect(envClient.NEXT_PUBLIC_API_URL).toBe('https://api.example.com')
  })
})
```

---

### Task 11: Add Test Scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add test scripts to package.json**

Edit the `"scripts"` section to add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Run all tests to confirm everything passes**

```bash
pnpm test --reporter=verbose
```

Expected: All 21 tests PASS with no errors or warnings.

---

### Task 12: Lint and Typecheck

- [ ] **Step 1: Run lint**

```bash
pnpm lint
```

Expected: No errors.

- [ ] **Step 2: Run typecheck**

```bash
pnpm typecheck
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts src/test/ src/components/*.spec.tsx src/lib/*.spec.ts src/utils/*.spec.ts package.json
git commit -m "test: add unit testing infrastructure and initial tests"
```
