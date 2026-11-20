import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function GymAsuraCTA() {
    return (
        <section id="contact" className="relative overflow-hidden bg-plum-900">
            {/* Background decoration: soft plum / magenta glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-plum-600/25 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-magenta-500/10 blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-magenta-400 mb-3">
                    Now accepting beta signups
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-mist leading-tight">
                    Ready to <span className="aurora-text">level up your gym?</span>
                </h2>
                <p className="mt-4 text-lg text-mauve-300 max-w-xl mx-auto leading-relaxed">
                    Join fitness businesses already saving time and growing revenue with GymAsura.
                    Get early access and shape the platform with your feedback.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="#contact"
                        className="aurora-btn relative overflow-hidden inline-flex items-center gap-2 text-white text-sm font-semibold px-7 py-3.5 rounded-full group focus-visible:outline-none"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 skew-x-12 pointer-events-none motion-reduce:hidden"
                        />
                        Request Access
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                    </a>
                    <a
                        href="#features"
                        className="inline-flex items-center gap-2 hover:bg-white/10 text-mist text-sm font-semibold px-7 py-3.5 rounded-full border border-mist/40 hover:border-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-plum-900 motion-reduce:transition-none"
                    >
                        View Features
                    </a>
                </div>

                <p className="mt-6 text-xs text-mauve-300">
                    No credit card required · Cancel anytime · Free during beta
                </p>
            </div>
        </section>
    );
}
