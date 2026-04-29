import { X } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Footer() {
    const isTouchDevice = () =>
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const footerInformation = (<><b>matchmatch</b> is made by WARJ - Wenjie, Alice, Rosanna and Jenny: a group of coders that love puzzles and word games. <b> matchmatch</b> was inspired by <b>Thomas Colthurst's</b> Game 2025.</>);
    const footerTrigger = (<div className="items-center justify-center flex text-xs text-foreground font-bold">
        WARJ © 2026
    </div>)

    return isTouchDevice() ? (
      <Drawer>
        <DrawerTrigger className={"w-full absolute bottom-2"}>
          {footerTrigger}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerClose asChild>
            <button
              type="button"
              autoFocus
              aria-label="Close drawer"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="absolute right-5 top-5"
            >
              <X className="w-5" aria-hidden="true" />
            </button>
          </DrawerClose>
          <DrawerHeader>
            <DrawerTitle>matchmatch</DrawerTitle>
            <DrawerDescription>{footerInformation}</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    ) : (
      <Tooltip>
        <TooltipTrigger className={"w-full absolute bottom-2"}>
          {footerTrigger}
        </TooltipTrigger>
        <TooltipContent className={"text-center"}>
          {footerInformation}
        </TooltipContent>
      </Tooltip>
    );
}