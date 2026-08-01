import React, { useMemo } from "react";
import { Sparkles, Plus, PieChart as PieIcon, Receipt, ChevronRight } from "lucide-react";
import { fmtMoney } from "../utils/formatMoney";
import { catMeta } from "../utils/categories";
import { useCountUp } from "../hooks/useCountUp";
import { MiniStat } from "../components/ui/MiniStat";
import { QuickAction } from "../components/ui/QuickAction";
import { SkeletonRows } from "../components/common/SkeletonRows";
import { EmptyState } from "../components/common/EmptyState";
import { ExpenseRow } from "../components/expense/ExpenseRow";

export function HomeTab({ stats, expenses, loading, onAdd, onViewAll, onViewBudget, onEdit, onImage }) {
  const animatedTotal = useCountUp(stats.total);
  const recent = useMemo(() => [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5), [expenses]);

  return (
    <div className="anim-tab dashboard-grid">
      <div className="dashboard-side">
        <div className="balance-card">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.85)", fontSize: 13, marginBottom: 6 }}>
              <Sparkles size={14} /> Total spent
            </div>
            <div className="font-mono" style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}>{fmtMoney(animatedTotal)}</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>{stats.count} expenses logged</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <MiniStat label="This month" value={fmtMoney(stats.thisMonth)} />
          <MiniStat label="Top category" value={stats.topCat} accent={catMeta(stats.topCat).color} />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <QuickAction Icon={Plus} label="Add expense" onClick={onAdd} />
          <QuickAction Icon={PieIcon} label="Budget" onClick={onViewBudget} />
          <QuickAction Icon={Receipt} label="All expenses" onClick={onViewAll} />
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h3 className="font-display" style={{ fontSize: 16, margin: 0 }}>Recent activity</h3>
          <button onClick={onViewAll} style={{ background: "none", border: "none", color: "var(--accent-2)", fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}>
            View all <ChevronRight size={14} />
          </button>
        </div>
        {loading ? (
          <SkeletonRows n={4} />
        ) : recent.length === 0 ? (
          <EmptyState onAdd={onAdd} hasAny={false} />
        ) : (
          <div className="glass-card" style={{ padding: "6px 12px" }}>
            {recent.map((x, i) => (
              <ExpenseRow key={x._id} exp={x} index={i} onClick={() => onEdit(x)} onImage={onImage} last={i === recent.length - 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}