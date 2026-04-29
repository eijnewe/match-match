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
import { CustomCard } from "@/features/game/components/CustomCard";

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

    setHint(otherWord);
    addError();
  }

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <div className="flex flex-col justify-center items-center mt-4 gap-2">
      <div className="flex flex-row justify-center">
        <Button
          onClick={handleHint}
          disabled={!selectedWord}
        >
          Get hint
        </Button>

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
                  Select a word in the grid and then "Get hint" to get help. The hint will tell you another word that belongs to the same category.<br />Using a hint will give you one error point.
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
              Select a word in the grid and then "Get hint" to get help. The hint will tell you another word that belongs to the same category.<br />Using a hint will give you one error point.
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {isTouchDevice() ? (
        <>{hint && (
          <div className="leading-7 text-xs/relaxed text-center p-1.5 flex flex-col items-center">
            <div className="border-(--stark) brightness-95 ring-foreground/10 bg-card text-card-foreground gap-4 rounded-lg py-1.5 text-xs/relaxed ring-1 data-[size=sm]:gap-3 data-[size=sm]:py-3 group/card border p-1 text-center h-full justify-center cursor-default w-fit">{selectedWord}</div>
            is in the same category as
            <div className="border-border) ring-foreground/10 bg-card text-card-foreground gap-4 rounded-lg py-1.5 text-xs/relaxed ring-1 data-[size=sm]:gap-3 data-[size=sm]:py-3 group/card border p-1 text-center h-full justify-center cursor-default w-fit">{hint}</div>
          </div>
        )}</>
      ) : (
        <>{hint && (
          <div className="leading-7 text-xs/relaxed text-center p-1.5">
            <span className="border-(--stark) brightness-95 ring-foreground/10 bg-card text-card-foreground gap-4 rounded-lg py-1.5 text-xs/relaxed ring-1 data-[size=sm]:gap-3 data-[size=sm]:py-3 group/card border p-1 text-center h-full justify-center cursor-default">
              {selectedWord}
            </span>
            {" "}is in the same category as{" "}
            <span className="border-border) ring-foreground/10 bg-card text-card-foreground gap-4 rounded-lg py-1.5 text-xs/relaxed ring-1 data-[size=sm]:gap-3 data-[size=sm]:py-3 group/card border p-1 text-center h-full justify-center cursor-default">
              {hint}
            </span>
          </div>
        )}</>
      )}
    </div>
  );
}
