import { CategoryBanner } from '@/features/game/components/CategoryBanner'
import { Gameboard } from '@/features/game/components/GameBoard'
import { useGameLogic } from '@/features/game/hooks/useGameLogic'
import { createFileRoute } from '@tanstack/react-router'
import type { Difficulty } from '@/types/game'

export const Route = createFileRoute('/game/$difficulty')({
  component: GamePage,
})



function GamePage() {
  const { difficulty } = Route.useParams()
  console.log(difficulty)
  /*  const logic = useGameLogicMock() */
    const logic = useGameLogic(difficulty as Difficulty)
  
  const categoryCount = logic.data?.categories.length
  return (
    <main className="flex-1 flex flex-col min-h-0">
       <CategoryBanner
        pinnedCategories={logic.workingCategories} 
        categoryCount={categoryCount}
      /> 
    
      <Gameboard difficulty={difficulty} />
    </main>
  )
}
