import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, FolderGit2, User } from 'lucide-react';
import LandingLayout from '@/components/layout/LandingLayout';
import SiteFooter from '@/components/layout/SiteFooter';
import FinalCtaSection from '@/pages/home-page/_sections/final-cta/FinalCtaSection';
import {
    STORY,
    PRINCIPLES,
    TEAM_MEMBERS,
    PROOF_STATS,
    CLIENT_LOGOS,
    TESTIMONIALS,
    PRODUCTS_BUILT,
} from './aboutData';

function GithubIcon({ className = 'w-3.5 h-3.5' }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18.92-.26 1.9-.38 2.88-.39.98.01 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

function LinkedinIcon({ className = 'w-3.5 h-3.5' }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
    );
}

export default function About() {
    const hasTeam = TEAM_MEMBERS.length > 0;
    const hasProof =
        PROOF_STATS.length > 0 ||
        CLIENT_LOGOS.length > 0 ||
        TESTIMONIALS.length > 0;
    const readyProducts = PRODUCTS_BUILT.filter((prod) => Boolean(prod.url));

    return (
        // "Plum & Mist" scope (same as home): remaps --bg/--cyan/--navy tokens to the plum palette.
        // Band order: hero black → story mauve → team black → principles mauve → proof black → products plum-900 → FinalCta.
        <div data-theme="plum" className="bg-black text-mist">
            <Head>
                <title>About Us | AsuraTECH Solutions</title>
                <meta
                    name="description"
                    content="AsuraTECH Solutions builds connected systems for growing businesses: lead generation, automation, operations and hosting from one team."
                />
            </Head>

            {/* ============================================================
                1. HERO (Black band)
               ============================================================ */}
            <section
                aria-labelledby="about-hero-heading"
                className="band-dark relative isolate overflow-hidden py-20 sm:py-28"
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
                        ABOUT US
                    </p>
                    <h1
                        id="about-hero-heading"
                        className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-mist leading-[1.08] max-w-4xl mx-auto"
                    >
                        Engineers who’d rather{' '}
                        <span className="aurora-text motion-safe:animate-text-shimmer">fix your process</span> than sell you more software.
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-mauve-300 leading-relaxed">
                        AsuraTECH Solutions builds the connected systems behind growing businesses: lead generation, automation, daily operations and hosting, all from one team.
                    </p>
                </div>
            </section>

            {/* ============================================================
                2. OUR STORY (Mauve band + glass)
               ============================================================ */}
            <section
                aria-labelledby="our-story-heading"
                className="band-light relative isolate py-16 sm:py-24"
            >
                <div className="glass-backdrop -z-10" aria-hidden="true" />

                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="glass-card rounded-2xl p-6 sm:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-800 mb-2">
                            {STORY.eyebrow}
                        </p>
                        <h2
                            id="our-story-heading"
                            className="text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-8"
                        >
                            {STORY.headline}
                        </h2>

                        <div className="space-y-6 text-base sm:text-lg text-plum-900 leading-relaxed">
                            {STORY.paragraphs.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>

                        {STORY.pullQuote && (
                            <blockquote className="relative my-10 overflow-hidden rounded-2xl bg-white/60 py-5 pl-7 pr-6 text-xl sm:text-2xl font-semibold tracking-tight text-black">
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-magenta-600 to-iris-600"
                                    aria-hidden="true"
                                />
                                “{STORY.pullQuote}”
                            </blockquote>
                        )}

                        {STORY.link && (
                            <div className="mt-8">
                                <Link
                                    href={STORY.link.href}
                                    className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-pink-800 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-900 rounded"
                                >
                                    <span>{STORY.link.label}</span>
                                    <ArrowRight
                                        className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ============================================================
                3. OUR TEAM (Black band — hidden when TEAM_MEMBERS is empty)
               ============================================================ */}
            {hasTeam && (
                <section
                    aria-labelledby="team-heading"
                    className="band-dark py-16 sm:py-24"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-magenta-400">
                                THE PEOPLE BEHIND THE CODE
                            </p>
                            <h2
                                id="team-heading"
                                className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
                            >
                                Our team
                            </h2>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {TEAM_MEMBERS.map((member, idx) => {
                                const socialItems = [
                                    { key: 'repo', label: 'Repo', icon: FolderGit2, href: member.links?.repo },
                                    { key: 'github', label: 'GitHub', icon: GithubIcon, href: member.links?.github },
                                    { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, href: member.links?.linkedin },
                                ];

                                return (
                                    <div
                                        key={idx}
                                        className="aurora-border--hover relative rounded-2xl p-6 bg-plum-950/60 border border-plum-800 flex flex-col justify-between"
                                    >
                                        <div className="flex items-start gap-4">
                                            {member.photo ? (
                                                <img
                                                    src={member.photo}
                                                    alt={member.name}
                                                    className="w-14 h-14 rounded-full object-cover border border-plum-800 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-plum-900 border border-plum-800 text-mauve-300 flex items-center justify-center shrink-0">
                                                    <User className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-semibold text-mist truncate">
                                                    {member.name}
                                                </h3>
                                                <p className="text-xs font-semibold text-mauve-300 uppercase tracking-wider mt-0.5">
                                                    {member.role}
                                                </p>
                                                <p className="text-xs text-mauve-300 mt-2.5 leading-relaxed">
                                                    {member.oneLiner}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Repo, GitHub & LinkedIn links (blank links stay non-clickable until filled in) */}
                                        <div className="mt-5 pt-4 border-t border-plum-800 flex flex-wrap items-center gap-2">
                                            {socialItems.map(({ key, label, icon: Icon, href }) =>
                                                href ? (
                                                    <a
                                                        key={key}
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-plum-800 bg-white/[0.04] px-2.5 py-1.5 text-xs font-semibold text-mauve-300 hover:border-magenta-400 hover:text-mist transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
                                                    >
                                                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                                                        <span>{label}</span>
                                                    </a>
                                                ) : (
                                                    <span
                                                        key={key}
                                                        aria-disabled="true"
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-plum-800/60 bg-transparent px-2.5 py-1.5 text-xs font-medium text-mauve-600 cursor-default select-none"
                                                    >
                                                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                                                        <span>{label}</span>
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================================
                4. WHAT WE BELIEVE (Mauve band + glass)
               ============================================================ */}
            <section
                aria-labelledby="principles-heading"
                className="band-light relative isolate py-16 sm:py-24"
            >
                <div className="glass-backdrop -z-10" aria-hidden="true" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-900">
                            WHAT WE STAND FOR
                        </p>
                        <h2
                            id="principles-heading"
                            className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-black"
                        >
                            What we believe
                        </h2>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {PRINCIPLES.map((item, idx) => (
                            <div
                                key={idx}
                                className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-8 h-8 rounded-lg bg-[image:var(--aurora-deep)] text-white flex items-center justify-center font-mono font-bold text-xs mb-4">
                                        0{idx + 1}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-plum-900 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================
                5. BY THE NUMBERS (Black band)
               ============================================================ */}
            {hasProof && (
                <section
                    aria-labelledby="proof-heading"
                    className="band-dark py-16 sm:py-24"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center mb-12">
                            <h2
                                id="proof-heading"
                                className="text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
                            >
                                By the numbers
                            </h2>
                        </div>

                        {PROOF_STATS.length > 0 && (
                            <div
                                className={`grid gap-6 max-w-4xl mx-auto ${
                                    PROOF_STATS.length === 2
                                        ? 'grid-cols-1 sm:grid-cols-2'
                                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                                }`}
                            >
                                {PROOF_STATS.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="p-7 sm:p-8 rounded-2xl bg-plum-950/60 border border-plum-800 text-center"
                                    >
                                        <p className="font-mono text-4xl sm:text-5xl font-semibold tabular-nums">
                                            <span className="aurora-text">{stat.value}</span>
                                        </p>
                                        <p className="text-sm sm:text-base text-mauve-300 mt-2">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {CLIENT_LOGOS.length > 0 && (
                            <div className="mt-14 pt-10 border-t border-plum-800 flex flex-wrap items-center justify-center gap-8">
                                {CLIENT_LOGOS.map((client) => (
                                    <img
                                        key={client.name}
                                        src={client.logoUrl}
                                        alt={client.name}
                                        className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity motion-reduce:transition-none"
                                    />
                                ))}
                            </div>
                        )}

                        {TESTIMONIALS.length > 0 && (
                            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {TESTIMONIALS.map((t, i) => (
                                    <blockquote
                                        key={i}
                                        className="p-6 rounded-2xl bg-plum-950/60 border border-plum-800"
                                    >
                                        <p className="text-base text-mist leading-relaxed">
                                            “{t.quote}”
                                        </p>
                                        <footer className="mt-4 text-xs font-semibold text-mauve-300">
                                            {t.author} · {t.company}
                                        </footer>
                                    </blockquote>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ============================================================
                6. LIVE SYSTEMS YOU CAN OPEN TODAY (Plum-900 closing band, plum-outline cards)
                   Light glass is NOT used here: 70% white over plum-900 is too dark for pink-800/mauve-700 small text.
                   Hairline bottom seam separates it from FinalCtaSection (also plum-900).
               ============================================================ */}
            {readyProducts.length > 0 && (
                <section
                    aria-labelledby="products-built-heading"
                    className="py-16 sm:py-24 bg-plum-900 text-mist border-b border-white/10"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl mb-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-magenta-400">
                                OUR WORK IN PRODUCTION
                            </p>
                            <h2
                                id="products-built-heading"
                                className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
                            >
                                Live systems you can open today
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {readyProducts.map((prod) => {
                                const CardTag = prod.external ? 'a' : Link;
                                const linkProps = prod.external
                                    ? {
                                          href: prod.url,
                                          target: '_blank',
                                          rel: 'noopener noreferrer',
                                      }
                                    : { href: prod.url };

                                return (
                                    <CardTag
                                        key={prod.name}
                                        {...linkProps}
                                        className="aurora-border--hover group relative rounded-2xl p-6 bg-plum-950/50 border border-plum-600/60 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-plum-900"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-magenta-400">
                                                    {prod.type}
                                                </span>
                                                <ArrowUpRight className="w-4 h-4 text-mauve-300 group-hover:text-mist transition-colors motion-reduce:transition-none" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-mist">
                                                {prod.name}
                                            </h3>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-plum-600/50 flex items-center">
                                            <span className="aurora-btn inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-white">
                                                <span>Visit live system</span>
                                                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                                            </span>
                                        </div>
                                    </CardTag>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================================================
                7. FINAL CALL TO ACTION (Dark) & FOOTER
               ============================================================ */}
            <FinalCtaSection />

            <SiteFooter />
        </div>
    );
}

About.layout = (page) => <LandingLayout>{page}</LandingLayout>;
