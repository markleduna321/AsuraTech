/**
 * What We Do page — all content and config in one file.
 *
 * TODOs are clearly marked. Do NOT invent facts; leave the TODO text.
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
    BarChart3,
    Dumbbell,
    Stethoscope,
    Search,
    Cloud,
} from 'lucide-react';

import { DEMOS } from '@/features/demos/demoData';
import { AUDIT_URL } from '@/features/site/navConfig';

// ---------------------------------------------------------------------------
// Chip row items (in-page navigation)
// ---------------------------------------------------------------------------

export const CHIPS = [
    { key: 'automation-ai', label: 'Automation & AI' },
    { key: 'industry-software', label: 'Industry Software' },
    { key: 'cloud-leads', label: 'Cloud & Leads' },
    { key: 'custom-engineering', label: 'Custom Engineering' },
];

// ---------------------------------------------------------------------------
// Offer blocks (alternate light/dark starting with light)
// ---------------------------------------------------------------------------

const FOOTER_UTM = 'utm_source=asuratech&utm_medium=whatwedo&utm_campaign=block';

export const BLOCKS = [
    {
        id: 'automation-ai',
        theme: 'light',
        headline: 'Automate your pipeline, not your patience.',
        whoItsFor: 'For businesses drowning in manual follow-ups and disconnected CRM tools.',
        cta: { label: 'Start Automating', href: AUDIT_URL },
        cards: [
            {
                id: 'crm-pipeline-automation',
                icon: Bot,
                title: 'CRM & Pipeline Automation',
                desc: 'Done-for-you GoHighLevel-style workflows, funnels, and lead nurture.',
            },
            {
                id: 'ai-integration',
                icon: Workflow,
                title: 'AI API & LLM Integration',
                desc: 'Custom AI agents, OpenAI/Claude pipelines, and internal knowledge bots.',
            },
            {
                id: 'workflow-orchestration',
                icon: Plug,
                title: 'Workflow Orchestration',
                desc: 'Connecting your existing ERP, POS, and marketing tools via custom webhooks.',
            },
        ],
    },
    {
        id: 'industry-software',
        theme: 'dark',
        headline: 'Industry systems that work out of the box.',
        whoItsFor: 'For gyms, clinics, and growing teams who need operations software today.',
        cta: { label: 'Access the Demo Portal', href: '/demos' },
        cards: [
            {
                id: 'hris-payroll',
                icon: BarChart3,
                title: 'HRIS & Payroll',
                desc: DEMOS.find((d) => d.key === 'hris')?.outcome ?? 'TODO: HRIS description',
                demoUrl: DEMOS.find((d) => d.key === 'hris')?.url,
                demoLabel: 'Launch Live Demo',
            },
            {
                id: 'gym-management',
                icon: Dumbbell,
                title: 'Gym Management',
                desc: DEMOS.find((d) => d.key === 'gym')?.outcome ?? 'TODO: Gym description',
                demoUrl: DEMOS.find((d) => d.key === 'gym')?.url,
                demoLabel: 'Launch Live Demo',
            },
            {
                id: 'clinic-booking',
                icon: Stethoscope,
                title: 'Clinic Booking',
                desc: DEMOS.find((d) => d.key === 'clinic')?.outcome ?? 'TODO: Clinic description',
                demoUrl: DEMOS.find((d) => d.key === 'clinic')?.url,
                demoLabel: 'Launch Live Demo',
            },
        ],
    },
    {
        id: 'cloud-leads',
        theme: 'light',
        headline: 'Find leads and host everything, under your brand.',
        whoItsFor: 'For agencies, freelancers, and founders who need pipeline and infrastructure.',
        cta: null, // Each card has its own external CTA
        cards: [
            {
                id: 'diskobre',
                icon: Search,
                title: 'Diskobre.com',
                desc: 'Local business discovery and AI-drafted outreach that fills your pipeline before you automate it.',
                externalUrl: `https://diskobre.com/?${FOOTER_UTM}`,
                externalLabel: 'Explore Diskobre.com',
                accent: 'violet',
            },
            {
                id: 'caleho',
                icon: Cloud,
                title: 'Caleho.cloud',
                desc: 'Deploy straight from GitHub, managed databases, and custom domains from one dashboard.',
                externalUrl: `https://www.caleho.cloud/?${FOOTER_UTM}`,
                externalLabel: 'Deploy on Caleho.cloud',
                accent: 'cyan',
            },
        ],
    },
    {
        id: 'custom-engineering',
        theme: 'dark',
        headline: 'Software built around your exact business rules.',
        whoItsFor: 'For businesses that have outgrown spreadsheets, off-the-shelf tools, or legacy systems.',
        cta: { label: 'Book a Technical Consultation', href: AUDIT_URL },
        cards: [
            {
                id: 'custom-erp-crm',
                icon: Database,
                title: 'Custom ERP & CRM Systems',
                desc: 'Tailored operational software built around your exact business rules.',
            },
            {
                id: 'custom-web-apps',
                icon: Globe,
                title: 'Custom Web Applications',
                desc: 'High-performance portals, SaaS builds, and scalable web platforms.',
            },
            {
                id: 'mobile-desktop-apps',
                icon: Smartphone,
                title: 'Mobile & Desktop Apps',
                desc: 'Cross-platform mobile apps and native desktop/kiosk interfaces.',
            },
            {
                id: 'legacy-modernization',
                icon: RefreshCw,
                title: 'Legacy System Modernization',
                desc: 'Migrating spreadsheets and outdated software into modern cloud databases.',
            },
            {
                id: 'it-consultancy',
                icon: Lightbulb,
                title: 'IT Consultancy & Architecture',
                desc: 'Systems integration, multi-site network design, and digital transformation.',
            },
            {
                id: 'security-review',
                icon: ShieldCheck,
                title: 'Security Review & Hardening',
                desc: 'Review and tighten security across your systems and integrations.',
            },
        ],
    },
];

// ---------------------------------------------------------------------------
// "How we work" process steps
// ---------------------------------------------------------------------------

export const PROCESS_STEPS = [
    {
        key: 'discover',
        title: 'Discover',
        desc: 'TODO: Describe the discovery phase — what we learn and how.',
    },
    {
        key: 'design',
        title: 'Design',
        desc: 'TODO: Describe the design phase — wireframes, architecture, approvals.',
    },
    {
        key: 'build',
        title: 'Build',
        desc: 'TODO: Describe the build phase — sprints, staging, demos.',
    },
    {
        key: 'launch',
        title: 'Launch & Support',
        desc: 'TODO: Describe the launch phase — deployment, training, ongoing support.',
    },
];

// ---------------------------------------------------------------------------
// Tech stack strip
// ---------------------------------------------------------------------------

export const TECH_STACK = ['Laravel', 'React', 'Python', 'C#', 'AI APIs', 'Cloud Native'];
