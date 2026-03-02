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
        "grid grid-flow-col gap-1 bg-border dark:bg-border  w-full left-0 pl-3 pr-3 pt-2 pb-2 overflow-x-auto items-stretch max-h-60 auto-rows-fr",
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
      {canAddCategory && (
        <CustomCard type="plus" onClick={onAddCategoryClick} />
      )}
    </div>
  );
}

// const isGrid = display == 'flex'
//   return (
//     <div
//       className={clsx(
//         'gap-2',
//         isGrid ?
//           'grid place-items-stretch grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] auto-rows-auto'
//         : 'flex flex-wrap content-start *:w-fit *:p-2',
//       )}
