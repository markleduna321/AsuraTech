import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Boxes, BrainCircuit, ChevronDown, Compass, FileCheck, Plug, ShieldCheck, Smartphone } from 'lucide-react';
import ArchitectureIllustration from './ArchitectureIllustration';
import { OFFERS, PRIMARY_CTA, SECONDARY_CTA, TRUST } from './engineeringData';
import { trackSpotlight, useInViewOnce, useMediaQuery, usePrefersReducedMotion } from '../platform/scrollHooks';

const ArchitectureScene = lazy(() => import('./ArchitectureScene'));

const OFFER_ICONS = { erp: Boxes, apps: Smartphone, ai: BrainCircuit, consult: Compass };
const TRUST_ICONS = [ShieldCheck, Plug, FileCheck];
const HOVER_INTENT_MS = 140;

class SceneBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error) {
        this.props.onError?.(error);
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

// `enabled` re-attaches the observer when the observed element mounts later (e.g. crossing the desktop breakpoint).
function useInView(ref, rootMargin = '0px', enabled = true) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!enabled || !el) {
            setInView(false);
            return undefined;
        }
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
        io.observe(el);
        return () => io.disconnect();
    }, [ref, rootMargin, enabled]);
    return inView;
}

const CHIP_CLASS = 'rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-slate-300';

function Chips({ chips, className = '', inline = false }) {
    // Inside a <button> only phrasing content is valid, so tabs render the chips as spans.
    if (inline) {
        return (
            <span className={`flex flex-wrap gap-1.5 ${className}`}>
                {chips.map((chip) => (
                    <span key={chip} className={CHIP_CLASS}>
                        {chip}
                    </span>
                ))}
            </span>
        );
    }
    return (
        <ul className={`flex flex-wrap gap-1.5 ${className}`}>
            {chips.map((chip) => (
                <li key={chip} className={CHIP_CLASS}>
                    {chip}
                </li>
            ))}
        </ul>
    );
}

// Desktop: vertical ARIA tabs that drive the architecture scene. Hover previews a zone; click or arrow keys select it.
function OfferTabs({ active, onSelect, onPreview }) {
    const tabRefs = useRef([]);
    const timerRef = useRef(0);
    const count = OFFERS.length;

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const onKeyDown = (e) => {
        let next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % count;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + count) % count;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = count - 1;
        if (next === null) return;
        e.preventDefault();
        onSelect(next);
        tabRefs.current[next]?.focus();
    };

    const previewSoon = (e, i) => {
        if (e.pointerType !== 'mouse') return;
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => onPreview(i), HOVER_INTENT_MS);
    };

    const endPreview = () => {
        window.clearTimeout(timerRef.current);
        onPreview(null);
    };

    return (
        <div role="tablist" aria-orientation="vertical" aria-label="Custom engineering services" onKeyDown={onKeyDown} onPointerLeave={endPreview} className="space-y-1">
            {OFFERS.map((offer, i) => {
                const selected = i === active;
                const Icon = OFFER_ICONS[offer.key];
                return (
                    <button
                        key={offer.key}
                        ref={(el) => {
                            tabRefs.current[i] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`eng-tab-${offer.key}`}
                        aria-selected={selected}
                        aria-controls="eng-stage-panel"
                        aria-labelledby={`eng-tab-title-${offer.key}`}
                        aria-describedby={`eng-tab-desc-${offer.key}`}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => onSelect(i)}
                        onPointerEnter={(e) => previewSoon(e, i)}
                        data-active={selected ? 'true' : 'false'}
                        className="eng-tab group relative block w-full rounded-xl py-4 pl-6 pr-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-300"
                    >
                        <span className="eng-tab-rail absolute bottom-4 left-0 top-4 w-px bg-white/10" aria-hidden="true">
                            <span className="eng-tab-bar absolute inset-0 origin-top bg-indigo-300 shadow-[0_0_12px_rgba(165,180,252,0.6)]" />
                        </span>
                        <span className="flex items-center gap-3">
                            <Icon className="eng-tab-icon h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                            <span id={`eng-tab-title-${offer.key}`} className="eng-tab-title text-lg font-semibold tracking-[-0.01em] text-white">
                                {offer.title}
                            </span>
                            <span className="ml-auto font-mono text-[11px] text-slate-400" aria-hidden="true">
                                0{i + 1}
                            </span>
                        </span>
                        <span className="eng-tab-body mt-1.5 block pl-7">
                            <span id={`eng-tab-desc-${offer.key}`} className="eng-tab-desc block text-sm leading-relaxed text-slate-300">
                                {offer.outcome}
                            </span>
                            <Chips chips={offer.chips} className="eng-tab-chips mt-3" inline />
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

// Mobile: accordion list under a fixed-angle illustration.
function OfferAccordion({ open, onToggle }) {
    return (
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {OFFERS.map((offer, i) => {
                const expanded = i === open;
                const Icon = OFFER_ICONS[offer.key];
                return (
                    <div key={offer.key}>
                        <h3>
                            <button
                                type="button"
                                id={`eng-acc-${offer.key}`}
                                aria-expanded={expanded}
                                aria-controls={`eng-acc-panel-${offer.key}`}
                                onClick={() => onToggle(i)}
                                className="flex w-full items-center gap-3 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-300"
                            >
                                <Icon className={`h-4 w-4 shrink-0 ${expanded ? 'text-indigo-300' : 'text-slate-400'}`} aria-hidden="true" />
                                <span className={`text-base font-semibold ${expanded ? 'text-white' : 'text-slate-300'}`}>{offer.title}</span>
                                <ChevronDown
                                    className={`ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                />
                            </button>
                        </h3>
                        <div id={`eng-acc-panel-${offer.key}`} role="region" aria-labelledby={`eng-acc-${offer.key}`} hidden={!expanded} className="pb-5 pl-7">
                            <p className="text-sm leading-relaxed text-slate-300">{offer.outcome}</p>
                            <Chips chips={offer.chips} className="mt-3" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function EngineeringSection() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const reduced = usePrefersReducedMotion();

    const headerRef = useRef(null);
    const stageRef = useRef(null);
    const trustRef = useRef(null);
    const headerRevealed = useInViewOnce(headerRef);
    const stageRevealed = useInViewOnce(stageRef);
    const trustRevealed = useInViewOnce(trustRef);
    // Mount WebGL within a screen of the stage and dispose it again once it is far away.
    const near = useInView(stageRef, '100% 0px 100% 0px', isDesktop);
    const inView = useInView(stageRef, '0px', isDesktop);

    const [active, setActive] = useState(0);
    const [preview, setPreview] = useState(null);
    const [open, setOpen] = useState(0);
    const [glReady, setGlReady] = useState(false);
    const [glFailed, setGlFailed] = useState(false);

    const useGl = isDesktop && !glFailed;
    const glVisible = useGl && near && glReady;
    const shown = OFFERS[preview ?? active];

    useEffect(() => {
        if (!near) setGlReady(false);
    }, [near]);

    const onGlReady = useCallback(() => setGlReady(true), []);
    const onGlError = useCallback(() => {
        setGlFailed(true);
        setGlReady(false);
    }, []);

    const onSelect = useCallback((i) => {
        setActive(i);
        setPreview(null);
    }, []);

    const onToggle = useCallback((i) => {
        setOpen((current) => (current === i ? null : i));
        setActive(i);
    }, []);

    return (
        <section id="engineering" aria-labelledby="engineering-heading" className="relative isolate bg-[#060a18] pb-32 [overflow-x:clip] lg:pb-40">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#060a18] via-slate-950 to-[#060a18]" aria-hidden="true" />
            <div className="eng-blueprint pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:gap-16 lg:px-8">
                <div ref={headerRef} className="stage" data-active={headerRevealed ? 'true' : 'false'}>
                    <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-indigo-300" style={{ '--d': '0s' }}>
                        Custom engineering
                    </p>
                    <h2
                        id="engineering-heading"
                        className="stage-in mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl"
                        style={{ '--d': '0.08s' }}
                    >
                        When off-the-shelf software doesn’t fit, we build what does.
                    </h2>
                    <p className="stage-in mt-6 max-w-[52ch] text-base leading-relaxed text-slate-400 sm:text-lg" style={{ '--d': '0.16s' }}>
                        Bespoke ERPs, full-stack apps, AI integrations and architecture guidance for teams with workflows no template can handle.
                    </p>

                    <div className="stage-in mt-10" style={{ '--d': '0.24s' }}>
                        {isDesktop ? (
                            <OfferTabs active={active} onSelect={onSelect} onPreview={setPreview} />
                        ) : (
                            <>
                                <div className="glass-panel relative mb-8 aspect-[32/25] w-full rounded-2xl p-4" aria-hidden="true">
                                    <ArchitectureIllustration focus={OFFERS[active].key} />
                                </div>
                                <OfferAccordion open={open} onToggle={onToggle} />
                            </>
                        )}
                    </div>

                    <div className="stage-in mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6" style={{ '--d': '0.32s' }}>
                        <a
                            href={PRIMARY_CTA.href}
                            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18]"
                        >
                            {PRIMARY_CTA.label}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                        </a>
                        <a
                            href={SECONDARY_CTA.href}
                            className="text-center text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:text-left"
                        >
                            {SECONDARY_CTA.label}
                        </a>
                    </div>
                </div>

                {isDesktop && (
                    <div ref={stageRef} className="stage" data-active={stageRevealed ? 'true' : 'false'}>
                        <div
                            role="tabpanel"
                            id="eng-stage-panel"
                            aria-labelledby={`eng-tab-title-${OFFERS[active].key}`}
                            className="stage-in"
                            style={{ '--d': '0.2s' }}
                        >
                            <div onPointerMove={trackSpotlight} className="glass-panel relative aspect-[11/10] w-full rounded-2xl">
                                <div className="eng-fade absolute inset-0 p-8" style={{ opacity: glVisible ? 0 : 1 }}>
                                    <ArchitectureIllustration focus={shown.key} />
                                </div>
                                {useGl && near && (
                                    <div className="eng-fade absolute inset-0" style={{ opacity: glReady ? 1 : 0 }}>
                                        <SceneBoundary onError={onGlError}>
                                            <Suspense fallback={null}>
                                                <ArchitectureScene focus={shown.key} running={inView} reduced={reduced} onReady={onGlReady} onError={onGlError} />
                                            </Suspense>
                                        </SceneBoundary>
                                    </div>
                                )}
                                <div className="pointer-events-none absolute inset-x-5 top-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400" aria-hidden="true">
                                    <span>System architecture</span>
                                    <span className="tabular-nums">
                                        0{OFFERS.indexOf(shown) + 1} / 0{OFFERS.length}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 font-mono text-xs leading-relaxed text-slate-400">{OFFERS[active].caption}</p>
                        </div>
                    </div>
                )}
            </div>

            <div ref={trustRef} className="stage mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-24 lg:px-8" data-active={trustRevealed ? 'true' : 'false'}>
                <ul className="grid grid-cols-1 gap-8 border-t border-white/[0.08] pt-10 sm:grid-cols-3">
                    {TRUST.map((item, i) => {
                        const Icon = TRUST_ICONS[i];
                        return (
                            <li key={item.title} className="stage-in flex gap-4" style={{ '--d': `${i * 0.08}s` }}>
                                <span className="glass-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-white">{item.title}</span>
                                    <span className="mt-1 block text-sm leading-relaxed text-slate-400">{item.detail}</span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
