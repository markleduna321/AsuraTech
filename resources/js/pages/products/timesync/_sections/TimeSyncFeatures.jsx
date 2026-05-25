import React, { useRef, useEffect, useState } from 'react';
import { Clock, FileCheck, Users, BarChart3, Bell, ShieldCheck } from 'lucide-react';

const FEATURES = [
    {
        icon: Clock,
        title: 'Automated Shift Scheduling',
        desc: 'Define rules once. TimeSync builds optimal schedules based on availability, roles, and workload constraints — no manual juggling.',
        color: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300',
        border: 'border-violet-100 dark:border-violet-800/50',
    },
    {
        icon: FileCheck,
        title: 'BIR Compliant',
        desc: 'Generates BIR-ready payroll reports and tax computations out of the box — keeping your business fully compliant with Philippine tax regulations.',
        color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',
        border: 'border-indigo-100 dark:border-indigo-800/50',
    },
    {
        icon: Users,
        title: 'Real-time Team Availability',
        desc: 'See who is available, on leave, or overtime at a glance. Drag-and-drop reassignment in seconds.',
        color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
        border: 'border-blue-100 dark:border-blue-800/50',
    },
    {
        icon: BarChart3,
        title: 'Hours & Attendance Analytics',
        desc: 'Detailed reports on hours worked, overtime trends, and team utilisation — exportable to CSV or PDF.',
        color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
        border: 'border-emerald-100 dark:border-emerald-800/50',
    },
    {
        icon: Bell,
        title: 'Smart Reminders',
        desc: 'Automated shift reminders via email, SMS, or in-app push — so your team is always where they need to be.',
        color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
        border: 'border-amber-100 dark:border-amber-800/50',
    },
    {
        icon: ShieldCheck,
        title: 'Enterprise Security',
        desc: 'Role-based access control, audit logs, and SOC 2-aligned data handling. Your schedule data stays yours.',
        color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',
        border: 'border-rose-100 dark:border-rose-800/50',
    },
];

export default function TimeSyncFeatures() {
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
                    <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">
                        What's included
                    </p>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                        Everything your team needs to stay in sync
                    </h2>
                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        TimeSync packs a full scheduling toolkit into one clean, fast interface.
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
                            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-snug">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
