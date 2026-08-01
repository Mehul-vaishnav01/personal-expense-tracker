import React from "react";

export function MiniStat({ label, value, accent }) {
  return (
    <div className="glass-card" style={{ padding: "14px 16px" }}>
      <div style={{ fontSize: 11.5, color: "var(--text-faint)", marginBottom: 4 }}>{label}</div>
      <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: accent || "var(--text)" }}>{value}</div>
    </div>
  );
}