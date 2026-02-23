import { useState } from "react";


export function useGrid(initial: string) {
    const [gridMode, setGridMode] = useState(initial);
    return { gridMode, setGridMode };
}