import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "../utils/categories";
import { groupLabel } from "../utils/groupExpenses";
import { SkeletonRows } from "../components/common/SkeletonRows";
import { EmptyState } from "../components/common/EmptyState";
import { ExpenseRowActions } from "../components/expense/ExpenseActions";

export function ExpensesTab({ expenses, loading, onEdit, onDelete, onImage }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => expenses
    .filter((x) => (cat === "All" ? true : x.category === cat))
    .filter((x) => x.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date)), [expenses, cat, search]);

  const groups = useMemo(() => {
    const out = [];
    filtered.forEach((x) => {
      const label = groupLabel(x.date);
      let g = out.find((g) => g.label === label);
      if (!g) { g = { label, items: [] }; out.push(g); }
      g.items.push(x);
    });
    return out;
  }, [filtered]);

  return (
    <div className="anim-tab" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 className="font-display" style={{ fontSize: 20, margin: 0 }}>Expenses</h2>
      <div className="expenses-toolbar">
        <div className="search-wrap">
          <Search size={16} style={{ position: "absolute", left: 13, top: 13, color: "var(--text-faint)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search expenses…" className="input-dark" style={{ paddingLeft: 38 }} />
        </div>
        <div className="chip-row scrollbar-thin">
          <button className="chip-dark" data-active={cat === "All"} style={{ background: cat === "All" ? "var(--grad)" : undefined }} onClick={() => setCat("All")}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.name} className="chip-dark" data-active={cat === c.name} style={{ background: cat === c.name ? c.color : undefined, color: cat === c.name ? "#0A0A12" : "var(--text-dim)" }} onClick={() => setCat(c.name)}>
              <c.Icon size={13} /> {c.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonRows n={5} />
      ) : groups.length === 0 ? (
        <EmptyState onAdd={null} hasAny={expenses.length > 0} />
      ) : (
        groups.map((g) => (
          <div key={g.label}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.6px", margin: "4px 0 8px" }}>{g.label}</div>
            <div className="glass-card" style={{ padding: "6px 12px" }}>
              {g.items.map((x, i) => (
                <ExpenseRowActions key={x._id} exp={x} index={i} last={i === g.items.length - 1} onEdit={() => onEdit(x)} onDelete={() => onDelete(x)} onImage={onImage} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}