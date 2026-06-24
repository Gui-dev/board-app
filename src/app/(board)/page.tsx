import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Section } from '@/components/sections'
import { listIssues } from '@/http/list-issues'

interface IBoardProps {
  searchParams: Promise<{ q?: string }>
}

export const metadata: Metadata = {
  title: 'Board',
}

export default async function Board({ searchParams }: IBoardProps) {
  const { q } = await searchParams

  const issues = await listIssues()

  return (
    <main className="grid flex-1 grid-cols-4 items-stretch gap-5">
      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Backlog
          </Section.Title>
          <Section.IssueCount>{issues.backlog.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.backlog.map(issue => {
            return (
              <Card.Root key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span>{issue.issueNumber}</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span>{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            To do
          </Section.Title>
          <Section.IssueCount>{issues.todo.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.todo.map(issue => {
            return (
              <Card.Root key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span>{issue.issueNumber}</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span>{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            In progress
          </Section.Title>
          <Section.IssueCount>{issues.in_progress.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.in_progress.map(issue => {
            return (
              <Card.Root key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span>{issue.issueNumber}</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span>{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Done
          </Section.Title>
          <Section.IssueCount>{issues.done.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.done.map(issue => {
            return (
              <Card.Root key={issue.id}>
                <Card.Header>
                  <Card.Number>{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span>{issue.issueNumber}</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span>{issue.comments}</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>
    </main>
  )
}
