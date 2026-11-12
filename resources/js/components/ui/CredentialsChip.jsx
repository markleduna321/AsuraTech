import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CredentialsChip({ credentials }) {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef(0);
    const text = `${credentials.email} / ${credentials.password}`;

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="glass-chip inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-left font-mono text-xs text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
        >
            <span className="truncate">Demo login: {text}</span>
            {copied ? <Check className="h-3.5 w-3.5 shrink-0 text-indigo-300" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            <span className="sr-only" aria-live="polite">
                {copied ? 'Copied to clipboard' : 'Copy demo login'}
            </span>
        </button>
    );
}
