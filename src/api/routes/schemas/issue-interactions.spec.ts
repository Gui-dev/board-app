import { IssueInteractionSchema, IssueInteractionsResponseSchema } from './issue-interactions'

describe('IssueInteractionSchema', () => {
  it('parses a valid interaction', () => {
    const result = IssueInteractionSchema.parse({
      issueId: '550e8400-e29b-41d4-a716-446655440000',
      isLiked: true,
      likesCount: 5,
    })
    expect(result).toEqual({
      issueId: '550e8400-e29b-41d4-a716-446655440000',
      isLiked: true,
      likesCount: 5,
    })
  })

  it('rejects invalid uuid', () => {
    expect(() =>
      IssueInteractionSchema.parse({ issueId: 'not-a-uuid', isLiked: true, likesCount: 1 })
    ).toThrow()
  })

  it('rejects non-integer likesCount', () => {
    expect(() =>
      IssueInteractionSchema.parse({
        issueId: '550e8400-e29b-41d4-a716-446655440000',
        isLiked: false,
        likesCount: 1.5,
      })
    ).toThrow()
  })
})

describe('IssueInteractionsResponseSchema', () => {
  it('parses a valid response with multiple interactions', () => {
    const result = IssueInteractionsResponseSchema.parse({
      interactions: [
        { issueId: '550e8400-e29b-41d4-a716-446655440000', isLiked: true, likesCount: 3 },
        { issueId: '660e8400-e29b-41d4-a716-446655440001', isLiked: false, likesCount: 0 },
      ],
    })
    expect(result.interactions).toHaveLength(2)
  })

  it('parses an empty interactions array', () => {
    const result = IssueInteractionsResponseSchema.parse({ interactions: [] })
    expect(result.interactions).toEqual([])
  })
})
