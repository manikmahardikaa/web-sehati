// components/ChartLegend.tsx
function ChartLegend({
  data,
  colors,
  total,
}: {
  data: { label: string; value: number | undefined | null }[];
  colors: string[];
  total: number;
}) {
  function percent(value: number, total: number): string {
    if (!total) return "0%";
    return `${((value / total) * 100).toFixed(2)}%`;
  }

  return (
    <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap" }}>
      {data.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 28,
            marginBottom: 8,
            minWidth: 130,
          }}
        >
          <div
            style={{
              width: 4,
              height: 28,
              background: colors[i % colors.length],
              borderRadius: 4,
              marginRight: 10,
            }}
          />
          <div>
            <div style={{ fontSize: 14, color: "#1b1b1b" }}>{item.label}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#000" }}>
              {percent(item.value ?? 0, total)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ChartLegend;
