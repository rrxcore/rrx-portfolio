import { 
  Mail, 
  Terminal, 
  ExternalLink, 
  MapPin, 
  GraduationCap, 
  ArrowRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { USER_PROFILE } from '../../data/portfolioData';
import { playClickSound } from '../../utils/audio';

interface AboutViewProps {
  onOpenFile: (fileId: string) => void;
  onToggleTerminal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenFile,
  onToggleTerminal
}) => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 font-mono select-text">
      {/* Top Profile Hero Card */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-start pb-8 border-b border-white/10">
        
        {/* Left Column: Portrait & Quick Contacts */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl border bg-black/40 shadow-2xl shadow-cyan-950/30 group"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <img 
              src={USER_PROFILE.avatarUrl} 
              alt={USER_PROFILE.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Live Pulsing Beacon */}
            <div 
              className="absolute bottom-3 right-3 flex items-center justify-center h-4 w-4 rounded-full bg-emerald-400 border-2 border-black"
              title="Available for High-Impact Roles"
            >
              <span className="h-full w-full rounded-full bg-emerald-400 beacon-animate opacity-75" />
            </div>
          </div>

          <div className="text-center lg:text-left space-y-1">
            <div className="text-xs text-slate-500">~/about.md</div>
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-emerald-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 beacon-animate" />
              <span>Open to opportunities</span>
            </div>
          </div>

          {/* Social Quick-Action Buttons with Branded Colors */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
            <a 
              href={USER_PROFILE.githubUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/10"
              title="GitHub Profile"
              onClick={() => playClickSound('high')}
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a 
              href={USER_PROFILE.linkedinUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/10"
              title="LinkedIn Profile"
              onClick={() => playClickSound('high')}
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a 
              href={`mailto:${USER_PROFILE.email}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-emerald-400 hover:text-emerald-400 hover:bg-emerald-500/10"
              title="Send Direct Email"
              onClick={() => playClickSound('high')}
            >
              <Mail className="h-4 w-4" />
            </a>
            <button
              onClick={() => {
                playClickSound('med');
                onToggleTerminal();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-purple-400 hover:text-purple-400 hover:bg-purple-500/10"
              title="Launch Terminal CLI"
            >
              <Terminal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Bio & Core Focus */}
        <article className="space-y-6 text-sm leading-relaxed">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-cyan-400 font-bold text-2xl">#</span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white glow-cyan">
                {USER_PROFILE.name}
              </h1>
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-300 font-bold border border-cyan-500/40 ml-2">
                @{USER_PROFILE.handle}
              </span>
            </div>

            <div className="text-slate-400 text-xs font-semibold tracking-wide flex flex-wrap items-center gap-2 mt-2">
              <span className="text-cyan-300">{USER_PROFILE.role}</span>
              <span className="text-slate-600">•</span>
              <span className="text-purple-300">{USER_PROFILE.specialization}</span>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-amber-400" />
                {USER_PROFILE.education}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                {USER_PROFILE.location}
              </span>
            </div>
          </div>

          {/* Executive Philosophy Quote Block */}
          <blockquote 
            className="rounded-xl border-l-4 border-cyan-400 bg-cyan-950/20 p-4 text-xs italic text-slate-300 border border-white/5"
          >
            "{USER_PROFILE.quote}"
          </blockquote>

          {/* Detailed Paragraph */}
          <p className="text-slate-300 text-xs leading-6">
            {USER_PROFILE.bioParagraph}
          </p>

          {/* Current Engineering Focus */}
          <div>
            <h2 className="text-cyan-400 font-bold text-sm mb-2.5 flex items-center gap-1.5">
              <span>##</span> Current Engineering Focus
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>
                  <strong className="text-white">Low-Latency Audio Computing:</strong> Sub-15ms Windows audio engine with WASAPI exclusive circular ring buffers & lock-free SPSC queues in C++.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>
                  <strong className="text-white">Applied AI & Statutory Defense:</strong> Hybrid RAG (BM25 lexical + dense vectors via RRF) protecting Indian Traditional Knowledge for SIH 2026.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>
                  <strong className="text-white">Extreme Client Virtualization:</strong> TanStack Virtualizer in React 19 windowing 100k+ messages with zero server leak.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">+</span>
                <span>
                  <strong className="text-white">Zero-Knowledge Web Privacy:</strong> Hardware-accelerated W3C WebCrypto (AES-256-GCM + ephemeral ECDH P-256 ratchets).
                </span>
              </li>
            </ul>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                playClickSound('high');
                onOpenFile('chatlens');
              }}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-bold text-black hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                playClickSound('med');
                onOpenFile('contact');
              }}
              className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            >
              Contact Me
            </button>

            <a
              href={USER_PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-slate-300 hover:border-white/30 hover:text-white transition-colors"
              onClick={() => playClickSound('high')}
            >
              <span>GitHub</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>
        </article>
      </div>

      {/* Core Engineering Pillars Visual Vector Showcase */}
      <section className="mt-10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <span className="text-cyan-400">##</span>
            <span>Core Engineering Pillars</span>
          </h2>
          <span className="text-[11px] text-slate-500 font-mono">1200×440 Responsive Vector Architecture</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-2 overflow-hidden shadow-2xl">
          <img 
            src="/assets/pillars.svg" 
            alt="Core Engineering Pillars Architecture" 
            className="w-full h-auto rounded-xl block"
          />
        </div>
      </section>
    </div>
  );
};
