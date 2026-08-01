import React, { useState } from "react";
import { Settings, ChevronRight, LogOut } from "lucide-react";
import { fmtMoney } from "../utils/formatMoney";
import { MiniStat } from "../components/ui/MiniStat";

export function ProfileTab({ user, demoMode, apiBase, setApiBase, onLogout, onRetry, stats }) {
  const [editingUrl, setEditingUrl] = useState(false);
  const [val, setVal] = useState(apiBase);
  const initials = (user.username || "?").slice(0, 2).toUpperCase();

  return (
    <div className="anim-tab page-narrow" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="glass-card" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initials}</div>
        <div style={{ minWidth: 0 }}>
          <div className="font-display" style={{ fontSize: 17, fontWeight: 700 }}>{user.username}</div>
          <div style={{ fontSize: 13, color: "var(--text-faint)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <MiniStat label="Total spent" value={fmtMoney(stats.total)} />
        <MiniStat label="Receipts filed" value={stats.count} />
      </div>

      <div className="glass-card" style={{ padding: "6px 14px" }}>
        {/* <div className="row-btn" onClick={() => setEditingUrl((v) => !v)}>
          <Settings size={17} color="var(--text-dim)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Backend connection</div>
            <div style={{ fontSize: 11.5, color: "var(--text-faint)" }}>{demoMode ? "Demo mode — not connected" : "Connected"}</div>
          </div>
          <ChevronRight size={16} color="var(--text-faint)" style={{ transform: editingUrl ? "rotate(90deg)" : "none", transition: "transform .2s ease" }} />
        </div> */}
        {/* {editingUrl && (
          // <div className="anim-fadeIn" style={{ padding: "4px 6px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
          //   <input className="input-dark font-mono" value={val} onChange={(e) => setVal(e.target.value)} placeholder="http://localhost:3000/api" style={{ fontSize: 12.5 }} />
          //   <p style={{ fontSize: 12, color: "var(--text-faint)", margin: 0, lineHeight: 1.5 }}>
          //     Make sure your backend allows requests from this page (CORS with <span className="font-mono">credentials: true</span>).
          //   </p>
          //   <button className="btn-grad press" onClick={() => { setApiBase(val); onRetry(); }} style={{ fontSize: 13 }}>Save &amp; reconnect</button>
          // </div>
        )} */}
        <div className="row-btn" onClick={onLogout} style={{ borderTop: "1px solid var(--border)" }}>
          <LogOut size={17} color="var(--expense)" />
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--expense)" }}>Sign out</span>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: 11.5, color: "var(--text-faint)", marginTop: 6 }}>Flow · Track without friction.</div>
    </div>
  );
}