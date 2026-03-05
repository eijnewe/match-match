import type { Difficulty } from '@/types/game'
import { useGameQuery } from '../api/useGameQuery'
import { useGameStore } from '../store/gameStore'
import { useEffect } from 'react'
import type { GameCategory } from '@/types/category'

export function useGameLogic(difficulty: Difficulty) {
  const { data, isLoading, error } = useGameQuery(difficulty)

  const {
    selectedWord,
    selectedCategoryId,
    solvedCategories,
    wordsByCategory,
    isGameWon,
    selectWord,
    deselectWord,
    selectCategory,
    deselectCategory,
    solveCategory,
    checkGameWon,
    reset,
  } = useGameStore()

  useEffect(() => {
    reset()
  }, [difficulty, reset])

  useEffect(() => {
    if (data) {
      checkGameWon(data.categories.length)
    }
  }, [solvedCategories, data, checkGameWon])

  const findCategoryForWord = (word: string): GameCategory | null => {
    if (!data) return null
    return data.categories.find((cat) => cat.words.includes(word)) || null
  }

  // const findCategoryInProgress = (categoryId: number): number | null => {
  //   const entries = Object.entries(wordsByCategory);
  //   if (entries.length === 0) return null;

  //   if (wordsByCategory[categoryId]?.length > 0) {
  //     return categoryId;
  //   }

  //   return null;
  // };

  // Matcha ord mot kategori
  const handleWordToCategory = (
    categoryId: number,
  ): { success: boolean; isCorrect: boolean; error?: string } => {
    if (!selectedWord || !data) {
      return { success: false, isCorrect: false, error: 'No word selected' }
    }

    // check kat redan löst
    if (solvedCategories.includes(categoryId)) {
      return {
        success: false,
        isCorrect: false,
        error: 'Category already solved',
      }
    }

    // find korrekt kat för ordet
    const correctCategory = findCategoryForWord(selectedWord)
    if (!correctCategory) {
      return { success: false, isCorrect: false, error: 'Word not found' }
    }

    const isCorrectCategory = correctCategory.id === categoryId

    // Case 1: Tom kat - check om selectedWord tillhör rätt kat
    if (
      !wordsByCategory[categoryId] ||
      wordsByCategory[categoryId].length === 0
    ) {
      if (!isCorrectCategory) {
        // fel kat - check om rätt kat påbörjats nån annanstans
        const categoryInProgressId = Object.entries(wordsByCategory).find(
          ([_, words]) => {
            if (words.length === 0) return false
            // check om ord i kat tillhör samma kat som selectedWord
            return data.categories.find(
              (cat) =>
                cat.id === correctCategory.id &&
                cat.words.some((w) => words.includes(w)),
            )
          },
        )?.[0]

        if (categoryInProgressId) {
          return {
            success: false,
            isCorrect: false,
            error: 'Category already started elsewhere',
          }
        }
      }

      // lägg till ord i kat
      useGameStore.setState((state) => ({
        wordsByCategory: {
          ...state.wordsByCategory,
          [categoryId]: [selectedWord],
        },
      }))

      // check om kat är complete
      if (correctCategory.words.length === 1) {
        solveCategory(categoryId)
      }

      deselectWord()
      return { success: true, isCorrect: isCorrectCategory }
    }

    // Case 2: Kat har ord - check om selectedWord passar
    const existingWords = wordsByCategory[categoryId]
    const firstWord = existingWords[0]
    const categoryOfFirstWord = findCategoryForWord(firstWord)

    if (!categoryOfFirstWord) {
      return { success: false, isCorrect: false, error: 'Category error' }
    }

    // check om ord tillhör samma kat
    const wordBelongsToSameCategory =
      categoryOfFirstWord.words.includes(selectedWord)
    if (!wordBelongsToSameCategory) {
      // Fel
      deselectWord()
      return {
        success: false,
        isCorrect: false,
        error: 'Word does not match category',
      }
    }

    // Rätt ++
    useGameStore.setState((state) => ({
      wordsByCategory: {
        ...state.wordsByCategory,
        [categoryId]: [...existingWords, selectedWord],
      },
    }))

    // check om kat är complete
    const newWordCount = existingWords.length + 1
    if (newWordCount === categoryOfFirstWord?.words.length) {
      solveCategory(categoryId)
    }

    deselectWord()
    return { success: true, isCorrect: true }
  }

  // Wrappers för UI
  const handleWordClick = (word: string) => {
    const isWordMatched = Object.values(wordsByCategory).some((words) =>
      words.includes(word),
    )
    if (isWordMatched) return

    // avmarkera ord
    if (selectedWord === word) {
      deselectWord()
      return
    }

    selectWord(word)

    // kat markerad - matcha direkt
    if (selectedCategoryId !== null) {
      const result = handleWordToCategory(selectedCategoryId)
      if (!result.success) {
        // error animation?
        console.error(result.error)
      }
    }
  }

  const handleCategoryClick = (categoryId: number) => {
    if (solvedCategories.includes(categoryId)) return

    //avmarkera kat
    if (selectedCategoryId === categoryId) {
      deselectCategory()
      return
    }

    selectCategory(categoryId)

    if (selectedWord) {
      const result = handleWordToCategory(categoryId)
      if (!result.success) {
        console.error(result.error)
        deselectCategory()
      }
    }
  }

  const addPinnedCategory = (name: string) => {
    if (!data) return
    const category = data.categories.find((cat) => cat.name === name)
    if (category) {
      selectCategory(category.id)
    }
  }

  const removePinnedCategory = (name: string) => {
    if (!data) return
    const category = data.categories.find((cat) => cat.name === name)
    if (category && selectedCategoryId === category.id) {
      deselectCategory()
    }
  }

  return {
    data,
    isLoading,
    error,

    selectedWord,
    selectedCategoryId,
    solvedCategories,
    wordsByCategory,
    isGameWon,

    handleWordClick,
    handleCategoryClick,
    addPinnedCategory,
    removePinnedCategory,
    reset,
  }
}
