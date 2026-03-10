import { CategoryBanner } from "@/features/game/components/CategoryBanner";
import { Gameboard } from "@/features/game/components/GameBoard";
import { useGameLogic } from "@/features/game/hooks/useGameLogic";
import { createFileRoute } from "@tanstack/react-router";
import type { Difficulty } from "@/types/game";

export const Route = createFileRoute("/game/$difficulty")({
  component: GamePage,
});

function parseDifficultyParam(value: string): Difficulty {
  if (value === "easy" || value === "medium" || value === "hard")
    return value as Difficulty;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : "easy";
}

function GamePage() {
  const { difficulty } = Route.useParams();
  const parsedDifficulty = parseDifficultyParam(difficulty);

  const logic = useGameLogic(parsedDifficulty);
  // const categoryCount = logic.data?.categories.length ?? 0;
  return (
    <main className="flex-1 flex flex-col min-h-0">
      <CategoryBanner
        pinnedCategories={logic.workingCategories}
        // categoryCount={categoryCount}
        canAddCategory={logic.canAddCategory}
        onAddCategoryClick={logic.onAddCategoryClick}
        onCategoryClick={logic.onCategoryClick}
      />
      <Gameboard logic={logic} />
    </main>
  );
}
