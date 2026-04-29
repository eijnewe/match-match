import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Circle, Palette } from "lucide-react";

interface BProps {
    readonly handleClick: (arg: string) => void
}

export function ColorChanger({ handleClick }: BProps) {

    const colors = [
        { id: "1", circleClass: "fill-choice-1", cardClass: "bg-[var(--choice-1)]", name: "Yellow" },
        { id: "2", circleClass: "fill-choice-2", cardClass: "bg-[var(--choice-2)]", name: "Blue"},
        { id: "3", circleClass: "fill-choice-3", cardClass: "bg-[var(--choice-3)]", name: "Red"},
        { id: "4", circleClass: "fill-choice-4", cardClass: "bg-[var(--choice-4)]", name: "Green"},
        { id: "5", circleClass: "fill-choice-5", cardClass: "bg-[var(--choice-5)]", name: "Purple"}
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
                <button 
                key={color.name}
                onClick={() => handleClick(color.cardClass)}
                >
                    <Circle 
                    className={`cursor-pointer stroke-input stroke-1 hover:drop-shadow-sm/60 ${color.circleClass}`} key={color.id}  
                    />
                </button>
            ))}
        </div>
    </div>
}