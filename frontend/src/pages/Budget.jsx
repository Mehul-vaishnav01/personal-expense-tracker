import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CATEGORIES } from "../utils/categories";
import { fmtMoney } from "../utils/formatMoney";
import { EmptyState } from "../components/common/EmptyState";

export function BudgetTab({ stats }) {
  const data = CATEGORIES.map((c) => ({ name: c.name, value: stats.byCat[c.name] || 0, color: c.color })).filter((d) => d.value > 0);
  const total = stats.total || 1;

  return (
    <div className="anim-tab page-narrow" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <h2 className="font-display" style={{ fontSize: 20, margin: 0 }}>Budget breakdown</h2>

      {data.length === 0 ? (
        <EmptyState onAdd={null} hasAny={false} />
      ) : (
        <div className="glass-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: 180, height: 180, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={3} stroke="none" animationDuration={800} animationEasing="ease-out">
                  {data.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>Total</div>
              <div className="font-mono" style={{ fontSize: 17, fontWeight: 700 }}>{fmtMoney(stats.total)}</div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 12 }}>
            {data.sort((a, b) => b.value - a.value).map((d) => (
              <div key={d.name}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 600 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, display: "inline-block" }} />
                    {d.name}
                  </span>
                  <span className="font-mono" style={{ color: "var(--text-dim)" }}>{fmtMoney(d.value)} · {Math.round((d.value / total) * 100)}%</span>
                </div>
                <div style={{ height: 6, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(d.value / total) * 100}%`, height: "100%", background: d.color, transition: "width .6s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}