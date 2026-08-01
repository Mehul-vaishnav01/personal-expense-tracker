import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { catMeta } from "../../utils/categories";
import { fmtMoney } from "../../utils/formatMoney";
import { fmtDate } from "../../utils/formatDate";

export function ExpenseRowActions({ exp, index, last, onEdit, onDelete, onImage }) {
  const meta = catMeta(exp.category);
  return (
    <div className="anim-fadeUp" style={{ animationDelay: `${Math.min(index, 8) * 40}ms`, display: "flex", alignItems: "center", gap: 12, padding: "12px 6px", borderBottom: last ? "none" : "1px solid var(--border)" }}>
      <div className="icon-badge" style={{ background: `${meta.color}22` }}><meta.Icon size={18} color={meta.color} /></div>
      <div style={{ flex: 1, minWidth: 0, cursor: "pointer" }} onClick={onEdit}>
        <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{exp.title}</div>
        <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{fmtDate(exp.date)}</div>
      </div>
      {exp.uri && (
        <button onClick={() => onImage(exp.uri)} style={{ border: "none", background: "none", padding: 0, cursor: "pointer", borderRadius: 8, overflow: "hidden", width: 32, height: 32, flexShrink: 0 }}>
          <img src={exp.uri} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </button>
      )}
      <div className="font-mono" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--expense)", flexShrink: 0 }}>-{fmtMoney(exp.amount)}</div>
      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
        <IconBtnDark onClick={onEdit}><Pencil size={14} /></IconBtnDark>
        <IconBtnDark onClick={onDelete} danger><Trash2 size={14} /></IconBtnDark>
      </div>
    </div>
  );
}

function IconBtnDark({ children, onClick, danger }) {
  return (
    <button onClick={onClick} className="press" style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: danger ? "var(--expense)" : "var(--text-dim)" }}>
      {children}
    </button>
  );
}