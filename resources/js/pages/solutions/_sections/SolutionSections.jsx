import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Workflow } from 'lucide-react';
import SectionLink from '@/components/ui/SectionLink';

const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
const focusDark =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-black';
const focusLight =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-900 focus-visible:ring-offset-2 focus-visible:ring-offset-mauve-500';

export function SolutionHero({ group }) {
    return (
        <section
            aria-labelledby="solutions-hero-heading"
            className="band-dark relative isolate overflow-hidden pb-14 pt-10 sm:pb-20"
        >
            <div aria-hidden="true" className="h-[72px]" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-8 -z-10 h-[34rem] w-[68rem] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(106,52,151,0.3),transparent)]"
            />
            <div className={`${container} grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end`}>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta-400">
                        {group.eyebrow}
                    </p>
                    <h1
                        id="solutions-hero-heading"
                        className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-mist sm:text-5xl lg:text-6xl"
                    >
                        {group.title}
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-mauve-300 sm:text-lg">
                        {group.description}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <SectionLink
                            href={group.cta.primary.href}
                            className={`aurora-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white active:scale-[0.98] ${focusDark}`}
                        >
                            {group.cta.primary.label}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </SectionLink>
                        <a
                            href={`#${group.services[0].id}`}
                            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-mauve-500/60 px-6 py-3 text-sm font-semibold text-mist transition-colors duration-150 hover:border-mist hover:bg-white/5 motion-reduce:transition-none ${focusDark}`}
                        >
                            Explore the solutions
                            <ArrowDown className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <aside
                    aria-label="Included in this solution group"
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-plum-950/70 p-6 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.9)] sm:p-8"
                >
                    <div aria-hidden="true" className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-plum-600/20 blur-3xl" />
                    <div className="relative">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-plum-800 bg-white/[0.05] text-magenta-400">
                            <Workflow className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h2 className="mt-5 text-lg font-semibold tracking-tight text-mist">Built around your process</h2>
                        <p className="mt-2 text-sm leading-relaxed text-mauve-300">{group.intro}</p>
                        <ul className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3 lg:grid-cols-1">
                            {group.services.map((service) => (
                                <li key={service.id} className="flex items-center gap-2.5 text-sm text-mauve-200">
                                    <Check className="h-4 w-4 shrink-0 text-magenta-400" aria-hidden="true" />
                                    {service.shortTitle}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export function SolutionTabs({ group, activeId, onNavigate }) {
    return (
        <nav
            aria-label={`${group.label} solutions`}
            className="sticky top-[72px] z-40 border-y border-white/10 bg-black/90 backdrop-blur-md"
        >
            <div className={`${container} flex min-h-14 items-center`}>
                <div className="flex w-full items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {group.services.map((service) => (
                        <a
                            key={service.id}
                            href={`#${service.id}`}
                            onClick={() => onNavigate(service.id)}
                            aria-current={activeId === service.id ? 'location' : undefined}
                            className={`relative flex min-h-11 shrink-0 items-center rounded-lg px-4 text-xs font-medium transition-colors duration-150 hover:text-mist motion-reduce:transition-none sm:text-sm ${focusDark} ${
                                activeId === service.id ? 'text-mist' : 'text-mauve-300'
                            }`}
                        >
                            {service.shortTitle}
                            <span
                                aria-hidden="true"
                                className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[image:var(--aurora)] transition-transform duration-200 motion-reduce:transition-none ${
                                    activeId === service.id ? 'scale-x-100' : 'scale-x-0'
                                }`}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export function ServiceSection({ service, index, highlighted }) {
    const isLight = index % 2 === 0;
    const Icon = service.icon;

    return (
        <section
            id={service.id}
            aria-labelledby={`${service.id}-heading`}
            className={`relative isolate scroll-mt-36 py-16 sm:py-24 ${isLight ? 'band-light' : 'band-dark'} ${
                highlighted ? 'solution-section--highlight' : ''
            }`}
        >
            {isLight && <div aria-hidden="true" className="glass-backdrop -z-10" />}
            <div className={`${container} grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center`}>
                <div className="max-w-xl">
                    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isLight ? 'text-plum-900' : 'text-magenta-400'}`}>
                        SOLUTION {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2
                        id={`${service.id}-heading`}
                        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${isLight ? 'text-black' : 'text-mist'}`}
                    >
                        {service.title}
                    </h2>
                    <p className={`mt-4 text-base leading-relaxed sm:text-lg ${isLight ? 'text-plum-900' : 'text-mauve-300'}`}>
                        {service.description}
                    </p>
                </div>

                <div className="grid gap-4">
                    <article className={`rounded-2xl p-6 sm:p-8 ${isLight ? 'glass-card' : 'border border-plum-800 bg-plum-950/70'}`}>
                        <span
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                                isLight ? 'bg-plum-900 text-mist' : 'border border-plum-800 bg-white/[0.04] text-magenta-400'
                            }`}
                        >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h3 className={`mt-5 text-sm font-semibold uppercase tracking-wide ${isLight ? 'text-plum-900' : 'text-mist'}`}>
                            What you get
                        </h3>
                        <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-plum-900' : 'text-mauve-300'}`}>
                            {service.detail}
                        </p>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {service.points.map((point) => (
                                <li
                                    key={point}
                                    className={`flex items-start gap-2.5 text-sm ${isLight ? 'text-plum-900' : 'text-mauve-200'}`}
                                >
                                    <Check
                                        className={`mt-0.5 h-4 w-4 shrink-0 ${isLight ? 'text-plum-700' : 'text-magenta-400'}`}
                                        aria-hidden="true"
                                    />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <article className={`rounded-2xl border p-5 ${isLight ? 'border-mauve-300/70 bg-white/70' : 'border-plum-800 bg-black/40'}`}>
                            <h3 className={`text-sm font-semibold ${isLight ? 'text-plum-900' : 'text-mist'}`}>Sound familiar?</h3>
                            <ul className={`mt-3 space-y-2 text-sm leading-relaxed ${isLight ? 'text-plum-900' : 'text-mauve-300'}`}>
                                {service.problems.map((problem) => <li key={problem}>{problem}</li>)}
                            </ul>
                        </article>
                        <article className={`rounded-2xl border p-5 ${isLight ? 'border-mauve-300/70 bg-white/70' : 'border-plum-800 bg-black/40'}`}>
                            <h3 className={`text-sm font-semibold ${isLight ? 'text-plum-900' : 'text-mist'}`}>A good fit if...</h3>
                            <ul className={`mt-3 space-y-2 text-sm leading-relaxed ${isLight ? 'text-plum-900' : 'text-mauve-300'}`}>
                                {service.goodFit.map((situation) => <li key={situation}>{situation}</li>)}
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ProcessSection({ steps }) {
    return (
        <section id="process" aria-labelledby="process-heading" className="band-dark relative py-16 sm:py-24">
            <div className={`${container}`}>
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-magenta-400">OUR APPROACH</p>
                    <h2 id="process-heading" className="mt-3 text-3xl font-semibold tracking-tight text-mist sm:text-4xl">
                        We fix the process first. Then we automate it.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-mauve-300">
                        Automating a bad process just creates faster chaos.
                    </p>
                </div>
                <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <li key={step.key} className="rounded-2xl border border-plum-800 bg-plum-950/60 p-6">
                            <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-[image:var(--aurora-deep)] px-2 font-mono text-xs font-semibold text-white">
                                {step.num}
                            </span>
                            <h3 className="mt-5 text-lg font-semibold text-mist">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-mauve-300">{step.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function FaqSection({ group }) {
    return (
        <section id="faq" aria-labelledby="faq-heading" className="band-light relative isolate py-16 sm:py-24">
            <div aria-hidden="true" className="glass-backdrop -z-10" />
            <div className={`${container} grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]`}>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-plum-900">GOOD TO KNOW</p>
                    <h2 id="faq-heading" className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                        Frequently asked questions
                    </h2>
                </div>
                <div className="divide-y divide-mauve-300/70 border-y border-mauve-300/70">
                    {group.faq.map((item) => (
                        <details key={item.question} className="group py-5">
                            <summary className={`flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-left text-base font-semibold text-plum-900 ${focusLight} [&::-webkit-details-marker]:hidden`}>
                                {item.question}
                                <ChevronDown
                                    className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                                    aria-hidden="true"
                                />
                            </summary>
                            <p className="max-w-prose pr-8 pt-3 text-sm leading-relaxed text-plum-900">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function RelatedSolutions({ group }) {
    if (!group.relatedSolutions?.length) return null;

    return (
        <section aria-labelledby="related-heading" className="band-dark py-16 sm:py-24">
            <div className={container}>
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-magenta-400">EXPLORE THE GROUP</p>
                    <h2 id="related-heading" className="mt-3 text-3xl font-semibold tracking-tight text-mist sm:text-4xl">
                        {group.relatedTitle}
                    </h2>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {group.relatedSolutions.map((solution) => {
                        const Icon = solution.icon;
                        return (
                            <SectionLink
                                key={solution.href}
                                href={solution.href}
                                className={`group rounded-2xl border border-plum-800 bg-plum-950/60 p-6 transition-colors duration-200 hover:border-plum-600 hover:bg-plum-950 motion-reduce:transition-none ${focusDark}`}
                            >
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-plum-800 bg-white/[0.04] text-magenta-400">
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h3 className="mt-5 text-lg font-semibold text-mist">{solution.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-mauve-300">{solution.description}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-magenta-400">
                                    Explore solution
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                                </span>
                            </SectionLink>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export function ClosingCta({ group }) {
    return (
        <section aria-labelledby="solutions-cta-heading" className="relative isolate overflow-hidden bg-plum-900 py-16 text-mist sm:py-24">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[60rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(255,46,126,0.12),transparent)]"
            />
            <div className={`${container} text-center`}>
                <h2 id="solutions-cta-heading" className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                    {group.cta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mauve-300">{group.cta.description}</p>
                <div className="mt-8">
                    <SectionLink
                        href={group.cta.primary.href}
                        className={`aurora-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white active:scale-[0.98] ${focusDark}`}
                    >
                        {group.cta.primary.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </SectionLink>
                </div>
            </div>
        </section>
    );
}

export function NotFoundState() {
    return (
        <section className="band-dark flex min-h-[65vh] items-center py-20">
            <div className={`${container} max-w-3xl`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-magenta-400">SOLUTION GROUP NOT FOUND</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-mist sm:text-5xl">This solution group isn’t available.</h1>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-mauve-300">
                    The requested group may be missing or not yet published. Explore the solutions overview instead.
                </p>
                <SectionLink
                    href="/what-we-do"
                    className={`aurora-btn mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white ${focusDark}`}
                >
                    Browse what we do
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </SectionLink>
            </div>
        </section>
    );
}
