import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Circle, Palette } from "lucide-react";

interface BProps {
    readonly handleClick: (arg: string) => void
}

export function ColorChanger({ handleClick }: BProps) {

    const colors = [
        { id: "1", circleClass: "fill-choice-1", cardClass: "bg-[var(--choice-1)]" },
        { id: "2", circleClass: "fill-choice-2", cardClass: "bg-[var(--choice-2)]" },
        { id: "3", circleClass: "fill-choice-3", cardClass: "bg-[var(--choice-3)]" },
        { id: "4", circleClass: "fill-choice-4", cardClass: "bg-[var(--choice-4)]" },
        { id: "5", circleClass: "fill-choice-5", cardClass: "bg-[var(--choice-5)]" }
    ]

    return <div className="flex">
        <Tooltip>
            <TooltipTrigger>
                <Palette />
            </TooltipTrigger>
            <TooltipContent>
                Choose a Category color
            </TooltipContent>
        </Tooltip>
        <div className="ml-2 flex">
            {colors.map((color) => (
                <Circle className={`cursor-pointer stroke-foreground stroke-1 hover:drop-shadow-sm/60 ${color.circleClass}`} key={color.id} onClick={() => handleClick(color.cardClass)} />
                <button 
                key={color.name}
                onClick={() => handleClick(color.cardClass)}
                >
                    <Circle 
                    className={`cursor-pointer stroke-none hover:drop-shadow-sm/60 ${color.circleClass}`} key={color.id}  
                    />
                </button>
            ))}
        </div>
    </div>
}