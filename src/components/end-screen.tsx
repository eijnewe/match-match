// visas när spelet är klart

// visar poäng
// visar antalet misstag
// visare antalet word

// visar kategorier, går att klicka på för att se alla orden i kategorin

// knapp för att dela resultat
// stäng ner

// knapp för att starta om spelet?

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Share } from "lucide-react";

type Category = {
  name: string;
  words: string[];
};

type EndScreenProps = {
  score: number;
  mistakes: number;
  categories: Category[];
};

export function EndScreen({
  score = 12,
  mistakes = 3,
  categories = [
    { name: "Ye", words: ["Hund", "Katt"] },
    {
      name: "Mat",
      words: [
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
        "Pizza",
        "Köttbullar",
      ],
    },
    { name: "Djur", words: ["Hund", "Katt"] },
    { name: "NU", words: ["Pizza"] },
  ],
}: EndScreenProps) {
  const totalWords = categories.reduce((total, category) => {
    return total + category.words.length;
  }, 0);

  const handleShareResult = async () => {
    const shareText = `Jag fick ${score} poäng med ${mistakes} misstag och klarade ${totalWords} ord! 🎉`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Resultat från matchmatch",
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
    <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-1.5 rounded-xl">
      <Card className="w-[420px] text-center rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl">You did it!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-4 grid grid-cols-2 text-center ">
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
          <div className="mx-auto w-70 mt-4">
            <h3 className="text-sm font-bold mb-2 font-sans">Categories</h3>
            <Accordion
              type="multiple"
              collapsible
            >
              {categories.map((category) => (
                <AccordionItem
                  key={category.name}
                  value={category.name}
                >
                  <AccordionTrigger
                    className="font-sans font-bold px-3 py-2 
           hover:bg-primary/40 
           data-[state=open]:bg-primary/30
           transition-colors"
                  >
                    {category.name}
                  </AccordionTrigger>

                  <AccordionContent className="text-left">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1 ">
                      {category.words.map((word) => (
                        <div
                          key={word}
                          className="bg-muted rounded-md p-1 py-2 "
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={handleShareResult}
            className="p-3"
          >
            <Share size="14" /> Share your result{" "}
          </Button>
          <Button
            variant="default"
            className="p-3"
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
