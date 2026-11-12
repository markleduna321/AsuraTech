import { useEffect, useRef, useState } from 'react';
import { FEATURES } from './platformData';
import FeatureStage from './FeatureStages';
import { trackSpotlight, useInViewOnce } from './scrollHooks';

function StageFrame({ title, children, className = '', onPointerMove, onPointerLeave, style }) {
    return (
        <div
            className={`glass-panel flex flex-col rounded-2xl ${className}`}
            style={style}
            onPointerMove={(e) => {
                trackSpotlight(e);
                onPointerMove?.(e);
            }}
            onPointerLeave={onPointerLeave}
        >
            <div className="relative flex items-center gap-3 border-b border-white/[0.07] px-5 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
                </span>
                <span className="truncate text-xs text-slate-500">
                    app.asuratech <span className="text-slate-600">/</span> <span className="text-slate-300">{title}</span>
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Live
                </span>
            </div>
            <div className="relative flex-1 p-5 sm:p-6">{children}</div>
        </div>
    );
}

function FeatureCopy({ feature, index, active = true }) {
    return (
        <div className="relative pl-6">
            <span className="absolute inset-y-0 left-0 w-px bg-white/10" aria-hidden="true" />
            <span
                className={`absolute inset-y-0 left-0 w-px bg-indigo-400 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${active ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden="true"
            />
            <div className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${active ? 'opacity-100' : 'opacity-50'}`}>
                <p className="font-mono text-xs tabular-nums text-slate-400">{String(index + 1).padStart(2, '0')}</p>
                <h4 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">{feature.title}</h4>
                <p className="mt-2 max-w-[44ch] text-base leading-relaxed text-slate-300">{feature.benefit}</p>
            </div>
        </div>
    );
}

function SectionIntro() {
    const ref = useRef(null);
    const inView = useInViewOnce(ref);
    return (
        <div ref={ref} className="stage max-w-[60ch]" data-active={inView ? 'true' : 'false'}>
            <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-slate-500" style={{ '--d': '0s' }}>
                Inside the platform
            </p>
            <h3 className="stage-in mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl" style={{ '--d': '0.08s' }}>
                Deep enough to run your whole front office.
            </h3>
        </div>
    );
}

// Desktop: features scroll on the left while one sticky, tilted product stage swaps on the right.
function StickyShowcase() {
    const itemRefs = useRef([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const mid = window.innerHeight / 2;
            let best = 0;
            let bestDist = Infinity;
            itemRefs.current.forEach((el, i) => {
                if (!el) return;
                const r = el.getBoundingClientRect();
                const dist = Math.abs(r.top + r.height / 2 - mid);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = i;
                }
            });
            setActive((prev) => (prev === best ? prev : best));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    // Written straight to CSS variables so pointer moves don't re-render the five stages.
    const handleTilt = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--rx', `${(4 - ny * 4).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(-7 + nx * 5).toFixed(2)}deg`);
    };
    const resetTilt = (e) => {
        e.currentTarget.style.setProperty('--rx', '4deg');
        e.currentTarget.style.setProperty('--ry', '-7deg');
    };

    return (
        <div className="mt-16 grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-16">
            <ol>
                {FEATURES.map((feature, i) => (
                    <li
                        key={feature.key}
                        ref={(el) => {
                            itemRefs.current[i] = el;
                        }}
                        className="flex min-h-[60vh] items-center"
                        aria-current={active === i ? 'step' : undefined}
                    >
                        <FeatureCopy feature={feature} index={i} active={active === i} />
                    </li>
                ))}
            </ol>

            <div>
                <div className="sticky top-[calc(50vh-13rem)] [perspective:1600px]" aria-hidden="true">
                    <StageFrame
                        title={FEATURES[active].title}
                        className="stage-tilt h-[30rem]"
                        onPointerMove={handleTilt}
                        onPointerLeave={resetTilt}
                    >
                        <div className="relative h-full">
                            {FEATURES.map((feature, i) => (
                                <div key={feature.key} className="stage stage-layer absolute inset-0" data-active={active === i ? 'true' : 'false'}>
                                    <FeatureStage featureKey={feature.key} active={active === i} />
                                </div>
                            ))}
                        </div>
                    </StageFrame>
                </div>
            </div>
        </div>
    );
}

function StackedFeature({ feature, index, reduced }) {
    const ref = useRef(null);
    const inView = useInViewOnce(ref, { threshold: 0.35, rootMargin: '0px' });
    const active = reduced || inView;
    return (
        <li ref={ref} className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
            <FeatureCopy feature={feature} index={index} />
            <div className="mt-6 lg:mt-0" aria-hidden="true">
                <StageFrame title={feature.title} className="min-h-[26rem]">
                    <div className="stage h-full min-h-[22rem]" data-active={active ? 'true' : 'false'}>
                        <FeatureStage featureKey={feature.key} active={active} reduced={reduced} />
                    </div>
                </StageFrame>
            </div>
        </li>
    );
}

// Mobile, tablet and reduced motion: each feature followed by its own static or play-once stage.
function StackedShowcase({ reduced }) {
    return (
        <ol className="mt-12 space-y-20">
            {FEATURES.map((feature, i) => (
                <StackedFeature key={feature.key} feature={feature} index={i} reduced={reduced} />
            ))}
        </ol>
    );
}

export default function FeatureShowcase({ sticky, reduced }) {
    return (
        <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8 lg:pt-40">
            <SectionIntro />
            {sticky ? <StickyShowcase /> : <StackedShowcase reduced={reduced} />}
        </div>
    );
}
