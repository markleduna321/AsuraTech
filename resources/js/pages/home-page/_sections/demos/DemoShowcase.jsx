import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import CredentialsChip from '@/components/ui/CredentialsChip';
import { DEMOS, ROTATE_MS, TRUST_LINE, WALKTHROUGH_URL } from '@/features/demos/demoData';
import DemoTabs from './DemoTabs';
import DeviceStage from './DeviceStage';
import { trackSpotlight, useInViewOnce, useMediaQuery, usePrefersReducedMotion } from '../platform/scrollHooks';

const DemoBackdrop = lazy(() => import('./DemoBackdrop'));

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

function useInView(ref, rootMargin = '0px') {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
        io.observe(el);
        return () => io.disconnect();
    }, [ref, rootMargin]);
    return inView;
}

function DemoPanel({ demo, selected, revealed, waking, onLaunch }) {
    const rise = (i) => ({ '--d': `${i * 0.06}s` });

    return (
        <div
            role="tabpanel"
            id={`demo-panel-${demo.key}`}
            aria-labelledby={`demo-tab-${demo.key}`}
            hidden={!selected}
            className="stage"
            data-active={revealed ? 'true' : 'false'}
        >
            <p className="demo-rise text-xs font-medium uppercase tracking-[0.18em] text-indigo-300" style={rise(0)}>
                {demo.eyebrow} · {demo.product}
            </p>
            <h3 className="demo-rise mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl" style={rise(1)}>
                {demo.outcome}
            </h3>
            <ul className="mt-8 space-y-4">
                {demo.bullets.map((bullet, i) => (
                    <li key={bullet} className="demo-rise flex gap-3 text-base leading-relaxed text-slate-300" style={rise(2 + i)}>
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
                            <Check className="h-3 w-3 text-slate-300" aria-hidden="true" />
                        </span>
                        {bullet}
                    </li>
                ))}
            </ul>

            <div className="demo-rise mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center" style={rise(5)}>
                <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener"
                    onClick={() => onLaunch(demo.key)}
                    className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18] sm:w-auto"
                >
                    {demo.launchLabel}
                    <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                </a>
                {demo.credentials && <CredentialsChip credentials={demo.credentials} />}
                {WALKTHROUGH_URL && (
                    <a
                        href={WALKTHROUGH_URL}
                        className="text-center text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:text-left"
                    >
                        Book a walkthrough
                    </a>
                )}
            </div>

            <p role="status" className="mt-4 min-h-[1.25rem] text-sm text-slate-400">
                {waking && (
                    <span className="demo-wake inline-flex items-center gap-2">
                        <span className="flex gap-1" aria-hidden="true">
                            <span className="demo-wake-dot h-1.5 w-1.5 rounded-full bg-indigo-300" />
                            <span className="demo-wake-dot h-1.5 w-1.5 rounded-full bg-indigo-300" style={{ animationDelay: '0.2s' }} />
                            <span className="demo-wake-dot h-1.5 w-1.5 rounded-full bg-indigo-300" style={{ animationDelay: '0.4s' }} />
                        </span>
                        Waking up the demo… it opens in a new tab and can take a few seconds the first time.
                    </span>
                )}
            </p>
            {TRUST_LINE && <p className="text-xs text-slate-500">{TRUST_LINE}</p>}
        </div>
    );
}

export default function DemoShowcase() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
    const reduced = usePrefersReducedMotion();

    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardRef = useRef(null);
    const headerRevealed = useInViewOnce(headerRef);
    const cardRevealed = useInViewOnce(cardRef);
    const near = useInViewOnce(sectionRef, { threshold: 0, rootMargin: '50% 0px 50% 0px' });
    const inView = useInView(cardRef);

    const [active, setActive] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [hovered, setHovered] = useState(false);
    const [waking, setWaking] = useState(null);
    const [glReady, setGlReady] = useState(false);
    const [glFailed, setGlFailed] = useState(false);

    const rotating = autoplay && !reduced;
    const useGl = isDesktop && !reduced && !glFailed;

    useEffect(() => {
        if (!waking) return undefined;
        const id = window.setTimeout(() => setWaking(null), 8000);
        return () => window.clearTimeout(id);
    }, [waking]);

    // A fresh object per click restarts the 8s timer even when the same demo is launched again.
    const onLaunch = useCallback((key) => setWaking({ key }), []);

    const stopRotation = useCallback(() => setAutoplay(false), []);
    const onRotateEnd = useCallback(() => setActive((i) => (i + 1) % DEMOS.length), []);
    const onGlError = useCallback(() => {
        setGlFailed(true);
        setGlReady(false);
    }, []);
    const onGlReady = useCallback(() => setGlReady(true), []);

    const tint = DEMOS[active].tint;

    return (
        <section
            id="demos"
            ref={sectionRef}
            aria-labelledby="demos-heading"
            className="relative isolate bg-[#060a18] pb-32 [overflow-x:clip] lg:pb-40"
            onPointerDown={stopRotation}
            onKeyDown={stopRotation}
            onFocus={stopRotation}
        >
            <div className="noise-overlay pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

            <div ref={headerRef} className="stage mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" data-active={headerRevealed ? 'true' : 'false'}>
                <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-indigo-300" style={{ '--d': '0s' }}>
                    Live demos
                </p>
                <h2
                    id="demos-heading"
                    className="stage-in mx-auto mt-4 max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
                    style={{ '--d': '0.08s' }}
                >
                    Click around the real thing.
                </h2>
                <p className="stage-in mx-auto mt-6 max-w-[56ch] text-base leading-relaxed text-slate-400 sm:text-lg" style={{ '--d': '0.16s' }}>
                    Three turnkey systems, running live right now. Open one in a new tab and see how it works.
                </p>
            </div>

            <div
                className="relative mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8"
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                {/* Ambient glow: CSS layers always available, WebGL replaces them on desktop once ready */}
                <div className="pointer-events-none absolute -inset-x-[12%] -bottom-24 top-16 -z-10" aria-hidden="true">
                    {DEMOS.map((demo, i) => (
                        <div
                            key={demo.key}
                            className="demo-glow absolute inset-0"
                            style={{
                                opacity: i === active && !(glReady && useGl) ? 1 : 0,
                                background: `radial-gradient(42% 46% at ${isDesktop ? '66%' : '50%'} ${isDesktop ? '55%' : '30%'}, rgb(${demo.tint.css} / 0.16), transparent 70%)`,
                            }}
                        />
                    ))}
                    {useGl && near && (
                        <div className="demo-glow absolute inset-0" style={{ opacity: glReady ? 1 : 0 }}>
                            <SceneBoundary onError={onGlError}>
                                <Suspense fallback={null}>
                                    <DemoBackdrop tint={tint.gl} running={inView} onReady={onGlReady} onError={onGlError} />
                                </Suspense>
                            </SceneBoundary>
                        </div>
                    )}
                </div>

                <DemoTabs
                    demos={DEMOS}
                    active={active}
                    onSelect={(i) => {
                        setAutoplay(false);
                        setActive(i);
                    }}
                    rotating={rotating}
                    paused={hovered || !inView}
                    durationMs={ROTATE_MS}
                    onRotateEnd={onRotateEnd}
                    reduced={reduced}
                />

                <div
                    ref={cardRef}
                    onPointerMove={trackSpotlight}
                    className="glass-panel mt-8 rounded-2xl p-5 sm:p-8 lg:p-12"
                >
                    <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
                        <div className="lg:order-2">
                            <DeviceStage
                                demos={DEMOS}
                                active={active}
                                revealed={cardRevealed}
                                reduced={reduced}
                                desktop={isDesktop}
                                tilt={isDesktop && finePointer && !reduced}
                            />
                        </div>
                        <div className="lg:order-1">
                            {DEMOS.map((demo, i) => (
                                <DemoPanel
                                    key={demo.key}
                                    demo={demo}
                                    selected={i === active}
                                    revealed={cardRevealed}
                                    waking={waking?.key === demo.key}
                                    onLaunch={onLaunch}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
