/**
 * What We Do page — all content and config in one file.
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
    BarChart3,
    Dumbbell,
    Stethoscope,
    Search,
    Cloud,
} from 'lucide-react';

import { DEMOS } from '@/features/demos/demoData';
import { AUDIT_URL, DEMOS_URL } from '@/features/site/navConfig';

// ---------------------------------------------------------------------------
// Chip row items (in-page navigation)
// ---------------------------------------------------------------------------

export const CHIPS = [
    { key: 'automation-ai', label: 'Tailored Automation & AI' },
    { key: 'turnkey-systems', label: 'Turnkey Systems' },
    { key: 'proprietary-platforms', label: 'Proprietary Platforms' },
    { key: 'custom-engineering', label: 'Custom Engineering & IT' },
];

// ---------------------------------------------------------------------------
// Offer blocks (alternating dark & light starting with dark)
// ---------------------------------------------------------------------------

const FOOTER_UTM = 'utm_source=asuratech&utm_medium=whatwedo&utm_campaign=block';

export const BLOCKS = [
    {
        id: 'automation-ai',
        theme: 'dark',
        headline: 'Automation built around your workflow, not the other way around',
        whoItsFor: 'If your team still copies data between tools, the system is broken. We map your bottlenecks and automate them away.',
        cta: { label: 'Book a Free Workflow Audit', href: AUDIT_URL },
        cards: [
            {
                id: 'crm-pipeline-automation',
                icon: Bot,
                title: 'Tailored CRM & Sales Pipelines',
                desc: 'Unified inbox (SMS, email, chat), automated follow-ups and funnels mapped to your sales cycle, so no lead slips through.',
                solutionHref: '/solutions/automation-ai#crm-sales-pipelines',
            },
            {
                id: 'ai-integration',
                icon: Workflow,
                title: 'Practical AI Integration',
                desc: 'Bots and LLM pipelines inside your systems that qualify leads, book appointments and handle routine data.',
                solutionHref: '/solutions/automation-ai#ai-integration',
            },
            {
                id: 'workflow-orchestration',
                icon: Plug,
                title: 'Tool Syncing',
                desc: 'Your CRM, accounting, POS and databases connected by custom webhooks, so you enter data once.',
                solutionHref: '/solutions/automation-ai#tool-syncing',
            },
        ],
    },
    {
        id: 'turnkey-systems',
        theme: 'light',
        headline: 'Proven systems, ready now, tailored to you',
        whoItsFor: 'Test-drive our live systems. We deploy the core fast, then tailor the rules to your operations.',
        cta: { label: 'Request a Guided Walkthrough', href: AUDIT_URL },
        cards: [
            {
                id: 'hris-payroll',
                icon: BarChart3,
                title: 'HRIS & Automated Payroll',
                desc: 'Attendance, shifts, leave and payroll in a few clicks.',
                demoUrl: DEMOS.find((d) => d.key === 'hris')?.url,
                demoLabel: 'Launch HRIS Live Demo',
            },
            {
                id: 'gym-management',
                icon: Dumbbell,
                title: 'Gym & Fitness Management',
                desc: 'Renewals, billing reminders, check-ins and trainer schedules on autopilot.',
                demoUrl: DEMOS.find((d) => d.key === 'gym')?.url,
                demoLabel: 'Launch Gym Live Demo',
            },
            {
                id: 'clinic-booking',
                icon: Stethoscope,
                title: 'Clinic Booking & Patient Queue',
                desc: 'Online booking, SMS reminders, doctor queues and patient records (EMR).',
                demoUrl: DEMOS.find((d) => d.key === 'clinic')?.url,
                demoLabel: 'Launch Clinic Live Demo',
            },
        ],
    },
    {
        id: 'proprietary-platforms',
        theme: 'dark',
        headline: 'In-house platforms built to fuel your growth',
        whoItsFor: 'Software is only as good as the leads feeding it and the servers running it, so we built platforms for both.',
        cta: null, // Each card has its own external CTA
        cards: [
            {
                id: 'diskobre',
                icon: Search,
                title: 'Diskobre.com',
                desc: 'B2B lead generation that finds high-intent businesses and feeds them into your pipeline.',
                externalUrl: `https://diskobre.com/?${FOOTER_UTM}`,
                externalLabel: 'Explore Diskobre.com',
                accent: 'violet',
            },
            {
                id: 'caleho',
                icon: Cloud,
                title: 'Caleho.cloud',
                desc: 'Fast, isolated web and app hosting with automated deployment.',
                externalUrl: `https://www.caleho.cloud/?${FOOTER_UTM}`,
                externalLabel: 'Deploy on Caleho.cloud',
                accent: 'cyan',
            },
        ],
    },
    {
        id: 'custom-engineering',
        theme: 'light',
        headline: 'Custom ERP, software and infrastructure, zero bloat',
        whoItsFor: 'Off-the-shelf tools make you pay for 100 features while missing the 3 workflows that run your company. We build only what you need.',
        cta: { label: 'Scope Your Custom System', href: AUDIT_URL },
        cards: [
            {
                id: 'custom-erp',
                icon: Database,
                title: 'Custom ERP & Operational Systems',
                desc: 'Inventory, supply chain, accounting and operations built around your rules.',
                solutionHref: '/solutions/custom-engineering#custom-erp',
            },
            {
                id: 'custom-crm',
                icon: Users,
                title: 'Custom CRM Architecture',
                desc: 'A lightweight, fast CRM when standard ones don’t fit.',
                solutionHref: '/solutions/custom-engineering#custom-crm',
            },
            {
                id: 'custom-web-apps',
                icon: Globe,
                title: 'Full-Stack Web Apps',
                desc: 'Customer portals, dashboards and SaaS built for speed and clarity.',
                solutionHref: '/solutions/custom-engineering#web-apps',
            },
            {
                id: 'mobile-desktop-apps',
                icon: Smartphone,
                title: 'Mobile & Cross-Platform Apps',
                desc: 'Android, iOS and local-network apps for field teams and customers.',
                solutionHref: '/solutions/apps-modernization-it#mobile-apps',
            },
            {
                id: 'legacy-modernization',
                icon: RefreshCw,
                title: 'Legacy Modernization',
                desc: 'Spreadsheets and old software replaced by clean cloud databases, without disrupting your day.',
                solutionHref: '/solutions/apps-modernization-it#legacy-modernization',
            },
            {
                id: 'it-consultancy',
                icon: Lightbulb,
                title: 'IT Consultancy & Network Architecture',
                desc: 'Honest advice, process audits and secure network design, including what to skip.',
                solutionHref: '/solutions/apps-modernization-it#it-consultancy',
            },
        ],
    },
];

// ---------------------------------------------------------------------------
// Methodology steps ("We fix the process first. Then we automate it.")
// ---------------------------------------------------------------------------

export const PROCESS_STEPS = [
    {
        key: 'audit',
        num: '01',
        title: 'Process audit',
        desc: 'We find what slows you down and tell you what to skip before you spend a peso.',
    },
    {
        key: 'blueprint',
        num: '02',
        title: 'Tailored blueprint',
        desc: 'A simplified workflow designed around your team’s real habits.',
    },
    {
        key: 'build',
        num: '03',
        title: 'Build & automate',
        desc: 'Turnkey systems, CRM pipelines or a custom ERP, built to remove repetitive work.',
    },
    {
        key: 'deploy',
        num: '04',
        title: 'Deploy, train & refine',
        desc: 'We launch, train your staff and refine based on real results.',
    },
];

// ---------------------------------------------------------------------------
// Closing CTA section
// ---------------------------------------------------------------------------

export const CLOSING_CTA = {
    headline: 'Tired of software that creates more work instead of eliminating it?',
    sub: 'Let’s look at your workflow. We’ll tell you honestly what to automate, what to eliminate and which system fits.',
    primary: { label: 'Book a Free Workflow Audit', href: AUDIT_URL },
    secondary: { label: 'Test-Drive Our Live Demos', href: DEMOS_URL },
};

// ---------------------------------------------------------------------------
// Tech stack strip
// ---------------------------------------------------------------------------

export const TECH_STACK = ['Laravel', 'React', 'Python', 'C#', 'AI APIs', 'Cloud Native'];
