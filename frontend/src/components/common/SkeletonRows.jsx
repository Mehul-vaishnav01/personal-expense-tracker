import React from "react";

export function SkeletonRows({ n }) {
  return (
    <div className="glass-card" style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, opacity: 0.5 }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: "var(--surface-2)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 10, width: "50%", background: "var(--surface-2)", borderRadius: 4, marginBottom: 6 }} />
            <div style={{ height: 8, width: "30%", background: "var(--surface-2)", borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}