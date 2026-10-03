import { 
  Files, 
  Search, 
  GitBranch, 
  FolderGit2, 
  Award, 
  Terminal, 
  Settings
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import { playClickSound } from '../utils/audio';

interface ActivityBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  activeView: string;
  onSelectView: (viewId: string) => void;
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  sidebarOpen,
  onToggleSidebar,
  activeView,
  onSelectView,
  onOpenCommandPalette,
  onToggleTerminal,
  terminalOpen
}) => {
  const navItems = [
    { id: 'explorer', icon: Files, label: 'Explorer (Ctrl+Shift+E)', action: onToggleSidebar, active: sidebarOpen },
    { id: 'search', icon: Search, label: 'Search & Palette (Ctrl+K)', action: onOpenCommandPalette, active: false },
    { id: 'git', icon: GitBranch, label: 'Source Control (main)', action: () => onSelectView('stats'), active: activeView === 'stats' },
    { id: 'projects', icon: FolderGit2, label: 'Flagship Projects', action: () => onSelectView('chatlens'), active: ['chatlens', 'ipsakti', 'cipherchat', 'voicechanger'].includes(activeView) },
    { id: 'achievements', icon: Award, label: 'SIH 2026 & Honors', action: () => onSelectView('achievements'), active: activeView === 'achievements' },
    { id: 'terminal', icon: Terminal, label: 'CLI Terminal (Ctrl+~)', action: onToggleTerminal, active: terminalOpen },
  ];

  return (
    <nav 
      aria-label="Activity Bar"
      className="hidden sm:flex w-12 flex-none flex-col items-center justify-between border-r py-2 select-none z-10 transition-colors"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="flex flex-col items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                playClickSound('med');
                item.action();
              }}
              title={item.label}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                item.active 
                  ? 'text-cyan-400 bg-white/5' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.active && (
                <div 
                  className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-r bg-cyan-400"
                  style={{ boxShadow: '0 0 8px rgba(0, 242, 254, 0.8)' }}
                />
              )}
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>

      {/* Bottom Profile Links */}
      <div className="flex flex-col items-center gap-2">
        <a
          href="https://github.com/rrxcore"
          target="_blank"
          rel="noreferrer"
          title="GitHub Profile"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-cyan-400 hover:bg-white/5"
          onClick={() => playClickSound('high')}
        >
          <GithubIcon className="h-4 w-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/ritesh-rana-3187aa352/"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn Profile"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-blue-400 hover:bg-white/5"
          onClick={() => playClickSound('high')}
        >
          <LinkedinIcon className="h-4 w-4" />
        </a>
        <button
          onClick={() => {
            playClickSound('low');
            onOpenCommandPalette();
          }}
          title="Settings / Command Palette"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-300 hover:bg-white/5"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};
