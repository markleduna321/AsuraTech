import React from 'react';
import { Mail, Phone, ArrowRight, MessageSquare } from 'lucide-react';

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5" />
                <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-white/5" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left */}
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
                            <MessageSquare className="w-3.5 h-3.5" />
                            Free Consultation
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                            Ready to build something great?
                        </h2>
                        <p className="text-indigo-100 text-lg">
                            Tell us about your project. We&apos;ll get back within 24 hours with a tailored solution and quote.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-4">
                        <a
                            href="mailto:cv@asuratechsolutions.com"
                            className="flex items-center gap-3 bg-white text-indigo-700 font-semibold text-sm px-6 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg group"
                            aria-label="Send us an email"
                        >
                            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
                                <Mail className="w-5 h-5" />
                            </span>
                            <span className="flex-1">
                                <span className="block text-xs text-gray-500 font-normal">Email us at</span>
                                cv@asuratechsolutions.com
                            </span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>

                        <a
                            href="tel:+639959822419"
                            className="flex items-center gap-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm px-6 py-4 rounded-xl border border-white/20 transition-colors group"
                            aria-label="Call us"
                        >
                            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 text-white">
                                <Phone className="w-5 h-5" />
                            </span>
                            <span className="flex-1">
                                <span className="block text-xs text-indigo-200 font-normal">Call us on</span>
                                +63 995 982 2419
                            </span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
