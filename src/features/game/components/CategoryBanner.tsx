import clsx from "clsx";
import { CustomCard } from "./CustomCard";
import type { WorkingCategory } from "../store/gameStore";
import { useGameStore } from "../store/gameStore";

type CategoryBannerProps = {
  pinnedCategories?: WorkingCategory[];
  categoryCount?: number;
  canAddCategory?: boolean;
  onAddCategoryClick?: () => void;
  onCategoryClick: (categoryId: number) => void;
};

export function CategoryBanner({
  pinnedCategories = [],
  categoryCount = 0,
  canAddCategory = false,
  onAddCategoryClick,
  onCategoryClick,
}: CategoryBannerProps) {
  const isTwoRows = pinnedCategories.length > categoryCount / 2;
  const selectedCategoryId = useGameStore((s) => s.selectedCategoryId);

  return (
    <div
      className={clsx(
        "grid grid-flow-col gap-1 bg-border dark:bg-border  w-full left-0 pl-3 pr-3 pt-2 pb-2 overflow-x-auto items-stretch max-h-60 auto-rows-fr",
        isTwoRows ? "grid-rows-2" : "grid-rows-1",
      )}
    >
      {pinnedCategories.map((cat, index) => {
        const categoryId = cat.id;
        if (categoryId == null) return null;

        return (
          <CustomCard
            key={`${categoryId}-${index}`}
            type={cat.solved ? "completedCategory" : "category"}
            categoryTitle={cat.name ?? "Empty category"}
            onClick={() => onCategoryClick(categoryId)}
            selected={selectedCategoryId === categoryId}
          />
        );
      })}
      {canAddCategory && <CustomCard type="plus" onClick={onAddCategoryClick} />}
    </div>
  );
}
