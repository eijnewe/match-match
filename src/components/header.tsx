import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModeToggle } from "./mode-toggle";
import { HowToPlay } from "@/features/game/components/how-to-play";
import { Switch } from "./ui/switch";
import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PointCounter } from "@/features/game/components/PointCounter";
import { ChevronDown, ChevronUp, Maximize2, Menu, Edit } from "lucide-react";
import { Label } from "./ui/label";
import { useGameStore } from "@/features/game/store/gameStore";
import { useGridStore } from "@/features/game/hooks/useGridStore";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Header() {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const isEditMode = useGameStore((s) => s.isEditMode);
  const toggleEditMode = useGameStore((s) => s.toggleEditMode);
  const isGridMode = useGridStore((s) => s.isGridMode);
  const toggleGridMode = useGridStore((s) => s.toggleGridMode);

  const editBtn = (
    <Tooltip>
      <TooltipTrigger>
        <Button
          className="bg-transparent cursor-pointer data-[state=open]:bg-muted"
          size="icon-lg"
          onClick={toggleEditMode}
          aria-pressed={isEditMode}
          aria-label={isEditMode ? "Disable edit mode" : "Enable edit mode"}
          data-state={isEditMode ? "open" : "closed"}
        >
          <Edit className="text-accent-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Toggle Editing mode
      </TooltipContent>
    </Tooltip>
  );

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  useEffect(() => {
    setIsHamburgerOpen(false);
    setIsHowToPlayOpen(false);
  }, [pathname]);

  const handleFullscreenToggle = () => {
    setIsHeaderHidden((prev) => {
      const newHiddenState = !prev;
      if (newHiddenState) {
        setIsHamburgerOpen(false);
        setIsHowToPlayOpen(false);
      }
      return newHiddenState;
    });
  };

  const isCompactHeader = pathname === "/" || pathname === "/game";

  const fullscreenBtn = (
    <Tooltip>
      <TooltipTrigger>
        <Button
          className="bg-transparent cursor-pointer"
          onClick={handleFullscreenToggle}
          aria-label={isHeaderHidden ? "Show header" : "Hide header"}
          size="icon-lg"
        >
          <Maximize2 className="text-accent-foreground" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Toggle Fullscreen mode
      </TooltipContent>
    </Tooltip>
  );


  return (
    <div className="test shrink-0">
      {isHeaderHidden && (
        <div className="fixed top-2 right-2 z-50">{fullscreenBtn}</div>
      )}

      {!isHeaderHidden && (
        <div className="bg-accent z-40">
          <Collapsible
            open={isHamburgerOpen}
            onOpenChange={(open) => {
              setIsHamburgerOpen(open);
              if (!open) setIsHowToPlayOpen(false);
            }}
          >
            <div className="flex items-center gap-2 pt-2 pb-2 justify-between px-2">
              <Link to="/">
                <>
                  <img
                    src="/src/assets/LightModeIcon.png"
                    alt="home"
                    className="h-12 dark:hidden"
                  />
                  <img
                    src="/src/assets/DarkModeIcon.png"
                    alt="Home"
                    className="h-12 hidden dark:block"
                  />
                </>
              </Link>

              {!isCompactHeader && (
                <div className="font-mono pl-2">
                  <PointCounter />
                </div>
              )}

              <div className="flex items-center gap-1.5">
                {!isCompactHeader && editBtn}
                {fullscreenBtn}
                <CollapsibleTrigger
                  render={
                    <Button variant={"ghost"} size="icon-lg" className={"cursor-pointer"}>
                      <Menu className="text-accent-foreground" />
                    </Button>
                  }
                />
              </div>
            </div>

            <div className="absolute left-0 right-0 bg-accent z-50 -mt-px">
              <CollapsibleContent className="flex flex-col text-sm shadow-xl">
                <div className="ml-auto w-[40vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw] flex flex-col gap-2 pl-3.5 pr-2.5">
                  {!isCompactHeader && (
                    <div className="flex items-center justify-between">
                      <Link to="/" className="flex-1">
                        Home
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center justify-between *:cursor-pointer">
                    <Label htmlFor="dark-mode" className="flex-1 text-sm">
                      Dark Mode
                    </Label>
                    <ModeToggle />
                  </div>

                  {!isCompactHeader && (
                    <div className="flex items-center justify-between *:cursor-pointer">
                      <Label
                        htmlFor="grid-mode" className="flex-1 text-sm"
                      >
                        Grid
                      </Label>
                      <Switch
                        id="grid-mode"
                        onClick={toggleGridMode}
                        aria-pressed={isGridMode}
                        checked={isGridMode}>
                        {isGridMode ? "Grid" : "Flex"}

                      </Switch>
                    </div>
                  )}
                </div>

                <Collapsible
                  open={isHowToPlayOpen}
                  onOpenChange={setIsHowToPlayOpen}
                >
                  <div className="ml-auto w-[40vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw] pl-3.5 pr-2.5 pt-1.5 pb-1.5 *:cursor-pointer">
                    <CollapsibleTrigger
                      render={
                        <div className="flex items-center justify-between w-full text-sm text-accent-foreground">
                          <span>How to play</span>
                          {isHowToPlayOpen ? (
                            <ChevronUp className="h-4" />
                          ) : (
                            <ChevronDown className="h-4" />
                          )}
                        </div>
                      }
                    />
                  </div>
                  <CollapsibleContent className="bg-muted pt-4 pb-4 p-2.5 border-t border-border">
                    <HowToPlay />
                  </CollapsibleContent>
                </Collapsible>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}
    </div>
  );
}
