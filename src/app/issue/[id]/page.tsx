import { ArchiveIcon, MessageCirclePlusIcon, MoveLeftIcon, ThumbsUpIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { getIssue } from '@/http/get-issue'
import { IssueCommentsList } from './issue-commments/issue-comments-list'
import { IssueCommentsSkeleton } from './issue-commments/issue-comments-skeleton'

interface IIssuePageProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: IIssuePageProps): Promise<Metadata> => {
  const { id } = await params
  const issue = await getIssue({ id })

  return {
    title: `Issue ${issue.title}`,
    description: issue.description,
  }
}

const statusLabels = {
  backlog: 'Backlog',
  todo: 'To do',
  in_progress: 'In Progress',
  done: 'Done',
} as const

const IssuePage = async ({ params }: IIssuePageProps) => {
  const { id } = await params
  const issue = await getIssue({ id })

  return (
    <main className="mx-auto flex w-full max-w-225 flex-col gap-4 rounded-xl border-[0.5px] border-navy-500 bg-navy-800 p-6">
      <Link href="/" className="flex items-center gap-2 text-navy-200 hover:text-navy-100">
        <MoveLeftIcon className="size-4" />
        <span className="text-sm">Back to board</span>
      </Link>

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 rounded-lg bg-navy-700 px-3 py-1.5 text-xs">
          <ArchiveIcon className="size-3" />
          <span>{statusLabels[issue.status]}</span>
        </span>

        <Button>
          <ThumbsUpIcon className="size-3" />
          <span>{issue.issueNumber}</span>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">{issue.title}</h1>
        <p className="text-navy-100 text-sm leading-relaxed">{issue.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="">Comments</span>
        <form className="relative w-full">
          <Input className="h-11 w-full bg-navy-900 pr-24" placeholder="Add a comment" />
          <button
            type="submit"
            className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center gap-2 text-indigo-400 text-xs hover:text-indigo-300 disabled:opacity-50"
          >
            Publish
            <MessageCirclePlusIcon className="size-3" />
          </button>
        </form>
        <div className="mt-3">
          <Suspense fallback={<IssueCommentsSkeleton />}>
            <IssueCommentsList issueId={issue.id} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export default IssuePage
