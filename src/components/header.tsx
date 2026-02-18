import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ModeToggle } from './mode-toggle'
import { HowToPlay } from '@/features/game/components/how-to-play'
import { Switch } from './ui/switch'
import { Link, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { PointCounter } from '@/features/game/components/PointCounter'
import { ChevronDown, ChevronUp, Maximize2, Menu } from 'lucide-react'
import { Label } from './ui/label'

export function Header() {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useEffect(() => {
    setIsHamburgerOpen(false)
    setIsHowToPlayOpen(false)
  }, [pathname])

  const handleFullscreenToggle = () => {
    setIsHeaderHidden((prev) => {
      const newHiddenState = !prev
      if (newHiddenState) {
        setIsHamburgerOpen(false)
        setIsHowToPlayOpen(false)
      }
      return newHiddenState
    })
  }

  const isCompactHeader = pathname === '/' || pathname === '/game'

  const fullscreenButton = (
    <Button
      className="bg-accent"
      onClick={handleFullscreenToggle}
      aria-label={isHeaderHidden ? 'Show header' : 'Hide header'}
      size="icon-lg"
    >
      <Maximize2 className="text-accent-foreground" />
    </Button>
  )

  return (
    <div className="test shrink-0">
      {isHeaderHidden && (
        <div className="fixed top-2 right-2">{fullscreenButton}</div>
      )}

      {!isHeaderHidden && (
        <div className="bg-accent z-40">
          <Collapsible
            open={isHamburgerOpen}
            onOpenChange={(open) => {
              setIsHamburgerOpen(open)
              if (!open) setIsHowToPlayOpen(false)
            }}
          >
            <div className="flex items-center gap-2 pt-2 pb-2 justify-between px-2">
              <Link to="/">
                <img
                  src="/src/assets/memory-game.png"
                  alt="Home"
                  className="h-12"
                />
              </Link>

              {!isCompactHeader && (
                <div className="font-mono pl-2">
                  <PointCounter />
                </div>
              )}

              <div className="flex items-center gap-2">
                {fullscreenButton}

                <CollapsibleTrigger
                  render={
                    <Button variant={'ghost'} size="icon-lg">
                      <Menu className="text-accent-foreground" />
                    </Button>
                  }
                />
              </div>
            </div>

            <div className="absolute left-0 right-0 bg-accent z-50 -mt-px">
              <CollapsibleContent className="flex flex-col text-sm shadow-xl">
                <div className="ml-auto w-[40vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw] flex flex-col gap-2 pl-2.5 pr-2.5">
                  {!isCompactHeader && (
                    <div className="flex items-center justify-between">
                      <Link to="/" className="flex-1">
                        Home
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="dark-mode"
                      className="flex-1 cursor-pointer text-sm"
                    >
                      Dark Mode
                    </Label>
                    <ModeToggle />
                  </div>

                  {!isCompactHeader && (
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="grid-mode"
                        className="flex-1 cursor-pointer text-sm"
                      >
                        Grid
                      </Label>
                      <Switch id="grid-mode" />
                    </div>
                  )}
                </div>

                <Collapsible
                  open={isHowToPlayOpen}
                  onOpenChange={setIsHowToPlayOpen}
                >
                  <div className="ml-auto w-[40vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw] flex flex-col pl-2.5 pr-1.5 pt-0.5 pb-1">
                    <CollapsibleTrigger
                      render={
                        <Button
                          variant="ghost"
                          className="bg-accent w-full p-0 border-0"
                          size="icon-lg"
                        >
                          <div className="flex items-center justify-between w-full text-sm">
                            <span>How to play</span>
                            <div className="pr-2 text-accent-foreground">
                              {isHowToPlayOpen ?
                                <ChevronUp />
                              : <ChevronDown />}
                            </div>
                          </div>
                        </Button>
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
  )
}
