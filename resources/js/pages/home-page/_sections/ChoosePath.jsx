import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Boxes, CloudCog, Code2, Megaphone } from 'lucide-react';

const PATHS = [
    {
        key: 'sales',
        icon: Megaphone,
        eyebrow: 'All-in-one growth platform',
        title: 'Automate Sales & Marketing',
        benefit: 'Capture, nurture and close leads from one platform, with follow-ups that run themselves.',
        chips: ['Funnels', 'Automated Follow-ups', 'Unified Inbox', 'CRM'],
        links: [{ label: 'Explore', href: '#platform' }],
        layout: 'md:col-span-2 lg:col-span-1 lg:row-span-2',
        large: true,
    },
    {
        key: 'turnkey',
        icon: Boxes,
        eyebrow: 'Ready-made systems',
        title: 'Launch Turnkey Industry Software',
        benefit: 'Deploy a proven system for your business this week instead of building from scratch.',
        chips: ['Gym', 'HRIS', 'Clinic'],
        links: [{ label: 'Explore', href: '#demos' }],
        layout: '',
    },
    {
        key: 'cloud',
        icon: CloudCog,
        eyebrow: 'Our platforms',
        title: 'Power Up with Our Cloud & Lead Platforms',
        benefit: 'Find new customers with Diskobre and run your infrastructure on Caleho.',
        chips: ['Lead Generation', 'Cloud Hosting', 'Managed Infrastructure'],
        links: [
            { label: 'Diskobre.com', href: 'https://diskobre.com', external: true },
            { label: 'Caleho.cloud', href: 'https://caleho.cloud', external: true },
        ],
        layout: '',
    },
    {
        key: 'custom',
        icon: Code2,
        eyebrow: 'Bespoke engineering',
        title: 'Build Custom Enterprise Software',
        benefit: 'Software engineered around your exact operations, integrated with the AI and tools you rely on.',
        chips: ['Custom Web & Apps', 'Bespoke ERPs', 'AI API Integrations', 'IT Consultancy'],
        links: [{ label: 'Explore', href: '#engineering' }],
        layout: 'md:col-span-2 lg:col-span-2',
        wide: true,
    },
];

const FLOW = [
    { label: 'New lead captured', meta: 'Website funnel' },
    { label: 'SMS + email follow-up sent', meta: 'Instantly' },
    { label: 'Appointment booked', meta: 'Synced to CRM' },
];

// Decorative mini automation flow for the large card.
function FlowVisual() {
    return (
        <div className="bento-reveal bento-flow-visual relative mt-8 flex flex-1 flex-col justify-center rounded-2xl border border-white/[0.07] bg-[#060a18]/60 p-5 lg:mt-5 lg:p-4" aria-hidden="true">
            <div className="relative">
                {/* Track connects the center of badge 1 (top-5 = 20px) to the center of badge 3 (bottom-5 = 20px) */}
                <div className="absolute bottom-5 left-[11.5px] top-5 w-px bg-gradient-to-b from-indigo-400/50 via-indigo-400/30 to-cyan-300/50">
                    <span className="bento-flow-track absolute inset-0 z-20">
                        <span className="absolute -left-[3.5px] -top-[3.5px] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_2px_rgba(34,211,238,0.95)]" />
                    </span>
                </div>
                <ol className="space-y-4 lg:space-y-2.5">
                    {FLOW.map((step, i) => (
                        <li key={step.label} className={`bento-flow-step-${i + 1} relative flex items-center gap-4`}>
                            <span className="bento-flow-badge relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-indigo-400/50 bg-[#060a18] text-[10px] font-semibold text-indigo-200">
                                {i + 1}
                            </span>
                            <span className="bento-flow-row flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 lg:py-2">
                                <span className="truncate text-sm font-medium text-slate-200">{step.label}</span>
                                <span className="hidden flex-shrink-0 text-xs text-slate-500 sm:inline">{step.meta}</span>
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

function PathCard({ path, index }) {
    const { icon: Icon, eyebrow, title, benefit, chips, links, layout, large, wide } = path;

    function handlePointerMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }

    return (
        <article
            onPointerMove={handlePointerMove}
            className={`bento-card group relative flex flex-col overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-6 ${layout}`}
            style={{ '--i': index }}
            aria-labelledby={`path-${path.key}-title`}
        >
            {/* Frame that draws itself when the section scrolls into view */}
            <svg className="bento-frame pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <rect x="0.5" y="0.5" width="100%" height="100%" rx="15" />
            </svg>

            <div className={`relative flex flex-1 flex-col ${wide ? 'lg:flex-row lg:items-center lg:gap-10' : ''}`}>
                <div className={wide ? 'lg:flex-1' : ''}>
                    {/* Icon + eyebrow share a row on desktop to save vertical space */}
                    <div className="bento-reveal lg:flex lg:items-center lg:gap-3">
                        <span
                            className={`flex items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 ${
                                large ? 'h-14 w-14 lg:h-12 lg:w-12' : 'h-12 w-12 lg:h-10 lg:w-10 lg:rounded-xl'
                            }`}
                        >
                            <Icon className={large ? 'h-7 w-7 lg:h-6 lg:w-6' : 'h-6 w-6 lg:h-5 lg:w-5'} strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 lg:mt-0">{eyebrow}</p>
                    </div>

                    <h3
                        id={`path-${path.key}-title`}
                        className={`bento-reveal mt-2 font-semibold tracking-[-0.02em] text-white lg:mt-4 ${
                            large ? 'text-2xl sm:text-3xl lg:text-2xl xl:text-[1.75rem] xl:leading-tight' : 'text-xl sm:text-2xl lg:text-xl'
                        }`}
                    >
                        {title}
                    </h3>
                    <p
                        className={`bento-reveal mt-3 leading-relaxed text-slate-400 lg:mt-2 ${
                            large ? 'max-w-md text-base sm:text-lg lg:text-base' : 'text-sm sm:text-base lg:text-sm'
                        }`}
                    >
                        {benefit}
                    </p>
                </div>

                <div className={`flex flex-col ${wide ? 'mt-6 lg:mt-0 lg:flex-1' : 'mt-6 flex-1 lg:mt-4'}`}>
                    <ul className="bento-reveal flex flex-wrap gap-2" aria-label={`${title} features`}>
                        {chips.map((chip) => (
                            <li
                                key={chip}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300"
                            >
                                {chip}
                            </li>
                        ))}
                    </ul>

                    {large && <FlowVisual />}

                    <div className="bento-reveal mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8 lg:pt-5">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="group/link inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-indigo-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#060a18]"
                            >
                                {link.label}
                                {link.external ? (
                                    <>
                                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                                        <span className="sr-only">(opens in a new tab)</span>
                                    </>
                                ) : (
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                                )}
                                {!link.external && <span className="sr-only">{title}</span>}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function ChoosePath() {
    const gridRef = useRef(null);
    const [built, setBuilt] = useState(false);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid || !('IntersectionObserver' in window)) {
            setBuilt(true);
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setBuilt(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
        );
        io.observe(grid);
        return () => io.disconnect();
    }, []);

    return (
        <section
            id="paths"
            aria-labelledby="paths-heading"
            className="relative overflow-hidden bg-[#060a18] py-20 md:py-28 lg:flex lg:min-h-[calc(100svh-72px)] lg:flex-col lg:justify-center lg:py-10"
        >
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading: stacked on mobile, side-by-side on desktop to keep the section within one screen */}
                <div className="max-w-2xl lg:flex lg:max-w-none lg:items-end lg:justify-between lg:gap-12">
                    <div className="lg:max-w-xl">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">Choose your path</p>
                        <h2 id="paths-heading" className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                            Start where your business needs it most.
                        </h2>
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg lg:mt-0 lg:max-w-md lg:text-base">
                        Automate your pipeline, deploy proven software, tap our platforms or build something entirely your own.
                    </p>
                </div>

                <div
                    ref={gridRef}
                    data-built={built ? 'true' : 'false'}
                    className="bento-grid mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-5"
                >
                    {PATHS.map((path, i) => (
                        <PathCard key={path.key} path={path} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
