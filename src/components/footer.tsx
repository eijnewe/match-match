import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Footer() {
    return (
        <Tooltip>
            <TooltipTrigger className={"w-full absolute bottom-2"}>
                <div className="items-center justify-center flex text-xs text-(--stark) font-bold">
                        WARJ © 2026
                </div>
            </TooltipTrigger>
            <TooltipContent className={"text-center"}>
                <b>matchmatch</b> is made by WARJ- Wenjie, Alice, Rosanna and Jenny: a group of coders that love puzzles and word games. <b>matchmatch</b> was inspired by <b>Thomas Colthurst's</b> Game 2025.
            </TooltipContent>
        </Tooltip>
    )
}