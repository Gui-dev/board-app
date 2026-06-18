import { z } from 'zod'

const envClientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url().optional().default('http://localhost:3000'),
})

export const envClient = envClientSchema.parse(process.env)
