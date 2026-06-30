export const IssueCommentsSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-start gap-2">
          <div className="size-8 animate-pulse rounded-full bg-navy-600" />
          <div className="flex flex-1 flex-col gap-1 rounded-lg border-[0.5px] border-navy-600 bg-navy-700 px-3 py-2.5">
            <div className="flex items-baseline gap-2">
              <div className="h-4 w-20 animate-pulse rounded bg-navy-600" />
              <div className="h-3 w-16 animate-pulse rounded bg-navy-600" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-full animate-pulse rounded bg-navy-600" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-navy-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
