// import { WordGrid } from "@/features/game/api/WordGrid";
import { useGameLogicMock } from '../hooks/useGameLogic.mock'
import { useGridStore } from '../hooks/useGridStore'
import { WordGrid } from './WordGrid'

export function Gameboard({ difficulty }) {
  const logic = useGameLogicMock()
  const categoryCount = logic.data.categories.length
  console.log(logic.data.allWords)
  const isGridMode = useGridStore((s) => s.isGridMode)

  return (
    <div className="overflow-y-auto flex-1 pt-2 p-3">
      <WordGrid words={logic.data.allWords} display={isGridMode ? "grid" : "flex"} />
    </div>
  )
  {
    /* <div className="grow self-start -mt-4">
      <CategoryBanner
        pinnedCategories={logic.pinnedCategories}
        onAddCategory={logic.addPinnedCategory}
        onRemoveCategory={logic.removePinnedCategory}
        categoryCount={categoryCount}
      />
      <WordGrid words={logic.data.allWords} display="grid" />
    </div> */
  }
}
