import clsx from 'clsx'
import { CustomCard } from './CustomCard'

export function CategoryBanner({
  pinnedCategories,
  onAddCategory,
  onRemoveCategory,
  categoryCount,
}) {
  const isTwoRows = pinnedCategories.length > categoryCount / 2
  console.log(categoryCount)
  console.log(pinnedCategories)

  console.log(isTwoRows)

  return (
    <div
      className={clsx(
        'grid grid-flow-col gap-2 bg-border dark:bg-border overflow-x-auto items-stretch auto-rows-fr p-3 shrink-0',
        isTwoRows ? 'grid-rows-2' : 'grid-rows-1',
      )}
    >
      {pinnedCategories.map((cat) => (
        <CustomCard key={cat} type="category" categoryTitle={cat} />
      ))}
      {/* <span
          key={cat}
          className="px-2 py-1 bg-primary/10 rounded text-sm flex items-center gap-1"
        >
          {cat}
          <button onClick={() => onRemoveCategory(cat)}>remove</button>
        </span> */}
    </div>
  )
}
