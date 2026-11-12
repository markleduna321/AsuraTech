import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Zap } from 'lucide-react';
import { PLATFORM_INCLUDES, PLATFORM_PRICE, STACK_TOOLS, STACK_TOTAL } from './platformData';
import { clamp01, easeInOutCubic, easeOutExpo, smoothstep, trackSpotlight } from './scrollHooks';

const CollapseScene = lazy(() => import('./CollapseScene'));

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

const money = (n) => `$${n.toLocaleString('en-US')}`;

function PriceLine() {
    return (
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <s className="font-mono text-sm tabular-nums text-slate-500">{money(STACK_TOTAL)}/mo</s>
            <span className="text-slate-600" aria-hidden="true">→</span>
            {PLATFORM_PRICE ? (
                <span className="font-mono text-2xl font-semibold tabular-nums text-white">{PLATFORM_PRICE}</span>
            ) : (
                <span className="text-lg font-semibold tracking-[-0.01em] text-white">One plan. One bill.</span>
            )}
        </p>
    );
}

function PlatformCard({ className = '', style, cardRef }) {
    return (
        <div
            ref={cardRef}
            onPointerMove={trackSpotlight}
            className={`glass-panel w-full max-w-[420px] rounded-2xl p-6 sm:p-7 ${className}`}
            style={style}
        >
            <div className="relative">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-[0_0_24px_rgba(129,140,248,0.45)]">
                        <Zap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">All-in-one</p>
                        <p className="text-base font-semibold tracking-[-0.01em] text-white">AsuraTECH Automation Platform</p>
                    </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Included in the platform">
                    {PLATFORM_INCLUDES.map((item) => (
                        <li key={item} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                            <Check className="h-3 w-3 text-slate-500" aria-hidden="true" />
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="mt-6 border-t border-white/[0.08] pt-5">
                    <PriceLine />
                </div>
            </div>
        </div>
    );
}

function ToolChipContent({ tool }) {
    return (
        <>
            <span className="text-sm font-medium text-slate-200">{tool.label}</span>
            <span className="font-mono text-xs tabular-nums text-slate-500">${tool.price}/mo</span>
        </>
    );
}

function Counter({ totalRef, strikeRef, wrapRef, className = '' }) {
    return (
        <div ref={wrapRef} className={`text-right ${className}`}>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Monthly tool spend</p>
            <p className="relative mt-1 inline-block font-mono text-3xl font-semibold tabular-nums tracking-tight text-white" aria-hidden="true">
                <span ref={totalRef}>$0</span>
                <span className="text-base text-slate-500">/mo</span>
                <span ref={strikeRef} className="absolute left-0 right-0 top-1/2 h-px origin-left scale-x-0 bg-slate-300" />
            </p>
            <p className="sr-only">Typical total: {money(STACK_TOTAL)} per month across {STACK_TOOLS.length} tools.</p>
        </div>
    );
}

// ---------- Desktop: pinned, scroll-scrubbed collapse with WebGL plates ----------

function computeDesktop(p, t, W, H, sizes) {
    let total = 0;
    let merge = 0;
    const chips = STACK_TOOLS.map((tool, i) => {
        const appear = easeOutExpo(clamp01((p - 0.02 - i * 0.03) / 0.1));
        const conv = easeInOutCubic(clamp01((p - 0.4 - i * 0.02) / 0.2));
        const settle = 1 - conv;
        const sx = tool.x * W;
        const sy = tool.y * H;
        const swirl = Math.sin(Math.PI * conv) * 0.22;
        const fx = Math.sin(t * 0.6 + i * 1.7) * 5 * settle;
        const fy = Math.cos(t * 0.5 + i * 2.3) * 6 * settle;
        total += tool.price * appear;
        merge += conv;
        const [w, h] = sizes[i] || [160, 40];
        return {
            x: sx * settle - sy * swirl + fx,
            y: sy * settle + sx * swirl + fy + 18 * (1 - appear),
            s: (0.94 + 0.06 * appear) * (1 - 0.72 * conv),
            alpha: appear * (1 - smoothstep(0.7, 1, conv)),
            glow: conv * (1 - smoothstep(0.85, 1, conv)),
            line: appear * Math.sin(Math.PI * conv),
            w,
            h,
        };
    });
    merge /= STACK_TOOLS.length;
    const card = easeOutExpo(clamp01((p - 0.74) / 0.16));
    return {
        chips,
        total: Math.round(total),
        merge,
        card,
        strike: smoothstep(0.42, 0.7, p),
        coreIntensity: 0.16 + 0.84 * smoothstep(0.05, 1, merge) - 0.3 * card,
        time: t,
    };
}

function DesktopCollapse() {
    const containerRef = useRef(null);
    const stickyRef = useRef(null);
    const stageRef = useRef(null);
    const chipRefs = useRef([]);
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const totalRef = useRef(null);
    const strikeRef = useRef(null);
    const counterRef = useRef(null);
    const cap1Ref = useRef(null);
    const cap2Ref = useRef(null);
    const apiRef = useRef(null);
    const dims = useRef({ W: 0, H: 0, sizes: [] });
    const [near, setNear] = useState(false);
    const [glOn, setGlOn] = useState(false);
    const [glFailed, setGlFailed] = useState(false);

    const handleReady = useCallback((api) => {
        apiRef.current = api;
        if (api) api.resize(dims.current.W, dims.current.H);
        setGlOn(Boolean(api));
    }, []);

    const handleError = useCallback((error) => {
        apiRef.current = null;
        setGlOn(false);
        setGlFailed(true);
        if (import.meta.env.DEV) console.warn('[Platform] collapse scene unavailable, using HTML chips.', error);
    }, []);

    // Mount the WebGL layer only around this beat; unmounting disposes it once scrolled past.
    useEffect(() => {
        const el = containerRef.current;
        if (!el || !('IntersectionObserver' in window)) return undefined;
        const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '60% 0px 60% 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const stage = stageRef.current;
        if (!container || !stage) return undefined;

        let raf = 0;
        let inView = false;
        let smooth = null;

        const measure = () => {
            dims.current = {
                W: stage.clientWidth,
                H: stage.clientHeight,
                sizes: chipRefs.current.map((el) => (el ? [el.offsetWidth, el.offsetHeight] : [160, 40])),
            };
            apiRef.current?.resize(dims.current.W, dims.current.H);
        };

        const frame = (now) => {
            raf = requestAnimationFrame(frame);
            const rect = container.getBoundingClientRect();
            const vh = window.innerHeight;
            const start = vh * 0.6;
            const span = start + rect.height - stickyRef.current.offsetHeight;
            const target = clamp01((start - rect.top) / span);
            smooth = smooth === null ? target : smooth + (target - smooth) * 0.12;
            if (Math.abs(target - smooth) < 0.0004) smooth = target;

            const { W, H, sizes } = dims.current;
            const state = computeDesktop(smooth, now / 1000, W, H, sizes);

            state.chips.forEach((c, i) => {
                const el = chipRefs.current[i];
                if (!el) return;
                el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${c.s.toFixed(4)})`;
                el.style.opacity = c.alpha.toFixed(3);
            });
            totalRef.current.textContent = money(state.total);
            strikeRef.current.style.transform = `scaleX(${state.strike.toFixed(3)})`;
            counterRef.current.style.opacity = (1 - 0.55 * state.strike).toFixed(3);
            cap1Ref.current.style.opacity = (1 - smoothstep(0.42, 0.58, smooth)).toFixed(3);
            cap2Ref.current.style.opacity = smoothstep(0.7, 0.86, smooth).toFixed(3);
            glowRef.current.style.opacity = (0.3 + 0.7 * state.merge).toFixed(3);
            glowRef.current.style.transform = `translate(-50%, -50%) scale(${(0.75 + 0.35 * state.merge).toFixed(3)})`;
            const card = cardRef.current;
            card.style.opacity = state.card.toFixed(3);
            card.style.transform = `translate(-50%, -50%) translateY(${(14 * (1 - state.card)).toFixed(2)}px) scale(${(0.94 + 0.06 * state.card).toFixed(4)})`;
            card.style.pointerEvents = state.card > 0.5 ? 'auto' : 'none';
            card.style.visibility = state.card > 0.001 ? 'visible' : 'hidden';

            apiRef.current?.render(state);
        };

        const start = () => {
            if (!raf && inView && !document.hidden) raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(stage);
        const io = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) start();
            else stop();
        });
        io.observe(container);
        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            stop();
            ro.disconnect();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative mt-16 h-[240vh]">
            <div ref={stickyRef} className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
                <div className="mx-auto flex h-full max-w-7xl flex-col px-8 py-8">
                    <div ref={stageRef} data-gl={glOn ? 'true' : 'false'} className="pc-stage relative flex-1">
                        {/* Faint engineering grid, same as the hero */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(165,180,252,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(165,180,252,0.9) 1px, transparent 1px)',
                                backgroundSize: '48px 48px',
                            }}
                            aria-hidden="true"
                        />
                        <div
                            ref={glowRef}
                            className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.32)_0%,rgba(79,70,229,0.1)_40%,transparent_70%)] blur-2xl"
                            style={{ opacity: 0.3, transform: 'translate(-50%, -50%) scale(0.75)' }}
                            aria-hidden="true"
                        />

                        {near && !glFailed && (
                            <SceneBoundary onError={handleError}>
                                <Suspense fallback={null}>
                                    <CollapseScene count={STACK_TOOLS.length} onReady={handleReady} onError={handleError} />
                                </Suspense>
                            </SceneBoundary>
                        )}

                        <div className="absolute left-0 top-0 grid">
                            <p ref={cap1Ref} className="[grid-area:1/1] text-sm text-slate-400">
                                <span className="font-mono tabular-nums text-slate-200">{STACK_TOOLS.length}</span> tools ·{' '}
                                <span className="font-mono tabular-nums text-slate-200">{STACK_TOOLS.length}</span> logins ·{' '}
                                <span className="font-mono tabular-nums text-slate-200">{STACK_TOOLS.length}</span> bills
                            </p>
                            <p ref={cap2Ref} className="[grid-area:1/1] text-sm text-slate-200" style={{ opacity: 0 }}>
                                One platform, connected end to end.
                            </p>
                        </div>

                        <Counter wrapRef={counterRef} totalRef={totalRef} strikeRef={strikeRef} className="absolute right-0 top-0" />

                        <ul aria-label="A typical stack of separate subscriptions">
                            {STACK_TOOLS.map((tool, i) => (
                                <li
                                    key={tool.label}
                                    ref={(el) => {
                                        chipRefs.current[i] = el;
                                    }}
                                    className="pc-chip absolute left-1/2 top-1/2 flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 will-change-transform"
                                    style={{ opacity: 0 }}
                                >
                                    <ToolChipContent tool={tool} />
                                </li>
                            ))}
                        </ul>

                        <PlatformCard cardRef={cardRef} className="absolute left-1/2 top-1/2" style={{ opacity: 0, visibility: 'hidden' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------- Mobile / tablet: 2D stacked chips fading into one card ----------

function MobileCollapse() {
    const stageRef = useRef(null);
    const chipRefs = useRef([]);
    const cardRef = useRef(null);
    const totalRef = useRef(null);
    const strikeRef = useRef(null);
    const counterRef = useRef(null);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return undefined;

        let raf = 0;
        let inView = false;
        let smooth = null;
        let offsets = [];

        const measure = () => {
            const cx = stage.clientWidth / 2;
            const cy = stage.clientHeight / 2;
            offsets = chipRefs.current.map((el) =>
                el ? [cx - (el.offsetLeft + el.offsetWidth / 2), cy - (el.offsetTop + el.offsetHeight / 2)] : [0, 0],
            );
        };

        const frame = () => {
            raf = requestAnimationFrame(frame);
            const rect = stage.getBoundingClientRect();
            const vh = window.innerHeight;
            const target = clamp01((vh * 0.85 - rect.top) / (vh * 0.6));
            smooth = smooth === null ? target : smooth + (target - smooth) * 0.14;
            if (Math.abs(target - smooth) < 0.0004) smooth = target;

            let total = 0;
            STACK_TOOLS.forEach((tool, i) => {
                const el = chipRefs.current[i];
                if (!el) return;
                const appear = easeOutExpo(clamp01((smooth - i * 0.025) / 0.14));
                const conv = easeInOutCubic(clamp01((smooth - 0.4 - i * 0.015) / 0.25));
                const [dx, dy] = offsets[i] || [0, 0];
                total += tool.price * appear;
                el.style.transform = `translate3d(${(dx * conv).toFixed(2)}px, ${(dy * conv + 12 * (1 - appear)).toFixed(2)}px, 0) scale(${(1 - 0.35 * conv).toFixed(4)})`;
                el.style.opacity = (appear * (1 - smoothstep(0.45, 1, conv))).toFixed(3);
            });
            const strike = smoothstep(0.42, 0.7, smooth);
            totalRef.current.textContent = money(Math.round(total));
            strikeRef.current.style.transform = `scaleX(${strike.toFixed(3)})`;
            counterRef.current.style.opacity = (1 - 0.55 * strike).toFixed(3);
            const card = easeOutExpo(clamp01((smooth - 0.7) / 0.2));
            cardRef.current.style.opacity = card.toFixed(3);
            cardRef.current.style.transform = `translate(-50%, -50%) translateY(${(12 * (1 - card)).toFixed(2)}px) scale(${(0.95 + 0.05 * card).toFixed(4)})`;
            cardRef.current.style.visibility = card > 0.001 ? 'visible' : 'hidden';
        };

        const start = () => {
            if (!raf && inView && !document.hidden) raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(stage);
        const io = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) start();
            else stop();
        });
        io.observe(stage);
        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            stop();
            ro.disconnect();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <div className="mx-auto mt-14 max-w-xl px-4 sm:px-6">
            <Counter wrapRef={counterRef} totalRef={totalRef} strikeRef={strikeRef} />
            <div ref={stageRef} className="relative isolate mt-6 flex min-h-[340px] items-center">
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl"
                    aria-hidden="true"
                />
                <ul className="flex w-full flex-wrap justify-center gap-2.5" aria-label="A typical stack of separate subscriptions">
                    {STACK_TOOLS.map((tool, i) => (
                        <li
                            key={tool.label}
                            ref={(el) => {
                                chipRefs.current[i] = el;
                            }}
                            className="glass-chip flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2"
                            style={{ opacity: 0 }}
                        >
                            <ToolChipContent tool={tool} />
                        </li>
                    ))}
                </ul>
                <PlatformCard cardRef={cardRef} className="absolute left-1/2 top-1/2" style={{ opacity: 0, visibility: 'hidden' }} />
            </div>
        </div>
    );
}

// ---------- Reduced motion: static before → after ----------

function StaticCollapse() {
    return (
        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:mt-20 lg:grid-cols-[1fr_auto_auto] lg:px-8">
            <div className="glass-panel rounded-2xl p-6" onPointerMove={trackSpotlight}>
                <div className="relative">
                    <div className="flex items-baseline justify-between gap-4">
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Before: {STACK_TOOLS.length} subscriptions</p>
                        <p className="font-mono text-2xl font-semibold tabular-nums text-white">
                            {money(STACK_TOTAL)}
                            <span className="text-sm text-slate-500">/mo</span>
                        </p>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="A typical stack of separate subscriptions">
                        {STACK_TOOLS.map((tool) => (
                            <li key={tool.label} className="glass-chip flex items-center gap-2.5 rounded-xl px-3.5 py-2">
                                <ToolChipContent tool={tool} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex justify-center text-indigo-300" aria-hidden="true">
                <ArrowDown className="h-6 w-6 lg:hidden" />
                <ArrowRight className="hidden h-6 w-6 lg:block" />
            </div>
            <PlatformCard className="mx-auto" />
        </div>
    );
}

export default function StackCollapse({ mode }) {
    if (mode === 'static') return <StaticCollapse />;
    if (mode === 'mobile') return <MobileCollapse />;
    return <DesktopCollapse />;
}
