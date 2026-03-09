import { Button } from "./ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Share } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

type Category = {
  name: string;
  words: string[];
  color?: string;
};

type EndScreenProps = {
  score: number;
  mistakes: number;
  categories: Category[];
  onClose?: () => void;
};

export function EndScreen({ score, mistakes, categories, onClose }: EndScreenProps) {
  const totalWords = categories.reduce((total, category) => {
    return total + category.words.length;
  }, 0);

  const [open, setOpen] = useState(true);

  const handleShareResult = async () => {
    const shareText = `I got ${score} points and ${mistakes} mistakes, with a total of ${totalWords} words!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Game results",
          text: shareText,
          //   url: window.location.href,
        });
      } catch (error) {
        console.log("Delning avbröts", error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Resultatet kopierades");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          onClose?.();
        }
      }}
    >
      {" "}
      <DialogContent className="shadow-none bg-accent p-6 w-[90vw] rounded-xl max-w-md text-center max-h-[90vh] flex flex-col gap-3">
        {" "}
        <DialogHeader>
          <DialogTitle className="text-2xl">You did it!</DialogTitle>
        </DialogHeader>
        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 text-center ">
          <div>
            {" "}
            <p className="text-sm text-muted-foreground">Points</p>
            <p className="font-semibold">{score}</p>
          </div>
          <div>
            {" "}
            <p className="text-sm text-muted-foreground">Mistakes</p>
            <p className="font-semibold">{mistakes} </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 text-center ">
          <div>
            {" "}
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="font-semibold">{categories.length}</p>{" "}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Words</p>
            <p className="font-semibold">{totalWords}</p>{" "}
          </div>
        </div>
        <div className="m-auto w-full mt-4 max-h-[40vh] ">
          {" "}
          <h3 className="text-sm font-bold mb-2 font-sans">Categories</h3>
          <div className="overflow-y-auto max-h-[30vh]">
            <Accordion>
              {categories.map((category) => (
                <AccordionItem
                  key={category.name}
                  value={category.name}
                >
                  <AccordionTrigger
                    className={`font-sans p-3
                hover:bg-muted rounded-md 
                data-[state=open]:bg-primary/30
                transition-colors 
                 ${category.color ?? ""}`}
                  >
                    {category.name}
                  </AccordionTrigger>

                  <AccordionContent className="text-center pb-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto mt-2">
                      {category.words.map((word) => (
                        <div
                          key={word}
                          className="bg-muted rounded-md p-1 flex justify-center items-center"
                        >
                          <a
                            href={`https://en.wikipedia.org/wiki/${word}`}
                            target="_blank"
                            className="hover:cursor-help"
                          >
                            {word}
                          </a>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={handleShareResult}
            className="p-3 flex items-center gap-2 justify-center transition-opacity hover:opacity-80"
          >
            <Share
              size={14}
              aria-hidden="true"
            />
            Share your results{" "}
          </Button>
          <Button
            variant="default"
            className="p-3"
            onClick={() => {
              setOpen(false);
              onClose?.();
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
