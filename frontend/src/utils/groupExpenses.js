export function groupLabel(dateStr) {
  const d = new Date(dateStr), now = new Date();
  const strip = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate());
  const diff = (strip(now) - strip(d)) / 86400000;
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
}