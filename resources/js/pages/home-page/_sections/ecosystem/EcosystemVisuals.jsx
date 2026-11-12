import { Briefcase, Database, GitBranch, Globe, MapPin, Server, TrendingUp } from 'lucide-react';

// Decorative, CSS/SVG-only mini UIs. Both are aria-hidden and labelled "Sample data".

function Frame({ title, children }) {
    return (
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5" aria-hidden="true">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-300">{title}</p>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-400">Sample data</span>
            </div>
            {children}
        </div>
    );
}

const LEADS = [
    { name: 'Northside Dental', source: 'Google Maps', icon: MapPin, tag: 'New lead', fresh: true },
    { name: 'Brightline Logistics', source: 'Hiring · LinkedIn Jobs', icon: Briefcase, tag: 'New lead', fresh: true },
    { name: 'Casa Verde Café', source: 'Yelp', icon: MapPin, tag: 'Saved' },
    { name: 'Peak Fitness Co.', source: 'Instagram', icon: MapPin, tag: 'Saved' },
];

export function LeadsVisual() {
    return (
        <Frame title="New leads">
            <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                    <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-white">+128</p>
                    <p className="mt-0.5 text-xs text-slate-400">leads this week</p>
                </div>
                <div className="stage-grow h-10 w-32 origin-left" style={{ '--d': '0.5s', '--dur': '1.4s' }}>
                    <svg viewBox="0 0 128 40" preserveAspectRatio="none" className="h-full w-full overflow-visible">
                        <defs>
                            <linearGradient id="eco-spark-fill" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0.28" />
                                <stop offset="100%" style={{ stopColor: 'rgb(var(--accent))' }} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d="M0 34 L18 30 L36 32 L54 24 L72 26 L90 16 L108 14 L128 4 L128 40 L0 40 Z" fill="url(#eco-spark-fill)" />
                        <path
                            d="M0 34 L18 30 L36 32 L54 24 L72 26 L90 16 L108 14 L128 4"
                            fill="none"
                            style={{ stroke: 'rgb(var(--accent))' }}
                            strokeWidth="1.75"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>
            </div>

            {/* Four rows in a three-row window: the loop slides the newest lead in from the top */}
            <div className="eco-feed mt-4 h-[148px] overflow-hidden">
                <ul className="eco-feed-track space-y-2">
                    {LEADS.map(({ name, source, icon: Icon, tag, fresh }) => (
                        <li key={name} className="flex h-11 items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-slate-400">
                                <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm text-slate-200">{name}</span>
                                <span className="block truncate text-[11px] text-slate-400">{source}</span>
                            </span>
                            <span
                                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
                                    fresh ? 'bg-[rgb(var(--accent)/0.14)] text-amber-300 ring-1 ring-[rgb(var(--accent)/0.3)]' : 'bg-white/[0.05] text-slate-400'
                                }`}
                            >
                                {tag}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </Frame>
    );
}

const SERVICES = [
    { label: 'web · client-site', icon: Server, status: 'Online' },
    { label: 'database', icon: Database, status: 'Online' },
    { label: 'custom domain', icon: Globe, status: 'Verified' },
];

export function InfraVisual() {
    return (
        <Frame title="Live status">
            <ul className="mt-4 divide-y divide-white/[0.06] rounded-lg border border-white/[0.06] bg-white/[0.02]">
                {SERVICES.map(({ label, icon: Icon, status }, i) => (
                    <li key={label} className="flex h-11 items-center gap-3 px-3">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="flex-1 truncate font-mono text-xs text-slate-300">{label}</span>
                        <span className="inline-flex items-center gap-2 text-xs text-slate-300">
                            <span className="relative flex h-2 w-2">
                                <span className="eco-ping absolute inset-0 rounded-full bg-emerald-400" style={{ animationDelay: `${i * 0.6}s` }} />
                                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            {status}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="min-w-0 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                    <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <GitBranch className="h-3 w-3" /> Last deploy
                    </p>
                    <p className="mt-1 truncate font-mono text-xs text-slate-200">main · 2 min ago</p>
                </div>
                <div className="min-w-0 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                    <p className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <TrendingUp className="h-3 w-3" /> Response
                        </span>
                        <span className="whitespace-nowrap font-mono tabular-nums text-slate-200">120 ms</span>
                    </p>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <span
                            className="stage-grow block h-full w-[28%] origin-left rounded-full bg-[rgb(var(--accent)/0.85)]"
                            style={{ '--d': '0.6s', '--dur': '1.2s' }}
                        />
                    </span>
                </div>
            </div>
        </Frame>
    );
}
