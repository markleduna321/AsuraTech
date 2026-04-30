import React from 'react';
import { Monitor, ShieldCheck, Users, Zap } from 'lucide-react';

const RESULTS = [
    {
        icon: Monitor,
        value: '50+',
        label: 'Scalable Systems',
        desc: 'Deployed across multiple industries',
        iconClass: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/20',
        borderClass: 'border-indigo-100 dark:border-indigo-800/50',
    },
    {
        icon: ShieldCheck,
        value: '30+',
        label: 'Secure Networks',
        desc: 'Hardened and actively monitored',
        iconClass: 'text-violet-500 bg-violet-50 dark:bg-violet-500/20',
        borderClass: 'border-violet-100 dark:border-violet-800/50',
    },
    {
        icon: Users,
        value: '100+',
        label: 'Happy Clients',
        desc: 'Across the Philippines and beyond',
        iconClass: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/20',
        borderClass: 'border-emerald-100 dark:border-emerald-800/50',
    },
    {
        icon: Zap,
        value: '99.9%',
        label: 'Uptime SLA',
        desc: 'Consistent availability guarantee',
        iconClass: 'text-amber-500 bg-amber-50 dark:bg-amber-500/20',
        borderClass: 'border-amber-100 dark:border-amber-800/50',
    },
];

export default function Stats() {
    return (
        <section className="py-14 md:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                        Proven Results
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Numbers that speak for themselves.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {RESULTS.map(({ icon: Icon, value, label, desc, iconClass, borderClass }) => (
                        <div
                            key={label}
                            className={`group relative bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 text-center border ${borderClass} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                        >
                            <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconClass} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-6 h-6" />
                            </span>
                            <div className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tabular-nums">
                                {value}
                            </div>
                            <div className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                {label}
                            </div>
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-snug">
                                {desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
