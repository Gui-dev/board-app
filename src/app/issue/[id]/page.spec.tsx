import { render, screen } from '@testing-library/react'
import IssuePage from './page'

const mockGetIssue = vi.hoisted(() => vi.fn())

vi.mock('@/http/get-issue', () => ({
  getIssue: mockGetIssue,
}))

vi.mock('./issue-commments/issue-comments-list', () => ({
  IssueCommentsList: () => <div data-testid="comments-list">Comments</div>,
}))

const makeIssue = (
  overrides: Partial<{
    id: string
    issueNumber: number
    title: string
    description: string
    status: 'backlog' | 'todo' | 'in_progress' | 'done'
    comments: number
    createdAt: string
  }> = {}
) => ({
  id: '550e8400-e29b-41d4-a716-446655440000',
  issueNumber: 42,
  title: 'Test Issue',
  description: 'A test issue description',
  status: 'backlog' as const,
  comments: 3,
  createdAt: '2026-01-15T10:00:00.000Z',
  ...overrides,
})

describe('<IssuePage />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetIssue.mockResolvedValue(makeIssue())
  })

  it('renders back to board link', async () => {
    const element = await IssuePage({
      params: Promise.resolve({ id: '550e8400-e29b-41d4-a716-446655440000' }),
    })
    render(element)

    const link = screen.getByRole('link', { name: /back to board/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders issue title and description', async () => {
    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByText('Test Issue')).toBeInTheDocument()
    expect(screen.getByText('A test issue description')).toBeInTheDocument()
  })

  it('renders status badge for backlog', async () => {
    mockGetIssue.mockResolvedValue(makeIssue({ status: 'backlog' }))

    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByText('Backlog')).toBeInTheDocument()
  })

  it('renders status badge for todo', async () => {
    mockGetIssue.mockResolvedValue(makeIssue({ status: 'todo' }))

    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByText('To do')).toBeInTheDocument()
  })

  it('renders status badge for in_progress', async () => {
    mockGetIssue.mockResolvedValue(makeIssue({ status: 'in_progress' }))

    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('renders status badge for done', async () => {
    mockGetIssue.mockResolvedValue(makeIssue({ status: 'done' }))

    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders like button with issue number', async () => {
    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders comment form', async () => {
    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByPlaceholderText('Add a comment')).toBeInTheDocument()
    expect(screen.getByText('Publish')).toBeInTheDocument()
  })

  it('renders comments section placeholder', async () => {
    const element = await IssuePage({
      params: Promise.resolve({ id: 'test-id' }),
    })
    render(element)

    expect(screen.getByTestId('comments-list')).toBeInTheDocument()
  })

  it('calls getIssue with the correct id', async () => {
    await IssuePage({
      params: Promise.resolve({ id: '550e8400-e29b-41d4-a716-446655440000' }),
    })

    expect(mockGetIssue).toHaveBeenCalledWith({ id: '550e8400-e29b-41d4-a716-446655440000' })
  })
})
