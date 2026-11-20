import React, { useRef, useEffect, useState } from 'react';
import { Clock, FileCheck, Users, BarChart3, Bell, ShieldCheck } from 'lucide-react';

const FEATURES = [
    {
        icon: Clock,
        title: 'Automated Shift Scheduling',
        desc: 'Define rules once. TimeSync builds optimal schedules based on availability, roles, and workload constraints — no manual juggling.',
    },
    {
        icon: FileCheck,
        title: 'BIR Compliant',
        desc: 'Generates BIR-ready payroll reports and tax computations out of the box — keeping your business fully compliant with Philippine tax regulations.',
    },
    {
        icon: Users,
        title: 'Real-time Team Availability',
        desc: 'See who is available, on leave, or overtime at a glance.',
    },
    {
        icon: BarChart3,
        title: 'Hours & Attendance Analytics',
        desc: 'Detailed reports on hours worked, overtime trends, and team utilisation — exportable to CSV or PDF.',
    },
    {
        icon: Bell,
        title: 'Smart Reminders',
        desc: 'Automated shift reminders via email or in-app push — so your team is always where they need to be.',
    },
    {
        icon: ShieldCheck,
        title: 'Enterprise Security',
        desc: 'Role-based access control, audit logs, and SOC 2-aligned data handling. Your schedule data stays yours.',
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
        <section id="features" className="band-light relative isolate py-16 md:py-24">
            <div className="glass-backdrop -z-10" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-plum-900 mb-2">
                        What's included
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
                        Everything your team needs to stay in sync
                    </h2>
                    <p className="mt-3 text-plum-900">
                        TimeSync packs a full scheduling toolkit into one clean, fast interface.
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
                                <h3 className="text-base font-semibold text-black leading-snug">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm text-mauve-700 leading-relaxed">
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
