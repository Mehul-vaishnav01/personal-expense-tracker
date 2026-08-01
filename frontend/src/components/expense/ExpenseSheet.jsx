import React, { useState } from "react";
import { X, Camera, ImagePlus, AlertTriangle, Loader2, Check } from "lucide-react";
import { CATEGORIES } from "../../utils/categories";

export function ExpenseSheet({ initial, onClose, onSubmit }) {
  const [amount, setAmount] = useState(initial?.amount ?? "");
  const [title, setTitle] = useState(initial?.title || "");
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0].name);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.uri || null);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  function handleFile(f) { if (!f) return; setFile(f); setPreview(URL.createObjectURL(f)); }

  async function submit(e) {
    e.preventDefault();
    if (!title.trim() || !amount) { setErr("Add a title and an amount."); return; }
    setErr(""); setSubmitting(true);
    await onSubmit({ title: title.trim(), amount: Number(amount), category }, file);
    setSubmitting(false);
  }

  return (
    <div className="sheet-overlay anim-fadeIn" onClick={onClose}>
      <div className="sheet-modal anim-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 40, height: 4, background: "var(--border)", borderRadius: 4, margin: "0 auto 16px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 className="font-display" style={{ fontSize: 18, margin: 0 }}>{initial ? "Edit expense" : "New expense"}</h2>
          <button onClick={onClose} style={{ background: "var(--surface-2)", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", color: "var(--text-dim)" }}><X size={16} /></button>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
            <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 6 }}>Amount</div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
              <span className="font-mono" style={{ fontSize: 28, color: "var(--text-faint)" }}>₹</span>
              <input className="font-mono" type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" autoFocus
                style={{ background: "none", border: "none", outline: "none", color: "var(--text)", fontSize: 40, fontWeight: 700, width: 180, textAlign: "center" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }} className="scrollbar-thin">
            {CATEGORIES.map((c) => (
              <button type="button" key={c.name} className="chip-dark" data-active={category === c.name}
                style={{ background: category === c.name ? c.color : undefined, color: category === c.name ? "#0A0A12" : "var(--text-dim)" }}
                onClick={() => setCategory(c.name)}>
                <c.Icon size={13} /> {c.name}
              </button>
            ))}
          </div>

          <label style={{ display: "block" }}>
            <span style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.6px", color: "var(--text-faint)", fontWeight: 600, marginBottom: 6, display: "block" }}>What's this for?</span>
            <input className="input-dark" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Grocery run" />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: "1.5px dashed var(--border)", borderRadius: 12, padding: preview ? 10 : 16 }}>
            {preview ? (
              <img src={preview} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
            ) : (
              <div className="icon-badge" style={{ background: "var(--surface-2)" }}><Camera size={18} color="var(--text-dim)" /></div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{preview ? "Receipt attached" : "Attach a receipt"}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-faint)" }}>{preview ? "Tap to change" : "Optional — snap or upload"}</div>
            </div>
            <ImagePlus size={16} color="var(--text-faint)" />
            <input type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
          </label>

          {err && <div style={{ color: "var(--expense)", fontSize: 13, display: "flex", gap: 6 }}><AlertTriangle size={15} />{err}</div>}

          <button type="submit" className="btn-grad press" disabled={submitting} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {submitting ? <Loader2 size={16} className="spin-slow" /> : <Check size={16} />}
            {initial ? "Save changes" : "Add expense"}
          </button>
        </form>
      </div>
    </div>
  );
}