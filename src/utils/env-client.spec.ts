import { describe, it, expect, beforeEach, vi } from 'vitest'

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
