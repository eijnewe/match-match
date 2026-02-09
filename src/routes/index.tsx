import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { HowToPlay } from '@/components/how-to-play'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Button>
        <Link to="/game">Start game</Link>
      </Button>
      <HowToPlay />
    </div>
  )
}
