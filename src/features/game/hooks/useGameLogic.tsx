import type { Difficulty } from "@/types/game";
import { useGameQuery } from "../api/useGameQuery";
import { useGameStore, type WorkingCategory } from "../store/gameStore";
import { useEffect } from "react";

export function useGameLogic(difficulty: Difficulty) {
  const { data, isLoading, error } = useGameQuery(difficulty);

  const selectedWord = useGameStore((s) => s.selectedWord);
  const selectedCategoryId = useGameStore((s) => s.selectedCategoryId);
  const workingCategories = useGameStore((s) => s.workingCategories);
  const solvedCategories = useGameStore((s) => s.solvedCategories);

  const setWorkingCategories = useGameStore((s) => s.setWorkingCategories);
  const selectWord = useGameStore((s) => s.selectWord);
  const deselectWord = useGameStore((s) => s.deselectWord);
  const selectCategory = useGameStore((s) => s.selectCategory);
  const deselectCategory = useGameStore((s) => s.deselectCategory);
  const addWordToCategory = useGameStore((s) => s.addWordToCategory);
  const solveCategory = useGameStore((s) => s.solveCategory);
  const reset = useGameStore((s) => s.reset);
  const checkGameWon = useGameStore((s) => s.checkGameWon);

  // 1. Initiera workingCategories när spelet laddas (utifrån data.categories)
  useEffect(() => {
    reset();
  }, [difficulty, reset]);

  useEffect(() => {
    if (data) {
      setWorkingCategories(
        data.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          words: [],
          maxWords: cat.words.length,
          solved: false,
        })),
      );
    }
  }, [data, setWorkingCategories]);

  //2. Ord → kategori lookup (använd data.wordToCategory[word])

  function handleWordPlacement(word: string, categoryId: number) {
    /*  alla helper funktioner kallas här */
    if (!data) return;

    const selectedCategory = workingCategories.find((cat) => cat.id === categoryId);
    if (!selectedCategory) return;

    const correctCategoryId = data.categories.find((cat) =>
      cat.words.includes(word),    
    )?.id;

    if (
      isCategoryFull(selectedCategory) ||
      isWordAlreadyPlaced(word) ||
      !isCorrectCategory(word, categoryId) ||
      (correctCategoryId !== undefined &&
        doesAnotherCategoryHaveSameId(correctCategoryId, categoryId))
    ) {
      deselectWord();
      return;
    }

    addWordToCategory(categoryId, word);

    const nextWordCount = isCategoryEmpty(selectedCategory)
      ? 1
      : selectedCategory.words.length + 1;

    if (nextWordCount >= selectedCategory.maxWords) {
      solveCategory(categoryId);
      deselectCategory();
    }

    deselectWord();
  }

  useEffect(() => {
    if (!selectedWord || selectedCategoryId == null) return;
    handleWordPlacement(selectedWord, selectedCategoryId);
  }, [selectedWord, selectedCategoryId, handleWordPlacement]);

  // isCategoryEmpty()
  function isCategoryEmpty(cat: WorkingCategory) {
    return cat.words.length === 0;
  }
  // isCategoryFull()
  function isCategoryFull(cat: WorkingCategory) {
    return cat.words.length >= cat.maxWords;
  }
  // isWordAlreadyPlaced()

  function isWordAlreadyPlaced(word: string) {
    return workingCategories.some((cat) => cat.words.includes(word));
  }
  // isCorrectCategory()
  function isCorrectCategory(word: string, categoryId: number) {
    if (!data) return false;
    const correctCategory = data.categories.find((cat) =>
      cat.words.includes(word),
    );
    return correctCategory?.id === categoryId;
  }
  // doesAnotherCategoryHaveSameId()
  function doesAnotherCategoryHaveSameId(
    realId: number,
    selectedCategoryId: number,
  ) {
    return workingCategories.some(
      (cat) => cat.id === realId && cat.id !== selectedCategoryId,
    );
  }

  // 8. Checka game won (alla kategorier fyllda)
  useEffect(() => {
    if (data) {
      checkGameWon(data.categories.length);
    }
  }, [solvedCategories, data, checkGameWon]);

  //  initWorkingCategories

  // ✔ handleWordPlacement


  // ✔ validatePlacement

  // ✔ detectSolvedCategories

  // ✔ computeDerivedState

  /*  1. Initiera workingCategories när spelet laddas
  (utifrån data.categories) X
  2. Ord → kategori lookup
  (använd data.wordToCategory[word])
  3. Reagera på UI‑state
  När selectedWord + selectedCategoryId finns → försök lägga in ordet.
  4. Validera drag
  Är kategorin tom?
  Finns en annan kategori med samma ID?
  Är ordet redan placerat?
  Är kategorin full?
  5. Tom kategori → sätt ID
  (uppdatera workingCategory.id)
  6. Lägg in ord i kategori
  (kalla store‑action)
  7. Markera kategori som solved
  (när words.length === maxWords)
  8. Checka game won
  (alla kategorier fyllda) X
  9. Max antal kategorier
  (styr plus‑knappen i UI)
  10. Felhantering
  (visa feedback, men store ska inte veta något om fel) */

  const maxCategories = data?.categories.length ?? 0;
  const canAddCategory = workingCategories.length < maxCategories;

  return {
    data,
    isLoading,
    error,
  };
}
