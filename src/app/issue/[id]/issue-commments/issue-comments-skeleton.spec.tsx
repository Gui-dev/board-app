import { render } from '@testing-library/react'
import { IssueCommentsSkeleton } from './issue-comments-skeleton'

describe('<IssueCommentsSkeleton />', () => {
  it('renders 3 skeleton items with 5 animated elements each', () => {
    const { container } = render(<IssueCommentsSkeleton />)

    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(15)
  })

  it('renders avatar placeholders', () => {
    const { container } = render(<IssueCommentsSkeleton />)

    const avatars = container.querySelectorAll('.size-8.rounded-full')
    expect(avatars.length).toBe(3)
  })
})
