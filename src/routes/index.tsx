import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { HowToPlay } from '@/features/game/components/how-to-play'
import { PointCounter } from '@/features/game/components/PointCounter'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <Button size="lg" >
        <Link to="/game">Start game</Link>
      </Button>
      <HowToPlay />
      <PointCounter/>
    </div>
  )
}
