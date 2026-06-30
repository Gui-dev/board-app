import { IssueCommentsSkeleton } from './issue-commments/issue-comments-skeleton'

const IssueLoading = () => {
  return (
    <main className="mx-auto flex w-full max-w-225 flex-col gap-4 rounded-xl border-[0.5px] border-navy-500 bg-navy-800 p-6">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded bg-navy-600" />
        <div className="h-3 w-26 animate-pulse rounded bg-navy-600" />
      </div>

      <div className="flex items-center gap-2">
        <div className="h-7 w-22 animate-pulse rounded-lg bg-navy-600" />
        <div className="h-7 w-16 animate-pulse rounded-lg bg-navy-600" />
      </div>

      <div className="space-y-3">
        <div className="h-7 w-3/5 animate-pulse rounded bg-navy-600" />
        <div className="h-4 w-full animate-pulse rounded bg-navy-600" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-navy-600" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-4 w-20 animate-pulse rounded bg-navy-600" />
        <div className="h-20 w-full animate-pulse rounded-lg bg-navy-600" />
        <IssueCommentsSkeleton />
      </div>
    </main>
  )
}

export default IssueLoading
