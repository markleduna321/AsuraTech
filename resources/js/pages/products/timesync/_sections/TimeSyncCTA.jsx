import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TimeSyncCTA() {
    return (
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-400/10 blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-200 mb-3">
                    Now accepting beta signups
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Ready to simplify your time tracking?
                </h2>
                <p className="mt-4 text-lg text-violet-100 max-w-xl mx-auto leading-relaxed">
                    Join the teams already saving hours every week with TimeSync. Get early access and
                    shape the product with your feedback.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="#contact"
                        className="relative overflow-hidden inline-flex items-center gap-2 bg-white text-violet-700 text-sm font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 group"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-violet-100/50 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none"
                        />
                        Request Access
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#features"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-7 py-3.5 rounded-xl border border-white/25 transition-colors backdrop-blur-sm"
                    >
                        View Features
                    </a>
                </div>

                <p className="mt-6 text-xs text-violet-200">
                    No credit card required · Cancel anytime · Free during beta
                </p>
            </div>
        </section>
    );
}
