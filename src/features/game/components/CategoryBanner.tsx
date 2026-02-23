import clsx from 'clsx'
import { CustomCard } from './CustomCard'

export function CategoryBanner({
  pinnedCategories,
  onAddCategory,
  onRemoveCategory,
  categoryCount,
}) {
  const isTwoRows = pinnedCategories.length > categoryCount / 2

  return (
    <div
      className={clsx(
        'grid grid-flow-col gap-1 bg-border dark:bg-border  w-full left-0 pl-3 pr-3 pt-2 pb-2 overflow-x-auto items-stretch max-h-60 auto-rows-fr',
        isTwoRows ? 'grid-rows-2' : 'grid-rows-1',

      )}
    >
      {pinnedCategories.map((cat) => (
        <CustomCard key={cat} type="category" categoryTitle={cat} />
      ))}
      <CustomCard type='editable' categoryTitle='Disco Dances'/>
      <CustomCard type='completedCategory' categoryTitle='Horses'/>
      <CustomCard type="plus"/>
    </div>
  )
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