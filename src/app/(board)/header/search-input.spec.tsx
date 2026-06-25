import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from './search-input'

const mockSetSearch = vi.fn()

vi.mock('nuqs', () => ({
  useQueryState: vi.fn(() => ['', mockSetSearch]),
  parseAsString: {
    withDefault: () => ({
      withOptions: () => ({}) as Record<string, unknown>,
    }),
  },
  debounce: vi.fn((ms: number) => `debounce-${ms}`),
}))

import { useQueryState } from 'nuqs'

describe('<SearchInput />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useQueryState).mockReset()
    vi.mocked(useQueryState).mockReturnValue(['', mockSetSearch])
  })

  it('renders input with search placeholder', () => {
    render(<SearchInput />)

    expect(screen.getByPlaceholderText('Search for features...')).toBeInTheDocument()
  })

  it('renders search icon', () => {
    const { container } = render(<SearchInput />)

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('displays the current search value from URL state', () => {
    vi.mocked(useQueryState).mockReturnValue(['current query', mockSetSearch])

    render(<SearchInput />)

    const input = screen.getByPlaceholderText('Search for features...')
    expect(input).toHaveValue('current query')
  })

  it('calls setSearch with input value on type', async () => {
    const user = userEvent.setup()

    render(<SearchInput />)

    const input = screen.getByPlaceholderText('Search for features...')
    await user.type(input, 'a')

    expect(mockSetSearch).toHaveBeenCalledWith('a', {
      limitUrlUpdates: 'debounce-500',
    })
  })
})
