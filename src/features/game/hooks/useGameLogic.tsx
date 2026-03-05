import type { Difficulty } from "@/types/game";
import { useGameQuery } from "../api/useGameQuery";
import { useGameStore, type WorkingCategory } from "../store/gameStore";
import { useCallback, useEffect, useRef } from "react";

export function useGameLogic(difficulty: Difficulty) {
  const { data, isLoading, error } = useGameQuery(difficulty);

  const isEditMode = useGameStore((s) => s.isEditMode)
  const selectedWord = useGameStore((s) => s.selectedWord);
  const selectedCategoryId = useGameStore((s) => s.selectedCategoryId);
  const workingCategories = useGameStore((s) => s.workingCategories);
  const solvedCategories = useGameStore((s) => s.solvedCategories);
  const isGameWon = useGameStore((s) => s.isGameWon);
  const points = useGameStore((s) => s.points);
  const errors = useGameStore((s) => s.errors);
  const triggerCategoryError = useGameStore((s) => s.triggerCategoryError);

  const assignCategoryAndAddWord = useGameStore(
    (s) => s.assignCategoryAndAddWord,
  );
  const setWorkingCategories = useGameStore((s) => s.setWorkingCategories);
  const selectWord = useGameStore((s) => s.selectWord);
  const deselectWord = useGameStore((s) => s.deselectWord);
  const selectCategory = useGameStore((s) => s.selectCategory);
  const deselectCategory = useGameStore((s) => s.deselectCategory);
  const addWordToCategory = useGameStore((s) => s.addWordToCategory);
  const solveCategory = useGameStore((s) => s.solveCategory);
  const reset = useGameStore((s) => s.reset);
  const checkGameWon = useGameStore((s) => s.checkGameWon);
  const addEmptyCategory = useGameStore((s) => s.addEmptyCategory);
  const addPoint = useGameStore((s) => s.addPoint);
  const addError = useGameStore((s) => s.addError);

  const selectionStartedWithRef = useRef<"word" | "category" | null>(null);

  const onWordClick = (word: string) => {
    if (isEditMode) return;
    if (selectedWord === word) {
      deselectWord();
      if (selectedCategoryId == null) selectionStartedWithRef.current = null;
      return;
    }

    if (selectedWord == null && selectedCategoryId == null) {
      selectionStartedWithRef.current = "word";
    }

    selectWord(word);
  };

  const onCategoryClick = (categoryId: number) => {
    if (isEditMode) return;

    const category = workingCategories.find((cat) => cat.id === categoryId);
    if (!category) return;

    if (isCategoryFull(category)) {
      return
    }
    
    if (selectedCategoryId === categoryId) {
      deselectCategory();
      if (selectedWord == null) selectionStartedWithRef.current = null;
      return;
    }

    if (selectedWord == null && selectedCategoryId == null) {
      selectionStartedWithRef.current = "category";
    }

    selectCategory(categoryId);
  };

  // 1. Initiera workingCategories när spelet laddas (utifrån data.categories)
  useEffect(() => {
    reset();
    selectionStartedWithRef.current = null;
  }, [difficulty, reset]);

  useEffect(() => {
    if (!data) return;
    setWorkingCategories([
      { id: -1, name: null, words: [], maxWords: null, solved: false },
    ]);
  }, [data, setWorkingCategories]);

  // isCategoryFull()
  function isCategoryFull(cat: WorkingCategory) {
    return cat.maxWords != null && cat.words.length >= cat.maxWords;
  }

  // isWordAlreadyPlaced()
  function isWordAlreadyPlaced(word: string) {
    return workingCategories.some((cat) => cat.words.includes(word));
  }

  // isCorrectCategory()
  // function isCorrectCategory(word: string, categoryId: number) {
  //   if (!data) return false;
  //   const correctCategory = data.categories.find((cat) =>
  //     cat.words.includes(word));
  //   return correctCategory?.id === categoryId;
  // }

  // doesAnotherCategoryHaveSameId()
  // function doesAnotherCategoryHaveSameId(
  //   realId: number,
  //   selectedCategoryId: number,
  // ) {
  //   return workingCategories.some(
  //     (cat) => cat.id === realId && cat.id !== selectedCategoryId,
  //   );
  // }

  const handleWordPlacement = useCallback(
    (word: string, categoryId: number) => {
      /*  alla helper funktioner kallas här */
      if (!data) return;

      const startedWithWord = selectionStartedWithRef.current === "word";

      const selectedCategory = workingCategories.find(
        (cat) => cat.id === categoryId,
      );
      if (!selectedCategory) return;

      if (isWordAlreadyPlaced(word)) {
        addError();
        triggerCategoryError(categoryId);
        deselectWord();
        deselectCategory();
        selectionStartedWithRef.current = null;
        return;
      }

      const realCategory = data.categories.find((cat) =>
        cat.words.includes(word),
      );
      if (!realCategory) {
        addError();
        triggerCategoryError(categoryId);
        deselectWord();
        deselectCategory();
        selectionStartedWithRef.current = null;
        return;
      }

      let targetCategoryId = categoryId;
      let targetMaxWords =
        selectedCategory.maxWords ?? realCategory.words.length;
      const isUnassigned =
        selectedCategory.name == null || selectedCategory.maxWords == null;

      if (isUnassigned) {
        const duplicateAssignedCategory = workingCategories.some(
          (cat) => cat.id === realCategory.id && cat.id !== selectedCategory.id,
        );
        if (duplicateAssignedCategory) {
          addError();
          triggerCategoryError(categoryId);
          deselectWord();
          deselectCategory();
          selectionStartedWithRef.current = null;
          return;
        }

        if (typeof selectedCategory.id !== "number") {
          addError();
          triggerCategoryError(categoryId);
          deselectWord();
          deselectCategory();
          selectionStartedWithRef.current = null;
          return;
        }

        assignCategoryAndAddWord(
          selectedCategory.id,
          realCategory.id,
          realCategory.name,
          realCategory.words.length,
          word,
        );

        selectCategory(realCategory.id);
        targetCategoryId = realCategory.id;
        targetMaxWords = realCategory.words.length;
      } else {
        if (selectedCategory.id !== realCategory.id) {
          addError();
          triggerCategoryError(categoryId);
          deselectWord();
          deselectCategory();
          selectionStartedWithRef.current = null;
          return;
        }

        if (isCategoryFull(selectedCategory)) {
          addError();
          triggerCategoryError(categoryId);
          deselectWord();
          deselectCategory();
          selectionStartedWithRef.current = null;
          return;
        }

        addWordToCategory(targetCategoryId, word);
      }

      addPoint();

      const nextWordCount = selectedCategory.words.length + 1;
      if (targetMaxWords != null && nextWordCount >= targetMaxWords) {
        solveCategory(targetCategoryId);
        deselectCategory();
        selectionStartedWithRef.current = null;
        deselectWord();
        return;
      }

      deselectWord();

      if (startedWithWord) {
        deselectCategory();
        selectionStartedWithRef.current = null;
      } else {
        selectionStartedWithRef.current = "category";
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
  );

  useEffect(() => {
    if (isEditMode) {
      deselectWord();
      deselectCategory();
      selectionStartedWithRef.current = null;
    }
  }, [isEditMode, deselectWord, deselectCategory]);

  useEffect(() => {
    if (isEditMode) return;
    if (!selectedWord || selectedCategoryId == null) return;
    handleWordPlacement(selectedWord, selectedCategoryId);
  }, [isEditMode, selectedWord, selectedCategoryId, handleWordPlacement]);

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

  /*  1. Initiera workingCategories när spelet laddas X
  (utifrån data.categories) 
  2. Ord → kategori lookup X
  (använd data.wordToCategory[word]) 
  3. Reagera på UI‑state X
  När selectedWord + selectedCategoryId finns → försök lägga in ordet. 
  4. Validera drag X
  Är kategorin tom?
  Finns en annan kategori med samma ID?
  Är ordet redan placerat?
  Är kategorin full?
  5. Tom kategori → sätt ID
  (uppdatera workingCategory.id)
  6. Lägg in ord i kategori X
  (kalla store‑action)
  7. Markera kategori som solved X
  (när words.length === maxWords)
  8. Checka game won X
  (alla kategorier fyllda) 
  9. Max antal kategorier X
  (styr plus‑knappen i UI)
  10. Felhantering
  (visa feedback, men store ska inte veta något om fel) */

  const maxCategories = data?.categories.length ?? 0;
  const openedCategories = workingCategories.length;
  const allOpenedAreAssigned = workingCategories.every(
    (cat) => cat.name != null && cat.maxWords != null && cat.words.length > 0,
  );

  const canAddCategory = openedCategories < maxCategories;
  const onAddCategoryClick = () => {
    if (!canAddCategory) return;
    if (!allOpenedAreAssigned) return;

    deselectWord();
    deselectCategory();

    addEmptyCategory();
  };

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
  };
}

/* function handleWordPlacement(word, categoryId):

    1. Get the working category the player clicked on
       → workingCategory = getWorkingCategoryById(categoryId)

    2. Get the real category ID for the word (from server data)
       → realCategoryId = getRealCategoryIdForWord(word)

    3. If the word is already placed anywhere → reject
       → if isWordAlreadyPlaced(word): return error

    4. If the working category is already full → reject
       → if isCategoryFull(workingCategory): return error

    5. If the working category is empty:
         - Check if another category already has the realCategoryId
           → if doesAnotherCategoryHaveSameId(realCategoryId, categoryId):
                return error
         - Assign the category its real ID
           → assignCategoryId(workingCategory, realCategoryId)

    6. If the working category is NOT empty:
         - Check if the word belongs to this category
           → if not isCorrectCategory(word, workingCategory.id):
                return error

    7. Place the word into the category
       → addWordToWorkingCategory(categoryId, word)

    8. Clear selectedWord (but keep selectedCategoryId)
       → deselectWord()

    9. Done — UI will update automatically
 */
