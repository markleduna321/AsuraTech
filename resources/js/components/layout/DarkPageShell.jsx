import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import SiteFooter from '@/components/layout/SiteFooter';

// Dark inner-page frame (header block + content + site footer) shared by the Demo Portal and legal pages.
export default function DarkPageShell({ eyebrow, title, intro, meta, children, width = 'max-w-3xl' }) {
    return (
        <div className="bg-[#060a18] text-slate-300">
            <section aria-labelledby="page-title" className="relative isolate overflow-hidden pb-24 pt-16 lg:pb-32 lg:pt-24">
                <div
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[64rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(closest-side,rgb(99_102_241/0.18),transparent)]"
                    aria-hidden="true"
                />
                <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${width}`}>
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-1.5 rounded text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 motion-reduce:transition-none"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                        Back to home
                    </Link>
                    <p className="mt-10 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">{eyebrow}</p>
                    <h1 id="page-title" className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">
                        {title}
                    </h1>
                    {intro && <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-slate-400 sm:text-lg">{intro}</p>}
                    {meta && <p className="mt-4 font-mono text-xs text-slate-400">{meta}</p>}
                    <div className="mt-12">{children}</div>
                </div>
            </section>
            <SiteFooter />
        </div>
    );
}

export function DocSection({ title, children }) {
    return (
        <section className="border-t border-white/[0.06] py-8 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-semibold tracking-[-0.01em] text-white">{title}</h2>
            <div className="mt-3 max-w-[68ch] space-y-3 text-sm leading-relaxed text-slate-300 [&_a]:text-indigo-300 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-white [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {children}
            </div>
        </section>
    );
}
