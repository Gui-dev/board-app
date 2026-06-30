import { HttpResponse, http } from 'msw'
import { server } from '@/test/msw/server'
import { listIssueComments } from './list-issue-comments'

describe('listIssueComments', () => {
  afterEach(() => {
    server.resetHandlers()
  })

  it('fetches and returns comments for an issue', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues/:id/comments', () => {
        return HttpResponse.json({
          comments: [
            {
              id: '550e8400-e29b-41d4-a716-446655440000',
              issueId: '660e8400-e29b-41d4-a716-446655440001',
              author: { name: 'John', avatar: 'https://example.com/avatar.png' },
              text: 'Great issue!',
              createdAt: '2026-01-15T10:00:00.000Z',
            },
          ],
          total: 1,
          limit: 50,
          offset: 0,
        })
      })
    )

    const result = await listIssueComments({ issueId: '660e8400-e29b-41d4-a716-446655440001' })

    expect(result.comments).toHaveLength(1)
    expect(result.comments[0].text).toBe('Great issue!')
    expect(result.comments[0].author.name).toBe('John')
    expect(result.total).toBe(1)
  })

  it('returns empty comments array when issue has no comments', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues/:id/comments', () => {
        return HttpResponse.json({ comments: [], total: 0, limit: 50, offset: 0 })
      })
    )

    const result = await listIssueComments({ issueId: '660e8400-e29b-41d4-a716-446655440001' })

    expect(result.comments).toEqual([])
    expect(result.total).toBe(0)
  })

  it('throws on invalid response data', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues/:id/comments', () => {
        return HttpResponse.json({ invalid: true })
      })
    )

    await expect(
      listIssueComments({ issueId: '660e8400-e29b-41d4-a716-446655440001' })
    ).rejects.toThrow()
  })
})
