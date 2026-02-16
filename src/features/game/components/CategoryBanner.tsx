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
        'grid gap-4 grid-flow-col auto-cols-fr sticky',
        isTwoRows ?
          'grid-rows-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
        : 'grid-rows-1 grid-cols-[repeat(auto-fit,minmax(0,1fr))]',
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
