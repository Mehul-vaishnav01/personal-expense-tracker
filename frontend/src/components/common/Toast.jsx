import React from "react";

export function Toast({ toast }) {
  const bg = toast.kind === "err" ? "#3A1620" : toast.kind === "warn" ? "#3A2E12" : "#122C22";
  const fg = toast.kind === "err" ? "#FB7185" : toast.kind === "warn" ? "#FBBF24" : "#34D399";
  return (
    <div key={toast.id} className="anim-fadeUp" style={{
      position: "fixed", bottom: 90, left: "50%", transform: "translateX(-50%)",
      background: bg, color: fg, border: `1px solid ${fg}33`, padding: "11px 18px", borderRadius: 12,
      fontSize: 13.5, fontWeight: 500, zIndex: 200, maxWidth: "88vw", textAlign: "center",
      boxShadow: "0 14px 30px -10px rgba(0,0,0,0.55)",
    }}>
      {toast.text}
    </div>
  );
}