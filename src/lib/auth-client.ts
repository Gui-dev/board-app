import { createAuthClient } from 'better-auth/react'
import { envClient } from '@/utils/env-client'

export const authClient = createAuthClient({
  baseURL: envClient.NEXT_PUBLIC_API_URL,
})
