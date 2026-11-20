import React from 'react';
import { Activity, Users, Clock, Zap, DollarSign, Bell, BarChart3, ExternalLink, ArrowRight } from 'lucide-react';

const FEATURE_PILLS = [
    { icon: Users,      label: 'Member Management' },
    { icon: Clock,      label: 'Attendance Tracking' },
    { icon: Zap,        label: 'Membership Plans' },
    { icon: DollarSign, label: 'Payment Integration' },
    { icon: Bell,       label: 'Class Scheduling' },
    { icon: BarChart3,  label: 'Analytics & Reports' },
];

const TRUST_BADGES = ['256-bit SSL', 'Data Encrypted', 'GDPR Ready'];

// Three columns of gym/fitness images — each column has 4 images with varying
// flex proportions (flex-[N]) so they fill the full panel height on desktop.
// Replace Unsplash URLs with your own by dropping images in public/images/gymasura/.
const PHOTO_COLS = [
    [
        { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', alt: 'Gym interior',    flex: 'flex-[3]' },
        { src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', alt: 'Dumbbell rack',   flex: 'flex-[2]' },
        { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80', alt: 'Weight plates',   flex: 'flex-[2]' },
        { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80', alt: 'Fitness workout', flex: 'flex-[1]' },
    ],
    [
        { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', alt: 'Cardio machines', flex: 'flex-[2]' },
        { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80', alt: 'Weight lifting',  flex: 'flex-[3]' },
        { src: 'https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=800&q=80', alt: 'Boxing bag',       flex: 'flex-[1]' },
        { src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80', alt: 'Gym floor',       flex: 'flex-[2]' },
    ],
    [
        { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80', alt: 'Kettlebells',     flex: 'flex-[1]' },
        { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80', alt: 'Gym equipment',   flex: 'flex-[3]' },
        { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', alt: 'Fitness session',  flex: 'flex-[2]' },
        { src: 'https://images.unsplash.com/photo-1544217442-04d44c66ee91?auto=format&fit=crop&w=800&q=80', alt: 'Barbell workout',  flex: 'flex-[2]' },
    ],
];

export default function GymAsuraHero() {
    return (
        <section
            className="band-dark relative overflow-hidden flex flex-col h-auto lg:h-[calc(100vh_-_4rem_+_72px)]"
            aria-label="GymAsura hero"
        >
            {/* Spacer: hero background runs under the transparent 72px header; content stays put.
                Section height grows by 72px so the inner row below keeps its previous calc(100vh-4rem) height. */}
            <div aria-hidden="true" className="h-[72px] shrink-0" />

            {/* ── Decorative background: soft plum / magenta glow on black ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-24 -left-16 w-[500px] h-[500px] rounded-full bg-plum-900/50 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-magenta-500/10 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #93879C 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            {/* Content row (was the section's own flex-col/lg:flex-row) */}
            <div className="relative flex flex-1 min-h-0 flex-col lg:flex-row">
            {/* ── LEFT: Content panel ── */}
            <div className="relative z-10 flex flex-col justify-center px-8 py-14 lg:px-14 lg:py-0 lg:w-[45%] xl:w-[40%] flex-shrink-0">
                {/* Logo */}
                <div className="flex flex-col gap-1.5 mb-8">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[image:var(--aurora-deep)] shadow-lg shadow-magenta-500/30">
                            <Activity className="w-5 h-5 text-white" />
                        </span>
                        <span className="text-2xl font-semibold tracking-tight text-mist">GymAsura</span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-mauve-500 ml-1">
                        Powered by AsuraTECH Solutions
                    </p>
                </div>

                {/* Badge */}
                <span className="inline-flex items-center gap-2 self-start text-xs font-semibold text-magenta-400 bg-plum-900/40 border border-plum-800 px-3.5 py-1.5 rounded-full mb-7">
                    <span className="w-1.5 h-1.5 rounded-full bg-magenta-400 motion-safe:animate-pulse" />
                    Now Available — Try the Live Demo
                </span>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-mist mb-4">
                    Manage Members.
                    <br />
                    <span className="aurora-text">Grow Your Gym.</span>
                </h1>
                <p className="text-base text-mauve-300 max-w-md leading-relaxed mb-8">
                    The all-in-one gym management platform for modern fitness businesses.
                    Members, payments, schedules &amp; analytics — all in one place.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {FEATURE_PILLS.map(({ icon: Icon, label }) => (
                        <span
                            key={label}
                            className="flex items-center gap-2 text-xs text-mauve-300 bg-plum-900/60 border border-plum-800 rounded-full px-3.5 py-1.5"
                        >
                            <Icon className="w-3.5 h-3.5 text-magenta-400 flex-shrink-0" />
                            {label}
                        </span>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <a
                        href="https://demogym.asuratechsolutions.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aurora-btn group relative overflow-hidden inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-7 py-3.5 rounded-full focus-visible:outline-none"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none motion-reduce:hidden"
                        />
                        Open Demo
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-chat')); }}
                        className="inline-flex items-center justify-center gap-2 border border-mist/40 hover:border-mist hover:bg-white/10 text-mist text-sm font-medium px-7 py-3.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none"
                    >
                        Request a Demo
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-2 flex-wrap">
                    {TRUST_BADGES.map((badge) => (
                        <span
                            key={badge}
                            className="text-xs text-mauve-500 border border-plum-800 rounded-full px-2.5 py-1"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            {/* ── RIGHT: Photo mosaic ── */}
            {/* Mobile: fixed height strip. Desktop: fills full panel height via absolute fill */}
            <div className="relative h-72 lg:h-auto lg:flex-1 overflow-hidden">
                {/* Left-edge gradient — blends mosaic seamlessly into the dark content panel */}
                <div
                    className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, rgb(0 0 0), transparent)' }}
                    aria-hidden="true"
                />
                {/* Top & bottom fades */}
                <div className="absolute inset-x-0 top-0 h-10 z-10 pointer-events-none bg-gradient-to-b from-black to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 h-10 z-10 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />

                {/* Three-column flex mosaic — fills full height on desktop */}
                <div className="absolute inset-0 flex gap-2.5 p-3 lg:p-4 lg:pl-8">
                    {PHOTO_COLS.map((col, ci) => (
                        <div key={ci} className="flex-1 flex flex-col gap-2.5 min-w-0">
                            {col.map(({ src, alt, flex }) => (
                                <div
                                    key={alt}
                                    className={`${flex} relative rounded-xl overflow-hidden group min-h-0`}
                                >
                                    <img
                                        src={src}
                                        alt={alt}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                        loading="lazy"
                                    />
                                    {/* Plum tint overlay */}
                                    <div className="absolute inset-0 bg-plum-950/40 group-hover:bg-plum-950/10 transition-colors duration-300 motion-reduce:transition-none" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </section>
    );
}
