import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {

  const [data, setData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("html");
  const [search, setSearch] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [attachments, setAttachments] = useState({});
  const [subjects, setSubjects] = useState({});
  const [sendingIndex, setSendingIndex] = useState(null);
  const [customPrompt, setCustomPrompt] = useState(`You are an AI outreach assistant.

Generate a highly professional and personalized outreach email.

The email should:
- sound human-written
- be concise and impactful
- personalize according to company background
- mention the role naturally
- avoid robotic wording
- maintain professional tone`);

  // =========================
  // COPY
  // =========================
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // =========================
  // ACCORDION
  // =========================
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // =========================
  // SEND EMAIL
  // =========================
  const sendMail = async (item, index) => {
    try {
      setSendingIndex(index);
      const formData = new FormData();
      formData.append("receiver_email", item.company_email);
      formData.append("subject", subjects[index] || "Placement Opportunity from IIIT Bhubaneswar");
      formData.append("body", item.generated_email);
      if (attachments[index]) {
        formData.append("attachment", attachments[index]);
      }
      const response = await fetch("http://localhost:8000/send-email", { method: "POST", body: formData });
      const result = await response.json();
      if (result.success) {
        alert("Email Sent Successfully");
      } else {
        alert("Failed To Send Email");
      }
    } catch (err) {
      console.log(err);
      alert("Error Sending Email");
    } finally {
      setSendingIndex(null);
    }
  };

  // =========================
  // HTML WORKFLOW
  // =========================
  const startGeneration = async () => {
    try {
      setLoading(true);
      setLogs([]);
      setData([]);
      fetch("http://localhost:8000/run-placement-agent", { method: "POST" });
      const interval = setInterval(async () => {
        try {
          const logsRes = await fetch("http://localhost:8000/logs");
          const logsData = await logsRes.json();
          setLogs([...logsData.logs]);
          if (logsData.logs.includes("ALL TASKS COMPLETED")) {
            const resultRes = await fetch("http://localhost:8000/results");
            const resultData = await resultRes.json();
            setData(resultData.companies);
            setLoading(false);
            clearInterval(interval);
          }
        } catch (err) {
          console.log(err);
        }
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // =========================
  // CSV WORKFLOW
  // =========================
  const uploadCSV = async () => {
    if (!csvFile) {
      alert("Upload CSV First");
      return;
    }
    try {
      setLoading(true);
      setLogs([]);
      setData([]);
      setLogs([
        "Uploading CSV...",
        "Reading Recruiter Data...",
        "Researching Companies...",
        "Generating Personalized Emails..."
      ]);
      const formData = new FormData();
      formData.append("file", csvFile);
      formData.append("custom_prompt", customPrompt);
      const response = await fetch("http://localhost:8000/upload-csv", { method: "POST", body: formData });
      const result = await response.json();
      setData(result.companies);
      setLogs([
        "CSV Uploaded Successfully",
        "Company Research Completed",
        "Emails Generated Successfully"
      ]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredData = data.filter(
    (item) =>
      item.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.job_title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F6EFDF", color: "#2A2318", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .paper-grain { background-image: repeating-linear-gradient(115deg, transparent 0 3px, #EFE6D0 3px 4px); }
        .glow-dot { width: 7px; height: 7px; border-radius: 50%; background: #3F5B47; display: inline-block; animation: gdpulse 2.2s infinite; }
        @keyframes gdpulse { 0%,100%{opacity:1}50%{opacity:.45} }
        .tab-btn { padding: 10px 22px; border-radius: 4px; font-size: 13.5px; font-weight: 600; cursor: pointer; border: 1px solid #E3D6B8; transition: all 0.15s ease; font-family: inherit; }
        .tab-active { background: #BE8A2E; color: #FBF6EA; border-color: #BE8A2E; }
        .tab-inactive { background: #FBF7EC; color: #8A7B5E; }
        .tab-inactive:hover { border-color: #C9A85D; color: #57493A; }
        .card { background: #FBF7EC; border: 1px solid #E3D6B8; border-radius: 4px; box-shadow: 3px 4px 0 #EAE0C6; }
        .input-paper { width: 100%; background: #FDFAF2; border: 1px solid #DCCEA9; border-radius: 4px; padding: 12px 16px; color: #2A2318; font-size: 13px; font-family: inherit; outline: none; transition: border-color 0.15s ease; }
        .input-paper:focus { border-color: #BE8A2E; }
        .input-paper::placeholder { color: #A8996F; }
        .textarea-paper { width: 100%; background: #FDFAF2; border: 1px solid #DCCEA9; border-radius: 4px; padding: 14px 16px; color: #2A2318; font-size: 13px; font-family: 'IBM Plex Mono', monospace; outline: none; resize: none; transition: border-color 0.15s ease; line-height: 1.7; }
        .textarea-paper:focus { border-color: #BE8A2E; }
        .file-input { width: 100%; background: #FDFAF2; border: 1px solid #DCCEA9; border-radius: 4px; padding: 12px 16px; color: #8A7B5E; font-size: 13px; font-family: inherit; cursor: pointer; }
        .file-input::-webkit-file-upload-button { background: #EFEBDE; border: 1px solid #C9BA96; color: #3F5B47; padding: 6px 14px; border-radius: 3px; font-size: 12px; font-weight: 600; cursor: pointer; margin-right: 12px; }
        .btn { padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: all 0.15s ease; }
        .btn-primary { background: #BE8A2E; color: #FBF6EA; }
        .btn-primary:hover { background: #A87823; }
        .btn-primary:disabled { background: #DED2B4; color: #A8996F; cursor: not-allowed; }
        .btn-forest { background: #3F5B47; color: #EFF5EF; }
        .btn-forest:hover { background: #34492E; }
        .btn-forest:disabled { background: #DED2B4; color: #A8996F; cursor: not-allowed; }
        .btn-ghost { background: #FBF7EC; color: #57493A; border: 1px solid #E3D6B8; }
        .btn-ghost:hover { border-color: #C9A85D; color: #2A2318; }
        .btn-outline-forest { background: #F1F5EE; color: #3F5B47; border: 1px solid #C7D6C9; }
        .btn-outline-forest:hover { background: #E7F0E5; }
        .btn-brick { background: #F5E6DE; color: #9C4A32; border: 1px solid #E3C3B2; }
        .btn-brick:hover { background: #EFD8CB; }
        .btn-brick:disabled { background: #DED2B4; color: #A8996F; cursor: not-allowed; }
        .result-card { background: #FBF7EC; border: 1px solid #E3D6B8; border-radius: 4px; overflow: hidden; transition: border-color 0.15s ease; }
        .result-card:hover { border-color: #C9A85D; }
        .accordion-btn { width: 100%; padding: 22px 26px; background: transparent; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.15s ease; font-family: inherit; }
        .accordion-btn:hover { background: #F3EBD9; }
        .log-entry { background: #FDFAF2; border: 1px solid #E3D6B8; border-radius: 3px; padding: 10px 14px; font-size: 12.5px; color: #6E6252; font-family: 'IBM Plex Mono', monospace; }
        .log-entry.done { color: #3F5B47; border-color: #C7D6C9; background: #F1F5EE; }
        .stat-box { background: #FDFAF2; border: 1px solid #E3D6B8; border-radius: 4px; padding: 16px 18px; }
      `}</style>

      <div className="paper-grain" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.5 }} />

      <Navbar />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start", marginBottom: 44 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12, color: "#3F5B47", border: "1px dashed #A9C0AC", borderRadius: 3, padding: "6px 14px",
              marginBottom: 22, transform: "rotate(-1deg)",
            }}>
              <span className="glow-dot" /> Multi-agent workflow
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 600, letterSpacing: "-0.01em", color: "#2A2318", lineHeight: 1.1, marginBottom: 14 }}>CareerPilot</h1>
            <p style={{ fontSize: 14.5, color: "#6E6252", lineHeight: 1.8, maxWidth: 520 }}>
              Generate personalized recruiter outreach emails using LangGraph, Ollama, Serper, and a bit of company research along the way.
            </p>
          </div>

          {/* STATS */}
          <div className="card" style={{ padding: 26, width: 340, flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9C6A22", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>Workflow stats</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="stat-box">
                <div style={{ fontSize: 24, fontWeight: 600, color: "#2A2318", fontFamily: "'Fraunces', serif" }}>{data.length}</div>
                <div style={{ fontSize: 11, color: "#8A7B5E", marginTop: 4 }}>Emails generated</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize: 17, fontWeight: 600, color: loading ? "#3F5B47" : "#8A7B5E", fontFamily: "'IBM Plex Mono', monospace" }}>{loading ? "Running" : "Idle"}</div>
                <div style={{ fontSize: 11, color: "#8A7B5E", marginTop: 4 }}>Workflow status</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize: 17, fontWeight: 600, color: "#9C4A32", fontFamily: "'IBM Plex Mono', monospace" }}>LangGraph</div>
                <div style={{ fontSize: 11, color: "#8A7B5E", marginTop: 4 }}>Agent framework</div>
              </div>
              <div className="stat-box">
                <div style={{ fontSize: 17, fontWeight: 600, color: "#3F5B47", fontFamily: "'IBM Plex Mono', monospace" }}>CSV</div>
                <div style={{ fontSize: 11, color: "#8A7B5E", marginTop: 4 }}>Outreach workflow</div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          <button onClick={() => setActiveTab("html")} className={`tab-btn ${activeTab === "html" ? "tab-active" : "tab-inactive"}`}>HTML workflow</button>
          <button onClick={() => setActiveTab("csv")} className={`tab-btn ${activeTab === "csv" ? "tab-active" : "tab-inactive"}`}>CSV workflow</button>
        </div>

        {/* HTML WORKFLOW */}
        {activeTab === "html" && (
          <div className="card" style={{ padding: "26px 30px", marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#2A2318", marginBottom: 8 }}>Generate from job portal HTML</h2>
              <p style={{ fontSize: 13, color: "#6E6252", lineHeight: 1.8, maxWidth: 480 }}>
                Paste job portal HTML inside <code style={{ background: "#EFE6D3", color: "#9C6A22", padding: "1px 7px", borderRadius: 3, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5 }}>backend/sample.html</code> and generate recruiter outreach emails automatically.
              </p>
            </div>
            <button onClick={startGeneration} disabled={loading} className={`btn ${loading ? "btn-ghost" : "btn-primary"}`} style={{ padding: "12px 26px", fontSize: 14 }}>
              {loading ? "Running..." : "Generate emails →"}
            </button>
          </div>
        )}

        {/* CSV WORKFLOW */}
        {activeTab === "csv" && (
          <div className="card" style={{ padding: "30px", marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#2A2318", marginBottom: 8 }}>AI outreach generator</h2>
            <p style={{ fontSize: 13, color: "#6E6252", lineHeight: 1.8, marginBottom: 26, maxWidth: 520 }}>
              Upload a recruiter or company CSV and generate personalized outreach emails using a customizable prompt.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#57493A", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 10 }}>Upload CSV file</label>
              <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} className="file-input" />
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#57493A", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 10 }}>Custom prompt</label>
              <textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} className="textarea-paper" style={{ height: 280 }} />
            </div>

            <button onClick={uploadCSV} disabled={loading} className={`btn ${loading ? "btn-ghost" : "btn-forest"}`} style={{ padding: "12px 26px", fontSize: 14 }}>
              {loading ? "Generating..." : "Generate from CSV →"}
            </button>
          </div>
        )}

        {/* LOGS */}
        <div className="card" style={{ padding: "22px 26px", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#2A2318" }}>Live workflow logs</div>
            {loading && <div className="glow-dot" />}
          </div>
          <div style={{ height: 250, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {logs.length === 0 && (
              <div style={{ fontSize: 12.5, color: "#A8996F", fontFamily: "'IBM Plex Mono', monospace", padding: "10px 0" }}>No logs yet.</div>
            )}
            {logs.map((log, index) => (
              <div key={index} className={`log-entry ${log.includes("Completed") || log.includes("COMPLETED") || log.includes("Successfully") ? "done" : ""}`}>
                › {log}
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH */}
        <div style={{ marginBottom: 22 }}>
          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-paper"
            style={{ padding: "13px 18px", fontSize: 14 }}
          />
        </div>

        {/* RESULTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredData.map((item, index) => (
            <div key={index} className="result-card">

              {/* ACCORDION HEADER */}
              <button onClick={() => toggleAccordion(index)} className="accordion-btn">
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%", border: "1.4px dashed #B58A3D",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 600,
                    color: "#9C6A22", fontFamily: "'Fraunces', serif", flexShrink: 0, transform: "rotate(-4deg)",
                  }}>
                    {item.company_name?.charAt(0)}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 17, fontWeight: 600, color: "#2A2318", fontFamily: "'Fraunces', serif" }}>{item.company_name}</div>
                    <div style={{ fontSize: 13, color: "#8A7B5E", marginTop: 3 }}>{item.job_title}</div>

                    {/* RECRUITER EMAIL inline */}
                    <div style={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={item.company_email}
                        onChange={(e) => {
                          const updated = [...data];
                          updated[index].company_email = e.target.value;
                          setData(updated);
                        }}
                        className="input-paper"
                        style={{ width: 280, fontSize: 12, padding: "7px 12px" }}
                        placeholder="Recruiter email..."
                      />
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 20, color: "#C9BA96", fontWeight: 400 }}>{openIndex === index ? "−" : "+"}</div>
              </button>

              {/* ACCORDION BODY */}
              {openIndex === index && (
                <div style={{ borderTop: "1px solid #E3D6B8", background: "#F3EBD9", padding: "22px 26px" }}>

                  {/* SUBJECT */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8A7B5E", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8 }}>Email subject</label>
                    <input
                      type="text"
                      value={subjects[index] || "Placement Opportunity from IIIT Bhubaneswar"}
                      onChange={(e) => setSubjects({ ...subjects, [index]: e.target.value })}
                      className="input-paper"
                    />
                  </div>

                  {/* EMAIL CONTENT */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8A7B5E", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8 }}>Email content</label>
                    <textarea
                      value={item.generated_email}
                      onChange={(e) => {
                        const updated = [...data];
                        updated[index].generated_email = e.target.value;
                        setData(updated);
                      }}
                      className="textarea-paper"
                      style={{ height: 300 }}
                    />
                  </div>

                  {/* ATTACHMENT */}
                  <div style={{ marginBottom: 22 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#8A7B5E", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8 }}>Attach resume / portfolio</label>
                    <input
                      type="file"
                      onChange={(e) => setAttachments({ ...attachments, [index]: e.target.files[0] })}
                      className="file-input"
                    />
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <button onClick={() => copyText(item.company_email)} className="btn btn-ghost">Copy email</button>
                    <button onClick={() => copyText(item.generated_email)} className="btn btn-outline-forest">Copy content</button>
                    <a
                      href={`mailto:${item.company_email}?subject=${encodeURIComponent(subjects[index] || "Placement Opportunity from IIIT Bhubaneswar")}&body=${encodeURIComponent(item.generated_email)}`}
                      className="btn btn-forest"
                      style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
                    >
                      Open mail app
                    </a>
                    <button
                      onClick={() => sendMail(item, index)}
                      disabled={sendingIndex === index}
                      className={`btn ${sendingIndex === index ? "btn-ghost" : "btn-brick"}`}
                    >
                      {sendingIndex === index ? "Sending..." : "Send email"}
                    </button>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}