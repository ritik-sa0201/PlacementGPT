import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* ---------- small line icons (no emoji) ---------- */

const iconProps = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

const IconGlobe = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" /></svg>
);
const IconSearch = () => (
  <svg {...iconProps}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.8-4.8" /></svg>
);
const IconFeather = () => (
  <svg {...iconProps}><path d="M20 4c-6 0-13 4-15 12-.4 1.4-.6 2.6-.7 3.7 1-.1 2.2-.4 3.5-.8C15.7 17 20 10 20 4Z" /><path d="M9 15 20 4" /></svg>
);
const IconSheet = () => (
  <svg {...iconProps}><path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M9 12h6M9 16h6M9 8h3" /></svg>
);
const IconMail = () => (
  <svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="1.2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
);
const IconPaperclip = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7C6B4F" strokeWidth="1.6" strokeLinecap="round">
    <path d="M8 12.5V7a4 4 0 0 1 8 0v9a2.5 2.5 0 0 1-5 0V8.5" />
  </svg>
);

/* ---------- postmark-style step number ---------- */

function Stamp({ n, rotate = -6 }) {
  return (
    <div style={{
      width: 46, height: 46, borderRadius: "50%",
      border: "1.4px dashed #B58A3D",
      display: "flex", alignItems: "center", justifyContent: "center",
      transform: `rotate(${rotate}deg)`,
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 11, fontWeight: 600, color: "#9C6A22",
      letterSpacing: "0.02em",
      flexShrink: 0,
    }}>
      No.{String(n).padStart(2, "0")}
    </div>
  );
}

/* ---------- the desk scene: hero visual ---------- */

const deskNotes = [
  { label: "Parsed 42 listings from Naukri", rotate: -4, top: 0, left: 0 },
  { label: "Found 31 recruiter inboxes", rotate: 3, top: 34, left: 60 },
  { label: "Drafted 31 letters for review", rotate: -2, top: 68, left: 18 },
];

function DeskScene() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    deskNotes.forEach((_, i) => setTimeout(() => setShown((s) => s + 1), i * 260 + 200));
  }, []);

  return (
    <div style={{ position: "relative", minHeight: 340 }}>
      <div style={{ position: "relative", height: 190 }}>
        {deskNotes.map((note, i) => (
          <div key={i} style={{
            position: "absolute", top: note.top, left: note.left,
            transform: `rotate(${note.rotate}deg) translateY(${shown > i ? 0 : 10}px)`,
            opacity: shown > i ? 1 : 0,
            transition: "opacity 0.5s ease, transform 0.5s ease",
            background: "#FBF7EC",
            border: "1px solid #E3D6B8",
            borderRadius: 3,
            padding: "12px 16px",
            boxShadow: "3px 4px 0 #EAE0C6",
            fontSize: 13, color: "#43392A",
            fontFamily: "'IBM Plex Mono', monospace",
            display: "flex", alignItems: "center", gap: 8,
            width: 260,
          }}>
            <span style={{ color: "#3F5B47", fontWeight: 700 }}>✓</span>{note.label}
          </div>
        ))}
      </div>

      {/* the letter itself, layered on top like it just landed on the desk */}
      <div style={{
        position: "relative",
        background: "#FDFAF2",
        border: "1px solid #E3D6B8",
        borderRadius: 4,
        padding: "22px 24px",
        boxShadow: "6px 8px 0 #E9DCBD",
        marginTop: 10,
      }}>
        <div style={{ position: "absolute", top: -14, right: 22 }}><IconPaperclip /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, borderBottom: "1px dashed #DCCEA9", paddingBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, color: "#2A2318" }}>Capgemini</div>
            <div style={{ fontSize: 12, color: "#8A7B5E", marginTop: 2 }}>Analyst Programmer, 2026 batch</div>
          </div>
          <div style={{
            fontSize: 11, color: "#3F5B47", fontFamily: "'IBM Plex Mono', monospace",
            border: "1px solid #C7D6C9", borderRadius: 3, padding: "4px 9px", background: "#F1F5EE",
          }}>careers@capgemini.com</div>
        </div>
        <div style={{ fontSize: 13, color: "#5B4F3C", lineHeight: 1.85, fontFamily: "'Fraunces', serif" }}>
          Dear Hiring Team,<br /><br />
          We're writing from the Placement Coordination Team at IIIT Bhubaneswar about internship and placement opportunities for our 2026 batch&hellip;
        </div>
      </div>
    </div>
  );
}

/* ---------- content ---------- */

const features = [
  { Icon: IconGlobe, accent: "#BE8A2E", title: "Reads the listing for you", desc: "Point it at a Naukri, Foundit, or Internshala posting and it pulls out every company, role, and location without you copying a thing." },
  { Icon: IconSearch, accent: "#3F5B47", title: "Finds the actual person", desc: "Not a generic careers@ inbox — it tracks down a real recruiter or HR contact using Google and Serper search." },
  { Icon: IconFeather, accent: "#9C4A32", title: "Drafts a letter, not a template", desc: "A local Ollama model writes each email with real context about the company, so it doesn't read like the same message forty times over." },
  { Icon: IconSheet, accent: "#BE8A2E", title: "Or start from your own list", desc: "Already have a recruiter spreadsheet? Upload the CSV and skip straight to drafting." },
];

const steps = [
  { Icon: IconGlobe, title: "Parse the posting", desc: "Companies and roles, pulled from Naukri, Foundit, Internshala, or a CSV." },
  { Icon: IconSearch, title: "Find the recruiter", desc: "A real inbox, found through Google and Serper — not a guess." },
  { Icon: IconFeather, title: "Research the company", desc: "Enough context to write something that isn't generic." },
  { Icon: IconMail, title: "Draft the email", desc: "Subject, body, and attachments — all yours to edit before anything goes out." },
  { Icon: IconMail, title: "Send it", desc: "Straight from your Gmail account over SMTP, when you're ready." },
];

const stack = [
  { name: "React", desc: "The dashboard you're using right now, with live updates as each step finishes." },
  { name: "FastAPI", desc: "Runs the backend and keeps each request moving through the pipeline." },
  { name: "LangGraph", desc: "Coordinates the research and drafting agents in the right order." },
  { name: "Ollama", desc: "Writes the emails locally — nothing sent to a third party to draft your outreach." },
];

/* ---------- page ---------- */

export default function LandingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#F6EFDF",
      color: "#2A2318",
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .pg-nav-link { color: #6E6252; text-decoration: none; font-size: 14px; font-weight: 500; }
        .pg-nav-link:hover { color: #2A2318; }
        .pg-btn-primary {
          background: #BE8A2E; color: #FBF6EA; padding: 12px 26px; border-radius: 4px;
          font-weight: 600; font-size: 14px; text-decoration: none; display: inline-block;
          border: none; cursor: pointer; transition: background 0.15s ease;
          font-family: 'Inter', sans-serif;
        }
        .pg-btn-primary:hover { background: #A87823; }
        .pg-btn-secondary {
          background: transparent; color: #2A2318; padding: 11px 24px; border-radius: 4px;
          font-weight: 500; font-size: 14px; text-decoration: none; display: inline-block;
          border: 1px solid #C9BA96; transition: border-color 0.15s ease, background 0.15s ease;
        }
        .pg-btn-secondary:hover { border-color: #9C8C63; background: #EFE6D3; }
        .pg-feature-card {
          background: #FBF7EC; border: 1px solid #E3D6B8; border-radius: 4px;
          padding: 26px; transform: rotate(var(--tilt, 0deg));
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 3px 4px 0 #EAE0C6;
        }
        .pg-feature-card:hover { transform: rotate(0deg); box-shadow: 4px 6px 0 #E2D5AE; }
        .pg-step-card {
          background: #FBF7EC; border: 1px solid #E3D6B8; border-radius: 4px; padding: 22px;
          position: relative;
        }
        .pg-stack-row {
          display: grid; grid-template-columns: 140px 1fr; gap: 18px; align-items: baseline;
          padding: 18px 0; border-bottom: 1px solid #E3D6B8;
        }
        .pg-stack-row:last-child { border-bottom: none; }
        @media (max-width: 860px) {
          .pg-grid-2 { grid-template-columns: 1fr !important; }
          .pg-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .pg-grid-5 { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pg-feature-card, * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* faint paper grain */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.5,
        backgroundImage: "repeating-linear-gradient(115deg, transparent 0 3px, #EFE6D0 3px 4px)",
      }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #E3D6B8", background: "rgba(246,239,223,0.92)", backdropFilter: "blur(6px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "#BE8A2E",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, color: "#FBF6EA",
              transform: "rotate(-6deg)",
            }}>CP</div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: "#2A2318" }}>CareerPilot</span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Link to="/" className="pg-nav-link">Home</Link>
            <Link to="/setup" className="pg-nav-link">Guide</Link>
            <Link to="/dashboard" className="pg-nav-link">Dashboard</Link>
            <Link to="/dashboard" className="pg-btn-primary" style={{ padding: "9px 18px", fontSize: 13 }}>Open dashboard</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "84px 24px 70px", position: "relative", zIndex: 1 }}>
        <div className="pg-grid-2" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
              color: "#3F5B47", border: "1px dashed #A9C0AC", borderRadius: 3, padding: "6px 14px",
              marginBottom: 26, transform: "rotate(-1deg)",
            }}>
              Built for placement cells
            </div>

            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.01em", color: "#2A2318", marginBottom: 22 }}>
              Every recruiter email, drafted before your coffee's cold.
            </h1>

            <p style={{ fontSize: 16, color: "#6E6252", lineHeight: 1.8, maxWidth: 460, marginBottom: 34 }}>
              CareerPilot pulls companies straight off Naukri, Foundit, or a CSV, tracks down the recruiter's actual inbox, and drafts a letter that reads like your team wrote it — not a template.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <Link to="/dashboard" className="pg-btn-primary">Open the dashboard</Link>
              <Link to="/setup" className="pg-btn-secondary">Read the setup guide</Link>
            </div>

            <div style={{ borderTop: "1px solid #E3D6B8", paddingTop: 26, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Sources", "Naukri, Foundit, Internshala, or your own CSV"],
                ["Contacts", "Real recruiter inboxes, not a guessed careers@"],
                ["Before sending", "Every subject line and body stays editable"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 16, fontSize: 13.5 }}>
                  <span style={{ width: 90, flexShrink: 0, color: "#9C6A22", fontFamily: "'IBM Plex Mono', monospace" }}>{k}</span>
                  <span style={{ color: "#57493A" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <DeskScene />
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 46, maxWidth: 560 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>What it actually does</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 600, color: "#2A2318" }}>Four jobs, done well</h2>
        </div>

        <div className="pg-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {features.map((f, i) => (
            <div key={i} className="pg-feature-card" style={{ "--tilt": `${(i % 2 === 0 ? -1 : 1) * 1.2}deg` }}>
              <div style={{ color: f.accent, marginBottom: 18 }}><f.Icon /></div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: "#2A2318", marginBottom: 9 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#6E6252", lineHeight: 1.75 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 46, maxWidth: 560 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>How it moves</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 34, fontWeight: 600, color: "#2A2318" }}>From posting to inbox, five stops along the way</h2>
        </div>

        <div className="pg-grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {steps.map((s, i) => (
            <div key={i} className="pg-step-card">
              <Stamp n={i + 1} rotate={i % 2 === 0 ? -6 : 5} />
              <div style={{ color: "#43392A", margin: "16px 0 10px" }}><s.Icon /></div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#2A2318", marginBottom: 7 }}>{s.title}</h3>
              <p style={{ fontSize: 12.5, color: "#6E6252", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section style={{ background: "#EFE6D3", borderTop: "1px solid #E3D6B8", borderBottom: "1px solid #E3D6B8", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ marginBottom: 30 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>What's running underneath</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318" }}>Nothing hidden, nothing exotic</h2>
          </div>
          <div>
            {stack.map((s, i) => (
              <div key={i} className="pg-stack-row">
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 600, color: "#2A2318" }}>{s.name}</div>
                <div style={{ fontSize: 13.5, color: "#6E6252", lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — envelope */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "90px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0, borderLeft: "140px solid transparent", borderRight: "140px solid transparent",
            borderTop: "70px solid #EFE6D3",
          }} />
          <div style={{
            background: "#FBF7EC", border: "1px solid #E3D6B8", borderRadius: 4,
            padding: "70px 40px 44px", position: "relative",
          }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318", marginBottom: 14 }}>Ready to send your first batch?</h2>
            <p style={{ color: "#6E6252", fontSize: 14.5, marginBottom: 30, lineHeight: 1.75 }}>Open the dashboard, paste in a posting or a CSV, and see the first drafts within minutes.</p>
            <Link to="/dashboard" className="pg-btn-primary" style={{ fontSize: 14.5, padding: "13px 32px" }}>Open the dashboard</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E3D6B8", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#BE8A2E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 13, color: "#FBF6EA" }}>P</div>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600, color: "#2A2318" }}>CareerPilot</div>
              <div style={{ fontSize: 11, color: "#8A7B5E", marginTop: 1 }}>Built for a placement cell, not a demo booth</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#8A7B5E", fontFamily: "'IBM Plex Mono', monospace" }}>React · FastAPI · LangGraph · Ollama · Serper</div>
        </div>
      </footer>
    </div>
  );
}