import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/game/')({
  component: GameIndex,
})

function GameIndex() {
  const difficulties = ['easy', 'medium', 'hard']

  return (
    <div>
      <p>Choose difficulty</p>
      <ul className="flex flex-col items-stretch">
        {difficulties.map((d) => (
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
  )
}
