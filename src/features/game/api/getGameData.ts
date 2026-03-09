import { ALL_CATEGORIES } from '@/data/allCategories'
import { fetchCategory } from '@/lib/wikipedia/fetchCategory'
import type { Difficulty, GameData } from '@/types/game'

//shuffle
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

const difficultyConfig = { easy: 3, medium: 4, hard: 5 } as const

function resolveCount(difficulty: Difficulty): number {
  if (typeof difficulty === 'number')
    return Math.max(1, Math.min(30, difficulty))
  return difficultyConfig[difficulty]
}

export async function getGameData(difficulty: Difficulty): Promise<GameData> {
  const count = resolveCount(difficulty)

  const allIds = Object.keys(ALL_CATEGORIES).map(
    Number,
  ) as (keyof typeof ALL_CATEGORIES)[]

  const chosenIds = shuffle(allIds).slice(0, count)

  const categories = await Promise.all(
    chosenIds.map((id) => fetchCategory(id, count)),
  )

  console.log(categories)

  const allWords = categories.flatMap((c) => c.words)
  const uniqueWords = new Set(allWords)

  if (uniqueWords.size !== allWords.length) {
    console.log('duplicates found')
    // duplicates found → redo
    return getGameData(difficulty)
  }

  return { difficulty, categories, allWords: shuffle([...uniqueWords]) }
}

//fetch om ifall dubletter i all words
