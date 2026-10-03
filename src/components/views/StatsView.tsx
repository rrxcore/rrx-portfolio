import { GITHUB_STATS } from '../../data/portfolioData';
import { Activity, Code, ExternalLink } from 'lucide-react';
import { playClickSound } from '../../utils/audio';

export const StatsView: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 font-mono select-text">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
            <Activity className="h-4 w-4" />
            <span>GITHUB ANALYTICS & REPOSITORIES</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Codebase & Language Distribution
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified production telemetry across public repositories on github.com/rrxcore.
          </p>
        </div>

        <a
          href="https://github.com/rrxcore"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
          onClick={() => playClickSound('high')}
        >
          <span>Open GitHub Profile</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Language Breakdown Card */}
      <div 
        className="mt-8 rounded-2xl border p-6 space-y-5"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="h-4 w-4 text-cyan-400" />
            <span>Verified Language Stack Distribution</span>
          </h2>
          <span className="text-[11px] text-slate-500">Filtered Production Code</span>
        </div>

        {/* Multi-Segment Color Bar */}
        <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-black/60 shadow-inner">
          {GITHUB_STATS.languages.map((l, idx) => (
            <div
              key={idx}
              style={{
                width: `${l.percentage}%`,
                backgroundColor: l.color
              }}
              title={`${l.name}: ${l.percentage}%`}
              className="h-full transition-all hover:opacity-80"
            />
          ))}
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          {GITHUB_STATS.languages.map((l, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs">
              <span 
                className="h-3 w-3 rounded-full flex-none" 
                style={{ backgroundColor: l.color }}
              />
              <div className="flex items-baseline justify-between w-full">
                <span className="text-slate-300 font-semibold">{l.name}</span>
                <span className="text-slate-400 font-mono text-[11px]">{l.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Live GitHub Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="rounded-2xl border p-4 flex flex-col items-center justify-center bg-black/40 overflow-hidden"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="w-full text-left text-xs font-bold text-slate-400 mb-2">GitHub Activity Overview</div>
          <img 
            src="https://github-readme-stats.vercel.app/api?username=rrxcore&show_icons=true&include_all_commits=true&count_private=true&bg_color=06070c&title_color=00f2fe&text_color=94a3b8&icon_color=4facfe&border_color=1e293b" 
            alt="GitHub Stats"
            className="w-full h-auto rounded-lg max-w-[420px]"
            loading="lazy"
          />
        </div>

        <div 
          className="rounded-2xl border p-4 flex flex-col items-center justify-center bg-black/40 overflow-hidden"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="w-full text-left text-xs font-bold text-slate-400 mb-2">Contribution Streak Tracker</div>
          <img 
            src="https://streak-stats.demolab.com?user=rrxcore&theme=tokyonight&background=06070c&ring=00f2fe&fire=00f2fe&currStreakNum=f8fafc&sideNums=94a3b8&currStreakLabel=38bdf8&sideLabels=64748b&border=1e293b" 
            alt="GitHub Streak"
            className="w-full h-auto rounded-lg max-w-[420px]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
