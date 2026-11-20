import React, { useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    Radar,
    MessagesSquare,
    LayoutDashboard,
    ShieldCheck,
} from 'lucide-react';
import LandingLayout from '@/components/layout/LandingLayout';
import SiteFooter from '@/components/layout/SiteFooter';
import SectionLink from '@/components/ui/SectionLink';
import {
    CHIPS,
    BLOCKS,
    PROCESS_STEPS,
    CLOSING_CTA,
    TECH_STACK,
} from './whatWeDoData';

// ---------------------------------------------------------------------------
// 4-Step Pipeline Data (How it connects)
// ---------------------------------------------------------------------------
const PIPELINE_STEPS = [
    {
        num: '01',
        title: 'Generate Leads',
        desc: 'Fill your pipeline with high-intent prospects via discovery and hiring signals.',
        icon: Radar,
        tag: 'Diskobre.com',
        accent: '#2F6BFF',
    },
    {
        num: '02',
        title: 'Capture & Nurture',
        desc: 'Every lead followed up instantly through automated funnels, SMS, email and AI chat.',
        icon: MessagesSquare,
        tag: 'Tailored Automation & AI',
        accent: '#00E5FF',
    },
    {
        num: '03',
        title: 'Manage Operations',
        desc: 'Run daily business operations on software built for your industry or custom ERP.',
        icon: LayoutDashboard,
        tag: 'HRIS · Gym · Clinic · ERP',
        accent: '#7C3AED',
    },
    {
        num: '04',
        title: 'Scale Securely',
        desc: 'Deploy on high-performance cloud infrastructure protected by ongoing process & network audits.',
        icon: ShieldCheck,
        tag: 'Caleho.cloud · Network Architecture',
        accent: '#00E5FF',
    },
];

// ---------------------------------------------------------------------------
// Plum & Mist band tones. Light = mauve band + light glass cards, dark = black band + plum panels.
// ---------------------------------------------------------------------------
const TONES = {
    light: {
        section: 'band-light relative isolate',
        heading: 'text-black',
        body: 'text-plum-900',
        eyebrow: 'text-plum-900',
        card: 'glass-card',
        cardTitle: 'text-black',
        cardBody: 'text-plum-900',
        muted: 'text-mauve-700',
        accent: 'text-pink-800',
        divider: 'border-mauve-300/70',
        iconTile: 'bg-[image:var(--aurora-deep)] text-white',
        link: 'text-pink-800 hover:text-black focus-visible:ring-plum-900',
        linkAlt: 'text-plum-900 hover:text-black focus-visible:ring-plum-900',
        chip: 'border-mauve-300 bg-white/60 text-plum-900',
        dot: 'bg-[image:var(--aurora-deep)]',
    },
    dark: {
        section: 'band-dark relative',
        heading: 'text-mist',
        body: 'text-mauve-300',
        eyebrow: 'text-magenta-400',
        card: 'border border-plum-800 bg-plum-950/60 transition-colors duration-200 hover:border-plum-600 motion-reduce:transition-none',
        cardTitle: 'text-mist',
        cardBody: 'text-mauve-300',
        muted: 'text-mauve-500',
        accent: 'text-magenta-400',
        divider: 'border-plum-800',
        iconTile: 'border border-plum-800 bg-white/[0.04] text-magenta-400',
        link: 'text-magenta-400 hover:text-mist focus-visible:ring-mist',
        linkAlt: 'text-iris-400 hover:text-mist focus-visible:ring-mist',
        chip: 'border-plum-800 bg-white/[0.04] text-mauve-300',
        dot: 'bg-[image:var(--aurora)]',
    },
};

// Band rhythm: service blocks alternate by index starting with mauve (even = light, odd = dark).
// "How it connects" and "How we work" continue that alternation, computed from the block count
// (with 4 blocks: connects = mauve, how-we-work = black). Tech strip is always black, closing CTA plum-900.
const CONNECTS_LIGHT = BLOCKS.length % 2 === 0;
const HOW_WE_WORK_LIGHT = !CONNECTS_LIGHT;

// Closing CTA: the accent phrase gets .aurora-text; falls back to a plain headline if copy changes.
const CTA_ACCENT = 'instead of eliminating it?';

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function WhatWeDo() {
    const [activeChip, setActiveChip] = useState('automation-ai');
    const chipRowRef = useRef(null);

    // Deep link handling on mount and hash changes
    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash.replace('#', '');
            if (!hash) return;
            const el = document.getElementById(hash);
            if (el) {
                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
            }
        };

        // Run after initial paint
        const timer = setTimeout(scrollToHash, 100);
        window.addEventListener('hashchange', scrollToHash);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, []);

    // IntersectionObserver to highlight active chip and update hash
    useEffect(() => {
        const blockIds = CHIPS.map((c) => c.key);
        const elements = blockIds.map((id) => document.getElementById(id)).filter(Boolean);

        if (!elements.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveChip(id);
                        if (window.history && window.history.replaceState) {
                            window.history.replaceState(null, '', `#${id}`);
                        }
                    }
                });
            },
            {
                rootMargin: '-130px 0px -60% 0px',
                threshold: 0.1,
            }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleChipClick = (e, blockId) => {
        e.preventDefault();
        setActiveChip(blockId);
        const el = document.getElementById(blockId);
        if (el) {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', `#${blockId}`);
            }
        }
    };

    const connectsTone = TONES[CONNECTS_LIGHT ? 'light' : 'dark'];
    const howWeWorkTone = TONES[HOW_WE_WORK_LIGHT ? 'light' : 'dark'];
    const hasCtaAccent = CLOSING_CTA.headline.includes(CTA_ACCENT);
    const ctaLead = hasCtaAccent ? CLOSING_CTA.headline.replace(CTA_ACCENT, '') : CLOSING_CTA.headline;

    return (
        <div data-theme="plum" className="bg-black text-mist">
            <Head>
                <title>What We Do — Automate Your Business to Scale | AsuraTECH Solutions</title>
                <meta
                    name="description"
                    content="We build automation and software around how your team actually works: tailored CRM & AI, turnkey HRIS/Gym/Clinic systems, proprietary platforms, and custom ERP engineering."
                />
            </Head>

            {/* ============================================================
                SECTION 1: HERO (Black band) + STICKY CHIP ROW
               ============================================================ */}
            <section
                aria-labelledby="what-we-do-hero-heading"
                className="band-dark relative isolate overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16"
            >
                {/* Spacer: hero background runs under the transparent 72px header; content stays put */}
                <div aria-hidden="true" className="h-[72px]" />

                {/* Plum glow backdrop */}
                <div
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[70rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/4 bg-[radial-gradient(closest-side,rgba(106,52,151,0.32),transparent)]"
                    aria-hidden="true"
                />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta-400">
                        WHAT WE DO
                    </p>
                    <h1
                        id="what-we-do-hero-heading"
                        className="mt-4 max-w-4xl mx-auto text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-mist leading-[1.08]"
                    >
                        We don’t just digitize your business.{' '}
                        <span className="aurora-text motion-safe:animate-text-shimmer">We automate it to scale.</span>
                    </h1>
                    <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-mauve-300 leading-relaxed">
                        Every business runs differently, so templates fail. We build automation and software around how your team actually works, and if a feature doesn’t remove a bad process or save hours, we skip it.
                    </p>
                </div>
            </section>

            {/* STICKY CHIP ROW (offset by header height 72px). Black frosted; no overflow clip on ancestors. */}
            <nav
                ref={chipRowRef}
                aria-label="What we do sections navigation"
                className="sticky top-[72px] z-40 border-y border-white/10 bg-black/85 backdrop-blur-md"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="wwd-chip-row flex items-center gap-2 sm:gap-3 py-3 overflow-x-auto no-scrollbar scroll-smooth">
                        {CHIPS.map((chip) => {
                            const isActive = activeChip === chip.key;
                            return (
                                <a
                                    key={chip.key}
                                    href={`#${chip.key}`}
                                    onClick={(e) => handleChipClick(e, chip.key)}
                                    className={`relative shrink-0 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist ${
                                        isActive ? 'text-mist' : 'text-mauve-300 hover:text-mist'
                                    }`}
                                >
                                    {chip.label}
                                    <span
                                        className={`pointer-events-none absolute inset-x-3 bottom-0 h-0.5 origin-center rounded-full bg-[image:var(--aurora)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
                                            isActive ? 'scale-x-100' : 'scale-x-0'
                                        }`}
                                        aria-hidden="true"
                                    />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* ============================================================
                SECTION 2: FOUR OFFER BLOCKS (alternating by index: even = mauve + glass, odd = black)
               ============================================================ */}
            <div>
                {BLOCKS.map((block, idx) => {
                    const isLight = idx % 2 === 0;
                    const t = TONES[isLight ? 'light' : 'dark'];

                    return (
                        <section
                            key={block.id}
                            id={block.id}
                            className={`wwd-anchor ${t.section} py-16 sm:py-24`}
                            aria-labelledby={`${block.id}-headline`}
                        >
                            {isLight && <div className="glass-backdrop -z-10" aria-hidden="true" />}

                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                {/* Header */}
                                <div className="max-w-3xl">
                                    <h2
                                        id={`${block.id}-headline`}
                                        className={`text-3xl sm:text-4xl font-semibold tracking-tight ${t.heading}`}
                                    >
                                        {block.headline}
                                    </h2>
                                    <p className={`mt-3 text-base sm:text-lg font-medium ${t.body}`}>
                                        {block.whoItsFor}
                                    </p>
                                </div>

                                {/* Capability Cards Grid */}
                                <div
                                    className={`mt-10 grid gap-6 ${
                                        block.cards.length === 2
                                            ? 'grid-cols-1 md:grid-cols-2'
                                            : block.cards.length >= 6
                                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                            : 'grid-cols-1 md:grid-cols-3'
                                    }`}
                                >
                                    {block.cards.map((card) => {
                                        return (
                                            <article
                                                key={card.id}
                                                id={card.id}
                                                className={`wwd-anchor rounded-2xl p-6 sm:p-7 flex flex-col justify-between ${t.card}`}
                                            >
                                                <div>
                                                    {/* Card Icon */}
                                                    <div
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${t.iconTile}`}
                                                    >
                                                        <card.icon className="w-5 h-5" aria-hidden="true" />
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className={`text-xl font-semibold ${t.cardTitle}`}>
                                                        {card.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className={`mt-2.5 text-sm leading-relaxed ${t.cardBody}`}>
                                                        {card.desc}
                                                    </p>
                                                </div>

                                                {/* Card-specific Links / CTAs */}
                                                {(card.solutionHref || card.demoUrl || card.externalUrl) && (
                                                    <div className={`mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 ${t.divider}`}>
                                                        {card.demoUrl && (
                                                            <a
                                                                href={card.demoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 rounded ${t.link}`}
                                                            >
                                                                {card.demoLabel}
                                                                <ArrowUpRight className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {card.externalUrl && (
                                                            <a
                                                                href={card.externalUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 rounded ${
                                                                    card.accent === 'violet' ? t.linkAlt : t.link
                                                                }`}
                                                            >
                                                                {card.externalLabel}
                                                                <ArrowUpRight className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {card.solutionHref && (
                                                            <SectionLink
                                                                href={card.solutionHref}
                                                                className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 rounded ${t.link}`}
                                                            >
                                                                Learn more
                                                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                                            </SectionLink>
                                                        )}
                                                    </div>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>

                                {/* Block-level CTA */}
                                {block.cta && (
                                    <div className="mt-12 flex items-center">
                                        <SectionLink
                                            href={block.cta.href}
                                            className="aurora-btn group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white focus-visible:outline-none"
                                        >
                                            {block.cta.label}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                                        </SectionLink>
                                    </div>
                                )}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* ============================================================
                SECTION 3: HOW IT CONNECTS (continues block alternation — see CONNECTS_LIGHT)
               ============================================================ */}
            <section
                id="how-it-connects"
                aria-labelledby="connects-heading"
                className={`${connectsTone.section} py-20 sm:py-28 overflow-hidden`}
            >
                {CONNECTS_LIGHT && <div className="glass-backdrop -z-10" aria-hidden="true" />}

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${connectsTone.eyebrow}`}>
                            THE UNFAIR ADVANTAGE
                        </p>
                        <h2
                            id="connects-heading"
                            className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${connectsTone.heading}`}
                        >
                            One partner. One connected system. Zero hand-offs.
                        </h2>
                        <p className={`mt-4 text-base sm:text-lg ${connectsTone.body}`}>
                            From lead generation to CRM automation, industry systems, and cloud architecture, each component connects into a single unified business backbone.
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {PIPELINE_STEPS.map((step) => (
                            <div
                                key={step.num}
                                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between ${connectsTone.card}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`font-mono text-3xl font-semibold tabular-nums ${connectsTone.muted}`}>
                                            {step.num}
                                        </span>
                                        <span className="w-9 h-9 rounded-full bg-[image:var(--aurora-deep)] flex items-center justify-center text-white">
                                            <step.icon className="w-4 h-4" />
                                        </span>
                                    </div>
                                    <h3 className={`text-lg font-semibold ${connectsTone.cardTitle}`}>{step.title}</h3>
                                    <p className={`mt-2 text-sm leading-relaxed ${connectsTone.cardBody}`}>
                                        {step.desc}
                                    </p>
                                </div>
                                <div className={`mt-6 pt-4 border-t ${connectsTone.divider}`}>
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${connectsTone.chip}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${connectsTone.dot}`} />
                                        {step.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 4: METHODOLOGY (opposite of How it connects — see HOW_WE_WORK_LIGHT)
               ============================================================ */}
            <section
                id="how-we-work"
                aria-labelledby="how-we-work-heading"
                className={`${howWeWorkTone.section} py-20 sm:py-28`}
            >
                {HOW_WE_WORK_LIGHT && <div className="glass-backdrop -z-10" aria-hidden="true" />}

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${howWeWorkTone.eyebrow}`}>
                            OUR METHODOLOGY
                        </p>
                        <h2
                            id="how-we-work-heading"
                            className={`mt-3 text-3xl sm:text-4xl font-semibold tracking-tight ${howWeWorkTone.heading}`}
                        >
                            We fix the process first. Then we automate it.
                        </h2>
                        <p className={`mt-3 text-base sm:text-lg ${howWeWorkTone.body}`}>
                            Automating a bad process just creates faster chaos.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {PROCESS_STEPS.map((step, idx) => (
                            <div
                                key={step.key}
                                className={`rounded-2xl p-6 ${howWeWorkTone.card}`}
                            >
                                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--aurora-deep)] font-mono text-xs font-bold uppercase tracking-wider text-white">
                                    {step.num ?? `0${idx + 1}`}
                                </span>
                                <h3 className={`text-xl font-semibold mb-2 ${howWeWorkTone.cardTitle}`}>
                                    {step.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${howWeWorkTone.cardBody}`}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 5: TECH STACK STRIP (Black; hairline top seam when How we work is also black)
               ============================================================ */}
            <section
                aria-label="Modern architecture tech stack"
                className="band-dark py-10 border-t border-white/10"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-magenta-400">
                                ENTERPRISE FOUNDATION
                            </p>
                            <p className="text-sm text-mauve-300 font-medium mt-0.5">
                                Engineered on battle-tested frameworks and cloud architecture
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {TECH_STACK.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-plum-800 bg-white/[0.03] px-4 py-1.5 text-xs sm:text-sm font-semibold text-mauve-300 tracking-wide transition-colors duration-150 hover:border-plum-600 hover:text-mist motion-reduce:transition-none"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 6: CLOSING CTA (Plum-900 band) & FOOTER
               ============================================================ */}
            <section
                aria-labelledby="wwd-closing-cta-heading"
                className="relative isolate overflow-hidden bg-plum-900 text-mist py-20 sm:py-28"
            >
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[64rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,46,126,0.12),transparent)]"
                    aria-hidden="true"
                />

                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        id="wwd-closing-cta-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-mist leading-tight"
                    >
                        {ctaLead}
                        {hasCtaAccent && <span className="aurora-text">{CTA_ACCENT}</span>}
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-mauve-300 leading-relaxed">
                        {CLOSING_CTA.sub}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <SectionLink
                            href={CLOSING_CTA.primary.href}
                            className="aurora-btn group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white focus-visible:outline-none"
                        >
                            {CLOSING_CTA.primary.label}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                        </SectionLink>
                        <SectionLink
                            href={CLOSING_CTA.secondary.href}
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-mist/70 bg-transparent px-6 py-3.5 text-sm font-semibold text-mist transition-colors duration-150 hover:border-mist hover:bg-mist/10 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-plum-900"
                        >
                            {CLOSING_CTA.secondary.label}
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </SectionLink>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}

WhatWeDo.layout = (page) => <LandingLayout>{page}</LandingLayout>;
