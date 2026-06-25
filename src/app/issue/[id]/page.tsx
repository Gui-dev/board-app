import type { Metadata } from 'next'
import { getIssue } from '@/http/get-issue'

interface IIssuePageProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: IIssuePageProps): Promise<Metadata> => {
  const { id } = await params

  return {
    title: `Issue #${id}`,
  }
}

const IssuePage = async ({ params }: IIssuePageProps) => {
  const { id } = await params
  const issue = await getIssue({ id })

  return (
    <div>
      <h1>Issue Page {id}</h1>

      <pre>{JSON.stringify(issue, null, 2)}</pre>
    </div>
  )
}

export default IssuePage
