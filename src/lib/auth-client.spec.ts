import { describe, it, expect } from 'vitest'

describe('authClient', () => {
  it('exports an authClient object', async () => {
    const { authClient } = await import('./auth-client')
    expect(authClient).toBeDefined()
    expect(typeof authClient).toBe('function')
  })

  it('exports useSession as a function', async () => {
    const { authClient } = await import('./auth-client')
    expect(typeof authClient.useSession).toBe('function')
  })
})
