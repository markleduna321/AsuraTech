import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, User } from 'lucide-react';
import LandingLayout from '@/components/layout/LandingLayout';
import SiteFooter from '@/components/layout/SiteFooter';
import FinalCtaSection from '@/pages/home-page/_sections/final-cta/FinalCtaSection';
import {
    STORY_PARAGRAPHS,
    PRINCIPLES,
    TEAM_MEMBERS,
    PROOF_STATS,
    CLIENT_LOGOS,
    TESTIMONIALS,
    PRODUCTS_BUILT,
} from './aboutData';

export default function About() {
    const hasProof =
        PROOF_STATS.length > 0 ||
        CLIENT_LOGOS.length > 0 ||
        TESTIMONIALS.length > 0;

    return (
        <div className="bg-white text-[var(--ink)]">
            <Head>
                <title>About Us — Stop Duct-Taping Disconnected Tools | AsuraTECH Solutions</title>
                <meta
                    name="description"
                    content="Learn why AsuraTECH exists: helping ambitious businesses replace fragmented tools with one cohesive technology backbone."
                />
            </Head>

            {/* ============================================================
                SECTION 1: HERO (Dark)
               ============================================================ */}
            <section
                aria-labelledby="about-hero-heading"
                className="relative isolate overflow-hidden bg-[var(--bg)] text-white py-20 sm:py-28 border-b border-[var(--border)]"
            >
                {/* Glow backdrop */}
                <div
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[70rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/4 bg-[radial-gradient(closest-side,rgba(47,107,255,0.18),transparent)]"
                    aria-hidden="true"
                />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--cyan)]">
                        ABOUT US
                    </p>
                    <h1
                        id="about-hero-heading"
                        className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto"
                    >
                        Built to help businesses stop{' '}
                        <span className="text-[var(--cyan)]">duct-taping disconnected tools</span> together.
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                        We build connected software backbones that unite custom systems, industry SaaS, and AI automation under one roof.
                    </p>
                </div>
            </section>

            {/* ============================================================
                SECTION 2: OUR STORY (Light)
               ============================================================ */}
            <section
                aria-labelledby="our-story-heading"
                className="py-16 sm:py-24 bg-white border-b border-gray-100"
            >
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy)] mb-2">
                        THE ASURATECH ORIGIN
                    </p>
                    <h2
                        id="our-story-heading"
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] mb-8"
                    >
                        Our story
                    </h2>

                    <div className="space-y-6 text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed">
                        {STORY_PARAGRAPHS.map((paragraph, i) => (
                            <p key={i} className="p-4 rounded-xl bg-[var(--light-band)] border border-blue-100">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 3: WHAT WE BELIEVE (Soft-White Band)
               ============================================================ */}
            <section
                aria-labelledby="principles-heading"
                className="py-16 sm:py-24 bg-[var(--light-band)] border-b border-gray-200"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy)]">
                            OUR GUIDING PRINCIPLES
                        </p>
                        <h2
                            id="principles-heading"
                            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]"
                        >
                            What we believe
                        </h2>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {PRINCIPLES.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-8 h-8 rounded-lg bg-[var(--light-band)] text-[var(--navy)] flex items-center justify-center font-bold text-sm mb-4">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--ink)] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 4: TEAM (Light)
               ============================================================ */}
            <section
                aria-labelledby="team-heading"
                className="py-16 sm:py-24 bg-white border-b border-gray-100"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy)]">
                            THE PEOPLE BEHIND THE CODE
                        </p>
                        <h2
                            id="team-heading"
                            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]"
                        >
                            Our team
                        </h2>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {TEAM_MEMBERS.map((member, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl p-6 bg-[var(--light-band)] border border-blue-100 shadow-sm flex items-start gap-4"
                            >
                                {/* Placeholder avatar */}
                                <div className="w-14 h-14 rounded-full bg-white border border-blue-200 text-[var(--navy)] flex items-center justify-center shrink-0 shadow-sm">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-lg font-bold text-[var(--ink)] truncate">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs font-semibold text-[var(--navy)] uppercase tracking-wider mt-0.5">
                                        {member.role}
                                    </p>
                                    <p className="text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                                        {member.oneLiner}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 5: PROOF (Only rendered if data exists)
               ============================================================ */}
            {hasProof && (
                <section
                    aria-labelledby="proof-heading"
                    className="py-16 sm:py-24 bg-[var(--surface)] text-white border-b border-[var(--border)]"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 id="proof-heading" className="text-3xl font-bold text-center mb-10">
                            Proven Results
                        </h2>

                        {PROOF_STATS.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                                {PROOF_STATS.map((stat, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
                                        <p className="text-4xl font-extrabold text-[var(--cyan)]">{stat.value}</p>
                                        <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ============================================================
                SECTION 6: PRODUCTS WE BUILT (Light)
               ============================================================ */}
            <section
                aria-labelledby="products-built-heading"
                className="py-16 sm:py-24 bg-white border-b border-gray-100"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mb-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy)]">
                            OUR WORK IN PRODUCTION
                        </p>
                        <h2
                            id="products-built-heading"
                            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)]"
                        >
                            Products we built
                        </h2>
                        <p className="mt-2 text-base text-[var(--ink-muted)]">
                            Live platforms and systems developed, hosted, and maintained by our team.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PRODUCTS_BUILT.map((prod) => (
                            <a
                                key={prod.name}
                                href={prod.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group rounded-2xl p-6 bg-[var(--light-band)] border border-blue-100 hover:border-blue-300 transition-all flex flex-col justify-between shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--navy)]"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--navy)]">
                                            {prod.type}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--navy)] transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--ink)] group-hover:text-[var(--navy)] transition-colors">
                                        {prod.name}
                                    </h3>
                                    <p className="text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">
                                        {prod.desc}
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-blue-200/50 flex items-center text-xs font-semibold text-[var(--navy)]">
                                    <span>Visit live system</span>
                                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                SECTION 7: FINAL CTA (Dark) & FOOTER
               ============================================================ */}
            <FinalCtaSection />

            <SiteFooter />
        </div>
    );
}

About.layout = (page) => <LandingLayout>{page}</LandingLayout>;
