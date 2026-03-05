import { create } from "zustand";

export interface WorkingCategory {
  id: number | null;
  name: string | null;
  customName?: string | null;
  words: string[];
  maxWords: number | null;
  solved: boolean;
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
  setCategoryCustomName: (categoryId: number, customName: string | null) => void;

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

  assignCategoryAndAddWord: (
    tempCategoryId: number,
    id: number,
    name: string,
    maxWords: number,
    word: string,
  ) => void;

  addWordToCategory: (categoryId: number, word: string) => void;
  solveCategory: (categoryId: number) => void;
  checkGameWon: (totalCategories: number) => void;

  reset: () => void;

  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (value: boolean) => void;

  lastErrorCategoryId: number | null;
  errorAnimationNonce: number;
  triggerCategoryError: (categoryId: number) => void;
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
  lastErrorCategoryId: null,
  errorAnimationNonce: 0,
};

export const useGameStore = create<GameStoreState>((set) => ({
  ...initialState,

  addEmptyCategory: () =>
    set((state) => {
      const hasEmptyCategory = state.workingCategories.some(
        (cat) => cat.name == null || cat.maxWords == null,
      );
      if (hasEmptyCategory) return state;

      const minExistingId = state.workingCategories.reduce((min, cat) => {
        if (typeof cat.id !== "number") return min;
        return Math.min(min, cat.id);
      }, 0);

      const tempId = minExistingId <= 0 ? minExistingId - 1 : -1;

      return {
        workingCategories: [
          ...state.workingCategories,
          { id: tempId, name: null, words: [], maxWords: null, solved: false },
        ],
      };
    }),

  setWorkingCategories: (cats) => 
    set({ 
      workingCategories: cats.map((c) => ({
        ...c,
        customName: c.customName ?? null,
      })),
    }),

  setCategoryCustomName: (categoryId, customName) =>
    set((state) => ({
      workingCategories: state.workingCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, customName: customName || null } 
          : cat,
      ),
    })),

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

  assignCategoryAndAddWord: (tempCategoryId, id, name, maxWords, word) =>
    set((state) => ({
      workingCategories: state.workingCategories.map((cat) => {
        if (cat.id !== tempCategoryId) return cat;
        const nextWords = cat.words.includes(word)
          ? cat.words
          : [...cat.words, word];
        return { ...cat, id, name, maxWords, words: nextWords };
      }),
    })),

  addWordToCategory: (categoryId: number, word: string) =>
    set((state) => ({
      workingCategories: state.workingCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        if (cat.words.includes(word)) return cat;
        return { ...cat, words: [...cat.words, word] };
      }),
    })),

  solveCategory: (categoryId: number) =>
    set((state) => {
      const alreadySolved = state.solvedCategories.some(
        (c) => c === categoryId,
      );

      return {
        workingCategories: state.workingCategories.map((cat) =>
          cat.id === categoryId ? { ...cat, solved: true } : cat,
        ),
        solvedCategories: alreadySolved
          ? state.solvedCategories
          : [...state.solvedCategories, categoryId],
      };
    }),

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

  triggerCategoryError: (categoryId: number) =>
    set((state) => ({
      lastErrorCategoryId: categoryId,
      errorAnimationNonce: state.errorAnimationNonce + 1,
    })),
}));
