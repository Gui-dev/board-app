import { IssuesListResponseSchema } from '@/api/routes/list-issues'
import { envClient } from '@/utils/env-client'

interface IListIssuesParams {
  search?: string
}

export const listIssues = async ({ search }: IListIssuesParams = {}) => {
  const url = new URL('/api/issues', envClient.NEXT_PUBLIC_API_URL)

  if (search) {
    url.searchParams.set('search', search)
  }

  const response = await fetch(url)
  const data = await response.json()

  return IssuesListResponseSchema.parse(data)
}
