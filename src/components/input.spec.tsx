import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('<Input />', () => {
  it('renders as an input element with placeholder', () => {
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    expect(input).toBeInTheDocument()
  })

  it('accepts value and fires onChange on user input', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input value="" onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'a')
    expect(handleChange).toHaveBeenCalled()
  })

  it('merges custom className with default classes', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toContain('custom-class')
  })
})
