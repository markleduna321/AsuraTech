import { useEffect, useRef, useState } from 'react';
import { Calendar, GitBranch, MessageSquare, Sparkles, Star } from 'lucide-react';
import { FEATURES } from './platformData';
import FeatureStage from './FeatureStages';
import { trackSpotlight, useInViewOnce } from './scrollHooks';

const FEATURE_META = {
    nurture: { icon: MessageSquare, tag: 'Instant SMS & Email' },
    pipeline: { icon: GitBranch, tag: 'Automated Deal Stages' },
    booking: { icon: Calendar, tag: 'Self-Serve Scheduling' },
    reputation: { icon: Star, tag: 'Review Autopilot' },
    bots: { icon: Sparkles, tag: '24/7 AI Concierge' },
};

function StageFrame({ title, activeIndex = 0, total = FEATURES.length, onSelect, children, className = '', onPointerMove, onPointerLeave, style }) {
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
            {/* Browser chrome + interactive story tabs */}
            <div className="relative flex flex-col border-b border-mauve-300/70 bg-white/40">
                <div className="flex items-center gap-3 px-5 py-3">
                    <span className="flex gap-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-mauve-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-mauve-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-mauve-300" />
                    </span>
                    <span className="truncate rounded-md border border-mauve-300/70 bg-white/70 px-2.5 py-1 text-xs text-mauve-700">
                        app.asuratech.com <span className="text-mauve-600">/</span> <span className="font-medium text-plum-900">{title}</span>
                    </span>
                    <div className="ml-auto flex items-center gap-3">
                        <span className="font-mono text-[11px] font-medium tabular-nums text-mauve-700">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-plum-900/20 bg-plum-100 px-2 py-0.5 text-[11px] font-medium text-plum-900">
                            <span className="h-1.5 w-1.5 rounded-full bg-magenta-500 motion-safe:animate-pulse" aria-hidden="true" /> Live
                        </span>
                    </div>
                </div>

                {/* Clickable step switcher bar inside the stage header */}
                {onSelect && (
                    <div className="grid grid-cols-5 gap-1 border-t border-mauve-300/60 bg-white/40 px-3 py-1.5">
                        {FEATURES.map((feat, i) => {
                            const isCurrent = i === activeIndex;
                            const isPast = i < activeIndex;
                            return (
                                <button
                                    key={feat.key}
                                    type="button"
                                    onClick={() => onSelect(i)}
                                    className={`group flex flex-col gap-1 rounded-lg px-2 py-1 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-900 motion-reduce:transition-none ${
                                        isCurrent ? 'bg-plum-900/[0.08]' : 'hover:bg-white/60'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-1">
                                        <span
                                            className={`truncate text-[10px] font-semibold ${
                                                isCurrent ? 'text-plum-900' : isPast ? 'text-mauve-800' : 'text-mauve-700 group-hover:text-plum-900'
                                            }`}
                                        >
                                            {String(i + 1).padStart(2, '0')}. {feat.title.split(' ')[0]}
                                        </span>
                                    </div>
                                    <span className="h-1 w-full overflow-hidden rounded-full bg-mauve-300/60">
                                        <span
                                            className={`block h-full rounded-full transition-all duration-500 motion-reduce:transition-none ${
                                                isCurrent ? 'w-full bg-plum-900 shadow-[0_0_8px_rgba(106,52,151,0.6)]' : isPast ? 'w-full bg-plum-900/40' : 'w-0'
                                            }`}
                                        />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="relative flex-1 p-5 sm:p-6">{children}</div>
        </div>
    );
}

function FeatureCopy({ feature, index, active = true, onClick }) {
    const meta = FEATURE_META[feature.key] || { icon: Sparkles, tag: 'Automation' };
    const Icon = meta.icon;

    return (
        <div
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={
                onClick
                    ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onClick();
                          }
                      }
                    : undefined
            }
            className={`group relative rounded-2xl border p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-900 focus-visible:ring-offset-2 focus-visible:ring-offset-mauve-500 motion-reduce:transition-none sm:p-7 ${
                onClick ? 'cursor-pointer' : ''
            } ${
                active
                    ? 'glass-card border-plum-900/40'
                    : 'border-white/50 bg-white/40 hover:border-white/70 hover:bg-white/55'
            }`}
        >
            {/* Active left accent bar */}
            <span
                className={`absolute bottom-5 left-0 top-5 w-1 rounded-r-full bg-gradient-to-b from-magenta-600 to-iris-600 shadow-[0_0_12px_rgba(255,46,126,0.5)] transition-all duration-500 motion-reduce:transition-none ${
                    active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                }`}
                aria-hidden="true"
            />

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-500 motion-reduce:transition-none ${
                            active
                                ? 'border-plum-900/30 bg-plum-900 text-white shadow-[0_0_20px_rgba(43,2,74,0.3)]'
                                : 'border-plum-900/20 bg-white/60 text-plum-900 group-hover:bg-white/80'
                        }`}
                    >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium text-plum-900 transition-colors duration-500 motion-reduce:transition-none ${
                            active
                                ? 'border-plum-900/20 bg-plum-100'
                                : 'border-plum-900/15 bg-white/50'
                        }`}
                    >
                        {meta.tag}
                    </span>
                </div>
                <span
                    className={`font-mono text-xs font-semibold tabular-nums transition-colors duration-500 motion-reduce:transition-none ${
                        active ? 'text-pink-800' : 'text-plum-900'
                    }`}
                >
                    STEP {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            <h4 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-black sm:text-2xl">{feature.title}</h4>
            <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-plum-900 sm:text-base">{feature.benefit}</p>
        </div>
    );
}

function SectionIntro() {
    const ref = useRef(null);
    const inView = useInViewOnce(ref);
    return (
        <div ref={ref} className="stage max-w-[60ch]" data-active={inView ? 'true' : 'false'}>
            <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-plum-900" style={{ '--d': '0s' }}>
                Inside the platform
            </p>
            <h3 className="stage-in mt-3 text-3xl font-semibold tracking-[-0.03em] text-black sm:text-4xl" style={{ '--d': '0.08s' }}>
                Deep enough to run your whole front office.
            </h3>
            <p className="stage-in mt-3 text-base leading-relaxed text-plum-900" style={{ '--d': '0.14s' }}>
                Scroll or click any step below to watch how a single lead moves from first message to a 5-star review automatically.
            </p>
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

    const scrollToStep = (index) => {
        setActive(index);
        const el = itemRefs.current[index];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);
        window.scrollTo({ top: targetY, behavior: 'smooth' });
    };

    // Written straight to CSS variables so pointer moves don't re-render the five stages.
    const handleTilt = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--rx', `${(2.5 - ny * 3).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(-4 + nx * 4).toFixed(2)}deg`);
    };
    const resetTilt = (e) => {
        e.currentTarget.style.setProperty('--rx', '2.5deg');
        e.currentTarget.style.setProperty('--ry', '-4deg');
    };

    return (
        <div className="mt-14 grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 xl:gap-16">
            <ol className="relative space-y-6 py-[8vh]">
                {FEATURES.map((feature, i) => (
                    <li
                        key={feature.key}
                        ref={(el) => {
                            itemRefs.current[i] = el;
                        }}
                        className="flex min-h-[42vh] items-center"
                        aria-current={active === i ? 'step' : undefined}
                    >
                        <div className="w-full">
                            <FeatureCopy
                                feature={feature}
                                index={i}
                                active={active === i}
                                onClick={() => scrollToStep(i)}
                            />
                        </div>
                    </li>
                ))}
            </ol>

            <div>
                <div className="sticky top-[calc(50vh-14.5rem)] [perspective:1600px]">
                    {/* Ambient glow behind the stage so the right side immediately draws the eye */}
                    <div
                        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(closest-side,rgba(106,52,151,0.28),transparent)] blur-2xl"
                        aria-hidden="true"
                    />
                    <StageFrame
                        title={FEATURES[active].title}
                        activeIndex={active}
                        total={FEATURES.length}
                        onSelect={scrollToStep}
                        className="stage-tilt h-[32rem]"
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
            <FeatureCopy feature={feature} index={index} active={active} />
            <div className="mt-6 lg:mt-0" aria-hidden="true">
                <StageFrame title={feature.title} activeIndex={index} total={FEATURES.length} className="min-h-[26rem]">
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
        <ol className="mt-12 space-y-16">
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
