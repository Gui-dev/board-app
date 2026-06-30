import { render, screen } from '@testing-library/react'
import Board from './page'

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

const mockListIssues = vi.hoisted(() => vi.fn())

vi.mock('@/http/list-issues', () => ({
  listIssues: mockListIssues,
}))

describe('<Board />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockListIssues.mockResolvedValue({
      backlog: [],
      todo: [],
      in_progress: [],
      done: [],
    })
  })

  it('renders all four section titles', async () => {
    const element = await Board({ searchParams: Promise.resolve({}) })
    render(element)

    expect(screen.getByText('Backlog')).toBeInTheDocument()
    expect(screen.getByText('To do')).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders empty state messages when no issues', async () => {
    const element = await Board({ searchParams: Promise.resolve({}) })
    render(element)

    expect(screen.getByText('No issues in backlog')).toBeInTheDocument()
    expect(screen.getByText('No issues to do')).toBeInTheDocument()
    expect(screen.getByText('No issues in progress')).toBeInTheDocument()
    expect(screen.getByText('No issues in backlog')).toBeInTheDocument()
  })

  it('renders issues grouped by status', async () => {
    mockListIssues.mockResolvedValue({
      backlog: [makeIssue({ id: 'b1', title: 'Backlog Issue', status: 'backlog' })],
      todo: [makeIssue({ id: 't1', title: 'Todo Issue', status: 'todo' })],
      in_progress: [makeIssue({ id: 'i1', title: 'WIP Issue', status: 'in_progress' })],
      done: [makeIssue({ id: 'd1', title: 'Done Issue', status: 'done' })],
    })

    const element = await Board({ searchParams: Promise.resolve({}) })
    render(element)

    expect(screen.getByText('Backlog Issue')).toBeInTheDocument()
    expect(screen.getByText('Todo Issue')).toBeInTheDocument()
    expect(screen.getByText('WIP Issue')).toBeInTheDocument()
    expect(screen.getByText('Done Issue')).toBeInTheDocument()
  })

  it('displays issue count for each section', async () => {
    mockListIssues.mockResolvedValue({
      backlog: [makeIssue({ id: 'b1' }), makeIssue({ id: 'b2' })],
      todo: [],
      in_progress: [],
      done: [],
    })

    const element = await Board({ searchParams: Promise.resolve({}) })
    render(element)

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls listIssues with search param from query', async () => {
    mockListIssues.mockResolvedValue({
      backlog: [makeIssue({ id: 'b1', title: 'Feature request' })],
      todo: [],
      in_progress: [],
      done: [],
    })

    const element = await Board({ searchParams: Promise.resolve({ q: 'feature' }) })
    render(element)

    expect(mockListIssues).toHaveBeenCalledWith({ search: 'feature' })
    expect(screen.getByText('Feature request')).toBeInTheDocument()
  })

  it('calls listIssues without search when q is undefined', async () => {
    const element = await Board({ searchParams: Promise.resolve({}) })
    render(element)

    expect(mockListIssues).toHaveBeenCalledWith({ search: undefined })
  })
})
