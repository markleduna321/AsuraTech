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
    Globe,
    Smartphone,
    Lightbulb,
    RefreshCw,
    ShieldCheck,
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
    { key: 'solutions', label: 'Solutions & Engineering', megaMenu: 'solutions' },
    { key: 'what-we-do', label: 'What We Do', href: '/what-we-do' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'demos', label: 'Live Demos', href: DEMOS_URL },
];

export const PRIMARY_CTA = {
    label: 'Book Free Audit',
    href: AUDIT_URL,
};

// ---------------------------------------------------------------------------
// Mega menu 1 — Platforms
// ---------------------------------------------------------------------------
// Items without an `href` render as non-clickable "Soon" entries.
// Items with `external: true` open in a new tab.

export const PLATFORMS_COLUMNS = [
    {
        heading: 'Turnkey Industry Systems',
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
                desc: 'Patient records, appointments, and live queue management.',
                href: null, // TODO: add link once the product page is ready
            },
        ],
    },
    {
        heading: 'Ecosystem Platforms',
        items: [
            {
                icon: Radar,
                title: 'Diskobre',
                desc: 'Local business discovery and automated lead generation pipeline.',
                href: 'https://diskobre.com',
                external: true,
            },
            {
                icon: Cloud,
                title: 'Caleho',
                desc: 'High-availability Git-to-cloud deployment and database hosting.',
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
        label: 'Try the Live Demos',
        href: DEMOS_URL,
    },
};

// ---------------------------------------------------------------------------
// Mega menu 2 — Solutions & Engineering
// ---------------------------------------------------------------------------

export const SOLUTIONS_COLUMNS = [
    {
        heading: 'Automation & AI',
        items: [
            {
                icon: Bot,
                title: 'CRM & Pipeline Automation',
                desc: 'Done-for-you GoHighLevel-style workflows, funnels, and lead nurture.',
                href: '/what-we-do#crm-pipeline-automation',
            },
            {
                icon: Workflow,
                title: 'AI API & LLM Integration',
                desc: 'Custom AI agents, OpenAI/Claude pipelines, and internal knowledge bots.',
                href: '/what-we-do#ai-integration',
            },
            {
                icon: Plug,
                title: 'Workflow Orchestration',
                desc: 'Connecting your existing ERP, POS, and marketing tools via custom webhooks.',
                href: '/what-we-do#workflow-orchestration',
            },
        ],
    },
    {
        heading: 'Full-Stack Development',
        items: [
            {
                icon: Database,
                title: 'Custom ERP & CRM Systems',
                desc: 'Tailored operational software built around your exact business rules.',
                href: '/what-we-do#custom-erp-crm',
            },
            {
                icon: Globe,
                title: 'Custom Web Applications',
                desc: 'High-performance portals, SaaS builds, and scalable web platforms.',
                href: '/what-we-do#custom-web-apps',
            },
            {
                icon: Smartphone,
                title: 'Mobile & Desktop Apps',
                desc: 'Cross-platform mobile apps and native desktop/kiosk interfaces.',
                href: '/what-we-do#mobile-desktop-apps',
            },
        ],
    },
    {
        heading: 'Infrastructure & Advisory',
        items: [
            {
                icon: Lightbulb,
                title: 'IT Consultancy & Architecture',
                desc: 'Systems integration, multi-site network design, and digital transformation.',
                href: '/what-we-do#it-consultancy',
            },
            {
                icon: RefreshCw,
                title: 'Legacy System Modernization',
                desc: 'Migrating spreadsheets and outdated software into modern cloud databases.',
                href: '/what-we-do#legacy-modernization',
            },
            {
                icon: ShieldCheck,
                title: 'Security Review & Hardening',
                desc: 'Review and tighten security across your systems and integrations.',
                href: '/what-we-do#security-review',
            },
        ],
    },
];

export const SOLUTIONS_UTILITY_BAR = {
    label: 'Built on Modern Architecture:',
    chips: ['Laravel', 'React', 'Python', 'C#', 'AI APIs', 'Cloud Native'],
    cta: {
        label: 'Request a Custom Architecture Audit',
        href: AUDIT_URL,
    },
};
