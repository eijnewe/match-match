import type { GameCategory } from './category'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameData {
  difficulty: Difficulty
  categories: GameCategory[]
  allWords: string[]
}
