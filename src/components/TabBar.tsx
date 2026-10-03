import { X, ChevronRight, FileText, Code2, Cpu, ShieldCheck, Lock, Terminal, Award, Activity, FileSpreadsheet, Mail } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface TabItem {
  id: string;
  name: string;
  path: string;
  iconName: string;
}

interface TabBarProps {
  openTabs: TabItem[];
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  openTabs,
  activeTabId,
  onSelectTab,
  onCloseTab
}) => {
  const getTabIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="h-3.5 w-3.5 text-cyan-400" />;
      case 'Code2': return <Code2 className="h-3.5 w-3.5 text-amber-400" />;
      case 'Cpu': return <Cpu className="h-3.5 w-3.5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />;
      case 'Lock': return <Lock className="h-3.5 w-3.5 text-purple-400" />;
      case 'Terminal': return <Terminal className="h-3.5 w-3.5 text-pink-400" />;
      case 'Award': return <Award className="h-3.5 w-3.5 text-yellow-400" />;
      case 'Activity': return <Activity className="h-3.5 w-3.5 text-cyan-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="h-3.5 w-3.5 text-blue-400" />;
      case 'Mail': return <Mail className="h-3.5 w-3.5 text-emerald-400" />;
      default: return <FileText className="h-3.5 w-3.5 text-slate-400" />;
    }
  };

  const activeTab = openTabs.find(t => t.id === activeTabId);

  return (
    <div className="flex flex-col flex-none border-b select-none font-mono text-xs"
      style={{
        backgroundColor: 'var(--bg-tab-inactive)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Horizontal Tabs Scrollable Container */}
      <div className="flex items-center overflow-x-auto no-scrollbar">
        {openTabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => {
                playClickSound('med');
                onSelectTab(tab.id);
              }}
              className={`group flex items-center gap-2 border-r px-3.5 py-2 cursor-pointer transition-colors ${
                isActive 
                  ? 'text-cyan-300 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--bg-editor)' : 'transparent',
                borderColor: 'var(--border-color)',
                borderTop: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent'
              }}
            >
              {getTabIcon(tab.iconName)}
              <span className="truncate max-w-[130px]">{tab.name}</span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound('low');
                  onCloseTab(tab.id);
                }}
                className="ml-1 rounded p-0.5 opacity-40 hover:opacity-100 hover:bg-white/10 transition-opacity"
                title={`Close ${tab.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Breadcrumb Path Bar */}
      <div 
        className="flex items-center px-4 py-1 text-[11px] text-slate-500 border-t"
        style={{
          backgroundColor: 'var(--bg-editor)',
          borderColor: 'var(--border-color)'
        }}
      >
        <span className="text-slate-400">rrx-portfolio</span>
        <ChevronRight className="h-3 w-3 mx-1 text-slate-600" />
        {activeTab?.path.includes('/') ? (
          <>
            <span className="text-slate-400">{activeTab.path.split('/')[0]}</span>
            <ChevronRight className="h-3 w-3 mx-1 text-slate-600" />
            <span className="text-cyan-400 font-medium">{activeTab.path.split('/')[1]}</span>
          </>
        ) : (
          <span className="text-cyan-400 font-medium">{activeTab?.name || 'about.md'}</span>
        )}
      </div>
    </div>
  );
};
