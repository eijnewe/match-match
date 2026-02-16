import { useState } from "react";


export function useCategoryColor(initial: string) {
    const [categoryColor, setCategoryColor] = useState(initial);
    return { categoryColor, setCategoryColor };
}