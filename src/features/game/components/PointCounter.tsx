import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function PointCounter() {
    const points = 0;
    const errors = 0;

    return (
        <div className="flex *:m-2 text-xs">
            <Tooltip>
                <TooltipTrigger>
                    <div className="flex flex-col items-center">
                        <span className="font-bold">
                            Points:
                        </span>
                        <span>
                            {points}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="text-center">
                    Gain <b>Points</b> by sorting words
                    <br />into their correct category!
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <div className="flex flex-col items-center">
                        <span className="font-bold">
                            Errors:
                        </span>
                        <span>
                            {errors}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="text-center">
                    Your <b>Error Counter</b> will
                    <br />increase when you make mistakes.
                </TooltipContent>
            </Tooltip>
        </div >
    )
}