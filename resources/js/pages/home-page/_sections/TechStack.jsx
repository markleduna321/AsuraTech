import React from 'react';

const STACK = [
    { name: 'Laravel',      dot: 'bg-red-500' },
    { name: 'React',        dot: 'bg-blue-500' },
    { name: 'Redux',        dot: 'bg-purple-500' },
    { name: 'Tailwind CSS', dot: 'bg-cyan-500' },
    { name: 'Vite',         dot: 'bg-yellow-400' },
    { name: 'MySQL',        dot: 'bg-blue-700' },
    { name: 'n8n',          dot: 'bg-rose-500' },
    { name: 'Zapier',       dot: 'bg-orange-500' },
    { name: 'Make',         dot: 'bg-purple-600' },
    { name: 'REST APIs',    dot: 'bg-teal-500' },
    { name: 'Ubuntu',       dot: 'bg-orange-600' },
    { name: 'nginx',        dot: 'bg-green-600' },
];

// Duplicate for seamless infinite loop
const ITEMS = [...STACK, ...STACK];

export default function TechStack() {
    return (
        <section
            className="py-10 bg-gray-50 dark:bg-slate-950 border-y border-gray-100 dark:border-slate-800 overflow-hidden"
            aria-label="Technology stack"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                    Built with industry-leading technology
                </p>
            </div>

            <div className="flex" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
                <div className="flex animate-marquee gap-12 pr-12 whitespace-nowrap">
                    {ITEMS.map(({ name, dot }, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-slate-400 opacity-60 hover:opacity-100 transition-opacity duration-200 select-none"
                        >
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
