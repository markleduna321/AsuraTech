/**
 * Navigation configuration — single source of truth for the site header.
 *
 * Every nav item, mega menu column, URL and CTA is defined here.
 * Unknown URLs are marked TODO so they are easy to grep and fill in later.
 */

import {
    Bot,
    Workflow,
    Plug,
    Database,
    Users,
    Globe,
    Smartphone,
    Lightbulb,
    RefreshCw,
    Clock,
    Dumbbell,
    Stethoscope,
    Radar,
    Cloud,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// URLs
// ---------------------------------------------------------------------------

/** Audit booking target — the final CTA section on the home page. */
export const AUDIT_URL = '/#get-started';

/** Demo portal page. */
export const DEMOS_URL = '/demos';

// ---------------------------------------------------------------------------
// Top-level nav items (in render order)
// ---------------------------------------------------------------------------

export const NAV_ITEMS = [
    { key: 'platforms', label: 'Platforms', megaMenu: 'platforms' },
    { key: 'solutions', label: 'Solutions', megaMenu: 'solutions' },
    { key: 'what-we-do', label: 'What We Do', href: '/what-we-do' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'demos', label: 'Live Demos', href: DEMOS_URL },
];

export const PRIMARY_CTA = {
    label: 'Book a Free Workflow Audit',
    href: AUDIT_URL,
};

// ---------------------------------------------------------------------------
// Mega menu 1 — Platforms
// ---------------------------------------------------------------------------
// Items without an `href` render as non-clickable "Soon" entries.
// Items with `external: true` open in a new tab.

export const PLATFORMS_COLUMNS = [
    {
        heading: 'Turnkey Systems',
        items: [
            {
                icon: Clock,
                title: 'TimeSync',
                desc: 'Complete HRIS, biometric attendance, and BIR-compliant payroll.',
                href: '/products/timesync',
            },
            {
                icon: Dumbbell,
                title: 'GymAsura',
                desc: 'Automated memberships, door access tracking, and class scheduling.',
                href: '/products/gymasura',
            },
            {
                icon: Stethoscope,
                title: 'Clinic Management',
                desc: 'Online booking, SMS reminders, doctor queues and patient records (EMR).',
                href: null, // TODO: add link once the product page is ready
            },
        ],
    },
    {
        heading: 'Proprietary Platforms',
        items: [
            {
                icon: Radar,
                title: 'Diskobre',
                desc: 'B2B lead generation that finds high-intent businesses and feeds them into your pipeline.',
                href: 'https://diskobre.com',
                external: true,
            },
            {
                icon: Cloud,
                title: 'Caleho',
                desc: 'Fast, isolated web and app hosting with automated deployment.',
                href: 'https://www.caleho.cloud',
                external: true,
            },
        ],
    },
];

export const PLATFORMS_UTILITY_BAR = {
    label: 'Ready to Deploy:',
    chips: ['HRIS & Payroll', 'Gym', 'Clinic', 'Lead Generation', 'Cloud Hosting'],
    cta: {
        label: 'Test-Drive Our Live Demos',
        href: DEMOS_URL,
    },
};

// ---------------------------------------------------------------------------
// Mega menu 2 — Solutions & Engineering
// ---------------------------------------------------------------------------

export const SOLUTIONS_COLUMNS = [
    {
        heading: 'Tailored Automation & AI',
        href: '/solutions/automation-ai',
        items: [
            {
                icon: Bot,
                title: 'Tailored CRM & Sales Pipelines',
                desc: 'Unified inbox (SMS, email, chat), automated follow-ups and funnels mapped to your sales cycle.',
                href: '/solutions/automation-ai#crm-sales-pipelines',
            },
            {
                icon: Workflow,
                title: 'Practical AI Integration',
                desc: 'Bots and LLM pipelines inside your systems that qualify leads, book appointments and handle routine data.',
                href: '/solutions/automation-ai#ai-integration',
            },
            {
                icon: Plug,
                title: 'Tool Syncing',
                desc: 'Your CRM, accounting, POS and databases connected by custom webhooks, so you enter data once.',
                href: '/solutions/automation-ai#tool-syncing',
            },
        ],
    },
    {
        heading: 'Custom Engineering',
        href: '/solutions/custom-engineering',
        items: [
            {
                icon: Database,
                title: 'Custom ERP & Operational Systems',
                desc: 'Inventory, supply chain, accounting and operations built around your rules.',
                href: '/solutions/custom-engineering#custom-erp',
            },
            {
                icon: Users,
                title: 'Custom CRM Architecture',
                desc: 'A lightweight, fast CRM when standard ones don’t fit.',
                href: '/solutions/custom-engineering#custom-crm',
            },
            {
                icon: Globe,
                title: 'Full-Stack Web Apps',
                desc: 'Customer portals, dashboards and SaaS built for speed and clarity.',
                href: '/solutions/custom-engineering#web-apps',
            },
        ],
    },
    {
        heading: 'Apps, Modernization & IT',
        href: '/solutions/apps-modernization-it',
        items: [
            {
                icon: Smartphone,
                title: 'Mobile & Cross-Platform Apps',
                desc: 'Android, iOS and local-network apps for field teams and customers.',
                href: '/solutions/apps-modernization-it#mobile-apps',
            },
            {
                icon: RefreshCw,
                title: 'Legacy Modernization',
                desc: 'Spreadsheets and old software replaced by clean cloud databases, without disrupting your day.',
                href: '/solutions/apps-modernization-it#legacy-modernization',
            },
            {
                icon: Lightbulb,
                title: 'IT Consultancy & Network Architecture',
                desc: 'Honest advice, process audits and secure network design, including what to skip.',
                href: '/solutions/apps-modernization-it#it-consultancy',
            },
        ],
    },
];

export const SOLUTIONS_UTILITY_BAR = {
    label: 'What We Do:',
    chips: [
        'Tailored Automation & AI',
        'Turnkey Systems',
        'Proprietary Platforms',
        'Custom Engineering & IT',
    ],
    cta: {
        label: 'Book a Free Workflow Audit',
        href: AUDIT_URL,
    },
    secondaryCta: {
        label: 'See all solutions',
        href: '/what-we-do',
    },
};
