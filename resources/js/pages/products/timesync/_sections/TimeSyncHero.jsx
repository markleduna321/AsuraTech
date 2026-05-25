import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Users, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

const FEATURE_PILLS = [
    { icon: Clock,       label: 'Real-Time Clock-In / Clock-Out' },
    { icon: DollarSign,  label: 'Automated Payroll Computation' },
    { icon: Users,       label: 'Team Roster & Schedule Management' },
    { icon: ShieldCheck, label: 'Secure & Compliant' },
];

const TRUST_BADGES = ['256-bit SSL', 'Data Encrypted', 'GDPR Ready'];

// Drop screenshots into public/images/ — recommended 1440×900 px (16:10)
const SLIDES = [
    { src: '/images/timesync-preview-1.png', alt: 'TimeSync — Daily attendance overview' },
    { src: '/images/timesync-preview-2.png', alt: 'TimeSync — Payroll computation screen' },
    { src: '/images/timesync-preview-3.png', alt: 'TimeSync — Team roster view' },
];

const INTERVAL_MS = 4000;

export default function TimeSyncHero() {
    const [slide, setSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    // Auto-advance; pauses on hover
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setSlide((s) => (s + 1) % SLIDES.length);
        }, INTERVAL_MS);
        return () => clearInterval(id);
    }, [paused]);

    const goTo = (i) => setSlide(i);

    return (
        <section
            className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-violet-950"
            aria-label="TimeSync hero"
        >
            {/* ── Decorative background ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-violet-600/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[480px] h-[300px] bg-indigo-700/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[480px] h-[300px] bg-violet-700/10 blur-3xl" />
                {/* Subtle dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 flex flex-col items-center text-center">

                {/* ── Logo row ── */}
                <div className="flex items-center gap-3 mb-7">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600 shadow-lg shadow-violet-500/40">
                        <Clock className="w-5 h-5 text-white" />
                    </span>
                    <span className="text-xl font-extrabold tracking-tight text-white">TimeSync</span>
                    <span className="hidden sm:flex items-center text-xs font-semibold uppercase tracking-widest text-violet-300/50 border-l border-violet-800 pl-3">
                        by AsuraTECH Solutions
                    </span>
                </div>

                {/* ── "Now Available" badge ── */}
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1.5 rounded-full mb-7">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Now Available — Try the Live Demo
                </span>

                {/* ── Headline ── */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white max-w-3xl">
                    Track Hours.
                    <br />
                    <span className="text-yellow-400">Pay Accurately.</span>
                </h1>
                <p className="mt-5 text-lg text-slate-400 max-w-2xl leading-relaxed">
                    The smart time-keeping &amp; payroll platform built for modern
                    work-from-home teams. No spreadsheets. No guesswork.
                </p>

                {/* ── CTAs ── */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                        href="https://demo.asuratechsolutions.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-all duration-200"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none"
                        />
                        Open Demo
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-violet-500 text-slate-300 hover:text-white text-sm font-medium px-7 py-3.5 rounded-xl transition-colors"
                    >
                        Request a Demo
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                {/* ── Trust badges ── */}
                <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                    {TRUST_BADGES.map((badge) => (
                        <span
                            key={badge}
                            className="text-xs text-slate-500 border border-slate-800 rounded-full px-2.5 py-1"
                        >
                            {badge}
                        </span>
                    ))}
                </div>

                {/* ── Feature pills ── */}
                <div className="mt-8 flex flex-wrap gap-2.5 justify-center">
                    {FEATURE_PILLS.map(({ icon: Icon, label }) => (
                        <span
                            key={label}
                            className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 border border-slate-700/60 rounded-full px-3.5 py-1.5"
                        >
                            <Icon className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                            {label}
                        </span>
                    ))}
                </div>

                {/* ── Product screenshot carousel ── */}
                <div
                    className="relative w-full max-w-5xl mt-14"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Floating chip — Clocked In */}
                    <div className="absolute -top-4 -left-3 sm:-left-10 z-10 flex items-center gap-2.5 bg-white/95 backdrop-blur shadow-2xl ring-1 ring-slate-200/80 rounded-2xl px-3.5 py-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                        <div className="text-left">
                            <p className="text-xs font-semibold text-slate-800 leading-tight">Clocked In</p>
                            <p className="text-xs text-slate-400">09:00 AM</p>
                        </div>
                    </div>

                    {/* Floating chip — Today's Pay */}
                    <div className="absolute -bottom-4 -right-3 sm:-right-10 z-10 bg-white/95 backdrop-blur shadow-2xl ring-1 ring-slate-200/80 rounded-2xl px-4 py-3 min-w-[128px]">
                        <p className="text-xs text-slate-400 mb-0.5">Today's Pay</p>
                        <p className="text-base font-bold text-violet-600">₱1,840</p>
                        <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-[65%] bg-gradient-to-r from-violet-500 to-yellow-400 rounded-full" />
                        </div>
                    </div>

                    {/* Browser frame */}
                    <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_-12px_rgba(109,40,217,0.45)] ring-1 ring-white/10">
                        {/* Dark chrome bar */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/90 backdrop-blur border-b border-slate-700/60">
                            <span className="w-3 h-3 rounded-full bg-red-500/70" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <span className="w-3 h-3 rounded-full bg-green-500/70" />
                            <div className="ml-3 flex-1 h-5 bg-slate-700 rounded flex items-center px-3">
                                <span className="text-xs text-slate-400 truncate">
                                    app.timesync.ph / dashboard
                                </span>
                            </div>
                        </div>

                        {/* Screenshot — 16:10 */}
                        <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                            {/* Dark skeleton (matches dark chrome) */}
                            <div className="absolute inset-0 flex flex-col gap-4 p-6" aria-hidden="true">
                                <div className="flex gap-3 items-center">
                                    <div className="h-8 w-40 bg-slate-800 rounded-lg animate-pulse" />
                                    <div className="ml-auto h-8 w-28 bg-slate-800 rounded-lg animate-pulse" />
                                </div>
                                <div className="flex gap-4 flex-1">
                                    <div className="w-56 rounded-xl bg-slate-800 animate-pulse" />
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="h-28 bg-slate-800 rounded-xl animate-pulse" />
                                        <div className="h-28 bg-slate-800 rounded-xl animate-pulse" />
                                        <div className="flex-1 bg-slate-800 rounded-xl animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            <img
                                key={slide}
                                src={SLIDES[slide].src}
                                alt={SLIDES[slide].alt}
                                className="relative w-full h-full object-cover object-top"
                                loading="eager"
                            />

                            {/* Bottom fade into section bg */}
                            <div
                                className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                                style={{ background: 'linear-gradient(to top, rgb(15 10 30 / 0.5), transparent)' }}
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    {/* ── Carousel dots ── */}
                    <div className="flex items-center justify-center gap-2.5 mt-7">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`View preview ${i + 1}`}
                                className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                                    i === slide
                                        ? 'w-8 h-2 bg-violet-400'
                                        : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

