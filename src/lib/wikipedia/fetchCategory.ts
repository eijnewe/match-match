import { ALL_CATEGORIES } from '@/data/allCategories'
import { fetchCategoryMembers } from './fetchCategoryMembers'
import type { GameCategory } from '@/types/category'

export async function fetchCategory(
  pageId: keyof typeof ALL_CATEGORIES,
  limit: number,
): Promise<GameCategory> {
  const meta = ALL_CATEGORIES[pageId]
  const members = await fetchCategoryMembers(pageId)
  
  const titles = new Set(
    members.map((m) => {
      let title = m.title

      for (const pattern of meta.stripPatterns) {
        title = title.replace(pattern, '')
      }

      return title
    }),
  )

  const maxStart = titles.size - limit
  const randomIndex = Math.floor(Math.random() * (maxStart + 1))
  const words = [...titles].slice(randomIndex, randomIndex + limit)


  return {
    id: pageId,
    name: meta.name,
    words,
    solved: false,
  }
}
