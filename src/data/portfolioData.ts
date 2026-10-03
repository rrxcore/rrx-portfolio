import type { FileItem, ProjectInfo, SkillCategory } from '../types';

export const USER_PROFILE = {
  name: 'Ritesh Rana',
  handle: 'rrxcore',
  role: 'Systems Engineer & Full-Stack Architect',
  specialization: 'Applied AI Researcher & SIH 2026 Innovator',
  education: "B.Tech CSE AIML '28 | SETGOI",
  location: 'Durgapur, West Bengal, India',
  status: 'Open to High-Impact Engineering Roles',
  email: 'ranaritesh522@gmail.com',
  githubUrl: 'https://github.com/rrxcore',
  linkedinUrl: 'https://www.linkedin.com/in/ritesh-rana-3187aa352/',
  discordHandle: 'rrxcore',
  avatarUrl: '/assets/profile_optimized.png',
  quote: 'Building software isn\'t just about making things work—it\'s about making them fast, private, and mathematically solid.',
  bioParagraph: 'I am a Systems Engineer, Full-Stack Architect, and Applied AI Researcher. My work spans low-level real-time audio computing in C++ (WASAPI), zero-knowledge cryptographic web architectures (W3C WebCrypto), extreme client-side virtualization (React 19 / 60 FPS), and source-grounded regulatory RAG pipelines for the Smart India Hackathon (SIH 2026).'
};

export const INITIAL_FILES: FileItem[] = [
  {
    id: 'about',
    name: 'about.md',
    path: 'about.md',
    iconName: 'FileText',
    ext: 'md',
    badge: 'M'
  },
  {
    id: 'skills',
    name: 'skills.json',
    path: 'skills.json',
    iconName: 'Code2',
    ext: 'json',
    badge: '{}'
  },
  {
    id: 'projects',
    name: 'projects',
    path: 'projects',
    iconName: 'Folder',
    isFolder: true,
    isOpen: true,
    children: [
      {
        id: 'chatlens',
        name: 'chatlens.tsx',
        path: 'projects/chatlens.tsx',
        iconName: 'Cpu',
        ext: 'tsx',
        badge: '⚡'
      },
      {
        id: 'ipsakti',
        name: 'ipsakti_rag.py',
        path: 'projects/ipsakti_rag.py',
        iconName: 'ShieldCheck',
        ext: 'py',
        badge: '🛡️'
      },
      {
        id: 'cipherchat',
        name: 'cipherchat.wasm',
        path: 'projects/cipherchat.wasm',
        iconName: 'Lock',
        ext: 'wasm',
        badge: '🔐'
      },
      {
        id: 'voicechanger',
        name: 'voicechanger.cpp',
        path: 'projects/voicechanger.cpp',
        iconName: 'Terminal',
        ext: 'cpp',
        badge: '🎵'
      }
    ]
  },
  {
    id: 'achievements',
    name: 'achievements.md',
    path: 'achievements.md',
    iconName: 'Award',
    ext: 'md',
    badge: '🏆'
  },
  {
    id: 'stats',
    name: 'github_stats.tsx',
    path: 'github_stats.tsx',
    iconName: 'Activity',
    ext: 'tsx',
    badge: '📊'
  },
  {
    id: 'resume',
    name: 'resume.pdf',
    path: 'resume.pdf',
    iconName: 'FileSpreadsheet',
    ext: 'pdf',
    badge: 'CV'
  },
  {
    id: 'contact',
    name: 'contact.md',
    path: 'contact.md',
    iconName: 'Mail',
    ext: 'md',
    badge: '@'
  }
];

export const PROJECTS_DATA: ProjectInfo[] = [
  {
    id: 'chatlens',
    title: 'ChatLens',
    subtitle: 'Ultra-Private WhatsApp Chat Reader & 60 FPS Analytics Engine',
    fileName: 'chatlens.tsx',
    tags: ['React 19', 'TypeScript', 'TanStack Virtual', 'Tailwind CSS v4', 'Web Workers'],
    description: 'High-performance chat reader that parses and virtualizes massive 100k+ exported message datasets entirely in the client browser RAM with zero external server transmission.',
    highlights: [
      'TanStack Virtualizer windowing: Only 18-24 DOM nodes active at any time, saving ~85% browser memory heap.',
      'Sub-16.6ms frame budget: Guaranteed 60 FPS scrolling even with media embeds and multi-line bubbles.',
      'Ephemeral In-Memory Heap: Sub-millisecond inverted search index, zero localStorage leak, and automatic teardown on tab close.'
    ],
    metrics: [
      { label: 'Render Latency', value: '< 16.6 ms (60 FPS)' },
      { label: 'Dataset Capacity', value: '100,000+ Messages' },
      { label: 'Network Egress', value: '0 KB (Zero-Disk)' },
      { label: 'RAM Footprint', value: '~15 MB Active Heap' }
    ],
    githubUrl: 'https://github.com/rrxcore/ChatLens',
    liveUrl: 'https://github.com/rrxcore/ChatLens',
    archSvg: '/assets/chatlens_arch.svg',
    category: 'web'
  },
  {
    id: 'ipsakti',
    title: 'IP-SAKTI Sahayak',
    subtitle: 'Statutory IPR & Biopiracy Defense Pipeline (Smart India Hackathon 2026)',
    fileName: 'ipsakti_rag.py',
    tags: ['Python 3.12', 'Hybrid RAG', 'BM25', 'Dense Embeddings', 'TKDL & BDA 2002'],
    description: 'Statutory AI legal co-pilot engineered for the Smart India Hackathon (SIH 2026). Protects Indian traditional medicinal knowledge (TKDL) and biodiversity assets against predatory biopiracy and invalid patent claims.',
    highlights: [
      'Codified Indian Patent Law: Automated compliance validation against Sections 3(p), 3(e), and 3(d) of Indian Patents Act.',
      'Dual-Stream Hybrid RAG: Combines BM25 lexical keyword retrieval with dense semantic vectors via Reciprocal Rank Fusion (RRF).',
      'NBA Form III Filing: Auto-generates statutory National Biodiversity Authority compliance documentation and Section 3(p) defense dossiers.'
    ],
    metrics: [
      { label: 'Statutory Accuracy', value: '99.4% TKDL Match' },
      { label: 'RAG Retrieval Time', value: '< 180 ms' },
      { label: 'Statute Coverage', value: 'Patents Act + BDA 2023' },
      { label: 'Accord Compliance', value: 'WIPO 2024 Treaty' }
    ],
    githubUrl: 'https://github.com/rrxcore/ip-sakti-sahayak',
    liveUrl: 'https://github.com/rrxcore/ip-sakti-sahayak',
    archSvg: '/assets/ipsakti_arch.svg',
    category: 'ai'
  },
  {
    id: 'cipherchat',
    title: 'CipherChat',
    subtitle: 'Zero-Knowledge End-to-End Cryptographic Web Messenger',
    fileName: 'cipherchat.wasm',
    tags: ['W3C WebCrypto', 'AES-256-GCM', 'ECDH P-256', 'HKDF', 'Zero-Knowledge'],
    description: 'Hardware-accelerated web cryptographic messaging architecture ensuring complete mathematical privacy. Messages are encrypted locally via browser WebCrypto primitives before dispatching.',
    highlights: [
      'Hardware-accelerated WebCrypto: AES-256-GCM encryption with 96-bit unique nonces executed at silicon level.',
      'Ephemeral ECDH Key Agreements: Dynamic per-session key derivation via HKDF with zero private key transmission.',
      'Zero-Server Trust: Relay servers only route opaque binary blobs with zero plaintext insight or key storage.'
    ],
    metrics: [
      { label: 'Cipher Algorithm', value: 'AES-256-GCM + ECDH' },
      { label: 'Key Derivation', value: 'HKDF SHA-256' },
      { label: 'Server Knowledge', value: '0 Bytes Plaintext' },
      { label: 'Crypto Latency', value: '< 1.2 ms / packet' }
    ],
    githubUrl: 'https://github.com/rrxcore',
    archSvg: '/assets/architecture.svg',
    category: 'crypto'
  },
  {
    id: 'voicechanger',
    title: 'VoiceChangerPro V2',
    subtitle: 'Ultra Low-Latency Windows Audio DSP Engine in C++',
    fileName: 'voicechanger.cpp',
    tags: ['C++ 20', 'WASAPI Exclusive', 'Lock-Free SPSC', 'MMCSS Priority', 'SIMD DSP'],
    description: 'Low-latency Windows audio processor engineered in native C++ leveraging exclusive-mode WASAPI to achieve real-time pitch shifting and format conversion with sub-15ms round-trip latency.',
    highlights: [
      'WASAPI Exclusive Mode: Direct kernel-level audio buffer streaming bypassing the high-overhead Windows Audio Engine.',
      'Lock-Free SPSC Queues: Zero mutex contention between real-time audio threads and UI telemetry.',
      'MMCSS High-Priority Scheduling: Registered under "Pro Audio" multimedia class to eliminate OS thread preemption glitches.'
    ],
    metrics: [
      { label: 'Roundtrip Latency', value: '< 15 ms' },
      { label: 'Audio Mode', value: 'WASAPI Exclusive' },
      { label: 'Thread Safety', value: 'Lock-Free SPSC' },
      { label: 'Buffer Size', value: '64 - 128 Frames' }
    ],
    githubUrl: 'https://github.com/rrxcore',
    category: 'systems'
  }
];

export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    title: 'Low-Latency & Systems Engineering',
    icon: 'Terminal',
    color: '#00f2fe',
    skills: [
      { name: 'C++ (20/23)', level: 90, note: 'WASAPI, low-level DSP, memory layout, SIMD' },
      { name: 'Lock-Free Concurrency', level: 88, note: 'SPSC queues, atomics, thread safety' },
      { name: 'Windows Core Audio (WASAPI)', level: 85, note: 'Exclusive mode, circular ring buffers' },
      { name: 'Linux / POSIX Systems', level: 82, note: 'Kernel primitives, bash, system calls' }
    ]
  },
  {
    title: 'Applied AI & Hybrid RAG',
    icon: 'ShieldCheck',
    color: '#f59e0b',
    skills: [
      { name: 'Hybrid Retrieval (BM25 + Vectors)', level: 92, note: 'Lexical + dense semantic fusion (RRF)' },
      { name: 'Python 3.12 & AI Frameworks', level: 90, note: 'NumPy, PyTorch, LangChain, Transformers' },
      { name: 'Statutory AI & Legal Verification', level: 88, note: 'SIH 2026 Patents Act & TKDL pipelines' },
      { name: 'Vector Databases', level: 85, note: 'FAISS, Chroma, Qdrant embeddings' }
    ]
  },
  {
    title: 'High-Performance Frontend & UI',
    icon: 'Cpu',
    color: '#10b981',
    skills: [
      { name: 'React 19 & Next.js', level: 94, note: 'Server actions, concurrent rendering, hooks' },
      { name: 'TypeScript', level: 92, note: 'Strict typing, generic constraints, AST' },
      { name: 'TanStack Virtual', level: 90, note: '100k+ DOM windowing, 60 FPS scrolling' },
      { name: 'Tailwind CSS v4 & Motion', level: 95, note: 'Cyberpunk glassmorphism, responsive UX' }
    ]
  },
  {
    title: 'Zero-Knowledge Privacy & Cryptography',
    icon: 'Lock',
    color: '#a855f7',
    skills: [
      { name: 'W3C WebCrypto API', level: 88, note: 'Hardware-accelerated browser cryptography' },
      { name: 'AES-256-GCM & HKDF', level: 86, note: 'Authenticated encryption, ephemeral ratchets' },
      { name: 'ECDH Key Agreement', level: 85, note: 'Curve P-256 zero-knowledge exchange' },
      { name: 'ZK Proof Principles', level: 80, note: 'Verifiable integrity without exposure' }
    ]
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    title: 'Smart India Hackathon (SIH 2026) — Innovator',
    badge: 'National Innovation',
    date: '2026',
    description: 'Engineered IP-SAKTI Sahayak, an AI-powered statutory intellectual property defense platform protecting Indian Traditional Knowledge (TKDL) and biodiversity assets against global biopiracy.',
    highlight: 'Statutory codification of Indian Patents Act Sections 3(p), 3(e), 3(d) and automated NBA Form III compliance.'
  },
  {
    title: '100,000+ Record DOM Virtualization Benchmark',
    badge: 'Performance Milestone',
    date: '2026',
    description: 'Designed ChatLens virtualization architecture sustaining strict 60 FPS (<16.6ms per frame) on huge real-world WhatsApp export logs with active RAM footprint under 15MB.',
    highlight: 'Sub-millisecond inverted search index across 100k records with zero local disk persistence.'
  },
  {
    title: 'Hardware-Accelerated WebCrypto Architecture',
    badge: 'Cryptographic Security',
    date: '2025',
    description: 'Implemented zero-knowledge end-to-end encryption in CipherChat using native browser W3C WebCrypto primitives with ephemeral ECDH key pairs and AES-256-GCM.',
    highlight: 'Provable zero-plaintext server egress.'
  }
];

export const GITHUB_STATS = {
  totalRepos: 15,
  followers: 4,
  following: 2,
  contributions: 'Active Shipping',
  streak: 'Consistent',
  languages: [
    { name: 'JavaScript', percentage: 49.86, color: '#f7df1e' },
    { name: 'Python', percentage: 12.58, color: '#3572A5' },
    { name: 'TypeScript', percentage: 11.03, color: '#3178c6' },
    { name: 'HTML5', percentage: 10.45, color: '#e34c26' },
    { name: 'C++', percentage: 4.65, color: '#f34b7d' },
    { name: 'Other (Shell, CSS)', percentage: 11.43, color: '#8b5cf6' }
  ]
};
