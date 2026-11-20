import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
    PRIMARY_CTA,
    PLATFORMS_COLUMNS,
    PLATFORMS_UTILITY_BAR,
    SOLUTIONS_COLUMNS,
    SOLUTIONS_UTILITY_BAR,
} from '@/features/site/navConfig';
import SectionLink from '@/components/ui/SectionLink';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const HOVER_OPEN_DELAY = 150;
const HOVER_CLOSE_DELAY = 200;

const MEGA_MENUS = [
    {
        key: 'platforms',
        label: 'Platforms',
        panelId: 'mega-platforms',
        columns: PLATFORMS_COLUMNS,
        utilityBar: PLATFORMS_UTILITY_BAR,
    },
    {
        key: 'solutions',
        label: 'Solutions',
        panelId: 'mega-solutions',
        columns: SOLUTIONS_COLUMNS,
        utilityBar: SOLUTIONS_UTILITY_BAR,
    },
];

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

/**
 * Renders a menu entry as an internal link, an external link (new tab),
 * or a non-clickable placeholder when no href is set yet.
 */
function MenuItemLink({ item, onClick, className, children }) {
    if (!item.href) {
        return (
            <div className={`${className} cursor-default`} aria-disabled="true">
                {children}
            </div>
        );
    }
    if (item.external) {
        return (
            <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
                {children}
            </a>
        );
    }
    return (
        <SectionLink href={item.href} onClick={onClick} className={className}>
            {children}
        </SectionLink>
    );
}

function ItemBadge({ item }) {
    if (!item.href) {
        return (
            <span className="ml-1.5 inline-flex items-center rounded-full border border-plum-800/60 bg-white/[0.04] px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-mauve-300 align-middle">
                Soon
            </span>
        );
    }
    if (item.external) {
        return <ArrowUpRight className="ml-1 inline w-3.5 h-3.5 text-mauve-300 align-[-2px]" aria-hidden="true" />;
    }
    return null;
}

// ---------------------------------------------------------------------------
// Logo Component
// ---------------------------------------------------------------------------

function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center flex-shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist transition-opacity hover:opacity-90 py-1"
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
            className="fixed inset-0 z-50 flex flex-col bg-black lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
        >
            {/* Drawer Header */}
            <div className="flex items-center justify-between h-[72px] px-4 sm:px-6 border-b border-plum-800/60">
                <Logo />
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-lg text-mauve-300 hover:text-mist hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
                    aria-label="Close navigation menu"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-3">
                {/* Accordions: Platforms + Solutions (same structure) */}
                {MEGA_MENUS.map((menu) => (
                    <div
                        key={menu.key}
                        className="border border-plum-800/60 rounded-xl overflow-hidden bg-white/[0.02]"
                    >
                        <button
                            type="button"
                            onClick={() => toggleAccordion(menu.key)}
                            className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-semibold text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
                            aria-expanded={!!accordions[menu.key]}
                        >
                            <span>{menu.label}</span>
                            <ChevronDown
                                className={`w-4 h-4 text-mauve-300 transition-transform duration-200 motion-reduce:transition-none ${
                                    accordions[menu.key] ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {accordions[menu.key] && (
                            <div className="px-4 pb-4 pt-2 border-t border-plum-800/60 space-y-5">
                                {menu.columns.map((col) => (
                                    <div key={col.heading}>
                                        {col.href ? (
                                            <SectionLink
                                                href={col.href}
                                                onClick={onClose}
                                                className="mb-2 inline-flex min-h-8 items-center rounded text-[11px] font-semibold uppercase tracking-[0.18em] text-mauve-300 transition-colors hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist motion-reduce:transition-none"
                                            >
                                                {col.heading}
                                            </SectionLink>
                                        ) : (
                                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mauve-300">
                                                {col.heading}
                                            </p>
                                        )}
                                        <div className="space-y-1">
                                            {col.items.map((item) => (
                                                <MenuItemLink
                                                    key={item.title}
                                                    item={item}
                                                    onClick={onClose}
                                                    className={`flex items-start gap-3 py-2 text-sm ${
                                                        item.href
                                                            ? 'text-mist transition-colors hover:text-magenta-400 motion-reduce:transition-none'
                                                            : 'text-mist opacity-70'
                                                    }`}
                                                >
                                                    <item.icon className="w-4 h-4 text-mauve-300 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="block font-medium">
                                                            {item.title}
                                                            <ItemBadge item={item} />
                                                        </span>
                                                        <span className="block text-xs text-mauve-300">{item.desc}</span>
                                                    </div>
                                                </MenuItemLink>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Plain Links */}
                <div className="space-y-1 pt-2">
                    <Link
                        href="/what-we-do"
                        onClick={onClose}
                        aria-current={isActive('/what-we-do', currentPath) ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors motion-reduce:transition-none ${
                            isActive('/what-we-do', currentPath)
                                ? 'bg-white/[0.06] text-mist nav-drawer-link--active'
                                : 'text-mist hover:bg-white/[0.06] hover:text-magenta-400'
                        }`}
                    >
                        What We Do
                    </Link>
                    <Link
                        href="/about"
                        onClick={onClose}
                        aria-current={isActive('/about', currentPath) ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors motion-reduce:transition-none ${
                            isActive('/about', currentPath)
                                ? 'bg-white/[0.06] text-mist nav-drawer-link--active'
                                : 'text-mist hover:bg-white/[0.06] hover:text-magenta-400'
                        }`}
                    >
                        About
                    </Link>
                    <Link
                        href="/demos"
                        onClick={onClose}
                        aria-current={isActive('/demos', currentPath) ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors motion-reduce:transition-none ${
                            isActive('/demos', currentPath)
                                ? 'bg-white/[0.06] text-mist nav-drawer-link--active'
                                : 'text-mist hover:bg-white/[0.06] hover:text-magenta-400'
                        }`}
                    >
                        Live Demos
                    </Link>
                </div>
            </div>

            {/* Pinned Bottom CTA */}
            <div className="border-t border-plum-800/60 p-4 sm:px-6 bg-black">
                <SectionLink
                    href={PRIMARY_CTA.href}
                    onClick={onClose}
                    data-cta="primary"
                    className="flex items-center justify-center w-full gap-2 rounded-full bg-magenta-600 bg-gradient-to-r from-magenta-600 to-iris-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-magenta-500/30 transition-[filter,box-shadow] duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist motion-reduce:transition-none"
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
    const [scrolled, setScrolled] = useState(false);
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

    // Track scroll position (rAF-throttled, passive) for the transparent-at-top header
    useEffect(() => {
        let frame = null;
        const update = () => {
            frame = null;
            setScrolled(window.scrollY > 8);
        };
        const handleScroll = () => {
            if (frame === null) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, []);

    const isSolid = scrolled || Boolean(openMenu) || drawerOpen;

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
            data-scrolled={isSolid ? 'true' : 'false'}
            className={`site-header sticky top-0 z-50 h-[72px] border-b ${isSolid ? 'border-plum-800/60' : 'border-transparent'} transition-colors duration-300 motion-reduce:transition-none select-none`}
        >
            {/* Frosted bar lives on its own layer: a backdrop-filter on <header> would become the
                containing block for the fixed mobile drawer and clip it to 72px. */}
            <div
                className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 motion-reduce:transition-none ${isSolid ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden="true"
                style={{
                    background: 'rgba(0, 0, 0, 0.82)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                }}
            />
            <nav
                className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Logo />

                {/* Desktop Navigation Items */}
                <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap shrink-0">
                    {/* Items 1Ã¢â‚¬â€œ2: Platforms + Solutions & Engineering (Mega Menu Triggers) */}
                    {MEGA_MENUS.map((menu) => (
                        <div
                            key={menu.key}
                            onMouseEnter={() => handleTriggerMouseEnter(menu.key)}
                            onMouseLeave={handleTriggerMouseLeave}
                        >
                            <button
                                ref={(el) => (triggerRefs.current[menu.key] = el)}
                                type="button"
                                className={`nav-link flex items-center gap-1 text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist ${
                                    openMenu === menu.key ? 'text-mist' : 'text-mauve-300 hover:text-mist'
                                }`}
                                aria-expanded={openMenu === menu.key}
                                aria-controls={menu.panelId}
                                aria-haspopup="true"
                                onClick={() => handleTriggerClick(menu.key)}
                                onKeyDown={(e) => handleTriggerKeyDown(e, menu.key, menu.panelId)}
                            >
                                {menu.label}
                                <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 motion-reduce:transition-none ${
                                        openMenu === menu.key ? 'rotate-180 text-magenta-400' : 'text-mauve-300'
                                    }`}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    ))}

                    {/* Item 3: What We Do */}
                    <Link
                        href="/what-we-do"
                        aria-current={isActive('/what-we-do', currentPath) ? 'page' : undefined}
                        className={`nav-link text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist ${
                            isActive('/what-we-do', currentPath)
                                ? 'text-mist nav-link--active'
                                : 'text-mauve-300 hover:text-mist'
                        }`}
                    >
                        What We Do
                    </Link>

                    {/* Item 4: About */}
                    <Link
                        href="/about"
                        aria-current={isActive('/about', currentPath) ? 'page' : undefined}
                        className={`nav-link text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist ${
                            isActive('/about', currentPath)
                                ? 'text-mist nav-link--active'
                                : 'text-mauve-300 hover:text-mist'
                        }`}
                    >
                        About
                    </Link>

                    {/* Item 5: Live Demos */}
                    <Link
                        href="/demos"
                        aria-current={isActive('/demos', currentPath) ? 'page' : undefined}
                        className={`nav-link text-[13px] xl:text-sm font-medium px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist ${
                            isActive('/demos', currentPath)
                                ? 'text-mist nav-link--active'
                                : 'text-mauve-300 hover:text-mist'
                        }`}
                    >
                        Live Demos
                    </Link>
                </div>

                {/* Desktop Primary CTA Button */}
                <div className="hidden lg:flex items-center shrink-0">
                    <SectionLink
                        href={PRIMARY_CTA.href}
                        data-cta="primary"
                        className="inline-flex items-center gap-2 rounded-full bg-magenta-600 bg-gradient-to-r from-magenta-600 to-iris-600 px-4 py-2 xl:px-5 xl:py-2.5 text-xs xl:text-sm font-semibold text-white shadow-lg shadow-magenta-500/35 transition-[filter,box-shadow,transform] duration-200 hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none whitespace-nowrap"
                    >
                        {PRIMARY_CTA.label}
                    </SectionLink>
                </div>

                {/* Mobile / Tablet Hamburger Button */}
                <button
                    type="button"
                    className="lg:hidden p-2 rounded-lg text-mauve-300 hover:text-mist hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </nav>

            {/* ================================================================
                FULL-WIDTH MEGA MENUS (Desktop) â€” Platforms + Solutions & Engineering
                Rendered directly under the header: left-0 right-0 top-full
               ================================================================ */}
            {MEGA_MENUS.map((menu) => (
                <div
                    key={menu.key}
                    id={menu.panelId}
                    role="region"
                    aria-label={`${menu.label} menu`}
                    onMouseEnter={handlePanelMouseEnter}
                    onMouseLeave={handlePanelMouseLeave}
                    className={`hidden lg:block absolute left-0 right-0 top-full transition-all duration-200 motion-reduce:transition-none z-50 ${
                        openMenu === menu.key
                            ? 'pointer-events-auto opacity-100 visible translate-y-0'
                            : 'pointer-events-none opacity-0 invisible -translate-y-2'
                    }`}
                >
                    {/* Diagonal hover safe zone bridge */}
                    <div className="absolute -top-3 inset-x-0 h-3" />

                    <div
                        className="border-t border-b border-plum-800/60 rounded-b-2xl shadow-2xl shadow-black/80"
                        style={{
                            background: '#000',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                        }}
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                            {/* Columns */}
                            <div
                                className="grid gap-8"
                                style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))` }}
                            >
                                {menu.columns.map((col) => (
                                    <div key={col.heading}>
                                        {col.href ? (
                                            <SectionLink
                                                href={col.href}
                                                onClick={handleItemClick}
                                                className="mb-4 inline-flex min-h-8 items-center rounded text-[11px] font-semibold uppercase tracking-[0.18em] text-mauve-300 transition-colors hover:text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist motion-reduce:transition-none"
                                            >
                                                {col.heading}
                                            </SectionLink>
                                        ) : (
                                            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-mauve-300">
                                                {col.heading}
                                            </p>
                                        )}
                                        <ul className="space-y-1.5">
                                            {col.items.map((item) => (
                                                <li key={item.title}>
                                                    <MenuItemLink
                                                        item={item}
                                                        onClick={handleItemClick}
                                                        className={`mega-item group flex items-start gap-3.5 rounded-xl p-2.5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist ${
                                                            item.href ? 'hover:bg-white/[0.04] cursor-pointer' : 'opacity-70'
                                                        }`}
                                                    >
                                                        <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-plum-900/50 text-mauve-300 flex items-center justify-center transition-[color,box-shadow] duration-200 motion-reduce:transition-none">
                                                            <item.icon className="w-4 h-4" aria-hidden="true" />
                                                        </span>
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block text-sm font-semibold text-mist">
                                                                {item.title}
                                                                <ItemBadge item={item} />
                                                            </span>
                                                            <span className="block text-xs text-mauve-300 mt-0.5 leading-relaxed">
                                                                {item.desc}
                                                            </span>
                                                        </span>
                                                    </MenuItemLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Utility Bar */}
                            <div className="mt-7 flex flex-col gap-3 border-t border-plum-800/60 pt-5 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs text-mauve-300 font-medium">
                                        {menu.utilityBar.label}
                                    </span>
                                    {menu.utilityBar.chips.map((chip) => (
                                        <span
                                            key={chip}
                                            className="inline-flex items-center rounded-full border border-plum-800/60 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-mauve-300"
                                        >
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 xl:justify-end">
                                    <SectionLink
                                        href={menu.utilityBar.cta.href}
                                        onClick={handleItemClick}
                                        className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-magenta-400 transition-colors hover:text-mist motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
                                    >
                                        {menu.utilityBar.cta.label}
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                                    </SectionLink>
                                    {menu.utilityBar.secondaryCta && (
                                        <SectionLink
                                            href={menu.utilityBar.secondaryCta.href}
                                            onClick={handleItemClick}
                                            className="inline-flex items-center rounded-lg px-2 py-1 text-sm font-semibold text-mauve-300 transition-colors hover:text-mist motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mist"
                                        >
                                            {menu.utilityBar.secondaryCta.label}
                                        </SectionLink>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Mobile Drawer Overlay */}
            <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </header>
    );
}
