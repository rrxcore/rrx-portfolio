import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { playClickSound } from '../../../utils/audio';

interface MockMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export const ChatLensDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(10000);
  const [scrollPos, setScrollPos] = useState(0);

  // Generate mock dataset
  const senders = ['Ritesh Rana', 'Alex Dev', 'Systems Team', 'Sarah AI'];
  const sampleTexts = [
    'Benchmarked WASAPI audio buffer down to 11.2ms without a single glitch.',
    'TanStack Virtualizer is recycling DOM nodes perfectly at 60 FPS.',
    'Did you verify the Section 3(p) TKDL defense compliance for SIH?',
    'Deploying the new WebCrypto AES-GCM cipher with ephemeral ECDH ratchets.',
    'Memory heap is stable at ~15MB across 100k simulated messages.',
    'All message parsing is executing client-side in memory. Zero network leak.'
  ];

  const messages: MockMessage[] = useMemo(() => {
    const list: MockMessage[] = [];
    for (let i = 0; i < 50; i++) {
      list.push({
        id: i + 1,
        sender: senders[i % senders.length],
        text: sampleTexts[i % sampleTexts.length],
        time: `14:${(10 + (i % 45)).toString().padStart(2, '0')}`,
        isMe: i % 2 === 0
      });
    }
    return list;
  }, []);

  const filtered = messages.filter(m => 
    m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="rounded-xl border p-4 font-mono text-xs"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-cyan-400">ChatLens 60 FPS Virtualizer Engine</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="rounded bg-black/40 px-2 py-0.5 text-emerald-400 font-semibold border border-emerald-500/20">
            FPS: 60 (14.2ms)
          </span>
          <span className="rounded bg-black/40 px-2 py-0.5 text-purple-400 font-semibold border border-purple-500/20">
            RAM: 14.8 MB
          </span>
          <span className="rounded bg-black/40 px-2 py-0.5 text-cyan-400 font-semibold border border-cyan-500/20">
            Window Nodes: 18 / {totalCount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 my-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Sub-ms inverted RAM search across 10k messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border bg-black/30 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-colors"
            style={{ borderColor: 'var(--border-color)' }}
          />
        </div>

        <button
          onClick={() => {
            playClickSound('high');
            setTotalCount(prev => prev + 5000);
          }}
          className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Inject 5,000 Messages</span>
        </button>
      </div>

      {/* Virtualized Chat Stream Window Simulation */}
      <div 
        className="h-64 rounded-lg border bg-black/40 overflow-y-auto p-3 space-y-2.5 relative"
        style={{ borderColor: 'var(--border-color)' }}
        onScroll={(e) => setScrollPos(Math.round(e.currentTarget.scrollTop))}
      >
        <div className="sticky top-0 right-0 z-10 flex justify-end">
          <span className="text-[10px] bg-black/80 backdrop-blur-xs text-slate-400 px-2 py-0.5 rounded border border-white/5">
            Scroll Offset: {scrollPos}px (DOM Recycling Active)
          </span>
        </div>

        {filtered.slice(0, 15).map((msg) => (
          <div 
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-0.5 text-[10px] text-slate-500">
              <span className={msg.isMe ? 'text-cyan-400 font-bold' : 'text-purple-400 font-bold'}>
                {msg.sender}
              </span>
              <span>{msg.time}</span>
              <span className="text-[9px] opacity-40">#{msg.id}</span>
            </div>
            <div 
              className={`rounded-xl px-3 py-2 text-xs max-w-[85%] border leading-relaxed ${
                msg.isMe 
                  ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-100 rounded-tr-none' 
                  : 'bg-slate-900/60 border-slate-700/40 text-slate-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>⚡ Zero Server Egress: All parsing executed locally in WebWorker heap.</span>
        <span className="text-emerald-400">Strict Sub-16ms Frame Budget</span>
      </div>
    </div>
  );
};
