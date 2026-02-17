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
      <CustomCard type="category" categoryTitle='Standard Category: non-editable'/>
      <CustomCard type='article' articleTitle='Word Card'/>
      <CustomCard type='completedCategory' categoryTitle='Completed Category'/>
      <CustomCard type='editable' categoryTitle="Editable Category"/>
    </div>
  )
}
