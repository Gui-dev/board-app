import { HttpResponse, http } from 'msw'
import { server } from '@/test/msw/server'
import { getIssue } from './get-issue'

describe('getIssue', () => {
  afterEach(() => {
    server.resetHandlers()
  })

  it('fetches and returns an issue by id', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues/:id', () => {
        return HttpResponse.json({
          id: '550e8400-e29b-41d4-a716-446655440000',
          issueNumber: 42,
          title: 'Test Issue',
          description: 'A test issue description',
          status: 'backlog',
          comments: 3,
          createdAt: '2026-01-15T10:00:00.000Z',
        })
      })
    )

    const result = await getIssue({ id: '550e8400-e29b-41d4-a716-446655440000' })

    expect(result.title).toBe('Test Issue')
    expect(result.issueNumber).toBe(42)
    expect(result.status).toBe('backlog')
    expect(result.comments).toBe(3)
  })

  it('throws on missing issue', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues/:id', () => {
        return HttpResponse.json(
          { error: 'Issue not found', message: 'Issue with id x does not exist' },
          { status: 404 }
        )
      })
    )

    await expect(getIssue({ id: 'non-existent' })).rejects.toThrow()
  })

  it('throws on invalid response data', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues/:id', () => {
        return HttpResponse.json({ invalid: true })
      })
    )

    await expect(getIssue({ id: '550e8400-e29b-41d4-a716-446655440000' })).rejects.toThrow()
  })
})
