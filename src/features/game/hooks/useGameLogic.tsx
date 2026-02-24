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
  const isGameWon = useGameStore((s) => s.isGameWon);

  const setWorkingCategories = useGameStore((s) => s.setWorkingCategories);
  const selectWord = useGameStore((s) => s.selectWord);
  const deselectWord = useGameStore((s) => s.deselectWord);
  const selectCategory = useGameStore((s) => s.selectCategory);
  const deselectCategory = useGameStore((s) => s.deselectCategory);
  const addWordToCategory = useGameStore((s) => s.addWordToCategory);
  const solveCategory = useGameStore((s) => s.solveCategory);
  const reset = useGameStore((s) => s.reset);
  const checkGameWon = useGameStore((s) => s.checkGameWon);
  const addEmptyCategory = useGameStore((s) => s.addEmptyCategory)
  const assignCategoryId = useGameStore((s) => s.assignCategoryId)

  const onWordClick = (word: string) => {
    if (selectedWord === word) return deselectWord();
    selectWord(word);
  }

  const onCategoryClick = (categoryId: number) => {
    if (selectedCategoryId === categoryId) return deselectCategory();
    selectCategory(categoryId);
  };

  // 1. Initiera workingCategories när spelet laddas (utifrån data.categories)
  useEffect(() => {
    reset();
  }, [difficulty, reset]);

/*   useEffect(() => {
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
 */
  useEffect(() => { if (!data)  return console.log('nodata')
    setWorkingCategories(
        data.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          words: [],
          maxWords: cat.words.length,
          solved: false,
        })),)
        // console.log('data', data)
        // console.log('workingcat', workingCategories)
    }, [data, setWorkingCategories])

  //2. Ord → kategori lookup (använd data.wordToCategory[word])



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


  function handleWordPlacement(word: string, categoryId: number) {
    /*  alla helper funktioner kallas här */
    if (!data) return;

    const selectedCategory = workingCategories.find((cat) => cat.id === categoryId);
    console.log("selected cat:", selectedCategory)
    if (!selectedCategory) return;

    const correctCategoryId = data.categories.find((cat) =>
      cat.words.includes(word),    
    )?.id;
    console.log("correct cat:", correctCategoryId)

    if (
      isCategoryFull(selectedCategory) ||
      isWordAlreadyPlaced(word) ||
      !isCorrectCategory(word, categoryId)
    ) {
      deselectWord();
      return;
    }

    if(correctCategoryId !== undefined){
      if(isCategoryEmpty(selectedCategory)) {
        if(doesAnotherCategoryHaveSameId(correctCategoryId, categoryId)) {
          return error
        }
        else {
          
        }
        } /* assingidtillcategory */

      } if(!isCorrectCategory(word, categoryId)) {
        return error
      } /* addWordToCategory */
        
    
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
  const canAddCategory = workingCategories.length < maxCategories;

  // console.log('workingcategories gamelogic end',workingCategories)

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
    addEmptyCategory
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