import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import SiteFooter from '@/components/layout/SiteFooter';

// Dark inner-page frame (header block + content + site footer) shared by the Demo Portal and legal pages.
export default function DarkPageShell({ eyebrow, title, intro, meta, children, width = 'max-w-3xl' }) {
    return (
        <div data-theme="plum" className="bg-black text-mauve-300">
            <section aria-labelledby="page-title" className="relative isolate overflow-hidden pb-24 pt-16 lg:pb-32 lg:pt-24">
                {/* Spacer: hero background runs under the transparent 72px header; content stays put */}
                <div aria-hidden="true" className="h-[72px]" />
                <div
                    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[64rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(closest-side,rgb(106_52_151/0.28),transparent)]"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute right-0 top-0 -z-10 h-[20rem] w-[28rem] max-w-[90vw] -translate-y-1/3 bg-[radial-gradient(closest-side,rgb(255_46_126/0.08),transparent)]"
                    aria-hidden="true"
                />
                <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${width}`}>
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-1.5 rounded text-sm text-mauve-300 transition-colors hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist motion-reduce:transition-none"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                        Back to home
                    </Link>
                    <p className="mt-10 text-xs font-medium uppercase tracking-[0.18em] text-magenta-400">{eyebrow}</p>
                    <h1 id="page-title" className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-mist sm:text-5xl">
                        {title}
                    </h1>
                    {intro && <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-mauve-300 sm:text-lg">{intro}</p>}
                    {meta && <p className="mt-4 font-mono text-xs text-mauve-300">{meta}</p>}
                    <div className="mt-12">{children}</div>
                </div>
            </section>
            <SiteFooter />
        </div>
    );
}

export function DocSection({ title, children }) {
    return (
        <section className="border-t border-plum-800/60 py-8 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-semibold tracking-[-0.01em] text-mist">{title}</h2>
            <div className="mt-3 max-w-[68ch] space-y-3 text-sm leading-relaxed text-mauve-300 [&_a]:text-magenta-400 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-mist [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {children}
            </div>
        </section>
    );
}
