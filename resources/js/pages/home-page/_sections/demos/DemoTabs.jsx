import { useEffect, useRef } from 'react';

// Pill segmented control (ARIA tabs pattern) with a sliding glow indicator and an optional auto-rotate progress bar.
export default function DemoTabs({ demos, active, onSelect, rotating, paused, durationMs, onRotateEnd, reduced }) {
    const scrollerRef = useRef(null);
    const tabRefs = useRef([]);
    const count = demos.length;

    // Keep the active tab visible when the control scrolls sideways on narrow screens (horizontal only).
    useEffect(() => {
        const scroller = scrollerRef.current;
        const tab = tabRefs.current[active];
        if (!scroller || !tab || scroller.scrollWidth <= scroller.clientWidth) return;
        const sRect = scroller.getBoundingClientRect();
        const tRect = tab.getBoundingClientRect();
        const left = scroller.scrollLeft + (tRect.left - sRect.left) - (scroller.clientWidth - tRect.width) / 2;
        scroller.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
    }, [active, reduced]);

    const onKeyDown = (e) => {
        let next = null;
        if (e.key === 'ArrowRight') next = (active + 1) % count;
        else if (e.key === 'ArrowLeft') next = (active - 1 + count) % count;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = count - 1;
        if (next === null) return;
        e.preventDefault();
        onSelect(next);
        tabRefs.current[next]?.focus();
    };

    return (
        <div className="flex flex-col items-center">
            <div
                ref={scrollerRef}
                className="-mx-4 -my-5 w-[calc(100%+2rem)] overflow-x-auto px-4 py-6 [scrollbar-width:none] sm:m-0 sm:w-auto sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden"
            >
                <div
                    role="tablist"
                    aria-label="Live product demos"
                    onKeyDown={onKeyDown}
                    className="glass-chip relative mx-auto grid w-max auto-cols-fr grid-flow-col rounded-full p-1"
                >
                    <span
                        className="demo-indicator pointer-events-none absolute bottom-1 left-1 top-1 rounded-full bg-indigo-500/15 shadow-[inset_0_0_0_1px_rgba(165,180,252,0.35),0_0_28px_rgba(129,140,248,0.28)]"
                        style={{ width: `calc((100% - 0.5rem) / ${count})`, transform: `translateX(${active * 100}%)` }}
                        aria-hidden="true"
                    />
                    {demos.map((demo, i) => (
                        <button
                            key={demo.key}
                            ref={(el) => {
                                tabRefs.current[i] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`demo-tab-${demo.key}`}
                            aria-selected={i === active}
                            aria-controls={`demo-panel-${demo.key}`}
                            tabIndex={i === active ? 0 : -1}
                            onClick={() => onSelect(i)}
                            className={`relative whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-300 ${
                                i === active ? 'text-white' : 'text-slate-400 transition-colors hover:text-slate-200 motion-reduce:transition-none'
                            }`}
                        >
                            {demo.tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-3 h-px w-40 overflow-hidden rounded-full" aria-hidden="true">
                {rotating && (
                    <div className="h-full w-full bg-white/[0.08]">
                        <span
                            key={active}
                            className="demo-progress block h-full origin-left bg-indigo-300/70"
                            data-paused={paused ? 'true' : 'false'}
                            style={{ '--rotate-ms': `${durationMs}ms` }}
                            onAnimationEnd={onRotateEnd}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
