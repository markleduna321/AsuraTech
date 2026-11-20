import React, { useRef, useEffect, useState } from 'react';
import { Users, Clock, Zap, DollarSign, Bell, BarChart3 } from 'lucide-react';

const FEATURES = [
    {
        icon: Users,
        title: 'Member Management',
        desc: 'Manage member profiles, subscriptions, emergency contacts, and documents from one unified dashboard.',
    },
    {
        icon: Clock,
        title: 'Attendance Tracking',
        desc: 'Automated check-in/check-out via QR code or PIN. Track member visit history and frequency in real-time.',
    },
    {
        icon: Zap,
        title: 'Membership Plans',
        desc: 'Create flexible membership tiers — monthly, quarterly, annual, or walk-in day passes — with automated renewals and expiry alerts.',
    },
    {
        icon: DollarSign,
        title: 'Payment Integration',
        desc: 'Accept GCash, Maya, credit cards, and cash. Automated payment reminders and official receipt generation included.',
    },
    {
        icon: Bell,
        title: 'Class Scheduling',
        desc: 'Schedule group classes, assign trainers, manage capacity limits, and notify members of upcoming or cancelled sessions.',
    },
    {
        icon: BarChart3,
        title: 'Analytics & Reports',
        desc: 'Revenue reports, member growth trends, and retention metrics — all exportable for business review and BIR compliance.',
    },
];

export default function GymAsuraFeatures() {
    const containerRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        const el = containerRef.current;
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="features" className="band-light relative isolate py-16 md:py-24">
            <div className="glass-backdrop -z-10" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-plum-900 mb-2">
                        What's included
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
                        Everything your gym needs to thrive
                    </h2>
                    <p className="mt-3 text-plum-900">
                        GymAsura packs a full fitness management toolkit into one clean, fast platform.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {FEATURES.map(({ icon: Icon, title, desc }, idx) => (
                        // Wrapper hosts the hover ring so it doesn't override the glass-card's own hairline/shadow.
                        <div
                            key={title}
                            className="aurora-border--hover group relative rounded-2xl transition-[opacity,transform] duration-500 motion-reduce:transition-none"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: `${idx * 80}ms`,
                            }}
                        >
                            <div className="glass-card relative h-full rounded-2xl p-6">
                                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[image:var(--aurora-deep)] text-white mb-4 transition-transform duration-300 motion-safe:group-hover:scale-110 motion-reduce:transition-none">
                                    <Icon className="w-5 h-5" />
                                </span>
                                <h3 className="text-base font-semibold text-black leading-snug mb-2">
                                    {title}
                                </h3>
                                <p className="text-sm text-mauve-700 leading-relaxed">
                                    {desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
