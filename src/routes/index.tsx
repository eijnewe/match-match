import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <Button size="lg" className="w-29.5" >
        <Link to="/game">Start game</Link>
      </Button>
    </div>
  )
}
