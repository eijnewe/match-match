import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/features/game/store/gameStore";

type Category = {
  name: string | null
  words: string[];
};

type Props = {
  categories: Category[];
};

export function AiHint({ categories }: Props) {
  const selectedWord = useGameStore((s) => s.selectedWord);
  const addError = useGameStore((s) => s.addError);

  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    setHint(null);
  }, [selectedWord]);

  function handleHint() {
    if (!selectedWord) return;

    const category = categories.find((c) => c.words.includes(selectedWord));

    if (!category) return;

    const otherWord = category.words.find((w) => w !== selectedWord);

    if (!otherWord) return;

    setHint(`This word is in the same category as ${otherWord}`);
    addError();
  }

  return (
    <div className="flex flex-col items-center mt-4 gap-2">
      <Button
        onClick={handleHint}
        disabled={!selectedWord}
      >
        Get hint
      </Button>

      {hint && <p className="text-sm text-muted-foreground text-center">{hint}</p>}
    </div>
  );
}
