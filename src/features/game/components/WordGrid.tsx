import clsx from 'clsx'
import { CustomCard } from './CustomCard'
import { Button } from '@/components/ui/button'

/* className={clsx(
        'gap-2',
        isGrid ?
          'grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] auto-rows-[4rem]'
        : 'flex flex-wrap',
      )} */

type WordGridProps = {
  words: string[]
  display: string
}

export function WordGrid({ words, display }: WordGridProps) {
  const isGrid = display == 'grid'
  return (
    <div
      className={clsx(
        'gap-2',
        isGrid ?
          'grid place-items-stretch grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] auto-rows-auto'
        : 'flex flex-wrap content-start',
      )}
    >
      {words.map((w) => (
        <CustomCard key={w} type="article" articleTitle={w} />
      ))}
      {/* <Button
        variant={'outline'}
        key={w}
        className={clsx(
          'grow whitespace-normal break-normal py-2',
          isGrid ? 'h-auto' : 'min-h-3.5',
        )}
      >
        {w}
      </Button> */}

      {/*   {words.map((word, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              style={{
                border: "1px solid gray",
                aspectRatio: "1 / 1",
              }}
            >
              {word[colIndex] ?? ""}
            </div>
          ))}
        </div>
      ))} */}
    </div>
  )
}
