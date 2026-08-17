import React, { useState } from "react";
import { useLocation } from "wouter";
import useAuth from "../../../hooks/useAuth";
import Card from "../../../components/ui/card";
import Button from "../../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState("administrator");
  const [password, setPassword] = useState("Admin@2026");
  const [role, setRole] = useState("ADMIN");
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    try {
      await login(username, password);
      
      // Redirect based on role
      const upperRole = role.toUpperCase();
      if (upperRole === "ADMIN") {
        setLocation("/admin/dashboard");
      } else if (upperRole === "BDM") {
        setLocation("/bdm/dashboard");
      } else if (upperRole === "CLIENT") {
        setLocation("/portal/dashboard");
      } else if (upperRole === "SALES") {
        setLocation("/crm/dashboard");
      } else if (upperRole === "HR") {
        setLocation("/recruitment/dashboard");
      } else if (upperRole === "CONTENT") {
        setLocation("/cms/dashboard");
      } else if (upperRole === "SUPPORT") {
        setLocation("/support/dashboard");
      } else {
        setLocation("/");
      }
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || "Failed to authenticate.");
    }
  };

  const handleRoleSelect = (selectedRole: string, defaultUser: string, defaultPass: string) => {
    setRole(selectedRole);
    setUsername(defaultUser);
    setPassword(defaultPass);
  };

  return (
    <Card borderAccent style={{ width: "100%", padding: "32px", display: "flex", flexDirection: "column", gap: "24px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center" }}>
        <img src="/logo.svg" alt="Aurexion" style={{ width: "48px", height: "48px" }} />
        <h2 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 600 }}>Access Scope Console</h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", margin: 0, lineHeight: 1.5 }}>
          Authorize credentials to establish a secure session.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {error && (
          <div style={{
            color: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.15)",
            padding: "0.75rem",
            borderRadius: "4px",
            fontSize: "0.85rem",
            fontFamily: "IBM Plex Mono, monospace",
          }}>
            ERROR // {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#64748b" }}>
            SELECT SYSTEM ROLE SCOPE
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {[
              ["ADMIN", "administrator", "Admin@2026"],
              ["BDM", "business_dev_manager", "Bdm@2026"],
              ["CLIENT", "client_user", "Client@2026"],
              ["SALES", "sales_executive", "Sales@2026"],
              ["HR", "hr_manager", "Hr@2026"],
              ["CONTENT", "content_manager", "Content@2026"],
              ["SUPPORT", "support_executive", "Support@2026"]
            ].map(([r, defaultUser, defaultPass]) => {
              const isSelected = role === r;
              const isSupport = r === "SUPPORT";
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSelect(r, defaultUser, defaultPass)}
                  style={{
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.68rem",
                    fontFamily: "IBM Plex Mono, monospace",
                    borderRadius: "4px",
                    backgroundColor: isSelected ? "rgba(99, 245, 232, 0.1)" : "#050811",
                    border: isSelected ? "1px solid #63f5e8" : "1px solid #1e293b",
                    color: isSelected ? "#63f5e8" : "#cbd5e1",
                    cursor: "pointer",
                    transition: "all 150ms",
                    textAlign: "center",
                    gridColumn: isSupport ? "span 3" : undefined,
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="username" style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#64748b" }}>
            USERNAME OR EMAIL
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="administrator"
            style={{
              width: "100%",
              height: "44px",
              padding: "0 0.75rem",
              borderRadius: "4px",
              backgroundColor: "#050811",
              border: "1px solid #1e293b",
              color: "#eef4f3",
              fontSize: "0.875rem",
              fontFamily: "inherit",
              outline: "none",
              transition: "border-color 150ms",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#63f5e8")}
            onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label htmlFor="password" style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#64748b" }}>
              PASSWORD
            </label>
            <span 
              onClick={() => setLocation("/forgot-password")}
              style={{ fontSize: "0.75rem", color: "#63f5e8", cursor: "pointer", textDecoration: "underline" }}
            >
              Forgot?
            </span>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                height: "44px",
                padding: "0 2.5rem 0 0.75rem",
                borderRadius: "4px",
                backgroundColor: "#050811",
                border: "1px solid #1e293b",
                color: "#eef4f3",
                fontSize: "0.875rem",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 150ms",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#63f5e8")}
              onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                padding: 0,
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Button type="submit" glow style={{ width: "100%", height: "46px", marginTop: "8px" }} disabled={isLoading}>
          {isLoading ? "ESTABLISHING SECURE PORT..." : "ESTABLISH SESSION"}
        </Button>
      </form>
    </Card>
  );
};

export default Login;
