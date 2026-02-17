// import { WordGrid } from "@/features/game/api/WordGrid";
import { useGameLogicMock } from '../hooks/useGameLogic.mock'
import { CategoryBanner } from './CategoryBanner'
import { WordGrid } from './WordGrid'

export function Gameboard({ difficulty }) {
  const logic = useGameLogicMock()
  const categoryCount = logic.data.categories.length
  console.log(logic.data.allWords)

  return (
    <div className="grow self-start -mt-4">
      <CategoryBanner
        pinnedCategories={logic.pinnedCategories}
        onAddCategory={logic.addPinnedCategory}
        onRemoveCategory={logic.removePinnedCategory}
        categoryCount={categoryCount}
      />
      <WordGrid words={logic.data.allWords} display="grid" />
    </div>
  )
}
