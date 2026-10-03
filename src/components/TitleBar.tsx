import React from 'react';
import { 
  Menu, 
  Terminal as TerminalIcon, 
  Volume2, 
  VolumeX, 
  Search,
  Maximize2,
  Minus,
  X,
  Palette
} from 'lucide-react';
import type { ThemeType } from '../types';
import { playClickSound } from '../utils/audio';

interface TitleBarProps {
  currentTheme: ThemeType;
  onThemeCycle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  terminalOpen: boolean;
  onTerminalToggle: () => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onOpenCommandPalette: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  currentTheme,
  onThemeCycle,
  soundEnabled,
  onSoundToggle,
  terminalOpen,
  onTerminalToggle,
  sidebarOpen,
  onSidebarToggle,
  onOpenCommandPalette
}) => {
  const getThemeBadge = (theme: ThemeType) => {
    switch (theme) {
      case 'tokyo': return { label: 'Tokyo Night', icon: '🌙' };
      case 'cyberpunk': return { label: 'Cyberpunk', icon: '⚡' };
      case 'matrix': return { label: 'Matrix', icon: '💚' };
      case 'catppuccin': return { label: 'Catppuccin', icon: '☕' };
    }
  };

  const themeInfo = getThemeBadge(currentTheme);

  const toggleFullscreen = () => {
    playClickSound('high');
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="flex h-9 flex-none items-center justify-between border-b px-3 select-none transition-colors"
      style={{
        backgroundColor: 'var(--bg-titlebar)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Window Controls & Explorer Toggle */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <button 
            onClick={() => playClickSound('low')}
            title="Close Window"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-500/80 transition-transform hover:scale-110"
          >
            <X className="h-2 w-2 text-red-950 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={() => playClickSound('med')}
            title="Minimize"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500/80 transition-transform hover:scale-110"
          >
            <Minus className="h-2 w-2 text-yellow-950 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={toggleFullscreen}
            title="Maximize / Fullscreen"
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500/80 transition-transform hover:scale-110"
          >
            <Maximize2 className="h-2 w-2 text-emerald-950 opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        <button
          onClick={() => {
            playClickSound('med');
            onSidebarToggle();
          }}
          className={`ml-3 rounded p-1 text-xs transition-colors hover:bg-white/10 ${
            sidebarOpen ? 'text-cyan-400' : 'text-slate-400'
          }`}
          title="Toggle Explorer (Ctrl+B)"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Command Palette Button */}
        <button
          onClick={() => {
            playClickSound('high');
            onOpenCommandPalette();
          }}
          className="hidden md:flex items-center gap-2 rounded border px-2 py-0.5 text-xs text-slate-400 transition-colors hover:border-cyan-500/50 hover:text-white"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <Search className="h-3 w-3 text-cyan-400" />
          <span className="font-mono text-[11px]">Command Palette</span>
          <kbd className="rounded bg-black/40 px-1 font-mono text-[10px] text-slate-500">Ctrl+K</kbd>
        </button>
      </div>

      {/* Center Title */}
      <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
        <span className="font-semibold text-cyan-400">rrxcoreOS</span>
        <span className="text-slate-500">v2.0</span>
        <span className="hidden sm:inline text-slate-500">—</span>
        <span className="hidden sm:inline text-slate-300">Ritesh Rana (Systems & Applied AI)</span>
      </div>

      {/* Right Controls: Terminal, Audio, Theme */}
      <div className="flex items-center gap-1.5">
        {/* Terminal Toggle Button */}
        <button
          onClick={() => {
            playClickSound('high');
            onTerminalToggle();
          }}
          className={`flex items-center gap-1.5 rounded px-2 py-1 font-mono text-xs transition-colors ${
            terminalOpen ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
          title="Toggle Terminal (Ctrl+~)"
        >
          <TerminalIcon className="h-3.5 w-3.5" />
          <span className="hidden md:inline text-[11px]">Terminal</span>
          <kbd className="hidden lg:inline text-[9px] text-slate-500">Ctrl+~</kbd>
        </button>

        {/* Tactile Audio Switcher */}
        <button
          onClick={() => {
            onSoundToggle();
          }}
          className={`rounded p-1.5 text-xs transition-colors ${
            soundEnabled ? 'text-emerald-400 hover:bg-white/10' : 'text-slate-500 hover:bg-white/10'
          }`}
          title={soundEnabled ? 'Mechanical Clicks: ON' : 'Mechanical Clicks: OFF'}
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>

        {/* Theme Switcher Button */}
        <button
          onClick={() => {
            playClickSound('high');
            onThemeCycle();
          }}
          className="flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[11px] text-slate-300 transition-colors hover:border-cyan-400 hover:text-white"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}
          title="Switch Cyberpunk Theme"
        >
          <Palette className="h-3 w-3 text-cyan-400" />
          <span className="hidden sm:inline">{themeInfo.label}</span>
          <span>{themeInfo.icon}</span>
        </button>
      </div>
    </header>
  );
};
