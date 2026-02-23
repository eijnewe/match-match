import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit } from "lucide-react"
import { useCategoryName } from "../hooks/categoryName"
import { ColorChanger } from "./ColorChanger"
import { useCategoryColor } from "../hooks/useCategoryColor"

type CustomCardProps =
    | { type: "category" | "completedCategory"; categoryTitle: string }
    | { type: "article"; articleTitle: string }
    | { type: "plus" }


function CustomCard(props: CustomCardProps) {
    const limit = 20 // placeholder; num of categories/words in categories
    const sortedWords = ["Lorem", "Ipsum", "Dolor", "Sit"] // placeholder array of words in category

    const defaultCategoryTitle = "Unknown category"
    const { categoryName, setCategoryName } = useCategoryName(
        props.type === "category" || props.type === "completedCategory"
            ? props.categoryTitle
            : ""
    )
    const { categoryColor, setCategoryColor } = useCategoryColor("card")

    let content;

    if (props.type === "category") {
        content = (
            <Tooltip>
                <TooltipTrigger className="h-full w-full">
                    <Popover>
                        <PopoverTrigger className="h-full w-full">
                            <Card className={`${categoryColor} cursor-pointer hover:brightness-95 h-full w-full flex justify-center p-1 leading-4`}>
                                <CardContent>
                                    {categoryName}
                                </CardContent>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className={"flex flex-col w-fit"}>
                            <span className="flex flex-row items-center">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Edit className="mr-2" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Edit the Category title
                                    </TooltipContent>
                                </Tooltip>
                                <Textarea
                                    value={categoryName}
                                    className="resize-none w-full min-h-8"
                                    maxLength={25}
                                    rows={1}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    onBlur={() => {
                                        if (!categoryName.trim()) setCategoryName(defaultCategoryTitle);
                                    }}
                                />
                            </span>
                            <ColorChanger handleClick={setCategoryColor} />
                        </PopoverContent>
                    </Popover>
                </TooltipTrigger>
                <TooltipContent
                    side="left"
                    className={"text-center flex flex-col"}>
                    {sortedWords.length > 0
                        ? [...sortedWords].sort().join(", ").trim()
                        : "Empty Category"}
                    <span className="font-bold">
                        {sortedWords.length}/{limit}
                    </span>
                </TooltipContent>
            </Tooltip>
        );
    } else if (props.type === "completedCategory") {
        content = (
            <Tooltip>
                <TooltipTrigger className="h-full w-full">
                    <Card className={`${categoryColor} brightness-70 h-full w-full flex justify-center p-1 leading-4`}>
                        <CardContent>
                            {categoryName}
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent
                    side="left"
                    className={"text-center flex flex-col"}>
                    {[...sortedWords].sort().join(", ").trim()}
                    <span className="font-bold">
                        Complete
                    </span>
                </TooltipContent>
            </Tooltip>
        )
    } else if (props.type === "article") {
        content = (
            <Card className="cursor-pointer hover:brightness-95">
                <CardContent>
                    {props.articleTitle}
                </CardContent>
            </Card>
        );
    } else {
        content =
            <Tooltip>
                <TooltipTrigger>
                    <Card className="pr-1 pl-1 text-center cursor-pointer hover:brightness-95 h-full w-full flex justify-center p-1 leading-4">
                        <CardContent>
                            +
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    Add another Category card
                </TooltipContent>
            </Tooltip>
    }

    return content
}