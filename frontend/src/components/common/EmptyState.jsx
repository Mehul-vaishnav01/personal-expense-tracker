
import React from "react";
import { Receipt, Plus } from "lucide-react";

export function EmptyState({ onAdd, hasAny }) {
  return (
    <div className="anim-fadeUp glass-card" style={{ textAlign: "center", padding: "50px 20px" }}>
      <div className="icon-badge" style={{ background: "var(--surface-2)", margin: "0 auto 14px", width: 52, height: 52, borderRadius: 16 }}>
        <Receipt size={24} color="var(--text-faint)" />
      </div>
      <div className="font-display" style={{ fontSize: 16, marginBottom: 6 }}>{hasAny ? "Nothing matches" : "No expenses yet"}</div>
      <div style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: onAdd ? 18 : 0 }}>{hasAny ? "Try a different filter or search." : "Add your first expense to get started."}</div>
      {onAdd && <button className="btn-grad press" onClick={onAdd} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Plus size={15} /> Add expense</button>}
    </div>
  );
}