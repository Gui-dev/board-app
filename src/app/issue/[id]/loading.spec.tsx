import { render } from '@testing-library/react'
import IssueLoading from './loading'

describe('<IssueLoading />', () => {
  it('renders without crashing', () => {
    const { container } = render(<IssueLoading />)

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders multiple skeleton elements', () => {
    const { container } = render(<IssueLoading />)

    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(5)
  })

  it('includes the IssueCommentsSkeleton', () => {
    const { container } = render(<IssueLoading />)

    const commentSkeleton = container.querySelector('.space-y-3')
    expect(commentSkeleton).toBeInTheDocument()
  })
})
