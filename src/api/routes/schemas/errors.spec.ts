import { ErrorSchema } from './errors'

describe('ErrorSchema', () => {
  it('parses a valid error response', () => {
    const result = ErrorSchema.parse({ error: 'Not found', message: 'Resource not found' })
    expect(result).toEqual({ error: 'Not found', message: 'Resource not found' })
  })

  it('rejects missing error field', () => {
    expect(() => ErrorSchema.parse({ message: 'Oops' })).toThrow()
  })

  it('rejects missing message field', () => {
    expect(() => ErrorSchema.parse({ error: 'Error' })).toThrow()
  })

  it('rejects non-string values', () => {
    expect(() => ErrorSchema.parse({ error: 123, message: true })).toThrow()
  })
})
