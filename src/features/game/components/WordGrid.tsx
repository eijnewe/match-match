import clsx from 'clsx'
import { CustomCard } from './CustomCard'

type WordGridProps = {
  words: string[]
  display: string
}

export function WordGrid({ words, display }: WordGridProps) {
  const isGrid = display == 'grid'
  return (
    <div
      className={clsx(
        'gap-4',
        isGrid ?
          'grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] [auto-rows:1fr]'
        : 'flex flex-wrap',
      )}
    >
      {words.map((w) => (
        <CustomCard key={w} type="article" articleTitle={w} />
      ))}

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
