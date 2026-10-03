import { useState, useEffect, useRef } from 'react';
import { Search, FileText, Code2, Cpu, ShieldCheck, Lock, Terminal, Palette } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import type { ThemeType } from '../types';
import { playClickSound } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (fileId: string) => void;
  onThemeChange: (theme: ThemeType) => void;
  onToggleTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenFile,
  onThemeChange,
  onToggleTerminal
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: 'about', title: 'about.md', subtitle: 'View Executive Bio & Core Pillars', icon: FileText, category: 'Files', action: () => onOpenFile('about') },
    { id: 'skills', title: 'skills.json', subtitle: 'Inspect Low-Latency & AI Skill Matrix', icon: Code2, category: 'Files', action: () => onOpenFile('skills') },
    { id: 'chatlens', title: 'projects/chatlens.tsx', subtitle: 'WhatsApp Reader (60 FPS TanStack Demo)', icon: Cpu, category: 'Projects', action: () => onOpenFile('chatlens') },
    { id: 'ipsakti', title: 'projects/ipsakti_rag.py', subtitle: 'Statutory IPR & TKDL Defense (SIH 2026)', icon: ShieldCheck, category: 'Projects', action: () => onOpenFile('ipsakti') },
    { id: 'cipherchat', title: 'projects/cipherchat.wasm', subtitle: 'Zero-Knowledge E2EE Crypto Simulator', icon: Lock, category: 'Projects', action: () => onOpenFile('cipherchat') },
    { id: 'voicechanger', title: 'projects/voicechanger.cpp', subtitle: 'Sub-15ms WASAPI Audio DSP Engine', icon: Terminal, category: 'Projects', action: () => onOpenFile('voicechanger') },
    { id: 'achievements', title: 'achievements.md', subtitle: 'Smart India Hackathon & Milestones', icon: FileText, category: 'Files', action: () => onOpenFile('achievements') },
    { id: 'stats', title: 'github_stats.tsx', subtitle: 'Language Breakdown & GitHub Metrics', icon: Code2, category: 'Files', action: () => onOpenFile('stats') },
    { id: 'contact', title: 'contact.md', subtitle: 'Send a Message or Connect', icon: FileText, category: 'Files', action: () => onOpenFile('contact') },
    { id: 'terminal', title: 'Toggle Terminal', subtitle: 'Open or Close the In-Browser CLI (Ctrl+~)', icon: Terminal, category: 'Actions', action: onToggleTerminal },
    { id: 'th-tokyo', title: 'Theme: Tokyo Night', subtitle: 'Deep Obsidian & Neon Cyan', icon: Palette, category: 'Theme', action: () => onThemeChange('tokyo') },
    { id: 'th-cyber', title: 'Theme: Cyberpunk', subtitle: 'High Voltage Yellow & Neon Pink', icon: Palette, category: 'Theme', action: () => onThemeChange('cyberpunk') },
    { id: 'th-matrix', title: 'Theme: Matrix', subtitle: 'Terminal Emerald Digital Rain', icon: Palette, category: 'Theme', action: () => onThemeChange('matrix') },
    { id: 'gh', title: 'GitHub Profile', subtitle: 'Open github.com/rrxcore in new tab', icon: GithubIcon, category: 'External', action: () => window.open('https://github.com/rrxcore', '_blank') },
    { id: 'li', title: 'LinkedIn Profile', subtitle: 'Open LinkedIn profile in new tab', icon: LinkedinIcon, category: 'External', action: () => window.open('https://www.linkedin.com/in/ritesh-rana-3187aa352/', '_blank') },
  ];

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        playClickSound('high');
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden font-mono"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div 
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <Search className="h-4 w-4 text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or file name... (Esc to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none border-none focus:ring-0"
          />
          <kbd className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-slate-500">ESC</kbd>
        </div>

        {/* Command Options List */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5 text-xs">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-slate-500">
              No matching commands or files.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    playClickSound('high');
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-cyan-500/20 text-white' 
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                  style={isSelected ? { borderLeft: '2px solid var(--accent-cyan)' } : {}}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="font-semibold">{item.title}</span>
                    <span className="hidden sm:inline text-slate-500 truncate text-[11px]">— {item.subtitle}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 px-1.5 py-0.5 rounded bg-black/30">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
