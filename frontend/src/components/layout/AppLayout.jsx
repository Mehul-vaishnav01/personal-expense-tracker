import React, { useState, useEffect, useMemo } from "react";
import { Home, Receipt, PieChart as PieIcon, User, Wallet, Plus, LogOut, WifiOff, Bell } from "lucide-react";
import { DEMO_EXPENSES } from "../../utils/constants";
import { fmtMoney } from "../../utils/formatMoney";

import { HomeTab } from "../../pages/Dashboard";
import { ExpensesTab } from "../../pages/Expenses";
import { BudgetTab } from "../../pages/Budget";
import { ProfileTab } from "../../pages/Profile";

import { ExpenseSheet } from "../expense/ExpenseSheet";
import { Lightbox } from "../expense/ExpenseImage";
import { ConfirmSheet } from "../common/ConfirmModal";

const TABS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "expenses", label: "Expenses", Icon: Receipt },
  { id: "budget", label: "Budget", Icon: PieIcon },
  { id: "profile", label: "Profile", Icon: User },
];

export function AppShell({ user, demoMode, setDemoMode, apiFetch, apiBase, setApiBase, onLogout, showToast }) {
  const [tab, setTab] = useState("home");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await apiFetch("/expense/");
      setExpenses(data.expenses || []);
      if (demoMode) setDemoMode(false);
    } catch (e) {
      setExpenses(DEMO_EXPENSES);
      if (!demoMode) setDemoMode(true);
    } finally { setLoading(false); }
  }

  async function handleLogout() {
    try { if (!demoMode) await apiFetch("/auth/logout", { method: "POST" }); } catch (e) {}
    onLogout();
  }

  async function saveExpense(payload, file, id) {
    if (demoMode) {
      if (id) {
        setExpenses((list) => list.map((x) => (x._id === id ? { ...x, ...payload, uri: file ? URL.createObjectURL(file) : x.uri } : x)));
        showToast("Expense updated (demo).");
      } else {
        const item = { _id: "d" + Date.now(), ...payload, date: new Date().toISOString(), uri: file ? URL.createObjectURL(file) : null };
        setExpenses((list) => [item, ...list]);
        showToast("Expense added (demo).");
      }
      return true;
    }
    try {
      const fd = new FormData();
      fd.append("title", payload.title); fd.append("amount", payload.amount); fd.append("category", payload.category);
      if (file) fd.append("file", file);
      if (id) { await apiFetch(`/expense/update/${id}`, { method: "PATCH", body: fd }); showToast("Expense updated."); }
      else { await apiFetch("/expense/add", { method: "POST", body: fd }); showToast("Expense added."); }
      await load();
      return true;
    } catch (e) { showToast(e.message || "Couldn't save that expense.", "err"); return false; }
  }

  async function removeExpense(id) {
    setConfirmDelete(null);
    if (demoMode) { setExpenses((list) => list.filter((x) => x._id !== id)); showToast("Expense removed (demo)."); return; }
    try { await apiFetch(`/expense/delete/${id}`, { method: "DELETE" }); setExpenses((list) => list.filter((x) => x._id !== id)); showToast("Expense deleted."); }
    catch (e) { showToast(e.message || "Couldn't delete that expense.", "err"); }
  }

  const stats = useMemo(() => {
    const total = expenses.reduce((s, x) => s + Number(x.amount || 0), 0);
    const now = new Date();
    const thisMonth = expenses.filter((x) => { const d = new Date(x.date); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).reduce((s, x) => s + Number(x.amount || 0), 0);
    const byCat = {};
    expenses.forEach((x) => { byCat[x.category] = (byCat[x.category] || 0) + Number(x.amount || 0); });
    const top = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
    return { total, thisMonth, count: expenses.length, topCat: top ? top[0] : "—", byCat };
  }, [expenses]);

  const initials = (user.username || "?").slice(0, 2).toUpperCase();

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div className="blob" style={{ width: 320, height: 320, background: "#7C6AEF", top: -140, right: -100 }} />

      {/* Sidebar (desktop) */}
      <nav className="sidebar-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 22px" }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wallet size={18} color="#fff" />
          </div>
          <span className="font-display" style={{ fontWeight: 700, fontSize: 17 }}>Flow</span>
        </div>
        <button className="btn-grad press" onClick={() => { setEditing(null); setShowForm(true); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 18 }}>
          <Plus size={16} /> Add expense
        </button>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="row-btn" style={{ background: tab === t.id ? "var(--surface-2)" : "transparent", color: tab === t.id ? "var(--text)" : "var(--text-dim)" }}>
            <t.Icon size={18} color={tab === t.id ? "var(--accent-2)" : "currentColor"} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{t.label}</span>
          </button>
        ))}
        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          <div className="row-btn" onClick={handleLogout}>
            <LogOut size={17} color="var(--expense)" />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--expense)" }}>Sign out</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="header-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 18px 6px" }}>
        <div>
          <div style={{ fontSize: 12.5, color: "var(--text-faint)" }}>Welcome back</div>
          <div className="font-display" style={{ fontSize: 19, fontWeight: 700 }}>{user.username}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {demoMode && (
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#FBBF24", background: "#3A2E1250", border: "1px solid #FBBF2433", padding: "5px 10px", borderRadius: 999 }}>
              <WifiOff size={12} /> Demo
            </span>
          )}
          <button className="press" style={{ width: 40, height: 40, borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Bell size={17} color="var(--text-dim)" />
          </button>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>
            {initials}
          </div>
        </div>
      </div>

      <main className="main-content">
        {tab === "home" && (
          <HomeTab key="home" stats={stats} expenses={expenses} loading={loading}
            onAdd={() => { setEditing(null); setShowForm(true); }}
            onViewAll={() => setTab("expenses")} onViewBudget={() => setTab("budget")}
            onEdit={(x) => { setEditing(x); setShowForm(true); }} onImage={setLightbox} />
        )}
        {tab === "expenses" && (
          <ExpensesTab key="expenses" expenses={expenses} loading={loading}
            onEdit={(x) => { setEditing(x); setShowForm(true); }} onDelete={setConfirmDelete} onImage={setLightbox} />
        )}
        {tab === "budget" && <BudgetTab key="budget" stats={stats} />}
        {tab === "profile" && (
          <ProfileTab key="profile" user={user} demoMode={demoMode} apiBase={apiBase} setApiBase={setApiBase}
            onLogout={handleLogout} onRetry={load} stats={stats} />
        )}
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="bottom-nav">
        {TABS.slice(0, 2).map((t) => (
          <button key={t.id} className="nav-item" data-active={tab === t.id} onClick={() => setTab(t.id)}>
            <t.Icon size={20} /><span>{t.label}</span>
          </button>
        ))}
        <button className="fab press" onClick={() => { setEditing(null); setShowForm(true); }}><Plus size={24} /></button>
        {TABS.slice(2).map((t) => (
          <button key={t.id} className="nav-item" data-active={tab === t.id} onClick={() => setTab(t.id)}>
            <t.Icon size={20} /><span>{t.label}</span>
          </button>
        ))}
      </nav>

      {showForm && (
        <ExpenseSheet initial={editing} onClose={() => setShowForm(false)}
          onSubmit={async (payload, file) => { const ok = await saveExpense(payload, file, editing?._id); if (ok) setShowForm(false); }} />
      )}
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      {confirmDelete && (
        <ConfirmSheet title="Delete this expense?" body={`"${confirmDelete.title}" — ${fmtMoney(confirmDelete.amount)} will be permanently removed.`}
          onCancel={() => setConfirmDelete(null)} onConfirm={() => removeExpense(confirmDelete._id)} />
      )}
    </div>
  );
}