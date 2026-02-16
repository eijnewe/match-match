import { Wikipedia } from './client'

export type WikipediaPage = {
  pageid: number
  title: string
  ns: number
  redirect?: string
}

export async function fetchCategoryMembers(
  pageId: number,
): Promise<WikipediaPage[]> {
  const url = Wikipedia.categoryMembers(pageId)
  const res = await fetch(url)
  const data = await res.json()

  const pages = Object.values(data.query.pages) as WikipediaPage[]

  // filtrerar bort redirect-sidor och icke-artiklar
  return pages.filter((p) => !p.redirect && p.ns === 0)
}
