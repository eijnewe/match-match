import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='flex flex-col items-center *:m-4'>
      <Button 
      size="lg" 
      className="w-29.5" 
      render={<Link to="/game">Start game</Link>}>
      </Button>
    </div>
  )
}
