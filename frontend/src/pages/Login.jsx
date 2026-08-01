import React, { useState } from "react";
import { Wallet, AlertTriangle, Loader2 } from "lucide-react";

export function AuthScreen({ apiFetch, onAuthed, onDemo, showToast }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      if (mode === "register") {
        const data = await apiFetch("/auth/register", { method: "POST", body: JSON.stringify({ username: form.username, email: form.email, password: form.password }) });
        showToast("Welcome to Flow.");
        onAuthed(data.user);
      } else {
        const data = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ username: form.username, email: form.username, password: form.password }) });
        showToast("Signed in.");
        onAuthed(data.user);
      }
    } catch (e) {
      if (e instanceof TypeError) {
        onDemo({ id: "demo", username: form.username || "guest", email: form.email || "guest@demo.local" });
        showToast("Couldn't reach the backend — opened a live demo instead.", "warn");
      } else {
        setErr(e.message || "Something went wrong.");
        setShake(true); setTimeout(() => setShake(false), 450);
      }
    } finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ width: 380, height: 380, background: "#7C6AEF", top: -100, left: -120 }} />
      <div className="blob" style={{ width: 320, height: 320, background: "#38BDF8", bottom: -100, right: -100, animationDelay: "2s" }} />

      <div className="anim-fadeUp glass-card" style={{ width: "100%", maxWidth: 400, padding: "32px 28px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, boxShadow: "0 10px 24px -8px rgba(124,106,239,0.6)" }}>
            <Wallet size={26} color="#fff" strokeWidth={2} />
          </div>
          <h1 className="font-display" style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Flow</h1>
          <p style={{ color: "var(--text-dim)", fontSize: 13.5, margin: "4px 0 0" }}>Track without friction.</p>
        </div>

        <div style={{ display: "flex", background: "var(--surface-2)", borderRadius: 12, padding: 4, marginBottom: 22 }}>
          {["login", "register"].map((m) => (
            <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{
              flex: 1, padding: "9px 0", border: "none", borderRadius: 9, cursor: "pointer", fontWeight: 600, fontSize: 13.5,
              background: mode === m ? "var(--grad)" : "transparent", color: mode === m ? "#fff" : "var(--text-dim)", transition: "all .2s ease",
            }}>
              {m === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className={shake ? "anim-shake" : ""} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <FieldDark label={mode === "login" ? "Username or email" : "Username"}>
            <input className="input-dark" required value={form.username} onChange={(e) => update("username", e.target.value)} placeholder="e.g. j.doe" autoComplete="username" />
          </FieldDark>
          {mode === "register" && (
            <FieldDark label="Email">
              <input className="input-dark" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoComplete="email" />
            </FieldDark>
          )}
          <FieldDark label="Password">
            <input className="input-dark" type="password" required value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" autoComplete={mode === "login" ? "current-password" : "new-password"} />
          </FieldDark>

          {err && (
            <div style={{ display: "flex", gap: 8, color: "var(--expense)", fontSize: 13 }}>
              <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} /><span>{err}</span>
            </div>
          )}

          <button type="submit" className="btn-grad press" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
            {loading && <Loader2 size={16} className="spin-slow" />}
            {mode === "login" ? "Sign in" : "Get started"}
          </button>

          <button type="button" onClick={() => onDemo({ id: "demo", username: "guest", email: "guest@demo.local" })}
            style={{ background: "none", border: "none", color: "var(--text-faint)", fontSize: 12.5, cursor: "pointer", marginTop: -2 }}>
            Skip — explore a live demo →
          </button>
        </form>
      </div>
    </div>
  );
}

function FieldDark({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.6px", color: "var(--text-faint)", fontWeight: 600, marginBottom: 6, display: "block" }}>{label}</span>
      {children}
    </label>
  );
}