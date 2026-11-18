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

    return (
        <div className="bg-[var(--bg)] text-white">
            <Head>
                <title>What We Do — Automate Your Business to Scale | AsuraTECH Solutions</title>
                <meta
                    name="description"
                    content="We build automation and software around how your team actually works: tailored CRM & AI, turnkey HRIS/Gym/Clinic systems, proprietary platforms, and custom ERP engineering."
                />
            </Head>

            {/* ============================================================
                SECTION 1: HERO (Dark) + STICKY CHIP ROW
               ============================================================ */}
            <section
                aria-labelledby="what-we-do-hero-heading"
                className="relative isolate overflow-hidden bg-[var(--bg)] pt-14 pb-12 sm:pt-20 sm:pb-16 border-b border-[var(--border)]"
            >
                {/* Glow backdrop */}
                <div
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[70rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/4 bg-[radial-gradient(closest-side,rgba(47,107,255,0.18),transparent)]"
                    aria-hidden="true"
                />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
                        WHAT WE DO
                    </p>
                    <h1
                        id="what-we-do-hero-heading"
                        className="mt-4 max-w-4xl mx-auto text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]"
                    >
                        We don’t just digitize your business.{' '}
                        <span className="text-[var(--cyan)]">We automate it to scale.</span>
                    </h1>
                    <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                        Every business runs differently, so templates fail. We build automation and software around how your team actually works, and if a feature doesn’t remove a bad process or save hours, we skip it.
                    </p>
                </div>
            </section>

            {/* STICKY CHIP ROW (offset by header height 72px) */}
            <nav
                ref={chipRowRef}
                aria-label="What we do sections navigation"
                className="sticky top-[72px] z-40 border-b border-[var(--border)] bg-[#050A18]/90 backdrop-blur-md"
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
                                    className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] ${
                                        isActive
                                            ? 'bg-[var(--blue)] text-white shadow-[0_0_12px_rgba(47,107,255,0.4)]'
                                            : 'bg-white/[0.04] text-[var(--soft)] hover:bg-white/[0.08] hover:text-white border border-[var(--border)]'
                                    }`}
                                >
                                    {chip.label}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* ============================================================
                SECTION 2: FOUR OFFER BLOCKS (Alternating Dark & Light)
               ============================================================ */}
            <div>
                {BLOCKS.map((block) => {
                    const isLight = block.theme === 'light';

                    return (
                        <section
                            key={block.id}
                            id={block.id}
                            className={`wwd-anchor relative py-16 sm:py-24 border-b ${
                                isLight
                                    ? 'bg-white text-[var(--ink)] border-gray-100'
                                    : 'bg-[var(--surface)] text-white border-[var(--border)]'
                            }`}
                            aria-labelledby={`${block.id}-headline`}
                        >
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                {/* Header */}
                                <div className="max-w-3xl">
                                    <h2
                                        id={`${block.id}-headline`}
                                        className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                                            isLight ? 'text-[var(--ink)]' : 'text-white'
                                        }`}
                                    >
                                        {block.headline}
                                    </h2>
                                    <p
                                        className={`mt-3 text-base sm:text-lg font-medium ${
                                            isLight ? 'text-[var(--ink-muted)]' : 'text-[var(--muted)]'
                                        }`}
                                    >
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
                                                className={`wwd-anchor rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                                                    isLight
                                                        ? 'bg-[var(--light-band)] border border-blue-100 shadow-sm hover:shadow-md'
                                                        : 'bg-[var(--card)] border border-[var(--border)] shadow-md hover:border-white/20'
                                                }`}
                                            >
                                                <div>
                                                    {/* Card Icon */}
                                                    <div
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
                                                            isLight
                                                                ? 'bg-white text-[var(--navy)] shadow-sm'
                                                                : 'bg-[var(--cyan)]/10 text-[var(--cyan)] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                                                        }`}
                                                    >
                                                        <card.icon className="w-5 h-5" aria-hidden="true" />
                                                    </div>

                                                    {/* Title */}
                                                    <h3
                                                        className={`text-xl font-bold ${
                                                            isLight ? 'text-[var(--ink)]' : 'text-white'
                                                        }`}
                                                    >
                                                        {card.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p
                                                        className={`mt-2.5 text-sm leading-relaxed ${
                                                            isLight ? 'text-[var(--ink-muted)]' : 'text-[var(--muted)]'
                                                        }`}
                                                    >
                                                        {card.desc}
                                                    </p>
                                                </div>

                                                {/* Card-specific Links / CTAs */}
                                                {(card.demoUrl || card.externalUrl) && (
                                                    <div
                                                        className={`mt-6 pt-4 border-t ${
                                                            isLight ? 'border-black/5' : 'border-white/10'
                                                        }`}
                                                    >
                                                        {card.demoUrl && (
                                                            <a
                                                                href={card.demoUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--blue)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] rounded"
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
                                                                    card.accent === 'violet'
                                                                        ? isLight
                                                                            ? 'text-[var(--violet)] focus-visible:ring-[var(--violet)]'
                                                                            : 'text-violet-300 focus-visible:ring-violet-300'
                                                                        : isLight
                                                                        ? 'text-[var(--cyan-deep)] focus-visible:ring-[var(--cyan-deep)]'
                                                                        : 'text-[var(--cyan)] focus-visible:ring-[var(--cyan)]'
                                                                }`}
                                                            >
                                                                {card.externalLabel}
                                                                <ArrowUpRight className="w-4 h-4" />
                                                            </a>
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
                                            className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 ${
                                                isLight
                                                    ? 'bg-[var(--navy)] text-white hover:brightness-110 focus-visible:ring-[var(--navy)]'
                                                    : 'bg-[var(--blue)] text-white hover:brightness-110 focus-visible:ring-[var(--cyan)] shadow-[rgba(47,107,255,0.3)]'
                                            }`}
                                        >
                                            {block.cta.label}
                                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </SectionLink>
                                    </div>
                                )}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* ============================================================
                SECTION 3: HOW IT CONNECTS (Dark)
               ============================================================ */}
            <section
                id="how-it-connects"
                aria-labelledby="connects-heading"
                className="relative isolate bg-[var(--bg)] py-20 sm:py-28 border-b border-[var(--border)] overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">
                            THE UNFAIR ADVANTAGE
                        </p>
                        <h2
                            id="connects-heading"
                            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                        >
                            One partner. One connected system. Zero hand-offs.
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
                            From lead generation to CRM automation, industry systems, and cloud architecture, each component connects into a single unified business backbone.
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {PIPELINE_STEPS.map((step) => (
                            <div
                                key={step.num}
                                className="relative rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 sm:p-7 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-mono text-3xl font-extrabold text-white/30">
                                            {step.num}
                                        </span>
                                        <span className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[var(--cyan)]">
                                            <step.icon className="w-4 h-4" />
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-[var(--border)]">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--soft)] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                                        {step.tag}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 4: METHODOLOGY (Soft-White Band #EEF4FF)
               ============================================================ */}
            <section
                id="how-we-work"
                aria-labelledby="how-we-work-heading"
                className="bg-[#EEF4FF] text-[var(--ink)] py-20 sm:py-28 border-b border-blue-100"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy)]">
                            OUR METHODOLOGY
                        </p>
                        <h2
                            id="how-we-work-heading"
                            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]"
                        >
                            We fix the process first. Then we automate it.
                        </h2>
                        <p className="mt-3 text-base sm:text-lg text-[var(--ink-muted)]">
                            Automating a bad process just creates faster chaos.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {PROCESS_STEPS.map((step, idx) => (
                            <div
                                key={step.key}
                                className="rounded-2xl p-6 bg-white border border-blue-100 shadow-sm"
                            >
                                <span className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider block mb-2">
                                    {step.num ?? `0${idx + 1}`}
                                </span>
                                <h3 className="text-xl font-bold text-[var(--ink)] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 5: TECH STACK STRIP
               ============================================================ */}
            <section
                aria-label="Modern architecture tech stack"
                className="bg-[var(--surface)] py-10 border-b border-[var(--border)]"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cyan)]">
                                ENTERPRISE FOUNDATION
                            </p>
                            <p className="text-sm text-[var(--soft)] font-medium mt-0.5">
                                Engineered on battle-tested frameworks and cloud architecture
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {TECH_STACK.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-[var(--border)] bg-white/[0.03] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white tracking-wide shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 6: CLOSING CTA (Dark) & FOOTER
               ============================================================ */}
            <section
                aria-labelledby="wwd-closing-cta-heading"
                className="relative isolate overflow-hidden bg-[var(--bg)] py-20 sm:py-28 border-b border-[var(--border)]"
            >
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[64rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(47,107,255,0.16),transparent)]"
                    aria-hidden="true"
                />

                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        id="wwd-closing-cta-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
                    >
                        {CLOSING_CTA.headline}
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                        {CLOSING_CTA.sub}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <SectionLink
                            href={CLOSING_CTA.primary.href}
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[var(--blue)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(47,107,255,0.3)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                        >
                            {CLOSING_CTA.primary.label}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </SectionLink>
                        <SectionLink
                            href={CLOSING_CTA.secondary.href}
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-[var(--soft)] transition-all hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
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
