import { useState } from "react";

export function useCategoryName(initial: string) {
    const [categoryName, setCategoryName] = useState(initial);
    return { categoryName, setCategoryName };
}