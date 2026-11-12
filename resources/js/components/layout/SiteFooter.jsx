import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Mail, MapPin, Phone, Zap } from 'lucide-react';
import SectionLink from '@/components/ui/SectionLink';
import { CONTACT, FOOTER_COLUMNS, LEGAL_LINKS } from '@/features/site/siteConfig';

const linkClass =
    'rounded text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300';

export default function SiteFooter() {
    const year = new Date().getFullYear();
    const onHome = usePage().url.split(/[?#]/)[0] === '/';

    return (
        <footer id="site-footer" className="relative border-t border-white/[0.06] bg-[#060a18] text-slate-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
                <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                    <Link href="/" className="inline-flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300" aria-label="AsuraTECH home">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                            <Zap className="h-4 w-4 text-white" aria-hidden="true" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight text-white">
                            Asura<span className="text-indigo-300">TECH</span>
                        </span>
                    </Link>
                    <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                        Automation platforms, turnkey industry systems and custom engineering, under one roof.
                    </p>
                    {/* Off the home page, this is where the nav's "Contact" (#contact) link lands. */}
                    <ul id={onHome ? undefined : 'contact'} className="scroll-mt-20 space-y-2 text-sm">
                        <li className="flex items-center gap-2.5">
                            <Mail className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                            <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                                {CONTACT.email}
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Phone className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                            <a href={CONTACT.phoneHref} className={linkClass}>
                                {CONTACT.phone}
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5 text-slate-400">
                            <MapPin className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                            {CONTACT.location}
                        </li>
                    </ul>
                </div>

                {FOOTER_COLUMNS.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{column.title}</h2>
                        <ul className="mt-4 space-y-2.5">
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    {link.href.startsWith('#') ? (
                                        <SectionLink href={`/${link.href}`} className={linkClass}>
                                            {link.label}
                                        </SectionLink>
                                    ) : (
                                        <a
                                            href={link.href}
                                            {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                                            className={`${linkClass} group inline-flex items-center gap-1`}
                                        >
                                            {link.label}
                                            {link.external && (
                                                <>
                                                    <ArrowUpRight
                                                        className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="sr-only">(opens in a new tab)</span>
                                                </>
                                            )}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>

            <div className="border-t border-white/[0.06]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
                    <p>© {year} AsuraTECH Solutions. All rights reserved.</p>
                    <nav aria-label="Legal">
                        <ul className="flex items-center gap-4">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
