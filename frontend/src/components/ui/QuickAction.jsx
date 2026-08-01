import React from "react";

export function QuickAction({ Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="glass-card press" style={{ flex: 1, padding: "16px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
      <div className="icon-badge" style={{ background: "var(--surface-2)" }}><Icon size={18} color="var(--accent-2)" /></div>
      <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text-dim)", textAlign: "center" }}>{label}</span>
    </button>
  );
}