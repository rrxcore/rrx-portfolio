import { ACHIEVEMENTS_DATA } from '../../data/portfolioData';
import { Trophy, CheckCircle } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 font-mono select-text">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs mb-1">
          <Trophy className="h-4 w-4" />
          <span>NATIONAL MILESTONES & HONORS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Smart India Hackathon 2026 & Key Achievements
        </h1>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          National engineering hackathons, high-concurrency benchmarks, and hardware-accelerated security architectures.
        </p>
      </div>

      {/* Featured SIH 2026 Spotlight Banner */}
      <div 
        className="mt-8 rounded-2xl border p-6 relative overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(6, 7, 12, 0.8) 100%)',
          borderColor: 'rgba(245, 158, 11, 0.4)'
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400 animate-ping" />
            <span className="font-extrabold text-amber-400 text-sm tracking-wide">
              SMART INDIA HACKATHON (SIH 2026) — INNOVATOR
            </span>
          </div>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/40">
            National Level Finalist
          </span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          IP-SAKTI Sahayak: AI-Powered Statutory Intellectual Property Defense
        </h2>

        <p className="text-xs text-slate-300 leading-6 mb-4">
          Engineered an automated statutory defense pipeline safeguarding India's Traditional Knowledge Digital Library (TKDL) and biological resources under the Biological Diversity Act (BDA 2002/2023) against biopiracy and invalid foreign patent exploitation.
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-amber-500/20 text-xs">
          <div className="space-y-1">
            <div className="text-amber-400 font-bold">Patent Defense Engine</div>
            <div className="text-[11px] text-slate-400">Codified Sections 3(p), 3(e), and 3(d) of Indian Patents Act.</div>
          </div>
          <div className="space-y-1">
            <div className="text-amber-400 font-bold">Dual-Stream RAG</div>
            <div className="text-[11px] text-slate-400">BM25 lexical + dense vectors fused via Reciprocal Rank Fusion.</div>
          </div>
          <div className="space-y-1">
            <div className="text-amber-400 font-bold">Statutory Auto-Filing</div>
            <div className="text-[11px] text-slate-400">Auto-generates NBA Form III statutory clearance compliance.</div>
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="mt-10 space-y-6">
        <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <span className="text-cyan-400">##</span>
          <span>Technical Honors & Benchmarks</span>
        </h2>

        <div className="space-y-4">
          {ACHIEVEMENTS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border p-5 transition-all hover:border-cyan-500/40"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>{item.title}</span>
                </h3>
                <span className="rounded bg-black/40 px-2.5 py-0.5 text-[11px] font-mono text-cyan-300 border border-white/10">
                  {item.badge} • {item.date}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {item.description}
              </p>

              <div className="rounded-lg bg-black/40 p-2.5 text-[11px] text-slate-400 border border-white/5">
                <span className="text-cyan-400 font-bold">Architecture Highlight: </span>
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
