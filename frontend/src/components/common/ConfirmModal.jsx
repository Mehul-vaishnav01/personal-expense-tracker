import React from "react";
import { AlertTriangle } from "lucide-react";

export function ConfirmSheet({ title, body, onCancel, onConfirm }) {
  return (
    <div className="sheet-overlay anim-fadeIn" onClick={onCancel}>
      <div className="sheet-modal anim-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 380 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <div className="icon-badge" style={{ background: "#3A1620" }}><AlertTriangle size={18} color="var(--expense)" /></div>
          <div>
            <div className="font-display" style={{ fontSize: 16, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: "var(--text-faint)" }}>{body}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-outline" onClick={onCancel} style={{ flex: 1 }}>Keep it</button>
          <button className="btn-grad press" onClick={onConfirm} style={{ flex: 1, background: "var(--expense)" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}