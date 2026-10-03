import { USER_PROFILE, PROJECTS_DATA } from '../../data/portfolioData';
import { Download, Printer, GraduationCap, Briefcase, Award, Code, MapPin, Mail, ExternalLink } from 'lucide-react';
import { playClickSound } from '../../utils/audio';

export const ResumeView: React.FC = () => {
  const handlePrint = () => {
    playClickSound('high');
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 font-mono select-text">
      {/* Resume Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>resume.pdf</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400 font-bold border border-emerald-500/40">
              Verified Candidate
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Curriculum Vitae • Systems Engineer & Full-Stack Architect</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print CV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Styled Printable Resume Document */}
      <div 
        className="mt-6 rounded-2xl border p-8 space-y-8 bg-black/40 text-slate-200 print:bg-white print:text-black print:p-0 print:border-none"
        style={{ borderColor: 'var(--border-color)' }}
      >
        {/* Header */}
        <div className="border-b border-white/10 pb-6 print:border-gray-300">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight print:text-black">
                {USER_PROFILE.name}
              </h2>
              <p className="text-cyan-400 font-bold text-sm mt-1 print:text-blue-700">
                {USER_PROFILE.role} & Applied AI Researcher
              </p>
            </div>

            <div className="text-xs text-slate-400 space-y-1 print:text-gray-600 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-emerald-400" />
                <span>{USER_PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3 w-3 text-cyan-400" />
                <span>{USER_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ExternalLink className="h-3 w-3 text-purple-400" />
                <span>{USER_PROFILE.githubUrl}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-1 flex items-center gap-2 print:text-black">
            <GraduationCap className="h-4 w-4" />
            <span>Education</span>
          </h3>

          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
            <div>
              <div className="font-bold text-white print:text-black">
                Bachelor of Technology in Computer Science & Engineering (AI & ML)
              </div>
              <div className="text-slate-400 print:text-gray-600">
                Sanaka Educational Trust's Group of Institutions (SETGOI)
              </div>
            </div>
            <div className="text-slate-500 font-mono text-[11px]">2024 – 2028 (Expected)</div>
          </div>
        </div>

        {/* Flagship Projects */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-1 flex items-center gap-2 print:text-black">
            <Briefcase className="h-4 w-4" />
            <span>Flagship Engineering Projects</span>
          </h3>

          <div className="space-y-4 text-xs">
            {PROJECTS_DATA.map((p) => (
              <div key={p.id} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="font-bold text-white print:text-black flex items-center gap-2">
                    <span>{p.title}</span>
                    <span className="text-slate-500 font-normal">— {p.subtitle}</span>
                  </div>
                  <span className="text-[11px] text-cyan-300 print:text-blue-700">{p.tags.slice(0, 3).join(', ')}</span>
                </div>
                <p className="text-slate-300 print:text-gray-700 leading-relaxed text-[11px]">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Competencies */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-1 flex items-center gap-2 print:text-black">
            <Code className="h-4 w-4" />
            <span>Technical Proficiencies</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-bold block">Systems & Audio:</span>
              <span className="text-slate-300 print:text-gray-700 text-[11px]">C++ 20, WASAPI Exclusive Mode, Lock-Free SPSC, SIMD, POSIX, Linux</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Applied AI & RAG:</span>
              <span className="text-slate-300 print:text-gray-700 text-[11px]">Python 3.12, Hybrid BM25 + Dense Vectors, Reciprocal Rank Fusion, TKDL</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Frontend & Virtualization:</span>
              <span className="text-slate-300 print:text-gray-700 text-[11px]">React 19, TypeScript, TanStack Virtual (60 FPS @ 100k rows), Tailwind v4</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block">Security & Cryptography:</span>
              <span className="text-slate-300 print:text-gray-700 text-[11px]">W3C WebCrypto API, AES-256-GCM, ECDH P-256, Zero-Knowledge Privacy</span>
            </div>
          </div>
        </div>

        {/* Honors & Milestones */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-1 flex items-center gap-2 print:text-black">
            <Award className="h-4 w-4" />
            <span>Honors & Hackathons</span>
          </h3>

          <div className="text-xs text-slate-300 print:text-gray-700 space-y-1">
            <div>
              <strong className="text-white print:text-black">Smart India Hackathon (SIH 2026) Innovator:</strong> Architectural lead for IP-SAKTI Sahayak statutory traditional knowledge biopiracy defense.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
