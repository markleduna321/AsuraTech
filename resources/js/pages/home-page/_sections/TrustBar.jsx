import { Cloud, Database, HardDrive, Sparkles, Workflow } from 'lucide-react';
import {
    siClaude,
    siCloudflare,
    siCss,
    siDjango,
    siFlask,
    siGodaddy,
    siGooglegemini,
    siHostinger,
    siHtml5,
    siHtmx,
    siLaravel,
    siN8n,
    siNextdotjs,
    siNginx,
    siNodedotjs,
    siPostgresql,
    siPython,
    siReact,
    siTailwindcss,
    siThreedotjs,
    siVite,
    siWordpress,
} from 'simple-icons';

const METRICS = [
    { value: '2', label: 'Proprietary Cloud Platforms' },
    { value: '3', label: 'Turnkey Industry Systems' },
    { value: 'End-to-End', label: 'Custom Engineering' },
];

// Brands without a simple-icons entry use a neutral Lucide glyph instead of a logo.
const STACK = [
    { name: 'Laravel', icon: siLaravel },
    { name: 'React', icon: siReact },
    { name: 'Next.js', icon: siNextdotjs },
    { name: 'Node.js', icon: siNodedotjs },
    { name: 'Vite', icon: siVite },
    { name: 'Three.js', icon: siThreedotjs },
    { name: 'HTMX', icon: siHtmx },
    { name: 'HTML', icon: siHtml5 },
    { name: 'CSS', icon: siCss },
    { name: 'Tailwind CSS', icon: siTailwindcss },
    { name: 'Python', icon: siPython },
    { name: 'Django', icon: siDjango },
    { name: 'Flask', icon: siFlask },
    { name: 'SQL', glyph: Database },
    { name: 'PostgreSQL', icon: siPostgresql },
    { name: 'WordPress', icon: siWordpress },
    { name: 'AWS', glyph: Cloud },
    { name: 'Amazon S3', glyph: HardDrive },
    { name: 'Cloudflare', icon: siCloudflare },
    { name: 'Cloudflare R2', glyph: HardDrive },
    { name: 'nginx', icon: siNginx },
    { name: 'Hostinger', icon: siHostinger },
    { name: 'GoDaddy', icon: siGodaddy },
    { name: 'OpenAI', glyph: Sparkles },
    { name: 'Gemini', icon: siGooglegemini },
    { name: 'Claude', icon: siClaude },
    { name: 'n8n', icon: siN8n },
    { name: 'GoHighLevel', glyph: Workflow },
];

function TechItem({ name, icon, glyph: Glyph }) {
    return (
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-slate-100 motion-reduce:transition-none">
            {icon ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0 fill-current" aria-hidden="true" focusable="false">
                    <path d={icon.path} />
                </svg>
            ) : (
                <Glyph className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            )}
            {name}
        </span>
    );
}

export default function TrustBar() {
    return (
        <div className="relative border-t border-white/[0.06] bg-white/[0.015]">
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400 sm:text-[13px]">
                    {METRICS.map(({ value, label }, i) => (
                        <li key={label} className="flex items-center gap-x-6">
                            {i > 0 && <span className="hidden text-indigo-400/60 sm:inline" aria-hidden="true">•</span>}
                            <span>
                                <span className="font-semibold text-white">{value}</span> {label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Animated marquee (motion-safe) */}
            <div
                className="group relative mt-6 overflow-hidden pb-8 motion-reduce:hidden"
                style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
            >
                <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" style={{ animationDuration: '70s' }}>
                    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-label="Technology stack">
                        {STACK.map((item) => (
                            <li key={item.name}>
                                <TechItem {...item} />
                            </li>
                        ))}
                    </ul>
                    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
                        {STACK.map((item) => (
                            <li key={item.name}>
                                <TechItem {...item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Static wrapped grid for reduced-motion users */}
            <ul
                className="mx-auto mt-6 hidden max-w-5xl flex-wrap justify-center gap-x-8 gap-y-4 px-4 pb-8 motion-reduce:flex"
                aria-label="Technology stack"
            >
                {STACK.map((item) => (
                    <li key={item.name}>
                        <TechItem {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
