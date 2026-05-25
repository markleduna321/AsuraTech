import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Zap, Mail, Phone, MapPin, Users, MessageCircle, Briefcase, Code2 } from 'lucide-react';

const SERVICES = [
    { label: 'Web Development', href: '#services' },
    { label: 'SaaS Platforms', href: '#services' },
    { label: 'Mobile & Desktop Apps', href: '#services' },
    { label: 'Network Infrastructure', href: '#services' },
    { label: 'Firewall & Security', href: '#services' },
    { label: 'CCTV & Cabling', href: '#services' },
    { label: 'VLAN & SD-WAN', href: '#services' },
    { label: 'Starlink Deployments', href: '#services' },
];

const COMPANY = [
    { label: 'About Us', href: '#' },
    { label: 'Our Work', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
];

const SOCIALS = [
    { icon: Users, label: 'Facebook', href: '#' },
    { icon: MessageCircle, label: 'Twitter / X', href: '#' },
    { icon: Briefcase, label: 'LinkedIn', href: '#' },
    { icon: Code2, label: 'GitHub', href: '#' },
];

function MagneticIcon({ icon: Icon, label, href }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    function handleMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = Math.max(-6, Math.min(6, (e.clientX - cx) * 0.5));
        const dy = Math.max(-6, Math.min(6, (e.clientY - cy) * 0.5));
        setOffset({ x: dx, y: dy });
    }

    function handleLeave() {
        setOffset({ x: 0, y: 0 });
    }

    return (
        <a
            href={href}
            aria-label={label}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: 'transform 0.15s ease-out, background-color 0.2s, color 0.2s, border-color 0.2s',
            }}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white border border-slate-700 hover:border-indigo-600"
        >
            <Icon className="w-4 h-4" />
        </a>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Main grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="space-y-5 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2" aria-label="AsuraTECH home">
                            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-600">
                                <Zap className="w-4 h-4 text-white" />
                            </span>
                            <span className="text-xl font-extrabold tracking-tight text-white">
                                Asura<span className="text-indigo-400">TECH</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                            End-to-end IT solutions — from bespoke websites and SaaS platforms to hardened
                            network infrastructure and on-site hardware installs.
                        </p>

                        <ul className="space-y-2.5 text-sm">
                            <li className="flex items-start gap-2.5">
                                <Mail className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                                <a href="mailto:cv@asuratechsolutions.com" className="hover:text-white transition-colors">
                                    cv@asuratechsolutions.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Phone className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                                <a href="tel:+639959822419" className="hover:text-white transition-colors">
                                    +63 995 982 2419
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                                <span>Philippines</span>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Services</h3>
                        <ul className="space-y-2.5">
                            {SERVICES.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Company</h3>
                        <ul className="space-y-2.5">
                            {COMPANY.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-5">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Stay Updated</h3>
                        <p className="text-sm text-slate-400">
                            Get the latest news on IT trends and AsuraTECH updates.
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col gap-2"
                            aria-label="Newsletter sign-up"
                        >
                            <label htmlFor="footer-email" className="sr-only">Email address</label>
                            <input
                                id="footer-email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>

                        {/* Socials */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Follow Us</h3>
                            <div className="flex gap-3">
                                {SOCIALS.map(({ icon, label, href }) => (
                                    <MagneticIcon key={label} icon={icon} label={label} href={href} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                    <p>© {year} AsuraTECH Solutions. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
