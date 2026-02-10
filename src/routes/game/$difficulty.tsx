import { Gameboard } from '@/components/GameBoard'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/header'

export const Route = createFileRoute('/game/$difficulty')({
  component: GamePage,
})

function GamePage() {
  const { difficulty } = Route.useParams()
  return (
    <div>
      <Header/>
      Hello "/game/$difficulty"!
      {difficulty}
      <Gameboard words="hello" />
    </div>
  )
}
