import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, ChevronDown, ArrowRight, Zap } from 'lucide-react';
import {
    NAV_ITEMS,
    PRIMARY_CTA,
    SOLUTIONS_COLUMNS,
    SOLUTIONS_UTILITY_BAR,
    AUDIT_URL,
} from '@/features/site/navConfig';
import SectionLink from '@/components/ui/SectionLink';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const HOVER_OPEN_DELAY = 150;
const HOVER_CLOSE_DELAY = 200;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function useCurrentPath() {
    return usePage().url.split(/[?#]/)[0];
}

function isActive(href, currentPath) {
    if (!href) return false;
    const clean = href.split(/[?#]/)[0];
    return clean === currentPath;
}

// ---------------------------------------------------------------------------
// Logo Component
// ---------------------------------------------------------------------------

function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center flex-shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] transition-opacity hover:opacity-90 py-1"
            aria-label="AsuraTECH home"
        >
            <img
                src="/images/logo-reversed.png"
                alt="AsuraTECH Solutions"
                className="h-10 sm:h-11 w-auto max-w-[175px] sm:max-w-[215px] object-contain select-none"
                width={958}
                height={314}
                onError={(e) => {
                    if (!e.target.dataset.triedFallback) {
                        e.target.dataset.triedFallback = 'true';
                        e.target.src = '/images/company-logo.jpg';
                    }
                }}
            />
        </Link>
    );
}

// ---------------------------------------------------------------------------
// Mobile Drawer Component
// ---------------------------------------------------------------------------

function MobileDrawer({ open, onClose }) {
    const drawerRef = useRef(null);
    const closeRef = useRef(null);
    const [accordions, setAccordions] = useState({ platforms: false, solutions: true });
    const currentPath = useCurrentPath();

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
            if (e.key === 'Tab') {
                const focusable = drawerRef.current?.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (!focusable?.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    const toggleAccordion = (key) =>
        setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));

    if (!open) return null;

    return (
        <div
            ref={drawerRef}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
        >
            {/* Drawer Header */}
            <div className="flex items-center justify-between h-[72px] px-4 sm:px-6 border-b border-[var(--border)]">
                <Logo />
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-lg text-[var(--soft)] hover:text-white hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                    aria-label="Close navigation menu"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-3">
                {/* Accordion 1: Platforms */}
                <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-white/[0.02]">
                    <button
                        type="button"
                        onClick={() => toggleAccordion('platforms')}
                        className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                        aria-expanded={accordions.platforms}
                    >
                        <span>Platforms</span>
                        <ChevronDown
                            className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 motion-reduce:transition-none ${
                                accordions.platforms ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                    {accordions.platforms && (
                        <div className="px-4 pb-4 pt-1 border-t border-[var(--border)] space-y-2">
                            <p className="text-xs text-[var(--muted)] italic">
                                TODO: Platforms mega-menu. Quick links:
                            </p>
                            <Link
                                href="/products/timesync"
                                onClick={onClose}
                                className="block py-2 text-sm text-[var(--soft)] hover:text-[var(--cyan)]"
                            >
                                TimeSync (HRIS & Payroll)
                            </Link>
                            <Link
                                href="/products/gymasura"
                                onClick={onClose}
                                className="block py-2 text-sm text-[var(--soft)] hover:text-[var(--cyan)]"
                            >
                                GymAsura (Gym Management)
                            </Link>
                        </div>
                    )}
                </div>

                {/* Accordion 2: Solutions & Engineering */}
                <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-white/[0.02]">
                    <button
                        type="button"
                        onClick={() => toggleAccordion('solutions')}
                        className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                        aria-expanded={accordions.solutions}
                    >
                        <span>Solutions & Engineering</span>
                        <ChevronDown
                            className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 motion-reduce:transition-none ${
                                accordions.solutions ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                    {accordions.solutions && (
                        <div className="px-4 pb-4 pt-2 border-t border-[var(--border)] space-y-5">
                            {SOLUTIONS_COLUMNS.map((col) => (
                                <div key={col.heading}>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--cyan)] mb-2">
                                        {col.heading}
                                    </p>
                                    <div className="space-y-1">
                                        {col.items.map((item) => (
                                            <SectionLink
                                                key={item.title}
                                                href={item.href}
                                                onClick={onClose}
                                                className="flex items-start gap-3 py-2 text-sm text-[var(--soft)] hover:text-white"
                                            >
                                                <item.icon className="w-4 h-4 text-[var(--cyan)] shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="block font-medium">{item.title}</span>
                                                    <span className="block text-xs text-[var(--muted)]">{item.desc}</span>
                                                </div>
                                            </SectionLink>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Plain Links */}
                <div className="space-y-1 pt-2">
                    <Link
                        href="/what-we-do"
                        onClick={onClose}
                        aria-current={isActive('/what-we-do', currentPath) ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/what-we-do', currentPath)
                                ? 'bg-white/[0.06] text-[var(--cyan)]'
                                : 'text-[var(--soft)] hover:bg-white/[0.04] hover:text-white'
                        }`}
                    >
                        What We Do
                    </Link>
                    <Link
                        href="/about"
                        onClick={onClose}
                        aria-current={isActive('/about', currentPath) ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/about', currentPath)
                                ? 'bg-white/[0.06] text-[var(--cyan)]'
                                : 'text-[var(--soft)] hover:bg-white/[0.04] hover:text-white'
                        }`}
                    >
                        About
                    </Link>
                    <Link
                        href="/demos"
                        onClick={onClose}
                        aria-current={isActive('/demos', currentPath) ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/demos', currentPath)
                                ? 'bg-white/[0.06] text-[var(--cyan)]'
                                : 'text-[var(--soft)] hover:bg-white/[0.04] hover:text-white'
                        }`}
                    >
                        Live Demos
                    </Link>
                </div>
            </div>

            {/* Pinned Bottom CTA */}
            <div className="border-t border-[var(--border)] p-4 sm:px-6 bg-[var(--surface)]">
                <SectionLink
                    href={PRIMARY_CTA.href}
                    onClick={onClose}
                    className="flex items-center justify-center w-full gap-2 rounded-xl bg-[var(--blue)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(47,107,255,0.3)] transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                >
                    {PRIMARY_CTA.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </SectionLink>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main SiteHeader Component
// ---------------------------------------------------------------------------

export default function SiteHeader() {
    const [openMenu, setOpenMenu] = useState(null); // 'platforms' | 'solutions' | null
    const [drawerOpen, setDrawerOpen] = useState(false);
    const currentPath = useCurrentPath();

    const headerRef = useRef(null);
    const openTimerRef = useRef(null);
    const closeTimerRef = useRef(null);
    const triggerRefs = useRef({});

    const clearTimers = useCallback(() => {
        if (openTimerRef.current) clearTimeout(openTimerRef.current);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    }, []);

    // Close on route change
    useEffect(() => {
        clearTimers();
        setOpenMenu(null);
        setDrawerOpen(false);
    }, [currentPath, clearTimers]);

    // Close on click outside
    useEffect(() => {
        if (!openMenu) return;
        const handleClickOutside = (e) => {
            if (!headerRef.current?.contains(e.target)) {
                clearTimers();
                setOpenMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenu, clearTimers]);

    // Global Escape key
    useEffect(() => {
        if (!openMenu) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                const current = openMenu;
                clearTimers();
                setOpenMenu(null);
                triggerRefs.current[current]?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [openMenu, clearTimers]);

    // Clean up timers on unmount
    useEffect(() => () => clearTimers(), [clearTimers]);

    // Hover open handler for triggers (150ms delay)
    const handleTriggerMouseEnter = (menuKey) => {
        clearTimers();
        if (openMenu && openMenu !== menuKey) {
            // Already showing another menu: switch without waiting
            setOpenMenu(menuKey);
            return;
        }
        openTimerRef.current = setTimeout(() => {
            setOpenMenu(menuKey);
        }, HOVER_OPEN_DELAY);
    };

    // Hover leave handler for triggers (200ms grace period)
    const handleTriggerMouseLeave = () => {
        clearTimers();
        closeTimerRef.current = setTimeout(() => {
            setOpenMenu(null);
        }, HOVER_CLOSE_DELAY);
    };

    // When cursor enters either panel, cancel closing!
    const handlePanelMouseEnter = () => {
        clearTimers();
    };

    // When cursor leaves either panel, start close timer
    const handlePanelMouseLeave = () => {
        clearTimers();
        closeTimerRef.current = setTimeout(() => {
            setOpenMenu(null);
        }, HOVER_CLOSE_DELAY);
    };

    // Click trigger toggle
    const handleTriggerClick = (menuKey) => {
        clearTimers();
        setOpenMenu((prev) => (prev === menuKey ? null : menuKey));
    };

    // Keyboard support for triggers
    const handleTriggerKeyDown = (e, menuKey, panelId) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTriggerClick(menuKey);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpenMenu(menuKey);
            setTimeout(() => {
                const panel = document.getElementById(panelId);
                const first = panel?.querySelector('a, button');
                first?.focus();
            }, 50);
        }
    };

    // Close on menu item click
    const handleItemClick = () => {
        clearTimers();
        setOpenMenu(null);
    };

    return (
        <header
            ref={headerRef}
            className="site-header sticky top-0 z-50 h-[72px] border-b border-[var(--border)] select-none"
            style={{
                background: 'rgba(5, 10, 24, 0.72)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            <nav
                className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Logo />

                {/* Desktop Navigation Items */}
                <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap shrink-0">
                    {/* Item 1: Platforms (Dropdown Trigger) */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleTriggerMouseEnter('platforms')}
                        onMouseLeave={handleTriggerMouseLeave}
                    >
                        <button
                            ref={(el) => (triggerRefs.current.platforms = el)}
                            type="button"
                            className={`nav-link flex items-center gap-1 text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] ${
                                openMenu === 'platforms' ? 'text-white' : 'text-[var(--soft)] hover:text-white'
                            }`}
                            aria-expanded={openMenu === 'platforms'}
                            aria-controls="mega-platforms"
                            aria-haspopup="true"
                            onClick={() => handleTriggerClick('platforms')}
                            onKeyDown={(e) => handleTriggerKeyDown(e, 'platforms', 'mega-platforms')}
                        >
                            Platforms
                            <ChevronDown
                                className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-200 motion-reduce:transition-none ${
                                    openMenu === 'platforms' ? 'rotate-180 text-[var(--cyan)]' : ''
                                }`}
                                aria-hidden="true"
                            />
                        </button>

                        {/* Platforms Dropdown Menu (Stub with TODO) */}
                        <div
                            id="mega-platforms"
                            role="region"
                            aria-label="Platforms menu"
                            onMouseEnter={handlePanelMouseEnter}
                            onMouseLeave={handlePanelMouseLeave}
                            className={`absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-200 motion-reduce:transition-none ${
                                openMenu === 'platforms'
                                    ? 'pointer-events-auto opacity-100 visible translate-y-0'
                                    : 'pointer-events-none opacity-0 invisible -translate-y-2'
                            }`}
                        >
                            <div
                                className="rounded-xl p-4 shadow-2xl border border-[var(--border)]"
                                style={{
                                    background: 'rgba(10, 18, 36, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                }}
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--cyan)] mb-2">
                                    Platforms & SaaS
                                </p>
                                <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">
                                    {/* TODO: Populate with Platforms mega menu configuration */}
                                    Turnkey software platforms ready to deploy:
                                </p>
                                <div className="space-y-1">
                                    <Link
                                        href="/products/timesync"
                                        onClick={handleItemClick}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--soft)] hover:bg-white/[0.04] hover:text-white transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                                        TimeSync (HRIS & Payroll)
                                    </Link>
                                    <Link
                                        href="/products/gymasura"
                                        onClick={handleItemClick}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--soft)] hover:bg-white/[0.04] hover:text-white transition-colors"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" />
                                        GymAsura (Gym Management)
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2: Solutions & Engineering (Mega Menu Trigger) */}
                    <div
                        onMouseEnter={() => handleTriggerMouseEnter('solutions')}
                        onMouseLeave={handleTriggerMouseLeave}
                    >
                        <button
                            ref={(el) => (triggerRefs.current.solutions = el)}
                            type="button"
                            className={`nav-link flex items-center gap-1 text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] ${
                                openMenu === 'solutions' ? 'text-white' : 'text-[var(--soft)] hover:text-white'
                            }`}
                            aria-expanded={openMenu === 'solutions'}
                            aria-controls="mega-solutions"
                            aria-haspopup="true"
                            onClick={() => handleTriggerClick('solutions')}
                            onKeyDown={(e) => handleTriggerKeyDown(e, 'solutions', 'mega-solutions')}
                        >
                            Solutions & Engineering
                            <ChevronDown
                                className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-200 motion-reduce:transition-none ${
                                    openMenu === 'solutions' ? 'rotate-180 text-[var(--cyan)]' : ''
                                }`}
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    {/* Item 3: What We Do */}
                    <Link
                        href="/what-we-do"
                        aria-current={isActive('/what-we-do', currentPath) ? 'page' : undefined}
                        className={`nav-link text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] ${
                            isActive('/what-we-do', currentPath)
                                ? 'text-white nav-link--active'
                                : 'text-[var(--soft)] hover:text-white'
                        }`}
                    >
                        What We Do
                    </Link>

                    {/* Item 4: About */}
                    <Link
                        href="/about"
                        aria-current={isActive('/about', currentPath) ? 'page' : undefined}
                        className={`nav-link text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] ${
                            isActive('/about', currentPath)
                                ? 'text-white nav-link--active'
                                : 'text-[var(--soft)] hover:text-white'
                        }`}
                    >
                        About
                    </Link>

                    {/* Item 5: Live Demos */}
                    <Link
                        href="/demos"
                        aria-current={isActive('/demos', currentPath) ? 'page' : undefined}
                        className={`nav-link text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] ${
                            isActive('/demos', currentPath)
                                ? 'text-white nav-link--active'
                                : 'text-[var(--soft)] hover:text-white'
                        }`}
                    >
                        Live Demos
                    </Link>
                </div>

                {/* Desktop Primary CTA Button */}
                <div className="hidden lg:flex items-center shrink-0">
                    <SectionLink
                        href={PRIMARY_CTA.href}
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue)] px-4 py-2 xl:px-5 xl:py-2.5 text-xs xl:text-sm font-semibold text-white shadow-lg shadow-[rgba(47,107,255,0.25)] transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] whitespace-nowrap"
                    >
                        {PRIMARY_CTA.label}
                    </SectionLink>
                </div>

                {/* Mobile / Tablet Hamburger Button */}
                <button
                    type="button"
                    className="lg:hidden p-2 rounded-lg text-[var(--soft)] hover:text-white hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </nav>

            {/* ================================================================
                FULL-WIDTH SOLUTIONS & ENGINEERING MEGA MENU (Desktop)
                Rendered directly under the header: left-0 right-0 top-full
               ================================================================ */}
            <div
                id="mega-solutions"
                role="region"
                aria-label="Solutions & Engineering menu"
                onMouseEnter={handlePanelMouseEnter}
                onMouseLeave={handlePanelMouseLeave}
                className={`hidden lg:block absolute left-0 right-0 top-full transition-all duration-200 motion-reduce:transition-none z-50 ${
                    openMenu === 'solutions'
                        ? 'pointer-events-auto opacity-100 visible translate-y-0'
                        : 'pointer-events-none opacity-0 invisible -translate-y-2'
                }`}
            >
                {/* Diagonal hover safe zone bridge */}
                <div className="absolute -top-3 inset-x-0 h-3" />

                <div
                    className="border-t border-b border-[var(--border)] rounded-b-2xl shadow-2xl shadow-black/80"
                    style={{
                        background: 'rgba(10, 18, 36, 0.94)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                    }}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        {/* 3 Columns */}
                        <div className="grid grid-cols-3 gap-8">
                            {SOLUTIONS_COLUMNS.map((col) => (
                                <div key={col.heading}>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--cyan)] mb-4">
                                        {col.heading}
                                    </p>
                                    <ul className="space-y-1.5">
                                        {col.items.map((item) => (
                                            <li key={item.title}>
                                                <SectionLink
                                                    href={item.href}
                                                    onClick={handleItemClick}
                                                    className="mega-item group flex items-start gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] cursor-pointer"
                                                >
                                                    <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--cyan)]/10 text-[var(--cyan)] flex items-center justify-center transition-all group-hover:shadow-[0_0_12px_rgba(0,229,255,0.35)] group-hover:bg-[var(--cyan)]/20">
                                                        <item.icon className="w-4 h-4" aria-hidden="true" />
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block text-sm font-semibold text-white group-hover:text-[var(--cyan)] transition-colors">
                                                            {item.title}
                                                        </span>
                                                        <span className="block text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
                                                            {item.desc}
                                                        </span>
                                                    </span>
                                                </SectionLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Utility Bar */}
                        <div className="mt-7 pt-5 border-t border-[var(--border)] flex items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-[var(--muted)] font-medium">
                                    {SOLUTIONS_UTILITY_BAR.label}
                                </span>
                                {SOLUTIONS_UTILITY_BAR.chips.map((chip) => (
                                    <span
                                        key={chip}
                                        className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-[var(--soft)]"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                            <SectionLink
                                href={SOLUTIONS_UTILITY_BAR.cta.href}
                                onClick={handleItemClick}
                                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cyan)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] rounded-lg py-1 px-2 whitespace-nowrap"
                            >
                                {SOLUTIONS_UTILITY_BAR.cta.label}
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                            </SectionLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </header>
    );
}
