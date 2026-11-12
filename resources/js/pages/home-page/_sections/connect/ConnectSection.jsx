import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, LayoutDashboard, MessagesSquare, Radar, ShieldCheck, X } from 'lucide-react';
import { COMPARISON, STEPS } from './connectData';
import { trackSpotlight, useInViewOnce } from '../platform/scrollHooks';

const STEP_ICONS = {
    leads: Radar,
    nurture: MessagesSquare,
    operations: LayoutDashboard,
    scale: ShieldCheck,
};

// True while the element is on screen; used to pause the idle pulse loop when scrolled away.
function useOnScreen(ref) {
    const [onScreen, setOnScreen] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || !('IntersectionObserver' in window)) return undefined;
        const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
        io.observe(el);
        return () => io.disconnect();
    }, [ref]);
    return onScreen;
}

// Line segment from this step's node to the next one, with a one-off intro pulse and a soft idle loop.
function Segment() {
    return (
        <span className="flow-seg" aria-hidden="true">
            <span className="flow-seg-line" />
            <span className="flow-seg-run flow-seg-run--intro">
                <span className="flow-dot" />
            </span>
            <span className="flow-seg-run flow-seg-run--idle">
                <span className="flow-dot" />
            </span>
        </span>
    );
}

function Step({ step, index, last }) {
    const Icon = STEP_ICONS[step.key];
    const next = STEPS[index + 1];

    return (
        <li
            className="flow-step stage-in relative flex gap-5 lg:flex-col lg:items-center lg:gap-6"
            style={{ '--d': `${0.1 * index}s`, '--i': index, '--accent': step.accent, '--next': next?.accent ?? step.accent }}
        >
            {!last && <Segment />}

            <span className="flow-node relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#060a18]" aria-hidden="true">
                <span className="flow-node-ring absolute inset-0 rounded-full" />
                <span className="absolute inset-0 rounded-full bg-[rgb(var(--accent)/0.1)] ring-1 ring-[rgb(var(--accent)/0.45)]" />
                <Icon className="relative h-4 w-4 text-[rgb(var(--accent))]" />
            </span>

            <article
                aria-labelledby={`flow-${step.key}-title`}
                onPointerMove={trackSpotlight}
                className="flow-card glass-panel flex min-w-0 flex-1 flex-col rounded-2xl p-6 lg:w-full"
            >
                <span className="flow-num pointer-events-none absolute right-5 top-3 font-mono text-5xl font-semibold tabular-nums leading-none" aria-hidden="true">
                    0{index + 1}
                </span>

                <h3 id={`flow-${step.key}-title`} className="relative pr-14 text-xl font-semibold tracking-[-0.02em] text-white">
                    {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{step.benefit}</p>

                <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
                    {step.links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="flow-tag group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-200 hover:border-[rgb(var(--accent)/0.5)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18]"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
                            {link.label}
                            <ArrowDown
                                className="h-3 w-3 text-slate-400 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
                                aria-hidden="true"
                            />
                        </a>
                    ))}
                </div>
            </article>
        </li>
    );
}

function Comparison() {
    return (
        <div className="glass-panel overflow-hidden rounded-2xl">
            <table className="relative w-full table-fixed border-collapse text-left">
                <caption className="sr-only">Working with four separate agencies compared with one partner</caption>
                <thead>
                    <tr>
                        <th scope="col" className="px-5 pb-4 pt-6 text-xs font-medium uppercase tracking-[0.16em] text-slate-400 sm:px-8">
                            <span className="font-mono text-slate-300">4</span> agencies
                        </th>
                        <th
                            scope="col"
                            className="border-l border-white/10 bg-indigo-500/[0.06] px-5 pb-4 pt-6 text-xs font-medium uppercase tracking-[0.16em] text-indigo-300 sm:px-8"
                        >
                            <span className="font-mono">1</span> partner
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {COMPARISON.map((row, i) => (
                        <tr key={row.partner} className="stage-in border-t border-white/[0.06]" style={{ '--d': `${0.08 * i}s` }}>
                            <td className="px-5 py-4 align-top text-sm leading-snug text-slate-400 sm:px-8">
                                <span className="flex gap-3">
                                    <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                                    <span>
                                        <span className="sr-only">Four agencies: </span>
                                        {row.agencies}
                                    </span>
                                </span>
                            </td>
                            <td className="border-l border-white/10 bg-indigo-500/[0.06] px-5 py-4 align-top text-sm font-medium leading-snug text-white sm:px-8">
                                <span className="flex gap-3">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-300" aria-hidden="true" />
                                    <span>
                                        <span className="sr-only">One partner: </span>
                                        {row.partner}
                                    </span>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function ConnectSection() {
    const headerRef = useRef(null);
    const flowRef = useRef(null);
    const compareRef = useRef(null);
    const headerRevealed = useInViewOnce(headerRef);
    const flowRevealed = useInViewOnce(flowRef, { threshold: 0.3 });
    const compareRevealed = useInViewOnce(compareRef);
    const flowOnScreen = useOnScreen(flowRef);

    return (
        <section id="connected" aria-labelledby="connected-heading" className="relative isolate bg-[#060a18] pb-32 [overflow-x:clip] lg:pb-40">
            <div className="eng-blueprint pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

            <div ref={headerRef} className="stage mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" data-active={headerRevealed ? 'true' : 'false'}>
                <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-indigo-300" style={{ '--d': '0s' }}>
                    The unfair advantage
                </p>
                <h2
                    id="connected-heading"
                    className="stage-in mx-auto mt-4 max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
                    style={{ '--d': '0.08s' }}
                >
                    One partner. One connected system. Zero hand-offs.
                </h2>
                <p className="stage-in mx-auto mt-6 max-w-[54ch] text-base leading-relaxed text-slate-400 sm:text-lg" style={{ '--d': '0.16s' }}>
                    From the first lead to the servers it all runs on, every step is built by the same team to work with the next.
                </p>
            </div>

            <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:px-8">
                <ol
                    ref={flowRef}
                    role="list"
                    aria-label="How everything connects"
                    className="flow stage grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6"
                    data-active={flowRevealed ? 'true' : 'false'}
                    data-running={flowOnScreen ? 'true' : 'false'}
                >
                    {STEPS.map((step, i) => (
                        <Step key={step.key} step={step} index={i} last={i === STEPS.length - 1} />
                    ))}
                </ol>
            </div>

            <div
                ref={compareRef}
                className="stage mx-auto mt-24 max-w-4xl px-4 sm:px-6 lg:mt-32 lg:px-8"
                data-active={compareRevealed ? 'true' : 'false'}
            >
                <Comparison />

                <div className="stage-in mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4" style={{ '--d': '0.4s' }}>
                    <a
                        href="#get-started"
                        className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18] sm:w-auto"
                    >
                        Start Automating
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                    </a>
                    <a
                        href="#get-started"
                        className="glass-chip inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18] sm:w-auto"
                    >
                        Book a Consultation
                    </a>
                </div>
            </div>
        </section>
    );
}
