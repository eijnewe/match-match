import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { CustomCard } from '@/features/game/components/CustomCard'

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
      <CustomCard type="category" categoryTitle='Test Category'/>
      <CustomCard type='plus'/>
    </div>
  )
}
