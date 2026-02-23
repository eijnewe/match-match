import { CategoryBanner } from '@/features/game/components/CategoryBanner'
import { Gameboard } from '@/features/game/components/GameBoard'
import { useGameLogicMock } from '@/features/game/hooks/useGameLogic.mock'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/$difficulty')({
  component: GamePage,
})

function GamePage() {
  const { difficulty } = Route.useParams()
  const logic = useGameLogicMock()
  const categoryCount = logic.data.categories.length
  return (
    <main className="flex-1 flex flex-col min-h-0">
      <CategoryBanner
        pinnedCategories={logic.pinnedCategories}
        onAddCategory={logic.addPinnedCategory}
        onRemoveCategory={logic.removePinnedCategory}
        categoryCount={categoryCount}
      />
      {/*  <div className="w-full h-10 bg-amber-950 shrink-0"></div> */}
      <Gameboard difficulty={difficulty} />
    </main>
  )
}
