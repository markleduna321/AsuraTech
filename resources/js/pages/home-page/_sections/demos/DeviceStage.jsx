import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Lock } from 'lucide-react';
import DemoScreen from './DemoMockScreens';

const DESIGN_W = 880;
const DESIGN_H = 550;
const FLIP_MS = 900;
const REST = { rx: '2deg', ry: '-4deg', sheen: '0%' };

/**
 * Browser-frame "device" that shows the active demo's mock dashboard.
 * Tab changes flip the outgoing screen away and bring the next one in (CSS 3D, transform + opacity only).
 */
export default function DeviceStage({ demos, active, revealed, reduced, desktop, tilt }) {
    const [flip, setFlip] = useState({ active, prev: null, dir: 1 });
    const [scale, setScale] = useState(0.5);
    const viewportRef = useRef(null);
    const tiltRef = useRef(null);

    // Derive the transition from the active index during render so both screens paint in the same frame.
    if (flip.active !== active) {
        const forward = active === (flip.active + 1) % demos.length;
        setFlip({ active, prev: reduced ? null : flip.active, dir: forward ? 1 : -1 });
    }

    useEffect(() => {
        if (flip.prev === null) return undefined;
        const id = window.setTimeout(() => setFlip((f) => ({ ...f, prev: null })), FLIP_MS);
        return () => window.clearTimeout(id);
    }, [flip.prev, flip.active]);

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el) return undefined;
        const measure = () => setScale(el.clientWidth / DESIGN_W || 0.5);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const setTilt = (rx, ry, sheen) => {
        const el = tiltRef.current;
        if (!el) return;
        el.style.setProperty('--rx', rx);
        el.style.setProperty('--ry', ry);
        el.style.setProperty('--sheen', sheen);
    };

    const onPointerMove = (e) => {
        if (!tilt || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setTilt(`${(-ny * 6).toFixed(2)}deg`, `${(nx * 8).toFixed(2)}deg`, `${(nx * 24).toFixed(1)}%`);
    };

    const onPointerLeave = () => {
        if (tilt) setTilt(REST.rx, REST.ry, REST.sheen);
    };

    const current = demos[flip.active];

    return (
        <div className="relative [perspective:1600px]" aria-hidden="true" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
            <div
                ref={tiltRef}
                className={`relative ${desktop ? 'stage-tilt' : ''}`}
                style={{ '--rx': REST.rx, '--ry': REST.ry, '--sheen': REST.sheen }}
            >
                <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_24px_48px_-32px_rgba(0,0,0,0.7)]">
                    <div className="flex items-center gap-3 px-3 pb-2.5 pt-1.5">
                        <span className="flex gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        </span>
                        <span className="mx-auto flex min-w-0 max-w-[70%] flex-1 items-center justify-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-slate-400 ring-1 ring-white/[0.06]">
                            <Lock className="h-3 w-3 shrink-0 text-slate-500" />
                            <span className="truncate">{current.domain}</span>
                        </span>
                        <span className="w-[42px]" />
                    </div>
                    <div
                        ref={viewportRef}
                        className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#060a18] [perspective:1400px]"
                    >
                        {demos.map((demo, i) => {
                            let state = 'hidden';
                            if (i === flip.active) state = flip.prev === null ? 'active' : 'in';
                            else if (i === flip.prev) state = 'out';
                            return (
                                <div
                                    key={demo.key}
                                    className="demo-screen stage absolute inset-0"
                                    data-state={state}
                                    data-active={revealed && state !== 'hidden' ? 'true' : 'false'}
                                    style={{ '--dir': flip.dir, '--tint': demo.tint.css }}
                                >
                                    <div
                                        className="absolute left-0 top-0 origin-top-left"
                                        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}
                                    >
                                        <DemoScreen demoKey={demo.key} />
                                    </div>
                                </div>
                            );
                        })}
                        <span className="demo-sheen pointer-events-none absolute inset-y-0 -left-1/4 w-[150%] bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.045)_50%,transparent_65%)]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
