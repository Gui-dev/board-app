import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '.'

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession: vi.fn(),
    signIn: {
      social: vi.fn(),
    },
    signOut: vi.fn(),
  },
}))

import { authClient } from '@/lib/auth-client'

const mockUseSession = authClient.useSession as ReturnType<typeof vi.fn>

describe('<Header /> (issue)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseSession.mockReturnValue({
      data: null,
      isPending: false,
    })
  })

  it('renders title and description', () => {
    render(<Header />)

    expect(screen.getByText('Product Roadmap')).toBeInTheDocument()
    expect(
      screen.getByText('Follow the development progress of our entire platform')
    ).toBeInTheDocument()
  })

  it('shows sign in button when user is not authenticated', () => {
    render(<Header />)

    expect(screen.getByTitle('Sign in')).toBeInTheDocument()
  })

  it('shows user avatar when authenticated', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          image: 'https://avatars.githubusercontent.com/u/12345',
          name: 'John Doe',
        },
        session: { id: '1' },
      },
      isPending: false,
    })

    render(<Header />)

    const avatar = screen.getByAltText('John Doe')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/12345')
  })

  it('calls signOut when avatar button is clicked', async () => {
    const user = userEvent.setup()

    mockUseSession.mockReturnValue({
      data: {
        user: {
          image: 'https://example.com/avatar.png',
          name: 'Jane',
        },
        session: { id: '1' },
      },
      isPending: false,
    })

    render(<Header />)

    await user.click(screen.getByTitle('Sign out'))

    expect(authClient.signOut).toHaveBeenCalled()
  })
})
