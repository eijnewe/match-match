import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/features/game/store/gameStore";
import { InfoIcon, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <div className="flex flex-row justify-center items-center mt-4 gap-0">
      <Button
        onClick={handleHint}
        disabled={!selectedWord}
      >
        Get hint
      </Button>

      {hint && <p className="text-sm text-muted-foreground text-center">{hint}</p>}

      {isTouchDevice() ? (
         <Drawer>
          <DrawerTrigger>
            <InfoIcon className="h-4" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerClose asChild>
              <button
                type="button"
                autoFocus
                aria-label="Close drawer"
                className="absolute right-5 top-5"
              >
                <X className="w-5" aria-hidden="true" />
              </button>
            </DrawerClose>
            <DrawerHeader>
              <DrawerTitle>Hints</DrawerTitle>
              <DrawerDescription>
                To get a hint, select a word in the grid. The hint will tell you another word that belongs to the same category.<br/>Using a hint will give you one error point. 
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="h-4" />
          </TooltipTrigger>
          <TooltipContent className="text-center">
            To get a hint, select a word in the grid. The hint will tell you another word that belongs to the same category.<br/>Using a hint will give you one error point. 
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
