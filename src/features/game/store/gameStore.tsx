import type { GameCategory } from "@/types/category";
import { create } from "zustand";

export interface WorkingCategory {
  id: number,
  name: string,
  words: string[],
  maxWords: number,
  solved: boolean
}

 interface GameStoreState {
  selectedWord: string | null;
  selectedCategoryId: number | null;


  workingCategories: WorkingCategory[]
  solvedCategories: number[];
  wordsByCategory: Record<number, string[]>;
  isGameWon: boolean;

  setWorkingCategories: (cats: WorkingCategory[]) => void

  selectWord: (word: string) => void;
  deselectWord: () => void;

  selectCategory: (categoryId: number) => void;
  deselectCategory: () => void;

  addWordToCategory: (categoryId: number, word: string) => void;
  solveCategory: (categoryId: number) => void;
  checkGameWon: (totalCategories: number) => void;
  reset: () => void;
}

const initialState = {
  selectedWord: null,
  selectedCategoryId: null,
  workingCategories: [],
  solvedCategories: [],
  wordsByCategory: {},
  isGameWon: false,
};


export const useGameStore = create<GameStoreState>((set, get) => ({
  ...initialState,

  setWorkingCategories: (cats) => set({ workingCategories: cats }),

  selectWord: (word: string) => {
    set({ selectedWord: word });
  },

  deselectWord: () => {
    set({ selectedWord: null});
  },

  selectCategory: (categoryId: number) => {
    set({ selectedCategoryId: categoryId });
  },

  deselectCategory: () => {
    set({ selectedCategoryId: null });
  },

  addWordToCategory: (categoryId: number, word:string) => set((state) => ({
    workingCategories: state.workingCategories.map(cat => cat.id === categoryId ? { ...cat, words: [...cat.words, word] } : cat)
  })),

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
