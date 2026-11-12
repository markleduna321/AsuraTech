import { useRef } from 'react';
import StackCollapse from './StackCollapse';
import FeatureShowcase from './FeatureShowcase';
import ValueStrip from './ValueStrip';
import { useInViewOnce, useMediaQuery, usePrefersReducedMotion } from './scrollHooks';

function SectionHeader() {
    const ref = useRef(null);
    const inView = useInViewOnce(ref);
    return (
        <div ref={ref} className="stage mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-active={inView ? 'true' : 'false'}>
            <div className="max-w-[60ch]">
                <p className="stage-in text-xs font-medium uppercase tracking-[0.18em] text-indigo-300" style={{ '--d': '0s' }}>
                    All-in-one automation
                </p>
                <h2
                    id="platform-heading"
                    className="stage-in mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
                    style={{ '--d': '0.08s' }}
                >
                    Replace your entire tool stack with one platform.
                </h2>
                <p className="stage-in mt-6 text-base leading-relaxed text-slate-400 sm:text-lg" style={{ '--d': '0.16s' }}>
                    Funnels, follow-ups, CRM, bookings, reviews and AI chat, working from one inbox instead of ten logins.
                </p>
            </div>
        </div>
    );
}

export default function PlatformSection() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const reduced = usePrefersReducedMotion();
    const collapseMode = reduced ? 'static' : isDesktop ? 'desktop' : 'mobile';

    return (
        <section id="platform" aria-labelledby="platform-heading" className="relative isolate bg-[#060a18] pb-32 pt-32 [overflow-x:clip] lg:pb-40 lg:pt-40">
            <div className="noise-overlay pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                aria-hidden="true"
            />

            <SectionHeader />
            <StackCollapse key={collapseMode} mode={collapseMode} />
            <FeatureShowcase sticky={isDesktop && !reduced} reduced={reduced} />
            <ValueStrip />
        </section>
    );
}
