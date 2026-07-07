import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      style={{
        padding: "8px 16px",
        borderRadius: 4,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: "none",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.15s ease",
        ...(location.pathname === path
          ? { background: "#EFEBDE", color: "#9C6A22", border: "1px solid #E3D6B8" }
          : { color: "#8A7B5E", border: "1px solid transparent" }),
      }}
      onMouseEnter={(e) => {
        if (location.pathname !== path) {
          e.target.style.color = "#57493A";
          e.target.style.background = "#F3EBD9";
        }
      }}
      onMouseLeave={(e) => {
        if (location.pathname !== path) {
          e.target.style.color = "#8A7B5E";
          e.target.style.background = "transparent";
        }
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav style={{
      width: "100%",
      background: "rgba(246,239,223,0.92)",
      backdropFilter: "blur(6px)",
      borderBottom: "1px solid #E3D6B8",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* LOGO */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#BE8A2E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 15,
            color: "#FBF6EA",
            fontFamily: "'Fraunces', serif",
            transform: "rotate(-6deg)",
          }}>CP</div>
          <span style={{
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#2A2318",
            fontFamily: "'Fraunces', serif",
          }}>CareerPilot</span>
        </Link>
        {/* LINKS */}
        <div style={{ display: "flex", gap: 6 }}>
          {navItem("/", "Home")}
          {navItem("/setup", "Setup")}
          {navItem("/dashboard", "Dashboard")}
        </div>
      </div>
    </nav>
  );
}