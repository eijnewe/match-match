import clsx from "clsx";
import { CustomCard } from "./CustomCard";
import type { WorkingCategory } from "../store/gameStore";

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

  return (
    <div
      className={clsx(
        "grid grid-flow-col gap-1 bg-border dark:bg-border absolute w-full left-0 p-1.5 overflow-x-auto items-stretch max-h-60 auto-rows-fr",
        isTwoRows ? "grid-rows-2" : "grid-rows-1",
      )}
    >
      {pinnedCategories.map((cat) => {
        if (cat.id == null || cat.name == null) return null;

        return (
          <CustomCard
            key={cat.id}
            type="category"
            categoryTitle={cat.name}
            onClick={() => onCategoryClick(cat.id as number)}
          />
        );
      })}
      {/* <CustomCard type='completedCategory' categoryTitle='Horses'/> */}
      {canAddCategory && (
        <CustomCard type="plus" onClick={onAddCategoryClick} />
      )}
    </div>
  );
}
