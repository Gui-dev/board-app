import { render, screen } from '@testing-library/react'
import { Comment } from './comments'

describe('<Comment.Root />', () => {
  it('renders children with default classes', () => {
    render(
      <Comment.Root>
        <span>child</span>
      </Comment.Root>
    )
    const root = screen.getByText('child').parentElement
    expect(root).toBeInTheDocument()
    expect(root?.className).toContain('flex')
  })

  it('merges custom className', () => {
    render(
      <Comment.Root className="custom-class">
        <span>child</span>
      </Comment.Root>
    )
    const root = screen.getByText('child').parentElement
    expect(root?.className).toContain('custom-class')
  })
})

describe('<Comment.Avatar />', () => {
  it('renders an img with src', () => {
    const { container } = render(<Comment.Avatar src="https://example.com/avatar.png" />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  it('has empty alt text by default', () => {
    const { container } = render(<Comment.Avatar src="https://example.com/avatar.png" />)
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })

  it('merges custom className', () => {
    const { container } = render(<Comment.Avatar className="custom-class" />)
    expect(container.querySelector('img')?.className).toContain('custom-class')
  })
})

describe('<Comment.Content />', () => {
  it('renders children', () => {
    render(
      <Comment.Content>
        <p>text</p>
      </Comment.Content>
    )
    expect(screen.getByText('text')).toBeInTheDocument()
  })
})

describe('<Comment.Header />', () => {
  it('renders children', () => {
    render(
      <Comment.Header>
        <span>header</span>
      </Comment.Header>
    )
    expect(screen.getByText('header')).toBeInTheDocument()
  })
})

describe('<Comment.Text />', () => {
  it('renders text content', () => {
    render(<Comment.Text>Hello world</Comment.Text>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})

describe('<Comment.Author />', () => {
  it('renders author name', () => {
    render(<Comment.Author>John Doe</Comment.Author>)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})

describe('<Comment.Time />', () => {
  it('renders time text', () => {
    render(<Comment.Time>2 hours ago</Comment.Time>)
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
  })
})

describe('Comment compound composition', () => {
  it('renders a full comment structure', () => {
    const { container } = render(
      <Comment.Root>
        <Comment.Avatar src="https://example.com/avatar.png" />
        <Comment.Content>
          <Comment.Header>
            <Comment.Author>Jane</Comment.Author>
            <Comment.Time>1 day ago</Comment.Time>
          </Comment.Header>
          <Comment.Text>Great comment!</Comment.Text>
        </Comment.Content>
      </Comment.Root>
    )

    expect(container.querySelector('img')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.getByText('1 day ago')).toBeInTheDocument()
    expect(screen.getByText('Great comment!')).toBeInTheDocument()
  })
})
