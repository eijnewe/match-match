import { useQuery } from "@tanstack/react-query"

const fetchArticles = async ({ queryKey }) => {
    const [, { category, limit }] = queryKey
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(category)}&cmlimit=${limit}&format=json&origin=*`)

    if (!response.ok) {
        throw new Error("Failed to fetch article title")
    }

    return response.json()
}

export function Articles({ category, limit = 10 }) {
    const { data, error } = useQuery({
        queryKey: ['articles', { category, limit }],
        queryFn: fetchArticles,
        enabled: !!category, // I think this means, if there isn't a category, don't go fetchin'???
        select: data => ({
            ...data,
            query: {
                ...data.query,
                categorymembers: data.query.categorymembers.filter(article => {
                    const title = article.title.toLowerCase()

                    return (
                        !title.endsWith(`)`) &&
                        !title.startsWith(`list`)
                    )
                }),
            }
        }),
    })

    if (error) return <div className="rounded-xl p-2 text-sm bg-red-500 w-fit m-1">Fetch error</div>

    return (
        <>
            {data?.query?.categorymembers.map(article => (
                <div className="rounded-xl p-2 text-sm bg-amber-300 w-fit m-1" key={article.pageid}>
                    {article.title}
                </div>
            ))}
        </>
    )
}