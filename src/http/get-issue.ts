import { IssueSchema } from '@/api/routes/get-issue'
import { envClient } from '@/utils/env-client'

interface IGetIssueParams {
  id: string
}

export const getIssue = async ({ id }: IGetIssueParams) => {
  const url = new URL(`/api/issues/${id}`, envClient.NEXT_PUBLIC_API_URL)

  const response = await fetch(url)
  const data = await response.json()

  return IssueSchema.parse(data)
}
