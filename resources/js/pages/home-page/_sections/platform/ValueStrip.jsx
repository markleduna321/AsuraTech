import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { VALUE_POINTS } from './platformData';
import { trackSpotlight, useInViewOnce } from './scrollHooks';

export default function ValueStrip() {
    const ref = useRef(null);
    const inView = useInViewOnce(ref);

    return (
        <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8 lg:pt-40">
            <div
                ref={ref}
                onPointerMove={trackSpotlight}
                className="stage glass-panel rounded-2xl px-6 py-8 sm:px-10 lg:py-10"
                data-active={inView ? 'true' : 'false'}
            >
                <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_auto] lg:gap-12">
                    <h3 className="stage-in text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl" style={{ '--d': '0s' }}>
                        <span className="whitespace-nowrap">One login.</span> <span className="whitespace-nowrap">One inbox.</span>{' '}
                        <span className="whitespace-nowrap text-slate-400">One bill.</span>
                    </h3>

                    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                        {VALUE_POINTS.map((point, i) => (
                            <div key={point.label} className="stage-in flex flex-col-reverse border-l border-white/10 pl-4" style={{ '--d': `${0.08 + i * 0.07}s` }}>
                                <dt className="mt-1 text-xs leading-snug text-slate-400">{point.label}</dt>
                                <dd className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-white">
                                    {point.value}
                                    {point.unit && <span className="ml-1 text-sm font-normal text-slate-500">{point.unit}</span>}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <a
                        href="#get-started"
                        className="stage-in group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18]"
                        style={{ '--d': '0.4s' }}
                    >
                        Start Automating
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
}
