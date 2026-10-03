import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  Award, 
  Activity, 
  FileSpreadsheet, 
  Mail,
  X
} from 'lucide-react';
import type { FileItem, ThemeType } from '../types';
import { INITIAL_FILES } from '../data/portfolioData';
import { playClickSound } from '../utils/audio';

interface ExplorerProps {
  activeFileId: string;
  onOpenFile: (fileId: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  currentTheme: ThemeType;
}

export const Explorer: React.FC<ExplorerProps> = ({
  activeFileId,
  onOpenFile,
  isOpen,
  onCloseMobile,
  currentTheme
}) => {
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  // Live system telemetry timers
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    const uptimeInterval = setInterval(() => setUptimeSeconds(prev => prev + 1), 1000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const formatUptime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  const getFileIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="h-4 w-4 text-cyan-400" />;
      case 'Code2': return <Code2 className="h-4 w-4 text-amber-400" />;
      case 'Cpu': return <Cpu className="h-4 w-4 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="h-4 w-4 text-amber-400" />;
      case 'Lock': return <Lock className="h-4 w-4 text-purple-400" />;
      case 'Terminal': return <Terminal className="h-4 w-4 text-pink-400" />;
      case 'Award': return <Award className="h-4 w-4 text-yellow-400" />;
      case 'Activity': return <Activity className="h-4 w-4 text-cyan-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="h-4 w-4 text-blue-400" />;
      case 'Mail': return <Mail className="h-4 w-4 text-emerald-400" />;
      default: return <FileText className="h-4 w-4 text-slate-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <aside 
      className="fixed inset-y-0 left-0 z-40 sm:static flex flex-col w-64 flex-none border-r select-none overflow-y-auto overflow-x-hidden font-mono text-xs transition-all shadow-2xl sm:shadow-none"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-color)',
        top: '36px' // Below title bar on mobile
      }}
    >
      {/* Top Explorer Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-1.5">
          <span>Explorer</span>
        </span>
        <button 
          onClick={onCloseMobile} 
          className="sm:hidden p-1 text-slate-400 hover:text-white"
          title="Close Sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Root Workspace Folder */}
      <div className="px-2 pb-4">
        <div className="flex items-center gap-1 px-1 py-1.5 font-bold text-slate-300">
          <ChevronDown className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[11px] tracking-wide text-cyan-400">RRX-PORTFOLIO</span>
        </div>

        {/* File Tree */}
        <ul className="space-y-0.5 mt-1">
          {INITIAL_FILES.map((item: FileItem) => {
            if (item.isFolder && item.children) {
              return (
                <li key={item.id} className="pt-0.5">
                  <button
                    onClick={() => {
                      playClickSound('low');
                      setProjectsExpanded(!projectsExpanded);
                    }}
                    className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-slate-300 transition-colors hover:bg-white/5"
                  >
                    {projectsExpanded ? (
                      <ChevronDown className="h-3 w-3 text-purple-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-purple-400" />
                    )}
                    <span className="text-purple-400 font-bold">📁 {item.name}/</span>
                  </button>

                  {projectsExpanded && (
                    <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-1">
                      {item.children.map((child: FileItem) => {
                        const isActive = activeFileId === child.id;
                        return (
                          <li key={child.id}>
                            <button
                              onClick={() => {
                                playClickSound('high');
                                onOpenFile(child.id);
                              }}
                              className={`flex w-full items-center justify-between rounded px-2 py-1 text-left transition-all ${
                                isActive 
                                  ? 'bg-cyan-500/15 text-cyan-300 font-medium' 
                                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                              }`}
                              style={isActive ? { borderLeft: '2px solid var(--accent-cyan)' } : {}}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {getFileIcon(child.iconName)}
                                <span className="truncate">{child.name}</span>
                              </div>
                              {child.badge && (
                                <span className="text-[10px] opacity-75">{child.badge}</span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }

            const isActive = activeFileId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    playClickSound('med');
                    onOpenFile(item.id);
                  }}
                  className={`flex w-full items-center justify-between rounded px-2 py-1 text-left transition-all ${
                    isActive 
                      ? 'bg-cyan-500/15 text-cyan-300 font-medium' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                  style={isActive ? { borderLeft: '2px solid var(--accent-cyan)' } : {}}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getFileIcon(item.iconName)}
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] text-slate-500">{item.badge}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Live System Diagnostics Card */}
        <div className="mt-6 space-y-3">
          <div 
            className="rounded-lg border p-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM TELEMETRY
              </span>
              <span className="text-cyan-400">ONLINE</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between text-slate-400">
                <span>time</span>
                <span className="font-mono text-cyan-300">{currentTime || '14:30:00'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>date</span>
                <span className="text-slate-300">{currentDate || '03 Oct 2026'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>uptime</span>
                <span className="text-emerald-300">{formatUptime(uptimeSeconds)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>git</span>
                <span className="text-purple-300">main · clean 🌿</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>kernel</span>
                <span className="text-slate-300">C++ / React 19</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>theme</span>
                <span className="capitalize text-amber-400">{currentTheme}</span>
              </div>
            </div>
          </div>

          {/* Live Status Card */}
          <div 
            className="rounded-lg border p-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)'
            }}
          >
            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 beacon-animate" />
              ENGINEERING RADAR
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div>
                <span className="text-slate-500">focus: </span>
                <span className="text-cyan-300">WASAPI & Hybrid RAG</span>
              </div>
              <div>
                <span className="text-slate-500">milestone: </span>
                <span className="text-amber-300">SIH '26 Innovator 🏆</span>
              </div>
              <div>
                <span className="text-slate-500">status: </span>
                <span className="text-emerald-400 font-medium">Open to High-Impact Roles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
