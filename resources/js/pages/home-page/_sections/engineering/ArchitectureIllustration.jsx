// Static 2D architecture diagram: poster while WebGL loads, the mobile view, and the WebGL-failure fallback.
// Zones mirror the 3D scene and are lit/dimmed with opacity only.
// Bottom to top, matching the slab order in ArchitectureScene.
const MODULES = ['Finance', 'HR', 'Inventory', 'Sales'];

function zoneState(zone, focus) {
    if (focus === 'consult') return zone === 'consult' ? 'on' : 'soft';
    if (zone === 'consult') return 'soft';
    return zone === focus ? 'on' : 'off';
}

function Zone({ zone, focus, children }) {
    const state = zoneState(zone, focus);
    return (
        <g className={`arch-zone ${state === 'on' ? 'text-indigo-300' : 'text-slate-400'}`} data-state={state}>
            {children}
        </g>
    );
}

export default function ArchitectureIllustration({ focus }) {
    const slabY = [318, 284, 250, 216];

    return (
        <svg viewBox="0 0 640 500" className="h-full w-full" fill="none" aria-hidden="true">
            <defs>
                <pattern id="arch-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M24 0H0V24" stroke="rgb(148 163 184 / 0.09)" strokeWidth="1" />
                </pattern>
                <radialGradient id="arch-grid-fade" cx="50%" cy="60%" r="60%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <mask id="arch-grid-mask">
                    <rect width="640" height="500" fill="url(#arch-grid-fade)" />
                </mask>
                <radialGradient id="arch-orb">
                    <stop offset="0%" stopColor="rgb(165 180 252)" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="rgb(129 140 248)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="rgb(129 140 248)" stopOpacity="0" />
                </radialGradient>
            </defs>

            <rect width="640" height="500" fill="url(#arch-grid)" mask="url(#arch-grid-mask)" />

            <Zone zone="consult" focus={focus}>
                <ellipse cx="320" cy="262" rx="300" ry="228" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="2 6" />
                <ellipse cx="320" cy="262" rx="282" ry="212" stroke="currentColor" strokeOpacity="0.18" />
                <text x="320" y="24" textAnchor="middle" className="arch-svg-label" fill="currentColor">
                    SECURITY SHELL · ARCHITECTURE
                </text>
            </Zone>

            <Zone zone="erp" focus={focus}>
                {/* Database cylinder */}
                <path d="M222 380v44c0 16 48 30 108 30s108-14 108-30v-44" stroke="currentColor" strokeOpacity="0.7" fill="rgb(129 140 248 / 0.04)" />
                <ellipse cx="330" cy="380" rx="108" ry="28" stroke="currentColor" strokeOpacity="0.7" fill="rgb(129 140 248 / 0.05)" />
                <path d="M222 402c0 16 48 30 108 30s108-14 108-30" stroke="currentColor" strokeOpacity="0.35" />
                <text x="452" y="430" className="arch-svg-label" fill="currentColor">
                    DATABASE
                </text>
                {/* Spine */}
                <path d="M330 380V150" stroke="currentColor" strokeOpacity="0.45" />
                {/* Module slabs */}
                {slabY.map((y, i) => (
                    <g key={MODULES[i]}>
                        <path
                            d={`M200 ${y}L330 ${y - 38}L460 ${y}L330 ${y + 38}Z`}
                            stroke="currentColor"
                            strokeOpacity="0.75"
                            fill="rgb(129 140 248 / 0.05)"
                        />
                        <path d={`M200 ${y}v8L330 ${y + 46}L460 ${y + 8}v-8`} stroke="currentColor" strokeOpacity="0.35" />
                        <text x="474" y={y + 4} className="arch-svg-label" fill="currentColor">
                            {MODULES[i].toUpperCase()}
                        </text>
                    </g>
                ))}
                <text x="186" y="252" textAnchor="end" className="arch-svg-label" fill="currentColor">
                    ERP / CRM CORE
                </text>
            </Zone>

            <Zone zone="apps" focus={focus}>
                <rect x="56" y="62" width="196" height="124" rx="8" stroke="currentColor" strokeOpacity="0.75" fill="rgb(129 140 248 / 0.04)" />
                <path d="M56 84h196M104 84v102" stroke="currentColor" strokeOpacity="0.4" />
                <circle cx="68" cy="73" r="2.5" fill="currentColor" fillOpacity="0.6" />
                <circle cx="77" cy="73" r="2.5" fill="currentColor" fillOpacity="0.6" />
                <circle cx="86" cy="73" r="2.5" fill="currentColor" fillOpacity="0.6" />
                <path d="M66 100h28M66 112h22M66 124h26M116 100h90M116 112h56M116 170l22-18 22 6 24-24 22 8 26-20" stroke="currentColor" strokeOpacity="0.45" />
                <text x="154" y="50" textAnchor="middle" className="arch-svg-label" fill="currentColor">
                    WEB APP
                </text>
                <rect x="400" y="40" width="64" height="118" rx="12" stroke="currentColor" strokeOpacity="0.75" fill="rgb(129 140 248 / 0.04)" />
                <path d="M424 50h16M412 70h34M412 80h40M412 98h40v26h-40zM424 146h16" stroke="currentColor" strokeOpacity="0.45" />
                <text x="432" y="28" textAnchor="middle" className="arch-svg-label" fill="currentColor">
                    MOBILE
                </text>
                <path d="M154 186C170 220 250 150 330 150M432 158C432 170 380 150 330 150" stroke="currentColor" strokeOpacity="0.55" strokeDasharray="3 4" />
            </Zone>

            <Zone zone="ai" focus={focus}>
                <circle cx="548" cy="300" r="64" fill="url(#arch-orb)" />
                <circle cx="548" cy="300" r="22" stroke="currentColor" strokeOpacity="0.85" />
                <circle cx="548" cy="300" r="8" fill="currentColor" fillOpacity="0.8" />
                {[
                    [592, 270],
                    [588, 336],
                    [540, 250],
                    [506, 326],
                    [520, 278],
                ].map(([x, y]) => (
                    <g key={`${x}-${y}`}>
                        <path d={`M548 300L${x} ${y}`} stroke="currentColor" strokeOpacity="0.4" />
                        <circle cx={x} cy={y} r="3.5" fill="currentColor" fillOpacity="0.8" />
                    </g>
                ))}
                <path d="M526 312C490 360 470 400 438 404M540 278C520 220 470 170 464 150M530 288C440 160 300 40 252 120" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="3 4" />
                <text x="548" y="384" textAnchor="middle" className="arch-svg-label" fill="currentColor">
                    AI LAYER · API
                </text>
            </Zone>
        </svg>
    );
}
