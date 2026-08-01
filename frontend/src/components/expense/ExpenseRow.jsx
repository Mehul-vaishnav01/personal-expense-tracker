import React from "react";
import { catMeta } from "../../utils/categories";
import { fmtMoney } from "../../utils/formatMoney";
import { fmtDate } from "../../utils/formatDate";

export function ExpenseRow({ exp, index, onClick, onImage, last }) {
  const meta = catMeta(exp.category);
  return (
    <div className="row-btn anim-fadeUp" style={{ animationDelay: `${Math.min(index, 8) * 40}ms`, borderBottom: last ? "none" : "1px solid var(--border)", borderRadius: 0 }}>
      <div className="icon-badge" style={{ background: `${meta.color}22` }}>
        <meta.Icon size={18} color={meta.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }} onClick={onClick}>
        <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{exp.title}</div>
        <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{exp.category} · {fmtDate(exp.date)}</div>
      </div>
      {exp.uri && (
        <button onClick={(e) => { e.stopPropagation(); onImage(exp.uri); }} style={{ border: "none", background: "none", padding: 0, cursor: "pointer", borderRadius: 8, overflow: "hidden", width: 32, height: 32, flexShrink: 0 }}>
          <img src={exp.uri} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </button>
      )}
      <div className="font-mono" onClick={onClick} style={{ fontSize: 14.5, fontWeight: 600, color: "var(--expense)", flexShrink: 0 }}>-{fmtMoney(exp.amount)}</div>
    </div>
  );
}