import { useGridStore } from "../hooks/useGridStore";
import { WordGrid } from "./WordGrid";
import { useGameStore } from "../store/gameStore";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EndScreen } from "./end-screen";
import { AiHint } from "@/components/ai-hint";

type GameboardProps = {
  readonly logic: {
    data: { allWords: string[] } | undefined;
    isLoading: boolean;
    error: unknown;
    isGameWon: boolean;
    reset: () => void;
    workingCategories: { words: string[]; name: string; color?: string }[];
    onWordClick: (word: string) => void;
  };
};

export function Gameboard({ logic }: GameboardProps) {
  const isGridMode = useGridStore((s) => s.isGridMode);
  const points = useGameStore((s) => s.points);
  const errors = useGameStore((s) => s.errors);
  const [showResults, setShowResults] = useState(true);

  if (logic.isLoading) {
    return (
      <div className="grow -mt-4 flex items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (logic.error) {
    return (
      <div className="grow -mt-4 flex items-center justify-center text-red-500">
        <h2>Error</h2>
      </div>
    );
  }

  if (logic.isGameWon) {
    return (
      <div className="flex flex-col items-center">
        {showResults && (
          <EndScreen
            score={points}
            mistakes={errors}
            categories={logic.workingCategories}
            onClose={() => setShowResults(false)}
          />
        )}

        {!showResults && (
          <div className="flex gap-3 justify-center mt-4">
            <Button onClick={() => setShowResults(true)}>Show results</Button>

            <Link to="/game">
              <Button>Play again</Button>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Filtrera bort ord som redan matchats
  const remainingWords = logic.data?.allWords.filter((word) => !logic.workingCategories.some((cat) => cat.words.includes(word))) ?? [];

  // Extrahera pinnedCategories som array av kategorinamn (för CategoryBanner)
  // const pinnedCategories = logic.data?.categories.map((cat) => cat.name) ?? []

  return (
    <div className="overflow-y-auto flex-1 p-3">
      <WordGrid
        words={remainingWords}
        display={isGridMode ? "grid" : "flex"}
        onWordClick={logic.onWordClick}
      />
      <AiHint categories={logic.data?.categories ?? []} />
    </div>
  );
}
