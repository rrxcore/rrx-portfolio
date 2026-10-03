import { useState, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';

export const AudioDspDemo: React.FC = () => {
  const [pitch, setPitch] = useState(0); // semitones
  const [bufferFrames, setBufferFrames] = useState(64);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated DSP waveform loop
  useEffect(() => {
    let animId: number;
    let phase = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#06070c';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw primary audio carrier wave
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00f2fe';
      const freqMultiplier = 1 + (pitch / 24);

      for (let x = 0; x < width; x++) {
        const angle = (x * 0.03 * freqMultiplier) + phase;
        const harmonic = Math.sin((x * 0.08 * freqMultiplier) + phase * 1.5) * 12;
        const y = height / 2 + Math.sin(angle) * 35 + harmonic;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw secondary DSP harmonic formant wave
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#ec4899';
      for (let x = 0; x < width; x++) {
        const angle = (x * 0.05 * freqMultiplier) - phase * 0.8;
        const y = height / 2 + Math.sin(angle) * 20;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += 0.08;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [pitch]);

  const calculatedLatency = ((bufferFrames / 48000) * 1000 * 2).toFixed(1);

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
          <Volume2 className="h-4 w-4 text-cyan-400" />
          <span className="font-bold text-cyan-400">VoiceChangerPro V2 WASAPI Engine</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="rounded bg-black/40 px-2 py-0.5 text-cyan-400 font-semibold border border-cyan-500/20">
            Latency: {calculatedLatency} ms
          </span>
          <span className="rounded bg-black/40 px-2 py-0.5 text-emerald-400 font-semibold border border-emerald-500/20">
            Underruns: 0
          </span>
          <span className="rounded bg-black/40 px-2 py-0.5 text-purple-400 font-semibold border border-purple-500/20">
            MMCSS: Pro Audio
          </span>
        </div>
      </div>

      {/* Waveform Canvas */}
      <div className="my-3 rounded-lg overflow-hidden border border-cyan-500/30">
        <canvas 
          ref={canvasRef} 
          width={640} 
          height={140} 
          className="w-full h-[140px] block" 
        />
      </div>

      {/* DSP Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        <div className="space-y-1">
          <div className="flex justify-between text-slate-400 text-[11px]">
            <span>Real-Time Pitch Shift:</span>
            <span className="text-cyan-400 font-bold">{pitch > 0 ? `+${pitch}` : pitch} Semitones</span>
          </div>
          <input
            type="range"
            min="-12"
            max="12"
            value={pitch}
            onChange={(e) => setPitch(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-slate-400 text-[11px]">
            <span>WASAPI Exclusive Buffer Size:</span>
            <span className="text-emerald-400 font-bold">{bufferFrames} Frames</span>
          </div>
          <input
            type="range"
            min="64"
            max="256"
            step="64"
            value={bufferFrames}
            onChange={(e) => setBufferFrames(parseInt(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>⚡ Lock-Free SPSC queue guarantees 0 mutex contention on audio thread.</span>
        <span className="text-purple-400">48kHz / 32-bit Float</span>
      </div>
    </div>
  );
};
