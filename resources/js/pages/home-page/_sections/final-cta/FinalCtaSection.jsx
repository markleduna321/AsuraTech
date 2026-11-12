import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import AuditForm from './AuditForm';
import { AUDIT, DEMO_PORTAL } from './finalCtaData';
import { captureUtm, rememberCtaSource, track } from '@/features/analytics/tracking';
import { DEMOS } from '@/features/demos/demoData';
import CredentialsChip from '@/components/ui/CredentialsChip';
import { trackSpotlight, useInViewOnce } from '../platform/scrollHooks';

const TILE_LABELS = { hris: 'HRIS' };

// Records which section's CTA brought the visitor here, so the lead shows where it came from.
function useCtaAttribution() {
    useEffect(() => {
        captureUtm();
        const onClick = (e) => {
            const link = e.target.closest?.('a[href="#get-started"], a[href="#contact"]');
            if (!link) return;
            const source = link.dataset.ctaSource || link.closest('section[id]')?.id || (link.closest('header') ? 'nav' : 'page');
            rememberCtaSource(source);
            track('audit_cta_click', { source });
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);
}

function Bullets({ items, tone }) {
    return (
        <ul className="mt-6 space-y-2.5">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`} aria-hidden="true" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

function CardHeader({ id, eyebrow, title, offer, eyebrowTone }) {
    return (
        <>
            <p className={`text-xs font-medium uppercase tracking-[0.18em] ${eyebrowTone}`}>{eyebrow}</p>
            <h3 id={id} className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.75rem]">
                {title}
            </h3>
            <p className="mt-2 text-base text-slate-300">{offer}</p>
        </>
    );
}

function AuditCard() {
    return (
        <div className="cta-sweep stage-in relative flex flex-col rounded-2xl p-px" style={{ '--d': '0s' }}>
            <article
                aria-labelledby="audit-title"
                onPointerMove={trackSpotlight}
                className="cta-card cta-card--primary glass-panel relative flex-1 rounded-[15px] bg-[#060a18] p-6 sm:p-8"
            >
                <CardHeader id="audit-title" eyebrow={AUDIT.eyebrow} title={AUDIT.title} offer={AUDIT.offer} eyebrowTone="text-indigo-300" />
                <Bullets items={AUDIT.bullets} tone="text-indigo-300" />
                <div className="mt-8 border-t border-white/[0.08] pt-6">
                    <AuditForm />
                </div>
            </article>
        </div>
    );
}

function DemoCard() {
    const external = Boolean(DEMO_PORTAL.url);
    const PortalIcon = external ? ArrowUpRight : ArrowDown;

    return (
        <article
            aria-labelledby="portal-title"
            onPointerMove={trackSpotlight}
            className="cta-card glass-panel stage-in relative flex flex-col self-start rounded-2xl p-6 sm:p-8"
            style={{ '--d': '0.12s' }}
        >
            <CardHeader id="portal-title" eyebrow={DEMO_PORTAL.eyebrow} title={DEMO_PORTAL.title} offer={DEMO_PORTAL.offer} eyebrowTone="text-slate-400" />
            <Bullets items={DEMO_PORTAL.bullets} tone="text-slate-400" />

            <div className="mt-8 flex flex-col gap-3">
                <a
                    href={external ? DEMO_PORTAL.url : '#demos'}
                    {...(external ? { target: '_blank', rel: 'noopener' } : {})}
                    onClick={() => track('demo_portal_click', { destination: external ? 'portal' : 'demos-section' })}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/[0.05] hover:ring-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                >
                    {DEMO_PORTAL.label}
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                    <PortalIcon
                        className={`h-4 w-4 transition-transform motion-reduce:transition-none ${
                            external ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : 'group-hover:translate-y-0.5'
                        }`}
                        aria-hidden="true"
                    />
                </a>
                {DEMO_PORTAL.credentials && (
                    <div className="flex justify-center">
                        <CredentialsChip credentials={DEMO_PORTAL.credentials} />
                    </div>
                )}
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Or jump straight in</p>
                <ul className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                    {DEMOS.map((demo) => (
                        <li key={demo.key}>
                            <a
                                href={demo.url}
                                target="_blank"
                                rel="noopener"
                                onClick={() => track('demo_tile_click', { demo: demo.key })}
                                className="cta-tile glass-chip group flex h-full flex-col justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:p-4"
                                style={{ '--tint': demo.tint.css }}
                            >
                                <span className="flex items-center justify-between">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--tint))]" aria-hidden="true" />
                                    <ArrowUpRight
                                        className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:transition-none"
                                        aria-hidden="true"
                                    />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-white">{TILE_LABELS[demo.key] ?? demo.tab}</span>
                                    <span className="mt-0.5 block truncate text-xs text-slate-400">{demo.product}</span>
                                </span>
                                <span className="sr-only">live demo (opens in a new tab)</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default function FinalCtaSection() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const headerRevealed = useInViewOnce(headerRef);
    const gridRevealed = useInViewOnce(gridRef, { threshold: 0.1 });
    useCtaAttribution();

    return (
        <section id="get-started" aria-labelledby="get-started-heading" className="relative isolate scroll-mt-16 bg-[#060a18] pb-28 pt-32 [overflow-x:clip] lg:pb-36 lg:pt-40">
            {/* Alias so the shared nav's "Contact" link and older /#contact links land here */}
            <span id="contact" className="absolute top-0 scroll-mt-16" aria-hidden="true" />
            <div className="cta-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
            <div className="cta-glow pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[52rem] w-[72rem] max-w-[160vw]" aria-hidden="true" />

            <div ref={headerRef} className="stage mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" data-active={headerRevealed ? 'true' : 'false'}>
                <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-indigo-300" style={{ '--d': '0s' }}>
                    Ready when you are
                </p>
                <h2
                    id="get-started-heading"
                    className="stage-in mx-auto mt-4 max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
                    style={{ '--d': '0.08s' }}
                >
                    Let’s build your technology backbone.
                </h2>
                <p className="stage-in mx-auto mt-6 max-w-[56ch] text-base leading-relaxed text-slate-400 sm:text-lg" style={{ '--d': '0.16s' }}>
                    Tell us where you are, and we’ll point you to the right starting point. Or skip the call and try it yourself.
                </p>
            </div>

            <div
                ref={gridRef}
                className="stage mx-auto mt-14 grid max-w-6xl grid-cols-1 items-stretch gap-6 px-4 sm:px-6 lg:mt-16 lg:grid-cols-2 lg:gap-8 lg:px-8"
                data-active={gridRevealed ? 'true' : 'false'}
            >
                <AuditCard />
                <DemoCard />
            </div>
        </section>
    );
}
