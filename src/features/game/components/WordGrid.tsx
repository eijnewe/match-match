import clsx from 'clsx'
import { CustomCard } from './CustomCard'
import { useGameStore } from '../store/gameStore'

type WordGridProps = {
  readonly words: string[]
  readonly display: string
  readonly onWordClick: (word: string) => void
}

export function WordGrid({ words, display, onWordClick }: WordGridProps) {
  const isGrid = display == 'grid'
  const selectedWord = useGameStore((s) => s.selectedWord);

  return (
    <div
    role='radiogroup'
      className={clsx(
        'gap-2',
        isGrid ?
          'grid place-items-stretch grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] auto-rows-auto'
        : 'flex flex-wrap content-start *:w-fit *:p-2',
      )}
    >
      {words.map((w) => (
        <CustomCard 
          key={w} 
          type="article" 
          articleTitle={w} 
          onClick={() => onWordClick(w)}
          selected={selectedWord === w}
        />
      ))}
    </div>
  )
}
