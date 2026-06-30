import { setTimeout } from 'node:timers/promises'
import { CommentsListResponseSchema } from '@/api/routes/list-issue-comments'
import { envClient } from '@/utils/env-client'

interface IListIssueCommentsParams {
  issueId: string
}

export const listIssueComments = async ({ issueId }: IListIssueCommentsParams) => {
  await setTimeout(2000)
  const url = new URL(`/api/issues/${issueId}/comments`, envClient.NEXT_PUBLIC_API_URL)

  const response = await fetch(url)
  const data = await response.json()

  return CommentsListResponseSchema.parse(data)
}
