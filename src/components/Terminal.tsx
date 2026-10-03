import { useState, useRef, useEffect } from 'react';
import { X, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import type { TerminalLog, ThemeType } from '../types';
import { USER_PROFILE, PROJECTS_DATA } from '../data/portfolioData';
import { playClickSound } from '../utils/audio';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (fileId: string) => void;
  onThemeChange: (theme: ThemeType) => void;
  currentTheme: ThemeType;
}

export const Terminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  onOpenFile,
  onThemeChange,
  currentTheme
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'output' | 'problems'>('terminal');
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixRunning, setIsMatrixRunning] = useState(false);

  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: "rrxcoreOS shell v2.0 — type 'help' to begin."
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isMatrixRunning]);

  // Matrix digital rain easter egg
  useEffect(() => {
    if (!isMatrixRunning) return;
    const chars = '0123456789ABCDEF!@#$%^&*()_+-=~{}[]|<>?/';
    const interval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 40; i++) {
        line += chars[Math.floor(Math.random() * chars.length)] + ' ';
      }
      setLogs(prev => [
        ...prev.slice(-30),
        { id: Math.random().toString(), type: 'success', text: line }
      ]);
    }, 70);

    const timeout = setTimeout(() => {
      setIsMatrixRunning(false);
      setLogs(prev => [
        ...prev,
        { id: Math.random().toString(), type: 'system', text: 'Matrix sequence terminated.' }
      ]);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isMatrixRunning]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to history
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Record user input line
    const userLog: TerminalLog = {
      id: Date.now().toString(),
      type: 'input',
      text: `rrxcore@rrxcoreOS:~$ ${cmd}`
    };

    const parts = cmd.split(' ');
    const mainCommand = parts[0].toLowerCase();
    const args = parts.slice(1);

    let responses: TerminalLog[] = [];

    switch (mainCommand) {
      case 'help':
        responses = [
          { id: '1', type: 'output', text: '⚡ rrxcoreOS v2.0 Available Commands:' },
          { id: '2', type: 'output', text: '  neofetch       - Display system specifications & banner' },
          { id: '3', type: 'output', text: '  projects       - List flagship innovations with metrics' },
          { id: '4', type: 'output', text: '  skills         - Show low-latency systems & AI skill matrix' },
          { id: '5', type: 'output', text: '  sih            - View Smart India Hackathon 2026 details' },
          { id: '6', type: 'output', text: '  ls             - List files in rrx-portfolio directory' },
          { id: '7', type: 'output', text: '  cat <file>     - Print content of a file (e.g. cat about.md)' },
          { id: '8', type: 'output', text: '  open <file>    - Open specified file directly in editor' },
          { id: '9', type: 'output', text: '  theme <name>   - Switch theme (tokyo | cyberpunk | matrix | catppuccin)' },
          { id: '10', type: 'output', text: '  contact        - Open contact form or view direct links' },
          { id: '11', type: 'output', text: '  matrix         - Run simulated green digital rain' },
          { id: '12', type: 'output', text: '  clear          - Clear terminal display' }
        ];
        break;

      case 'neofetch':
        responses = [
          {
            id: 'nf-1',
            type: 'output',
            text: `
      ██████╗ ██████╗ ██╗  ██╗ ██████╗ ██████╗ ███████╗
      ██╔══██╗██╔══██╗╚██╗██╔╝██╔════╝██╔═══██╗██╔════╝
      ██████╔╝██████╔╝ ╚███╔╝ ██║     ██║   ██║███████╗
      ██╔══██╗██╔══██╗ ██╔██╗ ██║     ██║   ██║██╔════╝
      ██║  ██║██║  ██║██╔╝ ██╗╚██████╗╚██████╔╝███████╗
      ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝

  OS: rrxcoreOS v2.0 x86_64
  Host: Ritesh Rana (rrxcore)
  Kernel: C++ WASAPI / React 19 / Python 3.12
  Uptime: Active Engineering Flow
  Milestone: Smart India Hackathon (SIH 2026) Innovator
  Primary Stack: C++, TypeScript, Python, WASM, WebCrypto
  Active RAM: ~15 MB In-Memory Virtualization Heap
  Education: B.Tech CSE AIML '28 | SETGOI
  Location: Durgapur, West Bengal, India 🇮🇳
  Theme: ${currentTheme}
  Status: Open to High-Impact Engineering Roles`
          }
        ];
        break;

      case 'projects':
        responses = PROJECTS_DATA.map((p, idx) => ({
          id: `p-${idx}`,
          type: 'output',
          text: `⚡ [${p.title}] — ${p.subtitle}\n   Stack: ${p.tags.join(', ')}\n   GitHub: ${p.githubUrl}`
        }));
        break;

      case 'skills':
        responses = [
          { id: 's1', type: 'output', text: '● Low-Latency Systems: C++ 20, WASAPI, Lock-Free SPSC, SIMD, POSIX' },
          { id: 's2', type: 'output', text: '● Applied AI & RAG:    Python 3.12, Hybrid BM25 + Dense Vectors, TKDL' },
          { id: 's3', type: 'output', text: '● High-Perf Frontend:  React 19, TypeScript, TanStack Virtual (60 FPS)' },
          { id: 's4', type: 'output', text: '● Cryptography:        W3C WebCrypto, AES-256-GCM, ECDH P-256, Zero-Knowledge' }
        ];
        break;

      case 'sih':
        responses = [
          { id: 'sih-1', type: 'success', text: '🏆 Smart India Hackathon 2026 — IP-SAKTI Sahayak' },
          { id: 'sih-2', type: 'output', text: 'Role: Architecture & Statutory Regulatory AI Core' },
          { id: 'sih-3', type: 'output', text: 'Defense: Codified Sections 3(p), 3(e), 3(d) of Indian Patents Act & BDA 2002/2023.' },
          { id: 'sih-4', type: 'output', text: 'Engine: Dual-stream Hybrid RAG (BM25 lexical + dense embeddings via Reciprocal Rank Fusion).' }
        ];
        break;

      case 'ls':
        responses = [
          {
            id: 'ls-1',
            type: 'output',
            text: 'about.md    skills.json    achievements.md    github_stats.tsx    resume.pdf    contact.md\nprojects/:\n  chatlens.tsx    ipsakti_rag.py    cipherchat.wasm    voicechanger.cpp'
          }
        ];
        break;

      case 'cat':
        if (!args[0]) {
          responses = [{ id: 'cat-err', type: 'error', text: 'Usage: cat <filename> (e.g. cat about.md)' }];
        } else {
          const file = args[0].toLowerCase();
          if (file.includes('about')) {
            responses = [{ id: 'cat-about', type: 'output', text: `# ${USER_PROFILE.name} (${USER_PROFILE.handle})\n${USER_PROFILE.bioParagraph}` }];
          } else if (file.includes('skill')) {
            responses = [{ id: 'cat-skills', type: 'output', text: '{\n  "languages": ["C++", "TypeScript", "Python", "JavaScript", "HTML5"],\n  "frameworks": ["React 19", "TanStack Virtual", "Tailwind CSS v4"],\n  "specializations": ["Audio DSP", "Statutory RAG", "Zero-Knowledge Crypto"]\n}' }];
          } else {
            responses = [{ id: 'cat-gen', type: 'output', text: `Loaded file: ${args[0]}. Type "open ${args[0]}" to view in interactive GUI editor.` }];
          }
        }
        break;

      case 'open':
        if (!args[0]) {
          responses = [{ id: 'open-err', type: 'error', text: 'Usage: open <filename> (e.g. open chatlens.tsx)' }];
        } else {
          const target = args[0].toLowerCase();
          let fileId = 'about';
          if (target.includes('chatlens')) fileId = 'chatlens';
          else if (target.includes('ipsakti')) fileId = 'ipsakti';
          else if (target.includes('cipher')) fileId = 'cipherchat';
          else if (target.includes('voice')) fileId = 'voicechanger';
          else if (target.includes('skill')) fileId = 'skills';
          else if (target.includes('achieve')) fileId = 'achievements';
          else if (target.includes('stat')) fileId = 'stats';
          else if (target.includes('resume')) fileId = 'resume';
          else if (target.includes('contact')) fileId = 'contact';

          onOpenFile(fileId);
          responses = [{ id: 'open-succ', type: 'success', text: `Opened ${args[0]} in the editor tabs.` }];
        }
        break;

      case 'theme':
        if (args[0] && ['tokyo', 'cyberpunk', 'matrix', 'catppuccin'].includes(args[0].toLowerCase())) {
          const t = args[0].toLowerCase() as ThemeType;
          onThemeChange(t);
          responses = [{ id: 't-succ', type: 'success', text: `Active theme switched to [${t}].` }];
        } else {
          responses = [{ id: 't-err', type: 'error', text: 'Available themes: tokyo | cyberpunk | matrix | catppuccin' }];
        }
        break;

      case 'contact':
        onOpenFile('contact');
        responses = [
          { id: 'c1', type: 'output', text: `Email:    ${USER_PROFILE.email}` },
          { id: 'c2', type: 'output', text: `LinkedIn: ${USER_PROFILE.linkedinUrl}` },
          { id: 'c3', type: 'output', text: `GitHub:   ${USER_PROFILE.githubUrl}` },
          { id: 'c4', type: 'success', text: 'Opened contact.md tab in the editor.' }
        ];
        break;

      case 'matrix':
        setIsMatrixRunning(true);
        responses = [{ id: 'm-init', type: 'success', text: 'Entering the matrix...' }];
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'sudo':
        responses = [{ id: 'sudo-resp', type: 'error', text: 'Permission denied: rrxcore is not in the sudoers file. This incident will be reported to Ritesh Rana.' }];
        break;

      default:
        responses = [
          { id: 'err', type: 'error', text: `Command not found: "${cmd}". Type "help" to see available commands.` }
        ];
        break;
    }

    setLogs(prev => [...prev, userLog, ...responses]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      playClickSound('med');
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocompletion
      const cmds = ['help', 'neofetch', 'projects', 'skills', 'sih', 'ls', 'cat', 'open', 'theme', 'contact', 'matrix', 'clear'];
      const match = cmds.find(c => c.startsWith(inputVal.trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`flex flex-col border-t z-30 font-mono transition-all ${
        isMaximized ? 'h-[75vh]' : 'h-64'
      }`}
      style={{
        backgroundColor: 'var(--bg-terminal)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Terminal Title Bar */}
      <div 
        className="flex h-8 flex-none items-center justify-between border-b px-3 select-none text-xs"
        style={{
          backgroundColor: 'var(--bg-titlebar)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono text-slate-300 font-semibold mr-1">
            rrxcore@rrxcoreOS: ~
          </span>
          <div className="h-3.5 w-px bg-white/10 hidden sm:block" />
          <button 
            onClick={() => setActiveTab('terminal')}
            className={`font-semibold transition-colors hidden sm:block ${
              activeTab === 'terminal' 
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            TERMINAL
          </button>
          <button 
            onClick={() => setActiveTab('output')}
            className={`transition-colors hidden sm:block ${
              activeTab === 'output' 
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            OUTPUT
          </button>
          <button 
            onClick={() => setActiveTab('problems')}
            className={`transition-colors hidden md:block ${
              activeTab === 'problems' 
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-0.5' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            PROBLEMS (0)
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <button
            onClick={() => {
              playClickSound('low');
              setLogs([]);
            }}
            title="Clear Terminal"
            className="p-1 hover:text-white transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => {
              playClickSound('med');
              setIsMaximized(!isMaximized);
            }}
            title={isMaximized ? 'Restore' : 'Maximize'}
            className="p-1 hover:text-white transition-colors"
          >
            {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => {
              playClickSound('high');
              onClose();
            }}
            title="Close Terminal (Ctrl+~)"
            className="p-1 hover:text-red-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      {activeTab === 'terminal' && (
        <div 
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto p-3 text-xs leading-5 select-text cursor-text"
        >
          {logs.map((log) => {
            if (log.type === 'input') {
              return (
                <div key={log.id} className="text-slate-200 font-semibold">
                  <span className="text-emerald-400">rrxcore@rrxcoreOS</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-slate-500">$ </span>
                  <span>{log.text.replace('rrxcore@rrxcoreOS:~$ ', '')}</span>
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={log.id} className="text-red-400 whitespace-pre-wrap">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'success') {
              return (
                <div key={log.id} className="text-emerald-400 whitespace-pre-wrap">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'system') {
              return (
                <div key={log.id} className="text-slate-400 italic">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={log.id} className="text-slate-300 whitespace-pre-wrap">
                {log.text}
              </div>
            );
          })}

          {/* Active Input Prompt */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-emerald-400 font-semibold">rrxcore@rrxcoreOS</span>
            <span className="text-slate-500">:</span>
            <span className="text-cyan-400 font-semibold">~</span>
            <span className="text-slate-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs focus:ring-0"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      )}

      {/* Output View */}
      {activeTab === 'output' && (
        <div className="flex-1 overflow-y-auto p-4 text-xs text-slate-300 leading-relaxed">
          <p className="text-emerald-400 font-semibold">[Compilation Telemetry]</p>
          <p className="text-slate-400">Target Architecture: x86_64-pc-windows-msvc & wasm32-unknown-emscripten</p>
          <p className="text-slate-400">Optimization: -O3 -flto -march=native</p>
          <p className="text-cyan-400 mt-2">✓ React 19 Client Bundle: 0 errors (0 warnings)</p>
          <p className="text-cyan-400">✓ WASAPI Exclusive Core: 0 audio underruns detected</p>
          <p className="text-cyan-400">✓ TanStack Virtual Window: 18 nodes recycling smoothly</p>
        </div>
      )}

      {/* Problems View */}
      {activeTab === 'problems' && (
        <div className="flex-1 p-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <span>✓ No problems have been detected in the workspace.</span>
          </div>
        </div>
      )}
    </div>
  );
};
