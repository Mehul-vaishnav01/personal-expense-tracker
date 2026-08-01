import React from "react";

export function Lightbox({ src, onClose }) {
  return (
    <div className="anim-fadeIn" onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(5,5,10,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 150, padding: 24, cursor: "zoom-out" }}>
      <img src={src} alt="Receipt" className="anim-fadeUp" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 14, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }} />
    </div>
  );
}