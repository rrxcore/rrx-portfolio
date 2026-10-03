import { useState } from 'react';
import { SKILLS_CATEGORIES } from '../../data/portfolioData';
import { Code2, LayoutGrid } from 'lucide-react';
import { playClickSound } from '../../utils/audio';

export const SkillsView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'matrix' | 'json'>('matrix');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Systems', 'AI & ML', 'Frontend', 'Crypto'];

  const getFilteredCategories = () => {
    if (activeCategory === 'All') return SKILLS_CATEGORIES;
    if (activeCategory === 'Systems') return [SKILLS_CATEGORIES[0]];
    if (activeCategory === 'AI & ML') return [SKILLS_CATEGORIES[1]];
    if (activeCategory === 'Frontend') return [SKILLS_CATEGORIES[2]];
    if (activeCategory === 'Crypto') return [SKILLS_CATEGORIES[3]];
    return SKILLS_CATEGORIES;
  };

  const jsonRepresentation = {
    engineer: "Ritesh Rana",
    handle: "rrxcore",
    architecture_stack: {
      systems_and_low_latency: {
        primary: "C++ (20/23)",
        audio_subsystem: "Windows Core Audio (WASAPI Exclusive)",
        concurrency: "Lock-Free SPSC Ring Buffers",
        scheduling: "MMCSS High-Priority Multimedia Threading"
      },
      applied_ai_and_rag: {
        runtime: "Python 3.12",
        retrieval: "Hybrid BM25 + Dense Semantic Embeddings",
        fusion_ranking: "Reciprocal Rank Fusion (RRF)",
        statutory_compliance: "Indian Patents Act Sec 3(p)/3(e) & TKDL"
      },
      web_and_virtualization: {
        frontend: "React 19 & Next.js",
        virtualization: "TanStack Virtual (60 FPS @ 100k+ rows)",
        type_safety: "TypeScript Strict Mode",
        styling: "Tailwind CSS v4 (Cyberpunk Glassmorphism)"
      },
      cryptography_and_privacy: {
        primitives: "W3C WebCrypto API (Hardware Accelerated)",
        symmetric_cipher: "AES-256-GCM (96-bit Nonce)",
        key_exchange: "ECDH (NIST P-256 Curve)",
        trust_model: "Zero-Knowledge Server Egress"
      }
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 font-mono select-text">
      {/* Top Toggle Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">{'{}'}</span>
            <span>Technical Skills Matrix</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Engineered across low-level C++, applied AI RAG pipelines, and extreme client virtualization.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center rounded-lg border bg-black/40 p-1 text-xs" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => {
              playClickSound('med');
              setViewMode('matrix');
            }}
            className={`flex items-center gap-1.5 rounded px-3 py-1 font-semibold transition-colors ${
              viewMode === 'matrix' 
                ? 'bg-amber-500 text-black shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Visual Matrix</span>
          </button>
          <button
            onClick={() => {
              playClickSound('med');
              setViewMode('json');
            }}
            className={`flex items-center gap-1.5 rounded px-3 py-1 font-semibold transition-colors ${
              viewMode === 'json' 
                ? 'bg-amber-500 text-black shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Raw JSON</span>
          </button>
        </div>
      </div>

      {/* Visual Matrix Mode */}
      {viewMode === 'matrix' && (
        <div className="mt-6 space-y-6">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound('high');
                  setActiveCategory(cat);
                }}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === cat 
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300' 
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFilteredCategories().map((cat, idx) => (
              <div
                key={idx}
                className="rounded-xl border p-5 space-y-4"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <span style={{ color: cat.color }}>●</span>
                    <span>{cat.title}</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5">
                    Production Grade
                  </span>
                </div>

                <div className="space-y-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-200 font-semibold">{skill.name}</span>
                        <span className="text-slate-400 text-[11px] font-mono">{skill.level}%</span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 w-full rounded-full bg-black/60 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: cat.color
                          }}
                        />
                      </div>

                      <div className="text-[10px] text-slate-500 pt-0.5">
                        {skill.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw JSON Editor View Mode */}
      {viewMode === 'json' && (
        <div 
          className="mt-6 rounded-xl border bg-black/60 p-4 overflow-x-auto text-xs font-mono leading-relaxed"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <pre className="text-slate-300">
            <code>
              {JSON.stringify(jsonRepresentation, null, 2)
                .split('\n')
                .map((line, idx) => {
                  const lineNum = (idx + 1).toString().padStart(2, '0');
                  let colorClass = 'text-slate-300';
                  if (line.includes(': {') || line.includes(': [')) colorClass = 'text-cyan-400 font-bold';
                  else if (line.includes(': "')) colorClass = 'text-emerald-300';
                  
                  return (
                    <div key={idx} className="flex gap-4 hover:bg-white/5 px-2 rounded">
                      <span className="text-slate-600 select-none w-6 text-right">{lineNum}</span>
                      <span className={colorClass}>{line}</span>
                    </div>
                  );
                })}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};
