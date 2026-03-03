import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit } from "lucide-react";
import { ColorChanger } from "./ColorChanger";
import { useCategoryColor } from "../hooks/useCategoryColor";
import type React from "react";
import { useGameStore } from "@/features/game/store/gameStore";
import { useEffect, useState } from "react";

type BaseCardProps = {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  cardClasses?: string;
  type: "category" | "completedCategory" | "article" | "plus" | "editable";
  onClick?: () => void;
  selected?: boolean;
  errored?: boolean;
};

type CustomCardProps =
  | {
      type: "category" | "completedCategory" | "editable";
      categoryTitle: string;
      categoryWords: string[];
      categoryLimit: number | null;
      errorAnimationToken?: number;
      onCategoryTitleChange?: (title: string) => void;
      onClick?: () => void;
      selected?: boolean;
    }
  | { type: "article"; articleTitle: string; onClick?: () => void; selected?: boolean }
  | { type: "plus"; onClick?: () => void; selected?: boolean };

function BaseCard({
  children,
  tooltip,
  cardClasses,
  type,
  onClick,
  selected,
  errored,
}: BaseCardProps) {
  const errorStyling = errored ? "animate-shake" : "";
  const completedStyling =
    type === "completedCategory"
      ? "brightness-60 hover:brightness-70"
      : "cursor-pointer hover:brightness-95";

  const selectedStyling = selected ? "border-black brightness-95" : "";
  
  const card = (
    <Card
      onClick={onClick}
      className={
        `text-center h-full w-full inline-flex justify-center p-1 leading-4 border ${completedStyling} ${selectedStyling} ${errorStyling} ${cardClasses ?? ""}`
      }
    >
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger className="h-full w-full">{card}</TooltipTrigger>
        <TooltipContent side="left" className={"text-center flex flex-col"}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }
  return card;
}

function ArticleCard(props: Extract<CustomCardProps, { type: "article" }>) {
  return (
    <BaseCard type="article" onClick={props.onClick} selected={props.selected}>
      {props.articleTitle}
    </BaseCard>
  );
}

function AddCard(props: Extract<CustomCardProps, {type: "plus" }>) {
  return (
    <BaseCard
      type="plus"
      tooltip="Add another Category card"
      onClick={props.onClick}
      selected={false}
    >
      <span>+</span>
    </BaseCard>
  );
}

function CategoryCard(
  props: Extract<
    CustomCardProps,
    { type: "category" | "completedCategory" | "editable" }
  >,
) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!props.errorAnimationToken) return;
    setIsShaking(true);
    const t = setTimeout(() => setIsShaking(false), 350);
    return () => clearTimeout(t);
  }, [props.errorAnimationToken])

  const limit = props.categoryLimit ?? props.categoryWords.length;
  const sortedWords = [...props.categoryWords].sort((a, b) =>
    a.localeCompare(b),
  );

  const { categoryColor, setCategoryColor } = useCategoryColor("card");

  const customTooltipContent =
    props.type === "completedCategory" ? (
      <>
        {sortedWords.join(", ").trim()}
        <span className="font-bold">Complete</span>
      </>
    ) : (
      <>
        {sortedWords.join(", ").trim()}
        <span className="font-bold">
          {" "}
          {sortedWords.length} / {limit}
        </span>
      </>
    );

  const customPopoverContent = (
    <>
      <span className="flex flex-row items-center">
        <Tooltip>
          <TooltipTrigger>
            <Edit className="mr-2" />
          </TooltipTrigger>
          <TooltipContent>Edit the Category title</TooltipContent>
        </Tooltip>
        <Textarea
          value={props.categoryTitle}
          className="resize-none w-full min-h-8"
          maxLength={25}
          rows={1}
          onChange={(e) => props.onCategoryTitleChange?.(e.target.value)}
        />
      </span>
      <ColorChanger handleClick={setCategoryColor} />
    </>
  );

  return props.type === "editable" ? (
    <Popover>
      <PopoverTrigger className="h-full w-full">
        <BaseCard
          tooltip={customTooltipContent}
          cardClasses={`${categoryColor}`}
          type={props.type}
          onClick={props.onClick}
          selected={props.selected}
          errored={isShaking}
        >
          {props.categoryTitle}
        </BaseCard>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-fit">
        {customPopoverContent}
      </PopoverContent>
    </Popover>
  ) : (
    <BaseCard
      tooltip={customTooltipContent}
      cardClasses={`${categoryColor}`}
      type={props.type}
      onClick={props.onClick}
      selected={props.selected}
      errored={isShaking}
    >
      {props.categoryTitle}
    </BaseCard>
  );
}

export function CustomCard(props: CustomCardProps) {
  const isEditMode = useGameStore((s) => s.isEditMode);

  switch (props.type) {
    case "category":
      return isEditMode ? (
        <CategoryCard
          type="editable"
          categoryTitle={props.categoryTitle}
          categoryWords={props.categoryWords}
          categoryLimit={props.categoryLimit}
          errorAnimationToken={props.errorAnimationToken}
          onCategoryTitleChange={props.onCategoryTitleChange}
          onClick={props.onClick}
          selected={false}
        />
      ) : (
        <CategoryCard
          type="category"
          categoryTitle={props.categoryTitle}
          categoryWords={props.categoryWords}
          categoryLimit={props.categoryLimit}
          errorAnimationToken={props.errorAnimationToken}
          onCategoryTitleChange={props.onCategoryTitleChange}
          onClick={props.onClick}
          selected={props.selected}
        />
      );
    case "completedCategory":
      return (
        <CategoryCard
          type="completedCategory"
          categoryTitle={props.categoryTitle}
          categoryWords={props.categoryWords}
          categoryLimit={props.categoryLimit}
          errorAnimationToken={props.errorAnimationToken}
          onCategoryTitleChange={props.onCategoryTitleChange}
          onClick={props.onClick}
          selected={false}
        />
      );
    case "article":
      return (
        <ArticleCard
          type="article"
          articleTitle={props.articleTitle}
          onClick={props.onClick}
          selected={props.selected}
        />
      );
    case "plus":
      return <AddCard type="plus" onClick={props.onClick} />;
    default:
      return null;
  }
}

// Styling: 
// For selected cards="border-black brightness-95" X
// For error selection="animate-shake"