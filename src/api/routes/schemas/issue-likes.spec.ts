import { LikeResponseSchema } from './issue-likes'

describe('LikeResponseSchema', () => {
  it('parses a valid like response', () => {
    const result = LikeResponseSchema.parse({
      id: '550e8400-e29b-41d4-a716-446655440000',
      likes: 10,
      liked: true,
    })
    expect(result).toEqual({
      id: '550e8400-e29b-41d4-a716-446655440000',
      likes: 10,
      liked: true,
    })
  })

  it('rejects invalid uuid', () => {
    expect(() => LikeResponseSchema.parse({ id: 'bad', likes: 0, liked: false })).toThrow()
  })

  it('rejects non-integer likes', () => {
    expect(() =>
      LikeResponseSchema.parse({
        id: '550e8400-e29b-41d4-a716-446655440000',
        likes: 'many',
        liked: false,
      })
    ).toThrow()
  })
})
