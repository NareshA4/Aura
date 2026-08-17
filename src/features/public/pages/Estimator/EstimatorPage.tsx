import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

const ESTIMATOR_STEPS = [
  {
    label: "STEP 01 / PROJECT SCOPE",
    question: "What type of system are you building?",
    options: [
      "Web Application",
      "Mobile App",
      "Enterprise Software / ERP",
      "CRM Platform",
      "AI / ML Platform",
      "Cloud Migration",
      "SaaS Product",
      "Digital Transformation"
    ],
  },
  {
    label: "STEP 02 / PLATFORM & SCALE",
    question: "How will the platform be deployed?",
    options: [
      "Multi-tenant SaaS",
      "Internal Enterprise Tool",
      "Consumer-Facing Platform",
      "Cross-Platform Mobile",
      "Hybrid Cloud",
      "On-Premise Enterprise"
    ],
  },
  {
    label: "STEP 03 / USER SCALE & INTEGRATIONS",
    question: "What is your target scale & integration complexity?",
    options: [
      "< 1,000 Users",
      "10,000+ Users",
      "100,000+ Users",
      "No 3rd-Party Integrations",
      "Standard REST APIs",
      "Complex Multi-System Integrations"
    ],
  },
  {
    label: "STEP 04 / SECURITY & COMPLIANCE",
    question: "What governance & compliance frameworks apply?",
    options: [
      "Standard Security",
      "SOC 2 Compliance",
      "HIPAA Compliance",
      "GDPR Compliance",
      "Government / Public Sector",
      "Multi-Framework Enterprise Compliance"
    ],
  },
];

const getBudgetRange = (selections: number[]): string => {
  const score = selections.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
  if (score <= 4) return "$15,000 – $45,000";
  if (score <= 9) return "$45,000 – $120,000";
  if (score <= 14) return "$120,000 – $350,000";
  return "$350,000+";
};

export const EstimatorPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<(number | null)[]>([null, null, null, null]);
  const [done, setDone] = useState(false);

  const select = (optIdx: number) => {
    const updated = [...selections];
    updated[step] = optIdx;
    setSelections(updated);
  };

  const canAdvance = selections[step] !== null;

  const advance = () => {
    if (step < ESTIMATOR_STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const reset = () => {
    setStep(0);
    setSelections([null, null, null, null]);
    setDone(false);
  };

  return (
    <div style={{ background: "#050811", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 max(4vw, 1.5rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem", textAlign: "left" }}>
          <p style={{ fontFamily: "'IBM Plex Mono'", fontSize: ".62rem", letterSpacing: ".18em", color: "#63f5e8", marginBottom: "1.5rem" }}>
            PROJECT SCOPING / ESTIMATION ENGINE
          </p>
          <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, letterSpacing: "-.065em", lineHeight: .9, margin: "0 0 1.5rem", color: "#eef4f3" }}>
            Estimate Your<br /><em style={{ fontStyle: "normal", color: "#b7c4c5" }}>Engineering Effort.</em>
          </h1>
          <p style={{ color: "#8da5ae", lineHeight: 1.7, maxWidth: "560px", fontSize: ".95rem" }}>
            Configure your technical scope, scale, and compliance parameters to receive an instant preliminary budget projection.
          </p>
        </div>

        {/* Wizard Container */}
        <div style={{ border: "1px solid rgba(99,245,232,.15)", background: "#060c18" }}>
          {!done ? (
            <>
              {ESTIMATOR_STEPS.map((s, i) => (
                <div key={i} className={`estimator-step ${i === step ? "active" : ""}`} style={{ display: i === step ? "block" : "none", padding: "2.5rem" }}>
                  <p className="estimator-step-label" style={{ fontFamily: "'IBM Plex Mono'", fontSize: ".62rem", letterSpacing: ".15em", color: "#63f5e8", marginBottom: "1rem" }}>
                    {s.label}
                  </p>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#eef4f3", letterSpacing: "-.03em", margin: "0 0 2rem" }}>
                    {s.question}
                  </h3>
                  <div className="estimator-options">
                    {s.options.map((opt, j) => (
                      <button
                        key={j}
                        className={`estimator-opt ${selections[i] === j ? "selected" : ""}`}
                        onClick={() => select(j)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Navigation */}
              <div className="estimator-nav" style={{ padding: "1.5rem 2.5rem", borderTop: "1px solid rgba(99,245,232,.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="estimator-progress" style={{ display: "flex", gap: ".5rem" }}>
                  {ESTIMATOR_STEPS.map((_, i) => (
                    <span key={i} className={`estimator-dot ${i <= step ? "active" : ""}`} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  {step > 0 && (
                    <button className="estimator-back" onClick={() => setStep(step - 1)}>
                      ← BACK
                    </button>
                  )}
                  <button
                    className="signal-button"
                    style={{ opacity: canAdvance ? 1 : 0.4, cursor: canAdvance ? "pointer" : "default" }}
                    onClick={() => canAdvance && advance()}
                  >
                    {step === ESTIMATOR_STEPS.length - 1 ? "GET ESTIMATE" : "NEXT →"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="estimator-result" style={{ padding: "4rem 2.5rem", textAlign: "center" }}>
              <p className="estimator-result-label" style={{ fontFamily: "'IBM Plex Mono'", fontSize: ".62rem", letterSpacing: ".18em", color: "#63f5e8", marginBottom: ".8rem" }}>
                PRELIMINARY BUDGET PROJECTION
              </p>
              <h3 style={{ color: "#eef4f3", fontWeight: 500, fontSize: "1.8rem", margin: "0 0 1rem" }}>
                Estimated Engineering Effort
              </h3>
              <div className="estimator-result-range" style={{ fontSize: "3.5rem", fontWeight: 700, color: "#63f5e8", letterSpacing: "-.05em", margin: "1.5rem 0" }}>
                {getBudgetRange(selections as number[])}
              </div>
              <p style={{ color: "#8da5ae", fontSize: ".9rem" }}>
                Indicative budget range based on selected platform scope and architectural scale.
              </p>
              
              <div className="estimator-disclaimer" style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "left", padding: "1.2rem 1.5rem", border: "1px solid rgba(99,245,232,.12)", background: "rgba(99,245,232,.02)", color: "#5e7079", fontSize: ".8rem", lineHeight: 1.6 }}>
                <strong style={{ color: "#eef4f3" }}>Legal Disclaimer: </strong>
                This estimate represents a preliminary requirement sizing estimate and does not constitute a binding contract, quotation, or financial commitment. Final pricing and timelines are determined through formal architecture discovery and official statement of work (SOW) issuance by Aurexion Technologies.
              </div>

              <div className="estimator-result-ctas" style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <Link href="/rfp" className="signal-button inline-flex items-center gap-2">
                  SUBMIT FORMAL RFP <ArrowUpRight size={16} />
                </Link>
                <button className="text-button" onClick={reset}>
                  RECALCULATE ESTIMATE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimatorPage;
