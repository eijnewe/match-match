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
import { Edit, X } from "lucide-react";
import { ColorChanger } from "./ColorChanger";
import { useCategoryColor } from "../hooks/useCategoryColor";
import type React from "react";
import { useGameStore } from "@/features/game/store/gameStore";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

type BaseCardProps = {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  cardClasses?: string;
  type: "category" | "completedCategory" | "article" | "plus" | "editable";
  onClick?: () => void;
  selected?: boolean;
  errored?: boolean;
};

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

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
  | {
      type: "article";
      articleTitle: string;
      onClick?: () => void;
      selected?: boolean;
    }
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
      ? "brightness-70 hover:brightness-80 order-last bg-card"
      : "cursor-pointer hover:brightness-95";

  const selectedStyling = selected ? "border-(--stark) brightness-95" : "";

  const card = (
    <Card
      onClick={onClick}
      className={`text-center h-full w-full inline-flex justify-center p-1 leading-4 border ${completedStyling} ${selectedStyling} ${errorStyling} ${cardClasses ?? ""}`}
    >
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );

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

function AddCard(props: Extract<CustomCardProps, { type: "plus" }>) {
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
  }, [props.errorAnimationToken]);

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

  const [openEdit, setOpenEdit] = useState(false);

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
          placeholder={props.categoryTitle}
          className="resize-none w-full min-h-8"
          maxLength={25}
          rows={1}
          onChange={(e) => props.onCategoryTitleChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
              setOpenEdit(false);
            }
          }}
        />
      </span>
      <ColorChanger handleClick={setCategoryColor} />
    </>
  );

  return props.type === "editable" ? (
    <Popover open={openEdit} onOpenChange={setOpenEdit}>
      <PopoverTrigger className="h-full w-full">
        <BaseCard
          tooltip={!isTouchDevice() ? customTooltipContent : undefined}
          cardClasses={`${categoryColor} relative`}
          type={props.type}
          onClick={props.onClick}
          selected={props.selected}
          errored={isShaking}
        >
          <div className="flex flex-col items-center">
            {props.categoryTitle}

            {isTouchDevice() && (
              <Drawer>
                <DrawerTrigger>
                  <Badge className="absolute -top-1.5 -right-1 opacity-85">
                    {`${sortedWords.length}/${limit}`}
                  </Badge>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      {props.categoryTitle}:
                    </DrawerTitle>
                    <DrawerDescription>
                      <div className="text-md">
                        {sortedWords.join(", ").trim()}
                      </div>
                      <br />
                      <div className="font-bold">
                        {props.type === "completedCategory"
                          ? "Complete"
                          : `${sortedWords.length} out of ${limit} words total`}
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerClose className="absolute top-3 right-3">
                    <X />
                  </DrawerClose>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </BaseCard>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-fit">
        {customPopoverContent}
      </PopoverContent>
    </Popover>
  ) : (
    <BaseCard
      tooltip={!isTouchDevice() ? customTooltipContent : undefined}
      cardClasses={`${categoryColor} relative`}
      type={props.type}
      onClick={props.onClick}
      selected={props.selected}
      errored={isShaking}
    >
      <div className="w-full h-full flex justify-center items-center">
        {props.categoryTitle}

        {isTouchDevice() && props.type !== "completedCategory" && (
          <Drawer>
            <DrawerTrigger>
              <Badge className="absolute -top-1.5 -right-1 opacity-85">
                {`${sortedWords.length}/${limit}`}
              </Badge>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  {props.categoryTitle}:
                </DrawerTitle>
                <DrawerDescription>
                  <div className="text-md">
                    {sortedWords.join(", ").trim()}
                  </div>
                  <br />
                  <div className="font-bold">
                    {props.type === "completedCategory"
                      ? "Complete"
                      : `${sortedWords.length} out of ${limit} words total`}
                  </div>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerClose className="absolute top-3 right-3">
                <X />
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        )}
      </div>
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
