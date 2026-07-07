import { Link } from "react-router-dom";

/* ---------- shared line icons (no emoji) ---------- */

const iconProps = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

const IconGlobe = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" /></svg>
);
const IconSearch = () => (
  <svg {...iconProps}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.8-4.8" /></svg>
);
const IconBook = () => (
  <svg {...iconProps}><path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" /><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5v-13Z" /></svg>
);
const IconFeather = () => (
  <svg {...iconProps}><path d="M20 4c-6 0-13 4-15 12-.4 1.4-.6 2.6-.7 3.7 1-.1 2.2-.4 3.5-.8C15.7 17 20 10 20 4Z" /><path d="M9 15 20 4" /></svg>
);
const IconMail = () => (
  <svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="1.2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
);
const IconFlag = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V4M5 4h13l-3 4 3 4H5" />
  </svg>
);

const workflowSteps = [
  { Icon: IconGlobe, title: "Parse HTML", desc: "Extracts companies and job roles from Naukri, Foundit, and Internshala HTML." },
  { Icon: IconSearch, title: "Find Emails", desc: "Uses Serper API and Google Search to discover real recruiter emails." },
  { Icon: IconBook, title: "Research", desc: "Looks into each company so the outreach has real context." },
  { Icon: IconFeather, title: "Generate", desc: "A local Ollama model drafts the personalized outreach email." },
  { Icon: IconMail, title: "Send", desc: "Edit the content, attach a resume, and send via Gmail SMTP." },
];

/* ---------- setup steps ---------- */

const steps = [
  {
    num: 1,
    title: "Install Ollama",
    desc: "Install Ollama locally for AI email generation",
    content: (
      <div style={{ background: "#F3EBD9", border: "1px dashed #D6C49B", borderRadius: 4, padding: "16px 20px" }}>
        <p style={{ fontSize: 13, color: "#6E6252", marginBottom: 10 }}>Download Ollama from the official site:</p>
        <a href="https://ollama.com" target="_blank" rel="noreferrer" style={{ color: "#9C6A22", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", textDecoration: "none", borderBottom: "1px solid #C9A85D" }}>
          https://ollama.com ↗
        </a>
      </div>
    ),
  },
  {
    num: 2,
    title: "Download the model",
    desc: "Pull the local LLM used for generation",
    content: <CodeBlock code="ollama run llama3.2:3b" />,
  },
  {
    num: 3,
    title: "Configure API keys",
    desc: "Set up Serper for recruiter discovery",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 13, color: "#6E6252" }}>
          Create a <Code>.env</Code> file inside <Code>backend/</Code>
        </p>
        <CodeBlock code="SERPER_API_KEY=your_serper_api_key" />
        <div style={{ background: "#EFEBDE", border: "1px solid #E3D6B8", borderRadius: 4, padding: "13px 18px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3F5B47", marginBottom: 6 }}>Getting a Serper API key</div>
          <p style={{ fontSize: 12.5, color: "#6E6252", lineHeight: 1.75 }}>Visit serper.dev, create a free account, and copy your key into the .env file.</p>
        </div>
      </div>
    ),
  },
  {
    num: 4,
    title: "Paste the job portal HTML",
    desc: "Add Naukri, Foundit, or Internshala HTML",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <CodeBlock code="backend/sample.html" />
        <p style={{ fontSize: 13, color: "#6E6252", lineHeight: 1.8 }}>
          Open a job portal page, inspect it, copy the full page source, and paste it into <Code>sample.html</Code>.
        </p>
      </div>
    ),
  },
  {
    num: 5,
    title: "Start the backend",
    desc: "Run the FastAPI + LangGraph server",
    content: <CodeBlock code="uvicorn app.main:app --reload" />,
  },
  {
    num: 6,
    title: "Start the frontend",
    desc: "Launch the React dashboard",
    content: <CodeBlock code="npm run dev" />,
  },
];

function Code({ children }) {
  return (
    <span style={{ background: "#EFE6D3", color: "#9C6A22", padding: "2px 7px", borderRadius: 3, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5 }}>{children}</span>
  );
}

function CodeBlock({ code }) {
  return (
    <div style={{ background: "#2A2318", border: "1px solid #43392A", borderRadius: 4, padding: "15px 20px", overflowX: "auto" }}>
      <pre style={{ margin: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#EAD9A0", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{code}</pre>
    </div>
  );
}

function Stamp({ n }) {
  return (
    <div style={{
      width: 48, height: 48, borderRadius: "50%", border: "1.4px dashed #B58A3D",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 600, color: "#9C6A22",
      transform: `rotate(${n % 2 === 0 ? 4 : -4}deg)`,
    }}>
      {n}
    </div>
  );
}

const troubleshoot = [
  { title: "Gmail authentication failed", desc: "Make sure Google 2FA is enabled and the App Password is correctly set in .env." },
  { title: "No recruiter emails found", desc: "Check the Serper API key, and confirm the recruiter or company info is public." },
  { title: "Ollama model not responding", desc: "Make sure Ollama is running locally and llama3.2:3b has finished downloading." },
];

/* ---------- page ---------- */

export default function SetupGuide() {
  return (
    <div style={{ minHeight: "100vh", background: "#F6EFDF", color: "#2A2318", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .pg-nav-link { color: #6E6252; text-decoration: none; font-size: 14px; font-weight: 500; }
        .pg-nav-link:hover { color: #2A2318; }
        .pg-btn-primary {
          background: #BE8A2E; color: #FBF6EA; padding: 12px 26px; border-radius: 4px;
          font-weight: 600; font-size: 14px; text-decoration: none; display: inline-block;
          border: none; cursor: pointer; transition: background 0.15s ease; font-family: 'Inter', sans-serif;
        }
        .pg-btn-primary:hover { background: #A87823; }
        .pg-step-card { background: #FBF7EC; border: 1px solid #E3D6B8; border-radius: 4px; padding: 30px; box-shadow: 3px 4px 0 #EAE0C6; }
        .pg-workflow-card { background: #FBF7EC; border: 1px solid #E3D6B8; border-radius: 4px; padding: "20px 16px"; text-align: center; position: relative; }
        .pg-check { color: #3F5B47; font-size: 12px; }
        @media (max-width: 860px) {
          .pg-grid-2 { grid-template-columns: 1fr !important; }
          .pg-grid-5 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.5,
        backgroundImage: "repeating-linear-gradient(115deg, transparent 0 3px, #EFE6D0 3px 4px)",
      }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #E3D6B8", background: "rgba(246,239,223,0.92)", backdropFilter: "blur(6px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#BE8A2E", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, color: "#FBF6EA", transform: "rotate(-6deg)" }}>CP</div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: "#2A2318" }}>CareerPilot</span>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Link to="/" className="pg-nav-link">Home</Link>
            <Link to="/setup" className="pg-nav-link" style={{ color: "#9C6A22" }}>Guide</Link>
            <Link to="/dashboard" className="pg-nav-link">Dashboard</Link>
            <Link to="/dashboard" className="pg-btn-primary" style={{ padding: "9px 18px", fontSize: 13 }}>Open dashboard</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "84px 24px 56px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#3F5B47",
          border: "1px dashed #A9C0AC", borderRadius: 3, padding: "6px 14px", marginBottom: 26, transform: "rotate(-1deg)",
        }}>
          A local setup, start to finish
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 600, lineHeight: 1.1, color: "#2A2318", marginBottom: 20 }}>
          Setting up <span style={{ color: "#9C6A22" }}>CareerPilot</span>
        </h1>
        <p style={{ fontSize: 15.5, color: "#6E6252", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
          Six steps to get Ollama, Serper, the LangGraph backend, and the dashboard running on your own machine.
        </p>
      </section>

      {/* STEPS */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 70px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {steps.map((s) => (
            <div key={s.num} className="pg-step-card">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                <Stamp n={s.num} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9C6A22", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Step {s.num}</div>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#2A2318", marginBottom: 4 }}>{s.title}</h2>
                  <p style={{ fontSize: 13, color: "#6E6252", marginBottom: 18 }}>{s.desc}</p>
                  {s.content}
                </div>
              </div>
            </div>
          ))}

          {/* READY CARD */}
          <div style={{ background: "#FBF7EC", border: "1px solid #E3D6B8", borderRadius: 4, padding: "44px 36px", textAlign: "center" }}>
            <IconFlag />
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, color: "#2A2318", margin: "14px 0 14px" }}>You're ready</h2>
            <p style={{ fontSize: 13.5, color: "#6E6252", lineHeight: 1.85, maxWidth: 460, margin: "0 auto 26px" }}>
              CareerPilot can now read job postings, find recruiter emails, research each company, and draft outreach ready for your review.
            </p>
            <Link to="/dashboard" className="pg-btn-primary">Open the dashboard</Link>
          </div>
        </div>
      </section>

      {/* WORKFLOW OVERVIEW */}
      <section style={{ background: "#EFE6D3", borderTop: "1px solid #E3D6B8", borderBottom: "1px solid #E3D6B8", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ marginBottom: 40, maxWidth: 560 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>Under the hood</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318", marginBottom: 10 }}>How the pieces fit together</h2>
            <p style={{ fontSize: 14, color: "#6E6252", lineHeight: 1.8 }}>A LangGraph workflow moves each listing through discovery, research, drafting, and delivery.</p>
          </div>
          <div className="pg-grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {workflowSteps.map((s, i) => (
              <div key={i} style={{ background: "#FBF7EC", border: "1px solid #E3D6B8", borderRadius: 4, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ color: "#43392A", display: "flex", justifyContent: "center", marginBottom: 10 }}><s.Icon /></div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#9C6A22", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 6 }}>{`0${i + 1}`}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#2A2318", marginBottom: 7 }}>{s.title}</div>
                <p style={{ fontSize: 11.5, color: "#6E6252", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSV WORKFLOW */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>CSV upload</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318", marginBottom: 12 }}>Already have a recruiter list?</h2>
        <p style={{ fontSize: 14, color: "#6E6252", lineHeight: 1.8, marginBottom: 24, maxWidth: 560 }}>Skip discovery entirely — upload your own CSV and go straight to drafting.</p>
        <CodeBlock code={`company_name,hr_name,email,position\nGoogle,Rahul,rahul@google.com,SWE Intern\nMicrosoft,Priya,priya@microsoft.com,SDE Intern`} />
        <div className="pg-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 22 }}>
          {[
            { label: "Supported features", items: ["Upload recruiter CSV files", "Editable custom prompts", "Company research personalization", "AI-drafted outreach emails", "Gmail sending built in", "Resume and portfolio attachments"] },
            { label: "Common uses", items: ["Placement outreach", "Internship applications", "Cold email outreach", "Recruiter networking", "Founder outreach", "Freelance pitching"] },
          ].map((col, i) => (
            <div key={i} style={{ background: "#FBF7EC", border: "1px solid #E3D6B8", borderRadius: 4, padding: "20px 22px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3F5B47", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 14 }}>{col.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "#57493A" }}>
                    <span className="pg-check">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GMAIL SMTP */}
      <section style={{ background: "#EFE6D3", borderTop: "1px solid #E3D6B8", borderBottom: "1px solid #E3D6B8", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>Email delivery</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318", marginBottom: 12 }}>Gmail SMTP setup</h2>
          <p style={{ fontSize: 14, color: "#6E6252", marginBottom: 34, lineHeight: 1.8, maxWidth: 520 }}>Emails send directly from your own Gmail account.</p>
          <div className="pg-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#2A2318", marginBottom: 14 }}>Enable an app password</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Enable Google 2-Factor Authentication", "Open Google App Passwords", "Generate a Mail app password", "Add the credentials to backend/.env"].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: "#FBF7EC", border: "1px solid #E3D6B8", borderRadius: 4, padding: "12px 16px" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1.2px dashed #B58A3D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#9C6A22", fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ fontSize: 13, color: "#57493A" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "100%" }}>
                <CodeBlock code={`EMAIL_ADDRESS=yourgmail@gmail.com\n\nEMAIL_APP_PASSWORD=your_app_password`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT STRUCTURE */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>Architecture</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318", marginBottom: 22 }}>Project structure</h2>
        <CodeBlock code={`backend/\n ├── app/\n │   ├── agents/\n │   ├── graph/\n │   ├── routes/\n │   ├── services/\n │   ├── models/\n │   └── main.py\n │\n ├── sample.html\n ├── .env\n │\nfrontend/\n ├── src/\n │   ├── pages/\n │   ├── components/\n │   └── App.jsx`} />
      </section>

      {/* TROUBLESHOOTING */}
      <section style={{ background: "#EFE6D3", borderTop: "1px solid #E3D6B8", borderBottom: "1px solid #E3D6B8", padding: "70px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9C6A22", marginBottom: 10 }}>Common issues</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318", marginBottom: 30 }}>If something's not working</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {troubleshoot.map((t, i) => (
              <div key={i} style={{ background: "#FBF7EC", border: "1px solid #E3D6B8", borderLeft: "3px solid #9C4A32", borderRadius: 4, padding: "18px 22px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#2A2318", marginBottom: 6 }}>{t.title}</div>
                <p style={{ fontSize: 13, color: "#6E6252", lineHeight: 1.75 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "90px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ background: "#FBF7EC", border: "1px solid #E3D6B8", borderRadius: 4, padding: "56px 40px" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, color: "#2A2318", marginBottom: 14 }}>Start automating outreach</h2>
          <p style={{ color: "#6E6252", fontSize: 14.5, marginBottom: 30, lineHeight: 1.8, maxWidth: 420, margin: "0 auto 30px" }}>
            Recruiter discovery, company research, and personalized drafts — all in one place, ready when you are.
          </p>
          <Link to="/dashboard" className="pg-btn-primary" style={{ fontSize: 14.5, padding: "13px 32px" }}>Open the dashboard</Link>
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