import React, { useState, useEffect } from "react";
import { AuthScreen } from "./pages/Login";
import { AppShell } from "./components/layout/AppLayout";
import { Toast } from "./components/common/Toast";
import "./styles/globals.css";

export default function FlowExpenseApp() {
  const [apiBase, setApiBase] = useState("http://localhost:3000/api");
  const [user, setUser] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(text, kind = "ok") { setToast({ text, kind, id: Date.now() }); }

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  async function apiFetch(path, options = {}) {
    const isForm = options.body instanceof FormData;
    const res = await fetch(apiBase + path, {
      credentials: "include",
      ...options,
      headers: isForm ? options.headers : { "Content-Type": "application/json", ...(options.headers || {}) },
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) throw new Error((data && data.message) || `Request failed (${res.status})`);
    return data;
  }

  return (
    <div className="flow-root">
      {!user ? (
        <AuthScreen
          apiFetch={apiFetch}
          onAuthed={(u) => { setUser(u); setDemoMode(false); }}
          onDemo={(u) => { setUser(u); setDemoMode(true); }}
          showToast={showToast}
        />
      ) : (
        <AppShell
          user={user} demoMode={demoMode} setDemoMode={setDemoMode}
          apiFetch={apiFetch} apiBase={apiBase} setApiBase={setApiBase}
          onLogout={() => setUser(null)} showToast={showToast}
        />
      )}
      {toast && <Toast toast={toast} />}
    </div>
  );
}