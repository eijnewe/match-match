import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit } from "lucide-react"
import { useCategoryName } from "../hooks/categoryName"
import { ColorChanger } from "./ColorChanger"
import { useCategoryColor } from "../hooks/useCategoryColor"
import type React from "react"

type BaseCardProps = {
    children: React.ReactNode
    tooltip?: React.ReactNode
    cardClasses?: string
    editable?: React.ReactNode
    categoryTitle?: string
    articleTitle?: string
    type: "category" | "completedCategory" | "article" | "plus" | "editable"
}

type CustomCardProps =
    | { type: "category" | "completedCategory" | "editable"; categoryTitle: string }
    | { type: "article"; articleTitle: string }
    | { type: "plus" }

function BaseCard({ children, tooltip, cardClasses, editable, categoryTitle, articleTitle, type }: BaseCardProps) {
    const completedStyling = type === "completedCategory" ? "brightness-50" : "cursor-pointer hover:brightness-95"
    const card = (
        <Card className={`pr-1 pl-1 text-center h-full w-full flex justify-center p-1 leading-4 ${completedStyling} ${cardClasses ?? ""}`}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )

    if (tooltip) {
        return (
            <Tooltip>
                <TooltipTrigger className="h-full w-full">
                    {card}
                </TooltipTrigger>
                <TooltipContent side="left" className={"text-center flex flex-col"}>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        )
    }
    return card
}

function ArticleCard(props: Extract<CustomCardProps, { type: "article" }>) {
    return (
        <BaseCard type="article">
            {props.articleTitle}
        </BaseCard>
    )
}

function AddCard() {
    return (
        <BaseCard type="plus" tooltip="Add another Category card">
            +
        </BaseCard>
    )
}

function CategoryCard(props: Extract<CustomCardProps, { type: "category" | "completedCategory" }>) {
    const limit = 20 // placeholder; num of categories/words in categories
    const sortedWords = ["Lorem", "Ipsum", "Dolor", "Sit"] // placeholder array of words in category
    const defaultCategoryTitle = "Unknown category"
    const { categoryName, setCategoryName } = useCategoryName(props.categoryTitle)
    const { categoryColor, setCategoryColor } = useCategoryColor("card")

    const customTooltipContent =
        props.type === "completedCategory" ? (
            <>{[...sortedWords].sort().join(", ").trim()}
                <span className="font-bold">
                    Complete
                </span>
            </>
        ) : (
            <>
                {[...sortedWords].sort().join(", ").trim()}

                <span className="font-bold"> {sortedWords.length} / {limit}</span>

            </>
        )
    const customPopoverContent = <>
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
    </>

    return (
        props.type === "editable"
            ?
            <Popover>
                <PopoverTrigger className="h-full w-full">
                    <BaseCard
                        tooltip={customTooltipContent}
                        cardClasses={`${categoryColor}`}
                        type={props.type} >
                        {categoryName}
                    </BaseCard>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col w-fit">
                    {customPopoverContent}
                </PopoverContent>
            </Popover>
            : <BaseCard
                tooltip={customTooltipContent}
                cardClasses={`${categoryColor}`}
                type={props.type} >
                {categoryName}
            </BaseCard>

    )
}

export function CustomCard(props: CustomCardProps) {
    switch (props.type) {
        case "category":
            return <CategoryCard type="category" categoryTitle={props.categoryTitle} />
        case "completedCategory":
            return <CategoryCard type="completedCategory" categoryTitle={props.categoryTitle} />
        case "editable":
            return <CategoryCard type="editable" categoryTitle={props.categoryTitle} />
        case "article":
            return <ArticleCard type="article" articleTitle={props.articleTitle} />
        case "plus":
            return <AddCard />
        default:
            return null
    }
}