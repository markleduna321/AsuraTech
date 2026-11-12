import { Head } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import LandingLayout from '@/components/layout/LandingLayout';
import DarkPageShell from '@/components/layout/DarkPageShell';
import CredentialsChip from '@/components/ui/CredentialsChip';
import SectionLink from '@/components/ui/SectionLink';
import { DEMOS } from '@/features/demos/demoData';
import { track } from '@/features/analytics/tracking';

function DemoCard({ demo }) {
    return (
        <li className="flex">
            <article
                aria-labelledby={`portal-${demo.key}`}
                className="glass-panel relative flex w-full flex-col rounded-2xl p-6 sm:p-7"
                style={{ '--tint': demo.tint.css }}
            >
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--tint))]" aria-hidden="true" />
                    {demo.eyebrow}
                </p>
                <h2 id={`portal-${demo.key}`} className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-white">
                    {demo.outcome}
                </h2>
                <p className="mt-1 text-sm text-slate-400">{demo.product}</p>

                <ul className="mt-5 flex-1 space-y-2.5">
                    {demo.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-300">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                            {bullet}
                        </li>
                    ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3">
                    <a
                        href={demo.url}
                        target="_blank"
                        rel="noopener"
                        onClick={() => track('demo_tile_click', { demo: demo.key, from: 'portal' })}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18] motion-reduce:transition-none"
                    >
                        {demo.launchLabel}
                        <span className="sr-only">(opens in a new tab)</span>
                        <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                            aria-hidden="true"
                        />
                    </a>
                    <p className="text-center font-mono text-xs text-slate-400">{demo.domain}</p>
                    {demo.credentials && (
                        <div className="flex justify-center">
                            <CredentialsChip credentials={demo.credentials} />
                        </div>
                    )}
                </div>
            </article>
        </li>
    );
}

export default function DemoPortal() {
    return (
        <>
            <Head title="Demo Portal — AsuraTECH Solutions" />
            <DarkPageShell
                width="max-w-6xl"
                eyebrow="Demo Portal"
                title="Test drive our software."
                intro="HRIS, Gym and Clinic systems in one place. Each demo opens in a new tab, no call needed."
            >
                <ul role="list" className="grid gap-6 md:grid-cols-3">
                    {DEMOS.map((demo) => (
                        <DemoCard key={demo.key} demo={demo} />
                    ))}
                </ul>

                <div className="glass-chip mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-base font-semibold text-white">Not sure which one fits?</p>
                        <p className="mt-1 text-sm text-slate-400">Book a free 15-minute Systems Audit and we’ll point you to the right starting point.</p>
                    </div>
                    <SectionLink
                        href="/#get-started"
                        className="group inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/[0.05] hover:ring-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 motion-reduce:transition-none"
                    >
                        Book Your Free Audit
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                    </SectionLink>
                </div>
            </DarkPageShell>
        </>
    );
}

DemoPortal.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
