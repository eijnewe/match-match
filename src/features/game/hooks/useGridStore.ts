import { create } from "zustand";

interface GridState {
    isGridMode: boolean;
    toggleGridMode: () => void;
}
export const useGridStore = create<GridState>((set) => ({
    isGridMode: true,
    toggleGridMode: () => set((state) => ({ isGridMode: !state.isGridMode }))
}))