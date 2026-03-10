import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Circle, Palette } from "lucide-react";

interface BProps {
    readonly handleClick: (arg: string) => void
}

export function ColorChanger({ handleClick }: BProps) {

    const colors = [
        { id: "1", circleClass: "fill-sidebar-ring", cardClass: "bg-[var(--sidebar-ring)]" },
        { id: "2", circleClass: "fill-primary", cardClass: "bg-[var(--primary)]" },
        { id: "3", circleClass: "fill-sidebar-primary", cardClass: "bg-[var(--sidebar-primary)]" },
        { id: "4", circleClass: "fill-secondary", cardClass: "bg-[var(--secondary)]" },
        { id: "5", circleClass: "fill-chart-5", cardClass: "bg-[var(--chart-5)]" }
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
                <Circle className={`cursor-pointer stroke-none hover:drop-shadow-sm/60 ${color.circleClass}`} key={color.id} onClick={() => handleClick(color.cardClass)} />
            ))}
        </div>
    </div>
}