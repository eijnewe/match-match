import type { Difficulty } from '@/types/game'
import { useGameQuery } from '../api/useGameQuery'
import { useGameStore, type WorkingCategory } from '../store/gameStore'
import { useCallback, useEffect, useRef } from 'react'
function isCategoryFull(cat: WorkingCategory) {
  return cat.maxWords != null && cat.words.length >= cat.maxWords
}

export function useGameLogic(difficulty: Difficulty) {
  const { data, isLoading, error } = useGameQuery(difficulty)

  const isEditMode = useGameStore((s) => s.isEditMode)
  const selectedWord = useGameStore((s) => s.selectedWord)
  const selectedCategoryId = useGameStore((s) => s.selectedCategoryId)
  const workingCategories = useGameStore((s) => s.workingCategories)
  const solvedCategories = useGameStore((s) => s.solvedCategories)
  const isGameWon = useGameStore((s) => s.isGameWon)
  const points = useGameStore((s) => s.points)
  const errors = useGameStore((s) => s.errors)
  const triggerCategoryError = useGameStore((s) => s.triggerCategoryError)

  const assignCategoryAndAddWord = useGameStore(
    (s) => s.assignCategoryAndAddWord,
  )
  const setWorkingCategories = useGameStore((s) => s.setWorkingCategories)
  const selectWord = useGameStore((s) => s.selectWord)
  const deselectWord = useGameStore((s) => s.deselectWord)
  const selectCategory = useGameStore((s) => s.selectCategory)
  const deselectCategory = useGameStore((s) => s.deselectCategory)
  const addWordToCategory = useGameStore((s) => s.addWordToCategory)
  const solveCategory = useGameStore((s) => s.solveCategory)
  const reset = useGameStore((s) => s.reset)
  const checkGameWon = useGameStore((s) => s.checkGameWon)
  const addEmptyCategory = useGameStore((s) => s.addEmptyCategory)
  const addPoint = useGameStore((s) => s.addPoint)
  const addError = useGameStore((s) => s.addError)

  const selectionStartedWithRef = useRef<'word' | 'category' | null>(null)

  const onWordClick = (word: string) => {
    if (isEditMode) return
    if (selectedWord === word) {
      deselectWord()
      if (selectedCategoryId == null) selectionStartedWithRef.current = null
      return
    }

    if (selectedWord == null && selectedCategoryId == null) {
      selectionStartedWithRef.current = 'word'
    }

    selectWord(word)
  }

  const onCategoryClick = (categoryId: number) => {
    if (isEditMode) return

    const category = workingCategories.find((cat) => cat.id === categoryId)
    if (!category) return

    if (isCategoryFull(category)) {
      return
    }

    if (selectedCategoryId === categoryId) {
      deselectCategory()
      if (selectedWord == null) selectionStartedWithRef.current = null
      return
    }

    if (selectedWord == null && selectedCategoryId == null) {
      selectionStartedWithRef.current = 'category'
    }

    selectCategory(categoryId)
  }

  useEffect(() => {
    reset()
    selectionStartedWithRef.current = null
  }, [difficulty, reset])

  useEffect(() => {
    if (!data) return
    setWorkingCategories([
      { id: -1, name: null, words: [], maxWords: null, solved: false },
    ])
  }, [data, setWorkingCategories])

  const handleWordPlacement = useCallback(
    (word: string, categoryId: number) => {
      if (!data) return

      const startedWithWord = selectionStartedWithRef.current === 'word'

      const selectedCategory = workingCategories.find(
        (cat) => cat.id === categoryId,
      )
      if (!selectedCategory) return

      function handlePlacementError(categoryId: number) {
        addError()
        triggerCategoryError(categoryId)
        deselectWord()
        deselectCategory()
        selectionStartedWithRef.current = null
      }

      function isWordAlreadyPlaced(word: string) {
        return workingCategories.some((cat) => cat.words.includes(word))
      }

      if (isWordAlreadyPlaced(word)) {
        addError()
        triggerCategoryError(categoryId)
        deselectWord()
        deselectCategory()
        selectionStartedWithRef.current = null
        handlePlacementError(categoryId)
        return
      }

      const realCategory = data.categories.find((cat) =>
        cat.words.includes(word),
      )
      if (!realCategory) {
        handlePlacementError(categoryId)
        return
      }

      let targetCategoryId = categoryId
      let targetMaxWords =
        selectedCategory.maxWords ?? realCategory.words.length
      const isUnassigned =
        selectedCategory.name == null || selectedCategory.maxWords == null

      if (isUnassigned) {
        const duplicateAssignedCategory = workingCategories.some(
          (cat) => cat.id === realCategory.id && cat.id !== selectedCategory.id,
        )
        if (duplicateAssignedCategory) {
          addError()
          triggerCategoryError(categoryId)
          deselectWord()
          deselectCategory()
          selectionStartedWithRef.current = null
          return
        }

        if (typeof selectedCategory.id !== 'number') {
          addError()
          triggerCategoryError(categoryId)
          deselectWord()
          deselectCategory()
          selectionStartedWithRef.current = null
          return
        }

        assignCategoryAndAddWord(
          selectedCategory.id,
          realCategory.id,
          realCategory.name,
          realCategory.words.length,
          word,
        )

        selectCategory(realCategory.id)
        targetCategoryId = realCategory.id
        targetMaxWords = realCategory.words.length
      } else {
        if (selectedCategory.id !== realCategory.id) {
          addError()
          triggerCategoryError(categoryId)
          deselectWord()
          deselectCategory()
          selectionStartedWithRef.current = null
          return
        }

        if (isCategoryFull(selectedCategory)) {
          addError()
          triggerCategoryError(categoryId)
          deselectWord()
          deselectCategory()
          selectionStartedWithRef.current = null
          return
        }

        addWordToCategory(targetCategoryId, word)
      }

      addPoint()

      const nextWordCount = selectedCategory.words.length + 1
      if (targetMaxWords != null && nextWordCount >= targetMaxWords) {
        solveCategory(targetCategoryId)
        deselectCategory()
        selectionStartedWithRef.current = null
        deselectWord()
        return
      }

      deselectWord()

      if (startedWithWord) {
        deselectCategory()
        selectionStartedWithRef.current = null
      } else {
        selectionStartedWithRef.current = 'category'
      }
    },
    [
      data,
      workingCategories,
      assignCategoryAndAddWord,
      addWordToCategory,
      selectCategory,
      addPoint,
      addError,
      triggerCategoryError,
      deselectWord,
      deselectCategory,
      solveCategory,
    ],
  )

  useEffect(() => {
    if (isEditMode) {
      deselectWord()
      deselectCategory()
      selectionStartedWithRef.current = null
    }
  }, [isEditMode, deselectWord, deselectCategory])

  useEffect(() => {
    if (isEditMode) return
    if (!selectedWord || selectedCategoryId == null) return
    handleWordPlacement(selectedWord, selectedCategoryId)
  }, [isEditMode, selectedWord, selectedCategoryId, handleWordPlacement])

  useEffect(() => {
    if (data) {
      checkGameWon(data.categories.length)
    }
  }, [solvedCategories, data, checkGameWon])

  const maxCategories = data?.categories.length ?? 0
  const openedCategories = workingCategories.length
  const allOpenedAreAssigned = workingCategories.every(
    (cat) => cat.name != null && cat.maxWords != null && cat.words.length > 0,
  )

  const canAddCategory = openedCategories < maxCategories
  const onAddCategoryClick = () => {
    if (!canAddCategory) return
    if (!allOpenedAreAssigned) return

    deselectWord()
    deselectCategory()

    addEmptyCategory()
  }

  return {
    data,
    isLoading,
    error,
    isGameWon,
    reset,
    workingCategories,
    canAddCategory,
    onWordClick,
    onCategoryClick,
    onAddCategoryClick,
    points,
    errors,
    triggerCategoryError,
  }
}
