interface WordTagProps {
  type: string;
  bgColor: "primary" | "secondary" | "chart-5" | "sidebar-primary" 
}
export function WordTag({ type, bgColor = "primary" }: WordTagProps) {
  const bgVar = `var(--${bgColor})`;

  return (
    <span 
    className={`p-0.5 rounded-2xl text-(--stark)`}
    style={{ backgroundColor: bgVar }}
    >
      {type}
    </span>
  )
}