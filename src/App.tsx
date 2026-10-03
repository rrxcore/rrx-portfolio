import { useState, useEffect } from 'react';
import { TitleBar } from './components/TitleBar';
import { ActivityBar } from './components/ActivityBar';
import { Explorer } from './components/Explorer';
import { TabBar } from './components/TabBar';
import { StatusBar } from './components/StatusBar';
import { Terminal } from './components/Terminal';
import { CommandPalette } from './components/CommandPalette';
import { AboutView } from './components/views/AboutView';
import { SkillsView } from './components/views/SkillsView';
import { ProjectsView } from './components/views/ProjectsView';
import { AchievementsView } from './components/views/AchievementsView';
import { StatsView } from './components/views/StatsView';
import { ResumeView } from './components/views/ResumeView';
import { ContactView } from './components/views/ContactView';
import type { ThemeType } from './types';
import { INITIAL_FILES } from './data/portfolioData';
import { toggleSound, isSoundEnabled, playClickSound } from './utils/audio';

interface TabItem {
  id: string;
  name: string;
  path: string;
  iconName: string;
}

export function App() {
  const [theme, setTheme] = useState<ThemeType>('tokyo');
  const [soundActive, setSoundActive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Tab management
  const [openTabs, setOpenTabs] = useState<TabItem[]>([
    { id: 'about', name: 'about.md', path: 'about.md', iconName: 'FileText' },
    { id: 'chatlens', name: 'chatlens.tsx', path: 'projects/chatlens.tsx', iconName: 'Cpu' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('about');

  // Load theme & sound preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('rrxos-theme') as ThemeType;
    if (savedTheme && ['tokyo', 'cyberpunk', 'matrix', 'catppuccin'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'tokyo');
    }
    setSoundActive(isSoundEnabled());
  }, []);

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('rrxos-theme', newTheme);
  };

  const cycleTheme = () => {
    const themes: ThemeType[] = ['tokyo', 'cyberpunk', 'matrix', 'catppuccin'];
    const currentIdx = themes.indexOf(theme);
    const nextTheme = themes[(currentIdx + 1) % themes.length];
    changeTheme(nextTheme);
  };

  // Keyboard Shortcuts (Ctrl+B, Ctrl+~, Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      } else if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~')) {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to open file
  const handleOpenFile = (fileId: string) => {
    // Find file definition in INITIAL_FILES or children
    let fileInfo: { id: string; name: string; path: string; iconName: string } | null = null;
    for (const f of INITIAL_FILES) {
      if (f.id === fileId) {
        fileInfo = f;
        break;
      }
      if (f.children) {
        const found = f.children.find(c => c.id === fileId);
        if (found) {
          fileInfo = found;
          break;
        }
      }
    }

    if (!fileInfo) return;

    // Check if already open
    if (!openTabs.some(t => t.id === fileId)) {
      setOpenTabs(prev => [...prev, fileInfo!]);
    }
    setActiveTabId(fileId);
  };

  // Close tab
  const handleCloseTab = (fileId: string) => {
    if (openTabs.length <= 1) return; // Keep at least one tab open
    const remaining = openTabs.filter(t => t.id !== fileId);
    setOpenTabs(remaining);
    if (activeTabId === fileId) {
      setActiveTabId(remaining[remaining.length - 1].id);
    }
  };

  const handleSoundToggle = () => {
    const res = toggleSound();
    setSoundActive(res);
  };

  // Render view corresponding to activeTabId
  const renderActiveView = () => {
    switch (activeTabId) {
      case 'about':
        return <AboutView onOpenFile={handleOpenFile} onToggleTerminal={() => setTerminalOpen(true)} />;
      case 'skills':
        return <SkillsView />;
      case 'chatlens':
      case 'ipsakti':
      case 'cipherchat':
      case 'voicechanger':
        return <ProjectsView initialProjectId={activeTabId} />;
      case 'achievements':
        return <AchievementsView />;
      case 'stats':
        return <StatsView />;
      case 'resume':
        return <ResumeView />;
      case 'contact':
        return <ContactView />;
      default:
        return <AboutView onOpenFile={handleOpenFile} onToggleTerminal={() => setTerminalOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden select-none bg-[var(--bg-window)] text-[var(--text-primary)]">
      {/* Top Title Bar */}
      <TitleBar
        currentTheme={theme}
        onThemeCycle={cycleTheme}
        soundEnabled={soundActive}
        onSoundToggle={handleSoundToggle}
        terminalOpen={terminalOpen}
        onTerminalToggle={() => setTerminalOpen(!terminalOpen)}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
      />

      {/* Main Workspace Body */}
      <div className="flex min-h-0 flex-1 relative overflow-hidden">
        {/* Left Activity Rail */}
        <ActivityBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeView={activeTabId}
          onSelectView={handleOpenFile}
          onOpenCommandPalette={() => setPaletteOpen(true)}
          onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
          terminalOpen={terminalOpen}
        />

        {/* Explorer File Tree Sidebar */}
        <Explorer
          activeFileId={activeTabId}
          onOpenFile={handleOpenFile}
          isOpen={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
          currentTheme={theme}
        />

        {/* Editor Main Content Area */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--bg-editor)]">
          {/* Editor Tab Bar & Breadcrumbs */}
          <TabBar
            openTabs={openTabs}
            activeTabId={activeTabId}
            onSelectTab={setActiveTabId}
            onCloseTab={handleCloseTab}
          />

          {/* Editor Document Viewport */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
            {renderActiveView()}
          </div>

          {/* Dockable Terminal at Bottom */}
          <Terminal
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
            onOpenFile={handleOpenFile}
            onThemeChange={changeTheme}
            currentTheme={theme}
          />
        </main>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar
        activeFileId={activeTabId}
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
        terminalOpen={terminalOpen}
      />

      {/* Floating CLI Toggle Action Button */}
      <button
        onClick={() => {
          playClickSound('high');
          setTerminalOpen(!terminalOpen);
        }}
        className="fixed bottom-9 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400 bg-black/80 font-mono text-cyan-300 shadow-xl shadow-cyan-500/20 hover:scale-105 hover:bg-cyan-500 hover:text-black transition-all"
        title="Toggle CLI Terminal (Ctrl+~)"
      >
        <span className="font-bold text-sm">&gt;_</span>
      </button>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenFile={handleOpenFile}
        onThemeChange={changeTheme}
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
      />
    </div>
  );
}

export default App;
