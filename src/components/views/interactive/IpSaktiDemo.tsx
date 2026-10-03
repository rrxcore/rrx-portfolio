import { useState } from 'react';
import { ShieldCheck, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { playClickSound } from '../../../utils/audio';

interface QueryResult {
  formulation: string;
  tkdlMatch: string;
  section3p: 'BARRED' | 'CONDITIONAL' | 'CLEARED';
  nbaRequired: boolean;
  bm25Score: number;
  denseScore: number;
  rrfScore: number;
  recommendation: string;
}

export const IpSaktiDemo: React.FC = () => {
  const [queryInput, setQueryInput] = useState('Curcuma longa (Turmeric) & Azadirachta indica (Neem) topical formulation');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<QueryResult>({
    formulation: 'Curcuma longa (Turmeric) & Azadirachta indica (Neem) topical formulation',
    tkdlMatch: 'TKDL-AYUR/2004/VOL-II/FOLIO-412 (Haridra-Nimba Lepa)',
    section3p: 'BARRED',
    nbaRequired: true,
    bm25Score: 0.942,
    denseScore: 0.918,
    rrfScore: 0.934,
    recommendation: 'Direct statutory violation of Section 3(p). Inventions based on traditional knowledge are non-patentable subject matter. Auto-generating Section 3(p) Defense Dossier.'
  });

  const sampleQueries = [
    {
      title: 'Turmeric + Neem Formulation',
      query: 'Curcuma longa (Turmeric) & Azadirachta indica (Neem) topical formulation',
      match: 'TKDL-AYUR/2004/VOL-II/FOLIO-412 (Haridra-Nimba Lepa)',
      sec3p: 'BARRED' as const,
      nba: true,
      bm25: 0.942,
      dense: 0.918,
      rrf: 0.934,
      rec: 'Direct statutory violation of Section 3(p). Claimed combination exists in Charaka Samhita. Defense dossier auto-compiled.'
    },
    {
      title: 'Ashwagandha + Synthetic Ester',
      query: 'Withania somnifera (Ashwagandha) extract conjugated with synthetic ethyl ester',
      match: 'TKDL-AYUR/2009/VOL-IV/FOLIO-108 (Ashwagandha Rasayana)',
      sec3p: 'CONDITIONAL' as const,
      nba: true,
      bm25: 0.728,
      dense: 0.841,
      rrf: 0.795,
      rec: 'Requires empirical proof under Section 3(e) (synergistic efficacy exceeding mere aggregate of properties). Mandatory NBA Form III filing.'
    },
    {
      title: 'Novel Synthetic Molecule',
      query: 'Fully synthetic quinoline-based kinase inhibitor with zero botanical source',
      match: 'No TKDL Citations Found',
      sec3p: 'CLEARED' as const,
      nba: false,
      bm25: 0.082,
      dense: 0.124,
      rrf: 0.103,
      rec: 'No traditional knowledge conflict. Cleared from Section 3(p) bar. Standard patent prosecution rules apply.'
    }
  ];

  const runAnalysis = (sample = sampleQueries[0]) => {
    playClickSound('high');
    setIsAnalyzing(true);
    setQueryInput(sample.query);

    setTimeout(() => {
      setResult({
        formulation: sample.query,
        tkdlMatch: sample.match,
        section3p: sample.sec3p,
        nbaRequired: sample.nba,
        bm25Score: sample.bm25,
        denseScore: sample.dense,
        rrfScore: sample.rrf,
        recommendation: sample.rec
      });
      setIsAnalyzing(false);
    }, 450);
  };

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
          <ShieldCheck className="h-4 w-4 text-amber-400" />
          <span className="font-bold text-amber-400">IP-SAKTI Statutory RAG Verification Engine</span>
          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-300 font-bold border border-amber-500/40">
            SIH 2026 Core
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Dual-Stream: <span className="text-cyan-400">BM25</span> + <span className="text-purple-400">Dense Cosine RRF</span>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="flex flex-wrap items-center gap-2 my-3">
        <span className="text-[11px] text-slate-500">Test Patents:</span>
        {sampleQueries.map((s, idx) => (
          <button
            key={idx}
            onClick={() => runAnalysis(s)}
            className="rounded-lg border px-2.5 py-1 text-[11px] text-slate-300 transition-colors hover:border-amber-400 hover:text-white"
            style={{
              backgroundColor: 'black/30',
              borderColor: 'var(--border-color)'
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Query Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder="Enter formulation / patent claims for statutory defense check..."
          className="flex-1 rounded-lg border bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 transition-colors"
          style={{ borderColor: 'var(--border-color)' }}
        />
        <button
          onClick={() => runAnalysis()}
          disabled={isAnalyzing}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 font-bold text-black hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          <Search className="h-3.5 w-3.5" />
          <span>{isAnalyzing ? 'Scanning...' : 'Verify'}</span>
        </button>
      </div>

      {/* Statutory Defense Analysis Dossier Output */}
      <div 
        className="rounded-lg border bg-black/50 p-4 space-y-3"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Section 3(p) Traditional Knowledge Bar:</span>
            {result.section3p === 'BARRED' && (
              <span className="rounded bg-red-500/20 px-2 py-0.5 font-bold text-red-400 border border-red-500/30 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> STATUTORY BAR APPLICABLE
              </span>
            )}
            {result.section3p === 'CONDITIONAL' && (
              <span className="rounded bg-yellow-500/20 px-2 py-0.5 font-bold text-yellow-400 border border-yellow-500/30">
                CONDITIONAL EVIDENCE REQUIRED
              </span>
            )}
            {result.section3p === 'CLEARED' && (
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" /> CLEARED OF TKDL BAR
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-400">BM25: <b className="text-cyan-400">{result.bm25Score}</b></span>
            <span className="text-slate-400">Dense: <b className="text-purple-400">{result.denseScore}</b></span>
            <span className="text-slate-400">RRF Score: <b className="text-amber-400">{result.rrfScore}</b></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
          <div>
            <span className="text-slate-500">TKDL Prior Art Citation:</span>
            <div className="text-amber-200 mt-0.5 font-semibold">{result.tkdlMatch}</div>
          </div>
          <div>
            <span className="text-slate-500">Biological Diversity Act (BDA 2002/2023):</span>
            <div className={`mt-0.5 font-semibold ${result.nbaRequired ? 'text-red-400' : 'text-emerald-400'}`}>
              {result.nbaRequired ? 'Mandatory NBA Form III Approval Required' : 'Exempt from NBA Jurisdiction'}
            </div>
          </div>
        </div>

        <div className="rounded bg-white/5 p-2.5 text-[11px] leading-relaxed border border-white/5">
          <span className="text-slate-400 font-bold block mb-1">⚖️ Statutory Action & Recommendations:</span>
          <span className="text-slate-200">{result.recommendation}</span>
        </div>
      </div>
    </div>
  );
};
