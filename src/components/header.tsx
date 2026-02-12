import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModeToggle } from "./mode-toggle";
import { HowToPlay } from "./how-to-play";
import { Switch } from "./ui/switch";
import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

const errors = "0000";
const points = "0000";

export function Header() {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isCompactHeader = pathname === "/" || pathname === "/game";

  const fullscreenButton = (
    <Button
      className="bg-orange-100"
      onClick={() => setIsHeaderHidden((prev) => !prev)}
      aria-label={isHeaderHidden ? "Show header" : "Hide header"}
    >
      <img src="/src/assets/expand.png" alt="Fullscreen" className="h-4" />
    </Button>
  );

  return (
    <div className="relative" style={{ '--header-height': 'auto' } as React.CSSProperties}>
      {isHeaderHidden && (
        <div className="fixed top-2 right-2 z-50">{fullscreenButton}</div>
      )}

      {!isHeaderHidden && (
        <div className="bg-orange-100 relative z-40">
          <Collapsible>
            <div className="flex items-center gap-2 pt-2 pb-2 justify-between px-2 ">
              <Link to="/">
                <img
                  src="/src/assets/memory-game.png"
                  alt="Home"
                  className="h-12"
                />
              </Link>

              {!isCompactHeader && (
                <div className="flex items-center gap-5 font-mono text-sm pt-1.5 pl-2">
                  <div className="justify-items-center">
                    <p className="font-semibold">Points:</p>
                    <p>{points}</p>
                  </div>
                  <div className="justify-items-center">
                    <p className="font-semibold">Errors:</p>
                    <p>{errors}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                {fullscreenButton}

                <CollapsibleTrigger
                  render={
                    <Button className="bg-orange-100">
                      <img
                        src="/src/assets/hamburger.png"
                        alt="Menu"
                        className="h-5"
                      />
                    </Button>
                  }
                />
              </div>
            </div>

            <div className="absolute left-0 right-0 shadow-xl bg-orange-100 z-50">
              <CollapsibleContent className=" flex flex-col text-sm">
                <div className="ml-auto w-[40vw] flex flex-col gap-2 p-2.5 pb-0">
                  {!isCompactHeader && (
                    <div className="flex items-center justify-between">
                      <span>
                        <Link to="/">Home</Link>
                      </span>
                      <span />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <span>
                      <ModeToggle />
                    </span>
                  </div>

                  {!isCompactHeader && (
                    <div className="flex items-center justify-between">
                      <span>Grid</span>
                      <span>
                        <Switch />
                      </span>
                    </div>
                  )}
                </div>

                <Collapsible onOpenChange={setIsHowToPlayOpen}>
                  <div className="ml-auto w-[40vw] flex flex-col pl-2.5 pr-1.5 pt-0.5 pb-1">
                    <div className="flex items-center justify-between">
                      <span>How to play</span>
                      <span>
                        <CollapsibleTrigger
                          render={
                            <Button className="bg-orange-100">
                              <img
                                src={
                                  isHowToPlayOpen
                                    ? "/src/assets/up-arrow.png"
                                    : "/src/assets/down-arrow.png"
                                }
                                alt={
                                  isHowToPlayOpen ? "Arrow up" : "Arrow down"
                                }
                                className="h-4.5"
                              />
                            </Button>
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <CollapsibleContent className="bg-orange-50 pt-4 pb-4 p-2.5 border-t border-accent-foreground ">
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
