import { GitBranch, AlertCircle, CheckCircle2, Terminal as TerminalIcon } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface StatusBarProps {
  activeFileId: string;
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeFileId,
  onToggleTerminal,
  terminalOpen
}) => {
  const getLanguageTag = (fileId: string) => {
    switch (fileId) {
      case 'chatlens': return 'TypeScript React (TSX)';
      case 'ipsakti': return 'Python 3.12 (Hybrid RAG)';
      case 'cipherchat': return 'WebAssembly / WebCrypto';
      case 'voicechanger': return 'C++ 20 (WASAPI)';
      case 'skills': return 'JSON (Schema Validated)';
      case 'stats': return 'TypeScript React';
      case 'resume': return 'PDF Document';
      default: return 'Markdown (GitHub Flavored)';
    }
  };

  return (
    <footer 
      className="flex h-6 flex-none items-center justify-between px-3 select-none font-mono text-[11px] border-t z-20 transition-colors"
      style={{
        backgroundColor: 'var(--status-bar-bg)',
        color: 'var(--status-bar-fg)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Left Telemetry */}
      <div className="flex items-center gap-3">
        <a 
          href="https://github.com/rrxcore" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
          title="Git Repository: main (Clean)"
          onClick={() => playClickSound('low')}
        >
          <GitBranch className="h-3 w-3 text-cyan-400" />
          <span className="font-semibold">main</span>
        </a>

        <div className="hidden sm:flex items-center gap-1 text-slate-400">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          <span>0 problems</span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-slate-400">
          <AlertCircle className="h-3 w-3 text-yellow-400" />
          <span>0 warnings</span>
        </div>

        <span className="hidden lg:inline text-slate-500">|</span>
        <span className="hidden lg:inline text-slate-400">UTF-8</span>
      </div>

      {/* Right Language & Availability Beacon */}
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline font-medium text-slate-300">
          {getLanguageTag(activeFileId)}
        </span>

        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-400 beacon-animate" />
          <span className="hidden xs:inline">Open to Roles</span>
        </div>

        <button
          onClick={() => {
            playClickSound('high');
            onToggleTerminal();
          }}
          className={`flex items-center gap-1 px-1 rounded transition-colors ${
            terminalOpen ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
          }`}
          title="Toggle Terminal"
        >
          <TerminalIcon className="h-3 w-3" />
          <span className="hidden sm:inline">CLI</span>
        </button>
      </div>
    </footer>
  );
};
