import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Shows once the visitor has scrolled past Section 2 (#paths) and hides while the final CTA or footer is on screen.
export default function StickyCta() {
    const [passed, setPassed] = useState(false);
    const [finalVisible, setFinalVisible] = useState(false);

    useEffect(() => {
        if (!('IntersectionObserver' in window)) return undefined;
        const paths = document.getElementById('paths');
        const finals = [document.getElementById('get-started'), document.getElementById('site-footer')].filter(Boolean);
        const visible = new Set();

        const pathsIo = new IntersectionObserver(([entry]) => {
            setPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
        const finalIo = new IntersectionObserver((entries) => {
            entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
            setFinalVisible(visible.size > 0);
        });

        if (paths) pathsIo.observe(paths);
        finals.forEach((el) => finalIo.observe(el));
        return () => {
            pathsIo.disconnect();
            finalIo.disconnect();
        };
    }, []);

    const shown = passed && !finalVisible;

    return (
        <div
            className="sticky-cta pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-start pl-4 pr-24 sm:justify-center sm:px-24"
            data-shown={shown ? 'true' : 'false'}
            aria-hidden={shown ? undefined : 'true'}
        >
            <a
                href="#get-started"
                data-cta-source="sticky"
                tabIndex={shown ? undefined : -1}
                className="group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-indigo-600 py-3 pl-5 pr-4 text-sm font-semibold text-white shadow-lg shadow-indigo-950/60 ring-1 ring-inset ring-white/15 transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a18]"
            >
                Book Free Audit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
            </a>
        </div>
    );
}
