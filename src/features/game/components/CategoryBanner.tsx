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
  showSolvedCategoryName?: boolean;
};

export function CategoryBanner({
  pinnedCategories = [],
  categoryCount = 0,
  canAddCategory = false,
  onAddCategoryClick,
  onCategoryClick,
  showSolvedCategoryName = true,
}: CategoryBannerProps) {


  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const categoryThreshold = isTouchDevice() ? 5 : 9;
  const isTwoRows = pinnedCategories.length > categoryThreshold;

  const selectedCategoryId = useGameStore((s) => s.selectedCategoryId);
  const lastErrorCategoryId = useGameStore((s) => s.lastErrorCategoryId);
  const errorAnimationNonce = useGameStore((s) => s.errorAnimationNonce);
  const setCategoryCustomName = useGameStore((s) => s.setCategoryCustomName);



  return (
    <div
      className={clsx(
        "grid grid-flow-col gap-1 bg-border dark:bg-border w-full left-0 pl-3 pr-3 pt-2 pb-2 overflow-x-auto items-stretch max-h-60 auto-rows-fr",
        isTwoRows ? "grid-rows-2" : "grid-rows-1",
      )}
    >
      {pinnedCategories.map((cat, index) => {
        const categoryId = cat.id;
        if (categoryId == null) return null;

        const custom = cat.customName;

        const displayTitle = cat.solved
          ? (cat.name ?? "Unknown category")
          : custom
            ? custom
            : cat.words.length === 0
              ? "Empty category"
              : "Unknown category";

        return (
          <CustomCard
            key={`category-card-${index}`}
            type={cat.solved ? "completedCategory" : "category"}
            categoryTitle={displayTitle}
            categoryWords={cat.words}
            categoryLimit={cat.maxWords}
            errorAnimationToken={
              lastErrorCategoryId === categoryId ? errorAnimationNonce : 0
            }
            onCategoryTitleChange={(title) => setCategoryCustomName(categoryId, title)}
            onClick={() => onCategoryClick(categoryId)}
            selected={selectedCategoryId === categoryId}
          />
        );
      })}
      {canAddCategory && (
        <CustomCard type="plus" onClick={onAddCategoryClick} />
      )}
    </div>
  );
}
