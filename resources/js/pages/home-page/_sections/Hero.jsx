import React, { Component, Suspense, lazy, useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import TrustBar from './TrustBar';

const ConnectedBackboneScene = lazy(() => import('./ConnectedBackboneScene'));

const PILLARS = ['SaaS Platforms', 'Custom Engineering', 'AI Automation'];

// Keeps the gradient poster if the scene chunk fails to load.
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

function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);
    return matches;
}

// Defer the Three.js chunk until after first paint and the browser is idle.
function useAfterFirstPaint() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        let idleId;
        let timeoutId;
        const schedule = () => {
            if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
            else timeoutId = window.setTimeout(() => setReady(true), 200);
        };
        if (document.readyState === 'complete') schedule();
        else window.addEventListener('load', schedule, { once: true });
        return () => {
            window.removeEventListener('load', schedule);
            if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, []);
    return ready;
}

function ScenePoster({ className = '' }) {
    return (
        <div className={`absolute inset-0 ${className}`} aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,46,126,0.22)_0%,rgba(124,58,237,0.18)_24%,transparent_58%)]" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta-400/25 blur-2xl" />
        </div>
    );
}

export default function Hero() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const loadScene = useAfterFirstPaint();
    const [sceneReady, setSceneReady] = useState(false);
    const [sceneFailed, setSceneFailed] = useState(false);
    const [highlight, setHighlight] = useState(false);

    const handleSceneError = (error) => {
        setSceneFailed(true);
        setSceneReady(false);
        if (import.meta.env.DEV) console.warn('[Hero] 3D scene unavailable, showing static poster.', error);
    };

    const scene = loadScene && !sceneFailed && (
        <SceneBoundary onError={handleSceneError}>
            <Suspense fallback={null}>
                <ConnectedBackboneScene
                    key={isDesktop ? 'desktop' : 'mobile'}
                    lite={!isDesktop}
                    showLabels={isDesktop}
                    highlight={highlight}
                    onReady={() => setSceneReady(true)}
                    onError={handleSceneError}
                />
            </Suspense>
        </SceneBoundary>
    );

    const sceneFade = `transition-opacity duration-700 motion-reduce:transition-none ${sceneReady ? 'opacity-100' : 'opacity-0'}`;

    return (
        <section
            aria-labelledby="hero-heading"
            className="band-dark relative isolate overflow-hidden bg-[radial-gradient(60%_55%_at_78%_42%,rgba(43,2,74,0.6),transparent_70%)]"
        >
            {/* Spacer: hero background runs under the transparent 72px header; content stays put */}
            <div aria-hidden="true" className="h-[72px]" />

            {/* Faint engineering grid (mauve lines) */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(147,135,156,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(147,135,156,0.9) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
                aria-hidden="true"
            />

            {/* Mobile: dimmed, lower-detail scene behind the copy */}
            {!isDesktop && (
                <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
                    <ScenePoster className="opacity-60" />
                    <div className={`absolute inset-0 opacity-40 ${sceneFade}`}>{scene}</div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/90" />
                </div>
            )}

            <div className="mx-auto max-w-7xl px-4 pb-14 pt-20 sm:px-6 md:pb-16 md:pt-28 lg:px-8 lg:pb-12 lg:pt-20">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                    {/* Left: copy (HTML for SEO, accessibility and LCP) */}
                    <div className="max-w-xl">
                        <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-mauve-500/30 bg-white/[0.04] px-3 py-1 text-xs font-medium text-mauve-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-magenta-500 shadow-[0_0_8px_rgba(255,46,126,0.7)] motion-safe:animate-pulse" aria-hidden="true" />
                            {PILLARS.map((pillar, i) => (
                                <React.Fragment key={pillar}>
                                    {i > 0 && <span className="text-mauve-500" aria-hidden="true">/</span>}
                                    <span>{pillar}</span>
                                </React.Fragment>
                            ))}
                        </p>

                        <h1
                            id="hero-heading"
                            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-mist sm:text-5xl lg:text-[3.5rem]"
                        >
                            Replace duct-taped tools with{' '}
                            <span className="aurora-text motion-safe:animate-text-shimmer">one connected backbone.</span>
                        </h1>

                        <p className="mt-6 text-base leading-relaxed text-mauve-500 sm:text-lg">
                            asuraTECH designs, engineers and automates the systems your business runs on. We unify
                            custom SaaS platforms, purpose-built software and AI-driven workflows into a single, secure
                            platform your team can scale, so data flows and work follows up automatically.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#get-started"
                                data-cta-source="hero"
                                className="aurora-btn group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold focus-visible:outline-none"
                            >
                                Start Automating
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                            </a>
                            <Link
                                href="/products/gymasura"
                                onMouseEnter={() => setHighlight(true)}
                                onMouseLeave={() => setHighlight(false)}
                                onFocus={() => setHighlight(true)}
                                onBlur={() => setHighlight(false)}
                                className="aurora-border aurora-border--hover group relative inline-flex items-center gap-2 rounded-full border border-mauve-500 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-transparent hover:bg-white/[0.07] focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
                            >
                                <PlayCircle className="h-4 w-4 text-mauve-300 transition-colors group-hover:text-iris-300 motion-reduce:transition-none" aria-hidden="true" />
                                View Demos
                            </Link>
                        </div>
                    </div>

                    {/* Right: 3D scene (desktop) */}
                    {isDesktop && (
                        <div className="relative aspect-square w-full max-h-[600px]" aria-hidden="true">
                            <ScenePoster />
                            <div className={`absolute inset-0 ${sceneFade}`}>{scene}</div>
                        </div>
                    )}
                </div>
            </div>

            <TrustBar />
        </section>
    );
}