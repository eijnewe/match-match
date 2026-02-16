import { Gameboard } from '@/features/game/components/GameBoard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/$difficulty')({
  component: GamePage,
})

function GamePage() {
  const { difficulty } = Route.useParams()
  return (
    <>
      <p>
        Hello "/game/$difficulty"!
        {difficulty}
      </p>
      <Gameboard words="hello" />
      {/* det ska egentligen vara såhär: <Gameboard difficulty={difficulty} /> */}
    </>
  )
}
