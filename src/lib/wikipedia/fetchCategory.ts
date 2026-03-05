import { ALL_CATEGORIES } from "@/data/allCategories";
import { fetchCategoryMembers } from "./fetchCategoryMembers";
import type { GameCategory } from "@/types/category";

export async function fetchCategory(pageId: keyof typeof ALL_CATEGORIES,
  limit: number): Promise<GameCategory> {
  const meta = ALL_CATEGORIES[pageId];

  const members = await fetchCategoryMembers(pageId);


  const maxStart = members.length - limit
  const randomIndex = Math.floor(Math.random() * (maxStart + 1));




  let words = members.slice(randomIndex,randomIndex + limit).map((m) => m.title);

  
  for (const pattern of meta.stripPatterns) {
    words = words.map((w) => w.replace(pattern, ""));
  }

  return {
    id: pageId,
    name: meta.name,
    words,
    solved: false,
  };
}
