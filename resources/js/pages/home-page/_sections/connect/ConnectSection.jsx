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

            <span className="flow-node relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[image:var(--aurora-deep)]" aria-hidden="true">
                <span className="flow-node-ring absolute inset-0 rounded-full" />
                <Icon className="relative h-4 w-4 text-white" />
            </span>

            <article
                aria-labelledby={`flow-${step.key}-title`}
                onPointerMove={trackSpotlight}
                className="flow-card glass-panel flex min-w-0 flex-1 flex-col rounded-2xl p-6 lg:w-full"
            >
                <span className="flow-num pointer-events-none absolute right-5 top-3 font-mono text-5xl font-semibold tabular-nums leading-none" aria-hidden="true">
                    0{index + 1}
                </span>

                <h3 id={`flow-${step.key}-title`} className="relative pr-14 text-xl font-semibold tracking-[-0.02em] text-black">
                    {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-plum-900">{step.benefit}</p>

                <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
                    {step.links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="flow-tag group inline-flex items-center gap-1.5 rounded-full border border-mauve-300 bg-white/60 px-3 py-1 text-xs font-medium text-plum-900 hover:border-plum-600 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-900 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
                            {link.label}
                            <ArrowDown
                                className="h-3 w-3 text-mauve-700 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
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
                        <th scope="col" className="px-5 pb-4 pt-6 text-xs font-medium uppercase tracking-[0.16em] text-mauve-700 sm:px-8">
                            <span className="font-mono text-plum-900">4</span> agencies
                        </th>
                        <th
                            scope="col"
                            className="relative border-l border-mauve-300/70 bg-plum-900/[0.06] px-5 pb-4 pt-6 text-xs font-medium uppercase tracking-[0.16em] text-plum-900 sm:px-8"
                        >
                            <span className="absolute inset-x-0 top-0 h-0.5 bg-[image:var(--aurora-deep)]" aria-hidden="true" />
                            <span className="font-mono">1</span> partner
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {COMPARISON.map((row, i) => (
                        <tr key={row.partner} className="stage-in border-t border-mauve-300/60" style={{ '--d': `${0.08 * i}s` }}>
                            <td className="px-5 py-4 align-top text-sm leading-snug text-mauve-700 sm:px-8">
                                <span className="flex gap-3">
                                    <X className="mt-0.5 h-4 w-4 shrink-0 text-mauve-700" aria-hidden="true" />
                                    <span>
                                        <span className="sr-only">Four agencies: </span>
                                        {row.agencies}
                                    </span>
                                </span>
                            </td>
                            <td className="border-l border-mauve-300/70 bg-plum-900/[0.06] px-5 py-4 align-top text-sm font-medium leading-snug text-black sm:px-8">
                                <span className="flex gap-3">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-800" aria-hidden="true" />
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
        <section id="connected" aria-labelledby="connected-heading" className="band-light relative isolate pb-32 [overflow-x:clip] lg:pb-40">
            {/* Plum + white blobs behind the glass cards; -z-10 keeps them under the (non-positioned) header */}
            <div className="glass-backdrop -z-10" aria-hidden="true" />

            <div ref={headerRef} className="stage mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" data-active={headerRevealed ? 'true' : 'false'}>
                <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-plum-900" style={{ '--d': '0s' }}>
                    <span className="mr-2.5 inline-block h-0.5 w-6 rounded-full bg-[image:var(--aurora-deep)] align-middle" aria-hidden="true" />
                    The unfair advantage
                </p>
                <h2
                    id="connected-heading"
                    className="stage-in mx-auto mt-4 max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-black sm:text-5xl lg:text-6xl"
                    style={{ '--d': '0.08s' }}
                >
                    One partner. One connected system. Zero hand-offs.
                </h2>
                <p className="stage-in mx-auto mt-6 max-w-[54ch] text-base leading-relaxed text-plum-900 sm:text-lg" style={{ '--d': '0.16s' }}>
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
                        className="aurora-btn group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold text-white focus-visible:outline-none sm:w-auto"
                    >
                        Start Automating
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                    </a>
                    <a
                        href="#get-started"
                        className="glass-card inline-flex w-full items-center justify-center whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold text-plum-900 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-900 focus-visible:ring-offset-2 focus-visible:ring-offset-mauve-500 sm:w-auto"
                    >
                        Book a Consultation
                    </a>
                </div>
            </div>
        </section>
    );
}
