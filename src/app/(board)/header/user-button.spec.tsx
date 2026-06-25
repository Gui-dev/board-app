import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserButton } from './user-button'

const mockUseSession = vi.hoisted(() => vi.fn())

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession: mockUseSession,
    signIn: {
      social: vi.fn(),
    },
    signOut: vi.fn(),
  },
}))

describe('<UserButton />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner when session is pending', () => {
    mockUseSession.mockReturnValue({
      data: null,
      isPending: true,
    })

    render(<UserButton />)

    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    expect(screen.queryByTitle('Sign in')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Sign out')).not.toBeInTheDocument()
  })

  it('shows sign in button when user is not authenticated', () => {
    mockUseSession.mockReturnValue({
      data: null,
      isPending: false,
    })

    render(<UserButton />)

    expect(screen.getByTitle('Sign in')).toBeInTheDocument()
  })

  it('calls signIn.social when sign in button is clicked', async () => {
    const user = userEvent.setup()

    mockUseSession.mockReturnValue({
      data: null,
      isPending: false,
    })

    render(<UserButton />)

    await user.click(screen.getByTitle('Sign in'))

    const { authClient } = await import('@/lib/auth-client')
    expect(authClient.signIn.social).toHaveBeenCalledWith({
      provider: 'github',
      callbackURL: '/',
    })
  })

  it('shows user avatar when authenticated', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          image: 'https://example.com/avatar.png',
          name: 'John Doe',
        },
      },
      isPending: false,
    })

    render(<UserButton />)

    const avatar = screen.getByAltText('John Doe')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  it('calls signOut when avatar button is clicked', async () => {
    const user = userEvent.setup()

    mockUseSession.mockReturnValue({
      data: {
        user: {
          image: 'https://example.com/avatar.png',
          name: 'Jane',
        },
      },
      isPending: false,
    })

    render(<UserButton />)

    await user.click(screen.getByTitle('Sign out'))

    const { authClient } = await import('@/lib/auth-client')
    expect(authClient.signOut).toHaveBeenCalled()
  })

  it('renders avatar with empty alt when user name is missing', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          image: 'https://example.com/avatar.png',
          name: undefined,
        },
      },
      isPending: false,
    })

    render(<UserButton />)

    const avatar = screen.getByAltText('')
    expect(avatar).toBeInTheDocument()
  })

  it('renders avatar without src when user image is missing', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          image: undefined,
          name: 'No Image',
        },
      },
      isPending: false,
    })

    render(<UserButton />)

    const avatar = screen.getByAltText('No Image')
    expect(avatar).toBeInTheDocument()
    expect(avatar).not.toHaveAttribute('src')
  })
})
