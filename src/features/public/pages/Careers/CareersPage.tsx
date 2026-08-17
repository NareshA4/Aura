import React from "react";
import { Link } from "wouter";
import { useJobs } from "../../hooks/usePublicContent";
import { ArrowUpRight, Loader2, AlertCircle, MapPin, Clock } from "lucide-react";

export const CareersPage: React.FC = () => {
  const { data: jobs, loading, error } = useJobs();

  return (
    <div className="bg-background min-h-screen">
      {/* Immersive Careers Hero Header */}
      <section className="subpage-immersive-hero">
        <div
          className="subpage-hero-art"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85)`,
          }}
        />
        <div className="subpage-hero-overlay" />
        <div className="subpage-hero-grid" />

        <div className="subpage-hero-container">
          <div style={{ maxWidth: "880px" }}>
            <div className="subpage-hero-eyebrow">
              <span className="subpage-cat-tag">ENGINEERING CAREERS / 05</span>
              <span className="subpage-signal-divider" />
              <span className="subpage-code-tag">OPEN ROLES</span>
            </div>

            <h1 className="subpage-hero-title">
              Build What <em>Comes Next.</em>
            </h1>

            <p className="subpage-hero-desc">
              Join an elite collective of systems architects, AI engineers, and product strategists designing mission-critical technology for the world's leading organizations.
            </p>

            {/* Engineering Culture Pillars */}
            <div className="subpage-tech-row">
              {["Autonomous Teams", "Cutting-Edge Tech Stack", "Global Distributed Work", "Continuous Learning", "Zero Bureaucracy"].map((item) => (
                <span key={item} className="subpage-tech-chip">
                  {item}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="subpage-hero-ctas">
              <a href="#open-roles" className="signal-button">
                VIEW OPEN ROLES <ArrowUpRight size={15} />
              </a>
              <Link href="/about" className="outline-button">
                OUR ENGINEERING CULTURE
              </Link>
            </div>

            {/* Telemetry Metrics */}
            <div className="subpage-meta-telemetry">
              <div className="subpage-meta-item">
                <span className="subpage-meta-value">{jobs?.length || 8}</span>
                <span className="subpage-meta-label">Active Openings</span>
              </div>
              <div className="subpage-meta-item">
                <span className="subpage-meta-value">100%</span>
                <span className="subpage-meta-label">Remote & Hybrid</span>
              </div>
              <div className="subpage-meta-item">
                <span className="subpage-meta-value">Top 1%</span>
                <span className="subpage-meta-label">Engineering Talent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section id="open-roles" className="section-padding bg-[#050811]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#63f5e8] font-mono text-xs tracking-widest uppercase block mb-2">OPPORTUNITIES</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Open Positions</h2>
          </div>
          <p className="text-[#8da5ae] text-sm md:text-base max-w-md mt-4 md:mt-0">
            Find the right engineering challenge for your expertise and help shape the next decade of technology.
          </p>
        </div>

        {loading ? (
          <div className="min-h-[20vh] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#63f5e8]" />
          </div>
        ) : error ? (
          <div className="p-8 border border-destructive/20 bg-destructive/10 text-destructive rounded-md flex items-center gap-3">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to load open positions. Please try again later.</p>
          </div>
        ) : !jobs || jobs.length === 0 ? (
          <div className="p-12 border border-[rgba(99,245,232,0.2)] bg-[#0a111c] rounded-md text-center">
            <p className="text-[#8da5ae]">No open positions currently available. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Link key={job.job_id} href={`/careers/${job.job_id}`} className="block group">
                <div className="p-6 md:p-8 border border-[rgba(140,174,187,0.2)] bg-[#0a111c] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#63f5e8] hover:bg-[#0d1624] transition-all">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-[#63f5e8] bg-[rgba(99,245,232,0.1)] border border-[rgba(99,245,232,0.2)] px-2.5 py-1 rounded">{job.department}</span>
                      {job.experience && <span className="text-xs font-mono text-[#8da5ae] border border-[rgba(140,174,187,0.3)] px-2.5 py-1 rounded">{job.experience}</span>}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#63f5e8] transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#8da5ae]">
                      <span className="flex items-center"><MapPin className="mr-1.5 h-4 w-4 text-[#63f5e8]" /> {job.location}</span>
                      <span className="flex items-center"><Clock className="mr-1.5 h-4 w-4 text-[#63f5e8]" /> {job.employmentType}</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center justify-center h-11 w-11 rounded-full bg-[rgba(99,245,232,0.06)] border border-[rgba(99,245,232,0.2)] group-hover:bg-[#63f5e8] group-hover:text-[#041014] text-[#63f5e8] transition-all">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CareersPage;
