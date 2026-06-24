import { render, screen } from '@testing-library/react'
import { Card } from './card'

describe('<Card />', () => {
  it('renders Card.Root as a link with href', () => {
    render(<Card.Root>Link</Card.Root>)
    const link = screen.getByRole('link', { name: /link/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders Card.Header children', () => {
    render(
      <Card.Header>
        <span>Header content</span>
      </Card.Header>
    )
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('renders Card.Title text', () => {
    render(<Card.Title>Issue Title</Card.Title>)
    expect(screen.getByText('Issue Title')).toBeInTheDocument()
  })

  it('renders Card.Number text', () => {
    render(<Card.Number>ECO-001</Card.Number>)
    expect(screen.getByText('ECO-001')).toBeInTheDocument()
  })

  it('renders Card.Footer children', () => {
    render(
      <Card.Footer>
        <span>Footer content</span>
      </Card.Footer>
    )
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})
