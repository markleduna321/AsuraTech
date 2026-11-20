import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { siFacebook, siInstagram, siUpwork } from 'simple-icons';
import SectionLink from '@/components/ui/SectionLink';
import { CONTACT, FOOTER_COLUMNS, LEGAL_LINKS, SOCIAL_LINKS } from '@/features/site/siteConfig';

// Plum & Mist footer on every route (black: mist headings 19.6:1, mauve-500 body/links 6.2:1, magenta-400 hover 6.9:1,
// mist focus rings). Aurora hairline/heading underline come from .footer-aurora-* in app.css.
const t = {
    footer: 'footer-aurora-edge relative border-t border-white/10 bg-black text-mauve-500',
    logo: 'inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist transition-opacity hover:opacity-90',
    body: 'max-w-xs text-sm leading-relaxed text-mauve-500',
    icon: 'h-4 w-4 shrink-0 text-mauve-500',
    location: 'flex items-center gap-2.5 text-mauve-500',
    heading: 'footer-aurora-heading relative text-xs font-medium uppercase tracking-[0.18em] text-mist',
    link: 'rounded text-sm text-mauve-500 transition-colors hover:text-magenta-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist',
    bottom: 'border-t border-white/10',
    bottomInner: 'mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-mauve-500 sm:flex-row sm:px-6 lg:px-8',
    legal: 'rounded transition-colors hover:text-magenta-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist',
    socialLink: 'inline-flex h-10 w-10 items-center justify-center rounded-full text-mauve-500 transition-colors hover:text-magenta-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist motion-reduce:transition-none',
    socialDisabled: 'inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full text-mauve-500',
};

const SOCIAL_ICON_DATA = {
    instagram: siInstagram,
    facebook: siFacebook,
    upwork: siUpwork,
};

function SocialIcon({ name }) {
    const simpleIcon = SOCIAL_ICON_DATA[name];

    return (
        <svg
            aria-hidden="true"
            className="h-5 w-5"
            focusable="false"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            {name === 'linkedin' ? (
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            ) : (
                <path d={simpleIcon.path} />
            )}
        </svg>
    );
}

export default function SiteFooter() {
    const year = new Date().getFullYear();
    const onHome = usePage().url.split(/[?#]/)[0] === '/';

    return (
        <footer id="site-footer" className={t.footer}>
            <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
                <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                    <Link href="/" className={t.logo} aria-label="AsuraTECH home">
                        <img
                            src="/images/logo-reversed.png"
                            alt="AsuraTECH Solutions"
                            className="h-10 w-auto max-w-[200px] object-contain"
                            width={958}
                            height={314}
                        />
                    </Link>
                    <p className={t.body}>
                        Automation platforms, turnkey industry systems and custom engineering, under one roof.
                    </p>
                    {/* Off the home page, this is where the nav's "Contact" (#contact) link lands. */}
                    <ul id={onHome ? undefined : 'contact'} className="scroll-mt-20 space-y-2 text-sm">
                        <li className="flex items-center gap-2.5">
                            <Mail className={t.icon} aria-hidden="true" />
                            <a href={`mailto:${CONTACT.email}`} className={t.link}>
                                {CONTACT.email}
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Phone className={t.icon} aria-hidden="true" />
                            <a href={CONTACT.phoneHref} className={t.link}>
                                {CONTACT.phone}
                            </a>
                        </li>
                        <li className={t.location}>
                            <MapPin className={t.icon} aria-hidden="true" />
                            {CONTACT.location}
                        </li>
                    </ul>
                    <nav aria-label="Social media">
                        <ul className="flex items-center gap-1">
                            {SOCIAL_LINKS.map((social) => (
                                <li key={social.label}>
                                    {social.href?.trim() ? (
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className={t.socialLink}
                                        >
                                            <SocialIcon name={social.icon} />
                                        </a>
                                    ) : (
                                        <span
                                            role="img"
                                            aria-label={`${social.label} link unavailable`}
                                            aria-disabled="true"
                                            className={t.socialDisabled}
                                        >
                                            <SocialIcon name={social.icon} />
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {FOOTER_COLUMNS.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <h2 className={t.heading}>{column.title}</h2>
                        <ul className="mt-4 space-y-2.5">
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    {link.href.startsWith('#') ? (
                                        <SectionLink href={`/${link.href}`} className={t.link}>
                                            {link.label}
                                        </SectionLink>
                                    ) : link.href.startsWith('/') ? (
                                        <Link href={link.href} className={t.link}>
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.href}
                                            {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                                            className={`${t.link} group inline-flex items-center gap-1`}
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

            <div className={t.bottom}>
                <div className={t.bottomInner}>
                    <p>© {year} AsuraTECH Solutions. All rights reserved.</p>
                    <nav aria-label="Legal">
                        <ul className="flex items-center gap-4">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className={t.legal}>
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
