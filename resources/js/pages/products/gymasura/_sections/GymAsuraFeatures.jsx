import React, { useRef, useEffect, useState } from 'react';
import { Users, Clock, Zap, DollarSign, Bell, BarChart3 } from 'lucide-react';

const FEATURES = [
    {
        icon: Users,
        title: 'Member Management',
        desc: 'Manage member profiles, subscriptions, emergency contacts, and documents from one unified dashboard.',
        color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
        border: 'border-emerald-100 dark:border-emerald-800/50',
    },
    {
        icon: Clock,
        title: 'Attendance Tracking',
        desc: 'Automated check-in/check-out via QR code or PIN. Track member visit history and frequency in real-time.',
        color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300',
        border: 'border-teal-100 dark:border-teal-800/50',
    },
    {
        icon: Zap,
        title: 'Membership Plans',
        desc: 'Create flexible membership tiers — monthly, quarterly, annual, or walk-in day passes — with automated renewals and expiry alerts.',
        color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300',
        border: 'border-green-100 dark:border-green-800/50',
    },
    {
        icon: DollarSign,
        title: 'Payment Integration',
        desc: 'Accept GCash, Maya, credit cards, and cash. Automated payment reminders and official receipt generation included.',
        color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
        border: 'border-emerald-100 dark:border-emerald-800/50',
    },
    {
        icon: Bell,
        title: 'Class Scheduling',
        desc: 'Schedule group classes, assign trainers, manage capacity limits, and notify members of upcoming or cancelled sessions.',
        color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300',
        border: 'border-teal-100 dark:border-teal-800/50',
    },
    {
        icon: BarChart3,
        title: 'Analytics & Reports',
        desc: 'Revenue reports, member growth trends, and retention metrics — all exportable for business review and BIR compliance.',
        color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300',
        border: 'border-green-100 dark:border-green-800/50',
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
        <section id="features" className="py-16 md:py-24 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-2">
                        What's included
                    </p>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                        Everything your gym needs to thrive
                    </h2>
                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        GymAsura packs a full fitness management toolkit into one clean, fast platform.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {FEATURES.map(({ icon: Icon, title, desc, color, border }, idx) => (
                        <div
                            key={title}
                            className={`group relative bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border ${border} hover:shadow-lg hover:-translate-y-1 transition-all duration-500`}
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: `${idx * 80}ms`,
                            }}
                        >
                            <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-5 h-5" />
                            </span>
                            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug mb-2">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
