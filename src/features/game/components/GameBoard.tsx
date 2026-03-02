// import { WordGrid } from "@/features/game/api/WordGrid";
// import { useGameLogicMock } from '../hooks/useGameLogic.mock'
import { useGridStore } from '../hooks/useGridStore'
import { WordGrid } from './WordGrid'

type GameboardProps = {
  logic: {
    data: { allWords: string[] } | undefined;
    isLoading: boolean;
    error: unknown;
    isGameWon: boolean;
    reset: () => void;
    workingCategories: { words: string[] }[];
    onWordClick: (word: string) => void;
  };
};

export function Gameboard({ logic }: GameboardProps) {
  // const logic = useGameLogic(difficulty)
  const isGridMode = useGridStore((s) => s.isGridMode);

  if (logic.isLoading) {
    return (
      <div className="grow self-start -mt-4 flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (logic.error) {
    return (
      <div className="grow self-start -mt-4 flex items-center justify-center text-red-500">
        Error when loading game
      </div>
    )
  }

  if (logic.isGameWon) {
    return (
      <div className="grow self-start -mt-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Done! 🎉</h1>
          <button
            onClick={() => logic.reset()}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Play again
          </button>
        </div>
      </div>
    )
  }

  // Filtrera bort ord som redan matchats
  const remainingWords =
    logic.data?.allWords.filter(
      (word) => !logic.workingCategories.some((cat) => cat.words.includes(word))
    ) ?? [];

  // Extrahera pinnedCategories som array av kategorinamn (för CategoryBanner)
  // const pinnedCategories = logic.data?.categories.map((cat) => cat.name) ?? []

  return (
    <div className="overflow-y-auto flex-1 p-3">
      <WordGrid
        words={remainingWords}
        display={isGridMode ? "grid" : "flex"}
        onWordClick={logic.onWordClick}
      />
    </div>
    /*  <WordGrid
        words={remainingWords}
        display="grid"
        onWordClick={logic.handleCategoryClick}
      /> */
  );

  {
    /* <div className="grow self-start -mt-4">
      <CategoryBanner
        pinnedCategories={pinnedCategories}
        onAddCategory={logic.addPinnedCategory}
        onRemoveCategory={logic.removePinnedCategory}
        categoryCount={logic.data?.categories.length ?? 0}
      />
    </div> */
  }
}
