import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Section } from '@/components/sections'

export default function Home() {
  return (
    <main className="grid flex-1 grid-cols-4 items-stretch gap-5">
      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Backlog
          </Section.Title>
          <Section.IssueCount>14</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          <Card.Root>
            <Card.Header>
              <Card.Number>ECO-001</Card.Number>
              <Card.Title>Implementar cartão de crédito</Card.Title>
            </Card.Header>
            <Card.Footer>
              <Button>
                <ThumbsUpIcon className="size-3" />
                <span>13</span>
              </Button>

              <Button>
                <MessageCircleIcon className="size-3" />
                <span>7</span>
              </Button>
            </Card.Footer>
          </Card.Root>
        </Section.Content>
      </Section.Root>
    </main>
  )
}
