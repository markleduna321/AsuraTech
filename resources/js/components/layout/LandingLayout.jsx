import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Disclosure } from '@headlessui/react';
import { Menu, X, ChevronDown, Globe, Server, Network, Cpu, Zap, LogIn, Clock, Activity } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    {
        label: 'Services',
        children: [
            { label: 'Web & Applications', href: '#services', icon: Globe, desc: 'Websites, SaaS, apps' },
            { label: 'Infrastructure & Security', href: '#services', icon: Server, desc: 'Firewall, VLANs, SD-WAN' },
            { label: 'Hardware & Installation', href: '#services', icon: Cpu, desc: 'Servers, cabling, CCTV' },
            { label: 'Connectivity', href: '#services', icon: Network, desc: 'Starlink, SD-WAN, routing' },
        ],
    },
    {
        label: 'Products',
        groups: [
            {
                category: 'SaaS',
                items: [
                    { label: 'TimeSync', href: '/products/timesync', icon: Clock, desc: 'Smart scheduling & time management' },
                    { label: 'GymAsura', href: '/products/gymasura', icon: Activity, desc: 'Gym management & member tracking' },
                ],
            },
        ],
    },
    { label: 'Contact', href: '#contact' },
];

function ServicesDropdown({ items }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-indigo-600 py-2 focus:outline-none"
                aria-expanded={open}
                aria-haspopup="true"
            >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute left-0 top-full w-72 pt-2 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    {items.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-indigo-50 group"
                        >
                            <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <item.icon className="w-4 h-4" />
                            </span>
                            <span>
                                <span className="block text-sm font-medium text-gray-900 group-hover:text-indigo-600">{item.label}</span>
                                <span className="block text-xs text-gray-500 mt-0.5">{item.desc}</span>
                            </span>
                        </a>
                    ))}
                </div>
                </div>
            )}
        </div>
    );
}

function ProductsDropdown({ groups }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-indigo-600 py-2 focus:outline-none"
                aria-expanded={open}
                aria-haspopup="true"
            >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute left-0 top-full w-72 pt-2 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    {groups.map((group) => (
                        <div key={group.category}>
                            <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                {group.category}
                            </p>
                            {group.items.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-start gap-3 px-4 py-3 hover:bg-indigo-50 group"
                                >
                                    <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <item.icon className="w-4 h-4" />
                                    </span>
                                    <span>
                                        <span className="block text-sm font-medium text-gray-900 group-hover:text-indigo-600">{item.label}</span>
                                        <span className="block text-xs text-gray-500 mt-0.5">{item.desc}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
                </div>
            )}
        </div>
    );
}

export default function LandingLayout({ children, canLogin, canRegister }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            {/* Navbar */}
            <header
                className={`sticky top-0 z-40 transition-shadow duration-200 ${
                    scrolled
                        ? 'bg-white/95 backdrop-blur shadow-md border-b border-gray-100'
                        : 'bg-white border-b border-gray-100'
                }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="AsuraTECH home">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
                                <Zap className="w-4 h-4 text-white" />
                            </span>
                            <span className="text-xl font-extrabold tracking-tight text-gray-900">
                                Asura<span className="text-indigo-600">TECH</span>
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map((link) =>
                                link.children ? (
                                    <ServicesDropdown key={link.label} items={link.children} />
                                ) : link.groups ? (
                                    <ProductsDropdown key={link.label} groups={link.groups} />
                                ) : (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            )}
                        </div>

                        {/* Desktop CTAs */}
                        <div className="hidden md:flex items-center gap-2">
                            {canLogin && (
                                <Link
                                    href={route('login')}
                                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Log in
                                </Link>
                            )}
                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <Disclosure as="div" className="md:hidden">
                            {({ open: mobileOpen, close }) => (
                                <>
                                    <Disclosure.Button
                                        className="p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        aria-label="Toggle navigation menu"
                                    >
                                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                    </Disclosure.Button>

                                    <Disclosure.Panel
                                        className="absolute inset-x-0 top-16 bg-white border-b border-gray-100 shadow-lg z-50 px-4 py-4 space-y-1"
                                        as="div"
                                    >
                                        {NAV_LINKS.map((link) =>
                                            link.children ? (
                                                <div key={link.label}>
                                                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                        {link.label}
                                                    </p>
                                                    {link.children.map((child) => (
                                                        <a
                                                            key={child.label}
                                                            href={child.href}
                                                            onClick={() => close()}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                        >
                                                            <child.icon className="w-4 h-4 text-indigo-500" />
                                                            {child.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            ) : link.groups ? (
                                                <div key={link.label}>
                                                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                        {link.label}
                                                    </p>
                                                    {link.groups.map((group) => (
                                                        <div key={group.category}>
                                                            <p className="px-3 pt-1 pb-0.5 text-xs text-gray-400 italic">{group.category}</p>
                                                            {group.items.map((child) => (
                                                                <Link
                                                                    key={child.label}
                                                                    href={child.href}
                                                                    onClick={() => close()}
                                                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                                >
                                                                    <child.icon className="w-4 h-4 text-indigo-500" />
                                                                    {child.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    onClick={() => close()}
                                                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    {link.label}
                                                </Link>
                                            )
                                        )}

                                        <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                                            {canLogin && (
                                                <Link
                                                    href={route('login')}
                                                    className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-4 py-2.5 hover:bg-gray-50"
                                                >
                                                    <LogIn className="w-4 h-4" />
                                                    Log in
                                                </Link>
                                            )}
                                            {canRegister && (
                                                <Link
                                                    href={route('register')}
                                                    className="flex items-center justify-center text-sm font-medium bg-indigo-600 text-white rounded-lg px-4 py-2.5 hover:bg-indigo-700"
                                                >
                                                    Get Started
                                                </Link>
                                            )}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </nav>
            </header>

            <main>{children}</main>
        </div>
    );
}
