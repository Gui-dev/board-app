import { formatDistanceToNow } from 'date-fns'

import { Comment } from '@/components/comments'
import { listIssueComments } from '@/http/list-issue-comments'

interface IIssueCommentsListProps {
  issueId: string
}

export const IssueCommentsList = async ({ issueId }: IIssueCommentsListProps) => {
  const { comments } = await listIssueComments({ issueId })

  if (comments.length === 0) {
    return <p className="py-2 text-center text-navy-400 text-sm">No comments yet</p>
  }

  return (
    <div className="space-y-3">
      {comments.map(comment => (
        <Comment.Root key={comment.id}>
          <Comment.Avatar src={comment.author.avatar} />
          <Comment.Content>
            <Comment.Header>
              <Comment.Author>{comment.author.name}</Comment.Author>
              <Comment.Time>
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </Comment.Time>
            </Comment.Header>
            <Comment.Text>{comment.text}</Comment.Text>
          </Comment.Content>
        </Comment.Root>
      ))}
    </div>
  )
}
