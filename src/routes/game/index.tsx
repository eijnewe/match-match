import { PageContainer } from '@/components/layout/PageContainer'
import { Button } from '@/components/ui/button'
import type { Difficulty } from '@/types/game'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/game/')({
  component: GameIndex,
})

function GameIndex() {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

  return (
    <PageContainer>
      <div>
        <p>Choose difficulty</p>
        <ul className="flex flex-col items-stretch">
          {difficulties.map((d: Difficulty) => (
            <li key={d}>
              <Button
                size="lg"
                className={'w-full'}
                nativeButton={false}
                render={
                  <Link
                    to="/game/$difficulty"
                    className="capitalize"
                    params={{ difficulty: d }}
                  >
                    {d}
                  </Link>
                }
              ></Button>
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  )
}
