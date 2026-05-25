import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function GymAsuraCTA() {
    return (
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200 mb-3">
                    Now accepting beta signups
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Ready to level up your gym?
                </h2>
                <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto leading-relaxed">
                    Join fitness businesses already saving time and growing revenue with GymAsura.
                    Get early access and shape the platform with your feedback.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="#contact"
                        className="relative overflow-hidden inline-flex items-center gap-2 bg-white text-emerald-700 text-sm font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 group"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none"
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

                <p className="mt-6 text-xs text-emerald-200">
                    No credit card required · Cancel anytime · Free during beta
                </p>
            </div>
        </section>
    );
}
