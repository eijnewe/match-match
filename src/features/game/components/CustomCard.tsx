import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit } from "lucide-react"
import { useCategoryName } from "../hooks/categoryName"

type CustomCardProps =
    | { type: "category"; categoryTitle: string }
    | { type: "article"; articleTitle: string }


export function CustomCard(props: CustomCardProps) {
    const limit = 20 // placeholder; num of categories/words in categories
    const sortedWords = ["Lorem", "Ipsum", "Dolor", "Sit"] // placeholder array of words in category

    const defaultCategoryTitle = "Unknown category"
    const { categoryName, setCategoryName } = useCategoryName(props.type === "category" ? props.categoryTitle : "")

    return props.type === "category"
        ? (
            <Tooltip>
                <TooltipTrigger>
                    <Popover>
                        <PopoverTrigger>
                            <Card>
                                <CardContent>
                                    {categoryName}
                                </CardContent>
                            </Card>
                        </PopoverTrigger>
                        <PopoverContent className={"flex flex-col w-fit"}>
                            <span className="flex flex-row items-center">
                                <Edit className="mr-2">
                                    <title>
                                        Edit name
                                    </title>
                                </Edit>
                                <Textarea
                                    value={categoryName}
                                    className="resize-none w-full min-h-8"
                                    maxLength={60}
                                    rows={1}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    onBlur={() => {
                                        if (!categoryName.trim()) setCategoryName(defaultCategoryTitle);
                                    }}
                                />
                            </span>
                            <span className="flex flex-row">
                                [Replace this with Color Changer Component]
                            </span>
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

        ) : (
            <Card>
                <CardContent>
                    {props.articleTitle}
                </CardContent>
            </Card>
        )
}