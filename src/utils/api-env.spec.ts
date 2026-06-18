import { describe, it, expect, beforeEach } from 'vitest'

describe('apiEnv', () => {
  beforeEach(() => {
    vi.resetModules()
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
