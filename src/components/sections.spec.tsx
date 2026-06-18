import { render, screen } from '@testing-library/react'
import { Section } from './sections'

describe('<Section />', () => {
  it('renders Section.Root with children', () => {
    render(<Section.Root>Content</Section.Root>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders Section.Header children', () => {
    render(<Section.Header><span>Header</span></Section.Header>)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })

  it('renders Section.Title text', () => {
    render(<Section.Title>To Do</Section.Title>)
    expect(screen.getByText('To Do')).toBeInTheDocument()
  })

  it('renders Section.IssueCount text', () => {
    render(<Section.IssueCount>3</Section.IssueCount>)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders Section.Content children', () => {
    render(<Section.Content><span>Card list</span></Section.Content>)
    expect(screen.getByText('Card list')).toBeInTheDocument()
  })
})
