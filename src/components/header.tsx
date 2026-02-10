import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModeToggle } from "./mode-toggle";
import { HowToPlay } from "./how-to-play";
import { Switch } from "./ui/switch";
import { Link } from "@tanstack/react-router";

const errors = 0;
const points = 0;

export function Header() {
  return (
    <Collapsible className="data-open:bg-muted rounded-md">
      <div className="bg-orange-100 flex flex-row justify-evenly items-center gap-2 pt-2 pb-2">
        <img
          src="/src/assets/memory-game.png"
          alt="Match-logo"
          className="h-12 "
        />
        <p>Points: {points}</p>
        <p>Errors: {errors}</p>
        <img src="/src/assets/expand.png" alt="Match-logo" className="h-5 " />
        <CollapsibleTrigger
          render={
            <Button className="bg-orange-100">
              <img
                src="/src/assets/hamburger.png"
                alt="Match-logo"
                className="h-7 "
              />
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="bg-orange-100 flex flex-col items-start gap-2 p-2.5 text-sm">
        <Link to="/">Home</Link>
        <div>
          Theme
          <ModeToggle />
        </div>
        <div>
          Grid <Switch />
        </div>
        <Collapsible className="data-open:bg-muted rounded-md">
          How to play
          <CollapsibleTrigger
            render={<Button className="bg-orange-100">?</Button>}
          />
          <CollapsibleContent className="bg-orange-100">
            <HowToPlay />
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  );
}
