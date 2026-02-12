type WordGridProps = {
  words: string[];
  columns: number;
};

export function WordGrid({ words, columns }: WordGridProps) {
  return (
    <div>
      {words.map((word, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              style={{
                border: "1px solid gray",
                aspectRatio: "1 / 1",
              }}
            >
              {word[colIndex] ?? ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
