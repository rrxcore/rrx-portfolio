export type ThemeType = 'tokyo' | 'cyberpunk' | 'matrix' | 'catppuccin';

export interface FileItem {
  id: string;
  name: string;
  path: string;
  iconName: string;
  ext?: string;
  isFolder?: boolean;
  isOpen?: boolean;
  children?: FileItem[];
  badge?: string;
}

export interface ProjectInfo {
  id: string;
  title: string;
  subtitle: string;
  fileName: string;
  tags: string[];
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  archSvg?: string;
  category: 'systems' | 'ai' | 'crypto' | 'web';
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: { name: string; level: number; note: string }[];
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
  timestamp?: string;
}
