import { create } from "zustand";

interface GameStoreState {
  selectedWord: string | null;
  selectedCategoryId: number | null;
  highlightedWords: string[];

  solvedCategories: number[];
  wordsByCategory: Record<number, string[]>;
  isGameWon: boolean;

  selectWord: (word: string) => void;
  deselectWord: () => void;
  selectCategory: (categoryId: number) => void;
  deselectCategory: () => void;
  highlightWord: (word: string) => void;
  removeHighlight: (word: string) => void;
  clearHighlights: () => void;

  matchWordToCategory: (categoryId: number) => {
    success: boolean;
    isCorrect: boolean;
  };
  solveCategory: (categoryId: number) => void;
  checkGameWon: (totalCategories: number) => void;
  reset: () => void;
}

const initialState = {
  selectedWord: null,
  selectedCategoryId: null,
  highlightedWords: [],
  solvedCategories: [],
  wordsByCategory: {},
  isGameWon: false,
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  ...initialState,

  selectWord: (word: string) => {
    set({ selectedWord: word, highlightedWords: [word] });
  },

  deselectWord: () => {
    set({ selectedWord: null, highlightedWords: [] });
  },

  selectCategory: (categoryId: number) => {
    set({ selectedCategoryId: categoryId });
  },

  deselectCategory: () => {
    set({ selectedCategoryId: null });
  },

  highlightWord: (word: string) => {
    set((state) => ({
      highlightedWords: [...new Set([...state.highlightedWords, word])],
    }));
  },

  removeHighlight: (word: string) => {
    set((state) => ({
      highlightedWords: state.highlightedWords.filter((w) => w !== word),
    }));
  },

  clearHighlights: () => {
    set({ highlightedWords: [] });
  },

  matchWordToCategory: (categoryId: number) => {
    const state = get();
    const selectedWord = state.selectedWord;

    if (!selectedWord) {
      return { success: false, isCorrect: false };
    }

    // Logiken för att matcha ord med kategori (useGameLogic)

    return { success: false, isCorrect: false };
  },

  solveCategory: (categoryId: number) => {
    set((state) => {
      const alreadySolved = state.solvedCategories.includes(categoryId);
      return {
        solvedCategories: alreadySolved
          ? state.solvedCategories
          : [...state.solvedCategories, categoryId],
      };
    });
  },

  checkGameWon: (totalCategories: number) => {
    set((state) => ({
      isGameWon: state.solvedCategories.length === totalCategories,
    }));
  },

  reset: () => {
    set(initialState);
  },
}));
