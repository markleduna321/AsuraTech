import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Workflow, Clock, Users, ChevronDown } from 'lucide-react';

const STATS = [
    { icon: Users, value: '100+', label: 'Happy Clients' },
    { icon: Workflow, value: '5+', label: 'Years Experience' },
    { icon: Clock, value: '24/7', label: 'Support' },
];

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const reducedMotionRef = useRef(false);

    useEffect(() => {
        reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        const id = requestAnimationFrame(() => setMounted(true));
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(id);
        };
    }, []);

    function handleImageMove(e) {
        if (reducedMotionRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: py * -8, y: px * 8 });
    }

    function resetTilt() {
        setTilt({ x: 0, y: 0 });
    }

    // Entrance classes: hidden until mount, then fade-up (instant for reduced-motion users)
    const reveal = mounted
        ? 'motion-safe:animate-fade-up motion-reduce:opacity-100'
        : 'opacity-0';
    const revealStyle = (delayMs) => (mounted ? { animationDelay: `${delayMs}ms` } : undefined);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* Dot-grid texture for depth */}
            <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                aria-hidden="true"
            />

            {/* Ambient + parallax background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-40 -right-40 motion-safe:animate-float" style={{ animationDuration: '9s' }}>
                    <div
                        className="w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-3xl"
                        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
                    />
                </div>
                <div className="absolute -bottom-20 -left-20 motion-safe:animate-float" style={{ animationDuration: '11s', animationDelay: '1.5s' }}>
                    <div
                        className="w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl"
                        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
                    />
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: copy */}
                    <div className="space-y-8">
                        <div
                            className={`inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full border border-indigo-500/30 ${reveal}`}
                            style={revealStyle(0)}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                            Web Development & Business Automation
                        </div>

                        <h1
                            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight ${reveal}`}
                            style={revealStyle(80)}
                        >
                            Websites That Convert.
                            <span className="block mt-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] motion-safe:animate-text-shimmer">
                                Automation That Follows Up.
                            </span>
                        </h1>

                        <p
                            className={`text-lg text-slate-300 max-w-xl leading-relaxed ${reveal}`}
                            style={revealStyle(160)}
                        >
                            We design and build custom websites and SaaS platforms, then wire them up with
                            automated lead capture, follow-ups, and workflows — so your business runs itself.
                        </p>

                        <div className={`flex flex-wrap gap-3 ${reveal}`} style={revealStyle(240)}>
                            {/* Primary CTA with glow + shimmer */}
                            <div className="relative">
                                <span
                                    className="absolute -inset-1 rounded-xl bg-indigo-500/50 blur-md motion-safe:animate-glow-pulse motion-reduce:hidden pointer-events-none"
                                    aria-hidden="true"
                                />
                                <a
                                    href="#contact"
                                    className="relative overflow-hidden inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform duration-200 group"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none"
                                    />
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a
                                href="#services"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-6 py-3 rounded-xl border border-white/20 transition-colors backdrop-blur-sm"
                            >
                                Explore Services
                            </a>
                        </div>

                        {/* Stats */}
                        <div
                            className={`flex flex-wrap gap-6 pt-4 border-t border-white/10 ${reveal}`}
                            style={revealStyle(320)}
                        >
                            {STATS.map(({ icon: Icon, value, label }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400">
                                        <Icon className="w-4 h-4" />
                                    </span>
                                    <span>
                                        <span className="block text-xl font-bold text-white">{value}</span>
                                        <span className="block text-xs text-slate-400">{label}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: hero image */}
                    <div
                        className={`relative hidden lg:block ${reveal}`}
                        style={{ perspective: '1000px', ...revealStyle(160) }}
                    >
                        <div
                            className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                            style={{
                                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                                transition: 'transform 0.15s ease-out',
                            }}
                            onMouseMove={handleImageMove}
                            onMouseLeave={resetTilt}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85"
                                alt="IT professionals at work"
                                className="w-full h-96 object-cover"
                                loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent" />
                        </div>

                        {/* Glassmorphism badge — bottom-left */}
                        <div
                            className="absolute -bottom-5 -left-5 backdrop-blur-md bg-slate-900/60 ring-1 ring-white/20 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 motion-safe:animate-float"
                            style={{ animationDuration: '5s' }}
                        >
                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-500/20 text-green-400">
                                <Workflow className="w-5 h-5" />
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-white">Automated Follow-Ups</span>
                                <span className="block text-xs text-slate-400">Leads · Emails · SMS</span>
                            </span>
                        </div>

                        {/* Glassmorphism badge — top-right */}
                        <div
                            className="absolute -top-4 -right-4 backdrop-blur-md bg-indigo-600/70 ring-1 ring-white/20 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 motion-safe:animate-float"
                            style={{ animationDuration: '7s', animationDelay: '0.8s' }}
                        >
                            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/50">
                                <Clock className="w-5 h-5 text-white" />
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-white">24 / 7</span>
                                <span className="block text-xs text-indigo-200">Always On Support</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 motion-safe:animate-bounce"
                aria-hidden="true"
            >
                <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
        </section>
    );
}

