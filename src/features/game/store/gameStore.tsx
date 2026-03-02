import { create } from "zustand";

export interface WorkingCategory {
  id: number |null,
  name: string |null,
  words: string[],
  maxWords: number |null,
  solved: boolean
}

 interface GameStoreState {
   selectedWord: string | null;
   selectedCategoryId: number | null;

   workingCategories: WorkingCategory[];
   solvedCategories: number[];
   wordsByCategory: Record<number, string[]>;
   isGameWon: boolean;
   points: number;
   errors: number;

   addPoint: () => void | null;
   addError: () => void | null;

   setWorkingCategories: (cats: WorkingCategory[]) => void;

   selectWord: (word: string) => void;
   deselectWord: () => void;

   selectCategory: (categoryId: number) => void;
   deselectCategory: () => void;

   addEmptyCategory: () => void;
   assignCategoryId: (
     index: number,
     id: number,
     name: string,
     maxWords: number,
   ) => void;

  addWordToCategory: (categoryId: number, word: string) => void;
  solveCategory: (categoryId: number) => void;
  checkGameWon: (totalCategories: number) => void;
  
  reset: () => void;

  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (value: boolean) => void;
}

const initialState = {
  selectedWord: null,
  selectedCategoryId: null,
  workingCategories: [],
  solvedCategories: [],
  wordsByCategory: {},
  isGameWon: false,
  isEditMode: false,
  points: 0,
  errors: 0,
};


export const useGameStore = create<GameStoreState>((set, get) => ({
  ...initialState,

  addEmptyCategory: () =>
    set((state) => ({
      workingCategories: [
        ...state.workingCategories,
        { id: null, name: null, words: [], maxWords: null, solved: false },
      ],
    })),

  setWorkingCategories: (cats) => set({ workingCategories: cats }),

  selectWord: (word: string) => {
    set({ selectedWord: word });
  },

  deselectWord: () => {
    set({ selectedWord: null });
  },

  selectCategory: (categoryId: number) => {
    set({ selectedCategoryId: categoryId });
  },

  deselectCategory: () => {
    set({ selectedCategoryId: null });
  },

  assignCategoryId: (index, id, name, maxWords) =>
    set((state) => ({
      workingCategories: state.workingCategories.map((cat, i) =>
        i === index ? { ...cat, id, name, maxWords } : cat,
      ),
    })),

  addWordToCategory: (categoryId: number, word: string) =>
    set((state) => ({
      workingCategories: state.workingCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        if (cat.words.includes(word)) return cat;
        return { ...cat, words: [...cat.words, word] };
      }),
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

  toggleEditMode: () => {
    set((state) => ({ isEditMode: !state.isEditMode }));
  },

  setEditMode: (value: boolean) => {
    set({ isEditMode: value });
  },

  addPoint: () => {
    set((state) => ({ points: state.points + 1 }));
  },

  addError: () => {
    set((state) => ({ errors: state.errors + 1 }));
  },
}));


