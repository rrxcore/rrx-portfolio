import { useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ChatLensDemo } from './interactive/ChatLensDemo';
import { IpSaktiDemo } from './interactive/IpSaktiDemo';
import { CipherChatDemo } from './interactive/CipherChatDemo';
import { AudioDspDemo } from './interactive/AudioDspDemo';
import { Cpu, ShieldCheck, Lock, Terminal, Activity, Layers } from 'lucide-react';
import { GithubIcon } from '../icons/BrandIcons';
import { playClickSound } from '../../utils/audio';

interface ProjectsViewProps {
  initialProjectId?: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  initialProjectId = 'chatlens'
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialProjectId);

  const activeProject = PROJECTS_DATA.find(p => p.id === selectedId) || PROJECTS_DATA[0];

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'chatlens': return <Cpu className="h-4 w-4 text-emerald-400" />;
      case 'ipsakti': return <ShieldCheck className="h-4 w-4 text-amber-400" />;
      case 'cipherchat': return <Lock className="h-4 w-4 text-purple-400" />;
      case 'voicechanger': return <Terminal className="h-4 w-4 text-pink-400" />;
      default: return <Layers className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 font-mono select-text">
      {/* Project Switcher Navigation */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/10">
        {PROJECTS_DATA.map((proj) => {
          const isSelected = proj.id === selectedId;
          return (
            <button
              key={proj.id}
              onClick={() => {
                playClickSound('high');
                setSelectedId(proj.id);
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-lg shadow-cyan-500/10'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {getProjectIcon(proj.id)}
              <span>{proj.title}</span>
              <span className="text-[10px] opacity-60">.{proj.fileName.split('.')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Project Dossier */}
      <div className="mt-8 space-y-8">
        {/* Header Block */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-1">
                <span>PROJECT FILE:</span>
                <span>projects/{activeProject.fileName}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {activeProject.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                onClick={() => playClickSound('high')}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>View Repository</span>
              </a>
            </div>
          </div>

          <p className="text-base text-slate-300">
            {activeProject.subtitle}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {activeProject.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activeProject.metrics.map((m, idx) => (
            <div 
              key={idx}
              className="rounded-xl border p-3"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{m.label}</div>
              <div className="text-sm font-extrabold text-cyan-300 mt-1 font-mono">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Interactive In-Editor Live Simulation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              <span>Interactive Live Engine Demo</span>
            </h2>
            <span className="text-[10px] text-slate-500">Live Client-Side Execution</span>
          </div>

          {selectedId === 'chatlens' && <ChatLensDemo />}
          {selectedId === 'ipsakti' && <IpSaktiDemo />}
          {selectedId === 'cipherchat' && <CipherChatDemo />}
          {selectedId === 'voicechanger' && <AudioDspDemo />}
        </div>

        {/* Architecture Diagram (If available) */}
        {activeProject.archSvg && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Motion Graphics Architecture Pipeline</span>
              </h2>
              <span className="text-[10px] text-slate-500">Self-Drawing Vector Pipeline</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/50 p-2 overflow-hidden shadow-2xl">
              <img 
                src={activeProject.archSvg} 
                alt={`${activeProject.title} Architecture Pipeline`}
                className="w-full h-auto rounded-xl block"
              />
            </div>
          </div>
        )}

        {/* Engineering Highlights */}
        <div 
          className="rounded-xl border p-5 space-y-3"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)'
          }}
        >
          <h3 className="text-sm font-bold text-white">Engineering Specs & Architecture Decisions:</h3>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            {activeProject.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">↳</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
