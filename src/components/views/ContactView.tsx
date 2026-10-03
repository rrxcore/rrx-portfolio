import { useState } from 'react';
import { USER_PROFILE } from '../../data/portfolioData';
import { Mail, Send, CheckCircle2, MessageSquare, Copy, Check } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../icons/BrandIcons';
import confetti from 'canvas-confetti';
import { playClickSound } from '../../utils/audio';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playClickSound('high');
    setIsSent(true);

    // Launch celebratory confetti burst!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#a855f7', '#10b981', '#f59e0b']
    });

    // Auto trigger mailto
    const subject = encodeURIComponent(`Engineering Inquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.open(`mailto:${USER_PROFILE.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const copyEmail = () => {
    playClickSound('med');
    navigator.clipboard.writeText(USER_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 font-mono select-text">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
          <Mail className="h-4 w-4" />
          <span>DIRECT TRANSMISSION PROTOCOL</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Initialize Communication
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Open to high-impact systems engineering roles, applied AI research collaborations, and SIH discussions.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-start">
        {/* Contact Form */}
        <div 
          className="rounded-2xl border p-6 space-y-5"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-cyan-400" />
              <span>Send Secure Transmission</span>
            </h2>
            <span className="text-[10px] text-slate-500 font-mono">256-bit Direct Mailto Protocol</span>
          </div>

          {isSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Transmission Dispatched!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your email client was initiated. You can also reach out directly via LinkedIn or direct email.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-2 text-xs text-cyan-400 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Your Name / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera (Systems Lead)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-lg border bg-black/40 px-3 py-2 text-white placeholder-slate-600 outline-none focus:border-cyan-400 transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@engineering-domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg border bg-black/40 px-3 py-2 text-white placeholder-slate-600 outline-none focus:border-cyan-400 transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Transmission Payload (Message)</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Inquiry regarding low-latency systems engineering, SIH 2026 collaboration, or internship..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full rounded-lg border bg-black/40 px-3 py-2 text-white placeholder-slate-600 outline-none focus:border-cyan-400 transition-colors resize-none"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 font-bold text-black hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Send className="h-4 w-4" />
                <span>Transmit Message (with Confetti)</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels Sidebar */}
        <div className="space-y-4">
          <div 
            className="rounded-2xl border p-5 space-y-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)'
            }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2">
              Direct Contact Handles
            </h3>

            {/* Email Copier */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 block">Personal Email:</span>
              <button
                onClick={copyEmail}
                className="flex items-center justify-between w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-cyan-300 hover:border-cyan-400 transition-colors"
              >
                <span className="truncate">{USER_PROFILE.email}</span>
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 flex-none ml-2" /> : <Copy className="h-3.5 w-3.5 text-slate-400 flex-none ml-2" />}
              </button>
            </div>

            {/* LinkedIn Link */}
            <a
              href={USER_PROFILE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-blue-400 hover:border-blue-400 transition-colors"
              onClick={() => playClickSound('high')}
            >
              <span className="flex items-center gap-2">
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">/in/ritesh-rana-3187aa352</span>
            </a>

            {/* GitHub Link */}
            <a
              href={USER_PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-slate-200 hover:border-white/30 transition-colors"
              onClick={() => playClickSound('high')}
            >
              <span className="flex items-center gap-2">
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">@rrxcore</span>
            </a>
          </div>

          <div 
            className="rounded-2xl border p-4 text-xs text-slate-400 space-y-1 bg-black/30"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Response SLA</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Generally reply within 12-24 hours across email and LinkedIn.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
