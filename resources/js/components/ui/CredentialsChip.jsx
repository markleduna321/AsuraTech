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
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-plum-800 bg-plum-900/60 px-3 py-1.5 text-left font-mono text-xs text-mist transition-colors hover:border-plum-600 hover:bg-plum-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
        >
            <span className="truncate">
                <span className="text-mauve-300">Demo login:</span> {text}
            </span>
            {copied ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-magenta-400" aria-hidden="true" />
            ) : (
                <Copy className="h-3.5 w-3.5 shrink-0 text-mauve-300" aria-hidden="true" />
            )}
            <span className="sr-only" aria-live="polite">
                {copied ? 'Copied to clipboard' : 'Copy demo login'}
            </span>
        </button>
    );
}
