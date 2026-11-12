import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Cloud, Plus, Radar } from 'lucide-react';
import { BRANDS } from './ecosystemData';
import { InfraVisual, LeadsVisual } from './EcosystemVisuals';
import { trackSpotlight, useInViewOnce } from '../platform/scrollHooks';

const BRAND_UI = {
    diskobre: { icon: Radar, Visual: LeadsVisual, glow: 'eco-glow-top' },
    caleho: { icon: Cloud, Visual: InfraVisual, glow: 'eco-glow-bottom' },
};

function BrandCard({ brand, delay, onHover }) {
    const { icon: Icon, Visual, glow } = BRAND_UI[brand.key];
    const headingId = `eco-${brand.key}-heading`;

    return (
        <div
            data-brand={brand.key}
            className="stage-in h-full"
            style={{ '--d': `${delay}s` }}
            onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(brand.key)}
            onPointerLeave={() => onHover(null)}
        >
            <article
                aria-labelledby={headingId}
                onPointerMove={trackSpotlight}
                className="eco-card glass-panel flex h-full flex-col rounded-2xl p-6 sm:p-8 lg:p-10"
                style={{ '--accent': brand.accent }}
            >
                <span className={`eco-glow ${glow} pointer-events-none absolute h-80 w-80 rounded-full`} aria-hidden="true" />

                <div className="relative flex h-full flex-col">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent))] ring-1 ring-[rgb(var(--accent)/0.3)]">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <p className="text-lg font-semibold tracking-[-0.02em] text-white">
                            {brand.name}
                            <span className="text-slate-400">{brand.tld}</span>
                        </p>
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
                            Platform
                        </span>
                    </div>

                    <h3 id={headingId} className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
                        {brand.question}
                    </h3>
                    <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-slate-400">{brand.pitch}</p>

                    <ul className="mt-6 space-y-3">
                        {brand.proofs.map((proof) => (
                            <li key={proof} className="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
                                    <Check className="h-3 w-3 text-slate-300" aria-hidden="true" />
                                </span>
                                {proof}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                        <Visual />
                    </div>

                    <div className="mt-auto pt-8">
                        <a
                            href={brand.href}
                            target="_blank"
                            rel="noopener"
                            className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[rgb(var(--accent))] px-6 py-3.5 text-sm font-semibold text-[#060a18] transition-colors hover:bg-[rgb(var(--accent)/0.88)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18] sm:w-auto"
                        >
                            {brand.cta}
                            <ArrowUpRight
                                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                                aria-hidden="true"
                            />
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    </div>
                </div>
            </article>
        </div>
    );
}

// Vertical warm → cool line with a "+" chip. Desktop: sits between the columns; mobile: between the stacked cards.
function Connector() {
    return (
        <div className="stage-in relative flex h-16 items-center justify-center lg:h-auto" style={{ '--d': '0.24s' }} aria-hidden="true">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-amber-400/30 to-cyan-400/30 lg:inset-y-10" />
            <span className="eco-line eco-line-warm absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-amber-400 to-transparent lg:inset-y-10" />
            <span className="eco-line eco-line-cool absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-cyan-400 to-transparent lg:inset-y-10" />
            <span className="eco-line eco-line-warm absolute left-0 right-1/2 top-1/2 hidden h-px bg-gradient-to-l from-amber-400 to-transparent lg:block" />
            <span className="eco-line eco-line-cool absolute left-1/2 right-0 top-1/2 hidden h-px bg-gradient-to-r from-cyan-400 to-transparent lg:block" />
            <span className="relative rounded-full bg-[#060a18]">
                <span className="glass-chip flex h-10 w-10 items-center justify-center rounded-full text-slate-300">
                    <Plus className="h-4 w-4" />
                </span>
            </span>
        </div>
    );
}

export default function EcosystemSection() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const headerRevealed = useInViewOnce(headerRef);
    const gridRevealed = useInViewOnce(gridRef);
    const [hovered, setHovered] = useState(null);

    return (
        <section id="ecosystem" aria-labelledby="ecosystem-heading" className="relative isolate bg-[#060a18] pb-32 [overflow-x:clip] lg:pb-40">
            <div ref={headerRef} className="stage mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" data-active={headerRevealed ? 'true' : 'false'}>
                <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-indigo-300" style={{ '--d': '0s' }}>
                    The ecosystem
                </p>
                <h2
                    id="ecosystem-heading"
                    className="stage-in mx-auto mt-4 max-w-[22ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
                    style={{ '--d': '0.08s' }}
                >
                    Two platforms that plug into everything we build.
                </h2>
                <p className="stage-in mx-auto mt-6 max-w-[56ch] text-base leading-relaxed text-slate-400 sm:text-lg" style={{ '--d': '0.16s' }}>
                    Find the clients, then host what you build for them. Both run alongside the automation platform above.
                </p>
            </div>

            <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8">
                <div
                    ref={gridRef}
                    className="eco-grid stage grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)]"
                    data-active={gridRevealed ? 'true' : 'false'}
                    data-hover={hovered ?? undefined}
                >
                    <BrandCard brand={BRANDS[0]} delay={0} onHover={setHovered} />
                    <Connector />
                    <BrandCard brand={BRANDS[1]} delay={0.12} onHover={setHovered} />
                </div>
            </div>
        </section>
    );
}
