export const WIKIPEDIA_BASE_URL: string = "https://en.wikipedia.org/w/api.php";

function buildWikipediaUrl(params: Record<string, string>) {
  const search = new URLSearchParams(params);
  return `${WIKIPEDIA_BASE_URL}?${search.toString()}`;
}

export const Wikipedia = {
  categoryMembers(pageId: number) {
    return buildWikipediaUrl({
      action: "query",
      generator: "categorymembers",
      gcmpageid: String(pageId),
      gcmtype: "page",
      gcmlimit: "max",
      gcmsort: "sortkey",
      gcmstartsortkeyprefix: "0",
      prop: "info",
      format: "json",
      origin: "*",
    });
  },
};
