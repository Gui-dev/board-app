import { render, screen } from '@testing-library/react'
import { IssueCommentsList } from './issue-comments-list'

const mockListIssueComments = vi.hoisted(() => vi.fn())

vi.mock('@/http/list-issue-comments', () => ({
  listIssueComments: mockListIssueComments,
}))

const makeComment = (
  overrides: Partial<{
    id: string
    issueId: string
    author: { name: string; avatar: string }
    text: string
    createdAt: string
  }> = {}
) => ({
  id: 'c1',
  issueId: 'i1',
  author: {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.png',
  },
  text: 'Great comment!',
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  ...overrides,
})

describe('<IssueCommentsList />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a list of comments', async () => {
    mockListIssueComments.mockResolvedValue({
      comments: [
        makeComment({ id: 'c1', text: 'First comment' }),
        makeComment({ id: 'c2', text: 'Second comment' }),
      ],
      total: 2,
      limit: 50,
      offset: 0,
    })

    const element = await IssueCommentsList({ issueId: 'i1' })
    render(element)

    expect(screen.getByText('First comment')).toBeInTheDocument()
    expect(screen.getByText('Second comment')).toBeInTheDocument()
  })

  it('renders author name and avatar', async () => {
    mockListIssueComments.mockResolvedValue({
      comments: [makeComment({ author: { name: 'Jane', avatar: 'https://example.com/jane.png' } })],
      total: 1,
      limit: 50,
      offset: 0,
    })

    const element = await IssueCommentsList({ issueId: 'i1' })
    render(element)

    expect(screen.getByText('Jane')).toBeInTheDocument()
    const avatar = screen.getByAltText('')
    expect(avatar).toHaveAttribute('src', 'https://example.com/jane.png')
  })

  it('shows no comments message when list is empty', async () => {
    mockListIssueComments.mockResolvedValue({
      comments: [],
      total: 0,
      limit: 50,
      offset: 0,
    })

    const element = await IssueCommentsList({ issueId: 'i1' })
    render(element)

    expect(screen.getByText('No comments yet')).toBeInTheDocument()
  })

  it('formats relative time', async () => {
    mockListIssueComments.mockResolvedValue({
      comments: [makeComment({ createdAt: new Date(Date.now() - 7200000).toISOString() })],
      total: 1,
      limit: 50,
      offset: 0,
    })

    const element = await IssueCommentsList({ issueId: 'i1' })
    render(element)

    expect(screen.getByText(/hours? ago/)).toBeInTheDocument()
  })

  it('calls listIssueComments with the correct issueId', async () => {
    mockListIssueComments.mockResolvedValue({ comments: [], total: 0, limit: 50, offset: 0 })

    await IssueCommentsList({ issueId: 'test-issue-id' })

    expect(mockListIssueComments).toHaveBeenCalledWith({ issueId: 'test-issue-id' })
  })
})
