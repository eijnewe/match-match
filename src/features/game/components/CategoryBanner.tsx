import clsx from 'clsx'
import { CustomCard } from './CustomCard'
import type { WorkingCategory } from '../store/gameStore'

type CategoryBannerProps = {
  pinnedCategories?: WorkingCategory[];
  categoryCount?: number;
};

export function CategoryBanner({
  pinnedCategories = [],
  categoryCount = 0,
}: CategoryBannerProps ) {
  const isTwoRows = pinnedCategories.length > categoryCount / 2

  return (
    <div
      className={clsx(
        'grid grid-flow-col gap-1 bg-border dark:bg-border absolute w-full left-0 p-1.5 overflow-x-auto items-stretch max-h-60 auto-rows-fr',
        isTwoRows ? 'grid-rows-2' : 'grid-rows-1'
      )}
    >
      {pinnedCategories.map((cat) => (
        <CustomCard key={cat.id} type="category" categoryTitle={cat.name} />
      ))}
      <CustomCard type='completedCategory' categoryTitle='Horses'/>
      <CustomCard type="plus"/>
    </div>
  )
}
