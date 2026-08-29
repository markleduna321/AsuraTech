import React from 'react';
import { ArrowRight } from 'lucide-react';

const PROJECT = {
    category: 'Web Platform + Automation',
    title: 'Medical Records Management Platform',
    description:
        'A secure, multi-tenant web platform built for a regional healthcare network — automating patient record intake, appointment scheduling, and billing follow-ups across 12 clinic branches.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Healthcare staff using a digital management system',
    outcome: '40% reduction in administrative overhead after automating scheduling and billing workflows.',
    tags: ['Laravel', 'React', 'RTK Query', 'MySQL', 'Inertia.js', 'Tailwind CSS'],
};

export default function FeaturedProject() {
    return (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2">
                        Case Study
                    </p>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                        Featured Project
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200 dark:ring-slate-700">
                    {/* Image side */}
                    <div className="relative h-64 lg:h-auto min-h-[20rem]">
                        <img
                            src={PROJECT.image}
                            alt={PROJECT.imageAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-transparent" />
                    </div>

                    {/* Content side */}
                    <div className="bg-white dark:bg-slate-800 p-8 md:p-10 flex flex-col justify-center">
                        <span className="inline-flex w-fit items-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            {PROJECT.category}
                        </span>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
                            {PROJECT.title}
                        </h3>

                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {PROJECT.description}
                        </p>

                        {/* Outcome callout */}
                        <div className="mt-4 flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl px-4 py-3">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm leading-none mt-0.5">↑</span>
                            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                                {PROJECT.outcome}
                            </p>
                        </div>

                        {/* Tech tags */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            {PROJECT.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 group"
                            >
                                Discuss a similar project
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
