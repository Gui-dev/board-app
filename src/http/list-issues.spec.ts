import { HttpResponse, http } from 'msw'
import { server } from '@/test/msw/server'
import { listIssues } from './list-issues'

const makeIssue = (
  overrides: Partial<{
    id: string
    issueNumber: number
    title: string
    status: 'backlog' | 'todo' | 'in_progress' | 'done'
    comments: number
  }> = {}
) => ({
  id: '1',
  issueNumber: 1,
  title: 'Test Issue',
  status: 'backlog' as const,
  comments: 1,
  ...overrides,
})

describe('listIssues', () => {
  afterEach(() => {
    server.resetHandlers()
  })

  it('fetches and returns issues grouped by status', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues', () => {
        return HttpResponse.json({
          backlog: [makeIssue({ id: '1', status: 'backlog' })],
          todo: [makeIssue({ id: '2', status: 'todo' })],
          in_progress: [makeIssue({ id: '3', status: 'in_progress' })],
          done: [makeIssue({ id: '4', status: 'done' })],
        })
      })
    )

    const result = await listIssues()

    expect(result.backlog).toHaveLength(1)
    expect(result.backlog[0].id).toBe('1')
    expect(result.todo).toHaveLength(1)
    expect(result.in_progress).toHaveLength(1)
    expect(result.done).toHaveLength(1)
  })

  it('passes search param when provided', async () => {
    let capturedUrl = ''

    server.use(
      http.get('http://localhost:3000/api/issues', ({ request }) => {
        capturedUrl = request.url
        return HttpResponse.json({
          backlog: [],
          todo: [],
          in_progress: [],
          done: [],
        })
      })
    )

    await listIssues({ search: 'feature' })

    expect(capturedUrl).toContain('search=feature')
  })

  it('returns empty groups when API returns empty', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues', () => {
        return HttpResponse.json({
          backlog: [],
          todo: [],
          in_progress: [],
          done: [],
        })
      })
    )

    const result = await listIssues()

    expect(result.backlog).toEqual([])
    expect(result.todo).toEqual([])
    expect(result.in_progress).toEqual([])
    expect(result.done).toEqual([])
  })

  it('throws on invalid response data', async () => {
    server.use(
      http.get('http://localhost:3000/api/issues', () => {
        return HttpResponse.json({ invalid: true })
      })
    )

    await expect(listIssues()).rejects.toThrow()
  })
})
