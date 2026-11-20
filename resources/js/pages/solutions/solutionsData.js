import {
    Bot,
    Database,
    Globe,
    Lightbulb,
    Plug,
    RefreshCw,
    Smartphone,
    Users,
    Workflow,
} from 'lucide-react';
import { AUDIT_URL } from '@/features/site/navConfig';
import { PROCESS_STEPS } from '@/pages/what-we-do/whatWeDoData';

export const SOLUTION_GROUPS = {
    'automation-ai': {
        key: 'automation-ai',
        label: 'Tailored Automation & AI',
        eyebrow: 'SOLUTIONS · TAILORED AUTOMATION & AI',
        title: 'Make your tools work together. Make routine work disappear.',
        description:
            'Connect your sales pipeline, practical AI and business tools around the way your team already works.',
        metaTitle: 'Automation & AI Solutions | AsuraTECH Solutions',
        metaDescription:
            'Explore tailored CRM and sales pipelines, practical AI integrations, and custom tool syncing built around your workflow.',
        intro:
            'When your team copies information between tools or follows up manually, the workflow can be improved. We map the process first, then build around it.',
        services: [
            {
                id: 'crm-sales-pipelines',
                title: 'Tailored CRM & Sales Pipelines',
                shortTitle: 'CRM & sales pipelines',
                icon: Bot,
                description:
                    'Unified inbox (SMS, email, chat), automated follow-ups and funnels mapped to your sales cycle, so no lead slips through.',
                detail:
                    'Bring conversations together and shape follow-ups and funnels around the sales cycle your team uses.',
                problems: [
                    'Sales conversations are spread across SMS, email and chat.',
                    'Leads can be missed when follow-ups depend on memory.',
                    'A standard pipeline does not reflect how your team actually sells.',
                ],
                points: [
                    'Unified SMS, email and chat inbox',
                    'Automated follow-ups',
                    'Funnels mapped to your sales cycle',
                ],
                goodFit: [
                    'Your team handles leads across several channels.',
                    'Follow-ups need to happen consistently.',
                    'Your sales stages need to match your real process.',
                ],
            },
            {
                id: 'ai-integration',
                title: 'Practical AI Integration',
                shortTitle: 'AI integration',
                icon: Workflow,
                description:
                    'Bots and LLM pipelines inside your systems that qualify leads, book appointments and handle routine data.',
                detail:
                    'Put bots and LLM pipelines inside the systems your team already uses for focused, routine tasks.',
                problems: [
                    'Lead qualification takes time away from higher-value work.',
                    'Appointment booking relies on repetitive manual steps.',
                    'Routine data handling slows down existing workflows.',
                ],
                points: [
                    'Lead qualification',
                    'Appointment booking',
                    'Routine data handling',
                ],
                goodFit: [
                    'Your team repeatedly qualifies incoming leads.',
                    'Appointments are booked through a manual process.',
                    'You want AI to assist within existing systems.',
                ],
            },
            {
                id: 'tool-syncing',
                title: 'Tool Syncing',
                shortTitle: 'Tool syncing',
                icon: Plug,
                description:
                    'Your CRM, accounting, POS and databases connected by custom webhooks, so you enter data once.',
                detail:
                    'Connect your CRM, accounting, POS and databases with custom webhooks, so information can move between tools without repeated entry.',
                problems: [
                    'Staff enter the same information into more than one tool.',
                    'Updates in one system have to be copied into another.',
                    'Your tools need a custom connection between them.',
                ],
                points: [
                    'CRM and accounting connections',
                    'POS and database connections',
                    'Custom webhooks between tools',
                ],
                goodFit: [
                    'Your team works across CRM, accounting or POS tools.',
                    'Repeated data entry is part of the daily workflow.',
                    'Your systems need to exchange information.',
                ],
            },
        ],
        process: PROCESS_STEPS,
        faq: [
            {
                question: 'What can a tailored CRM and sales pipeline include?',
                answer:
                    'The solution can bring SMS, email and chat into a unified inbox, then map automated follow-ups and funnels to your sales cycle.',
            },
            {
                question: 'Where does AI fit into existing systems?',
                answer:
                    'Bots and LLM pipelines can be placed inside your systems for tasks such as qualifying leads, booking appointments and handling routine data.',
            },
            {
                question: 'Which tools can be connected?',
                answer:
                    'The current service scope includes CRMs, accounting tools, POS systems and databases, connected with custom webhooks.',
            },
            {
                question: 'How does a project get started?',
                answer:
                    'The process starts with an audit to identify what slows the team down. From there, a tailored workflow blueprint is built before implementation.',
            },
        ],
        relatedTitle: 'One connected workflow',
        relatedSolutions: [
            {
                title: 'Custom Engineering & IT',
                description:
                    'Custom ERP and operational systems, CRM architecture, and full-stack web apps built around your rules and needs.',
                href: '/solutions/custom-engineering',
                icon: Database,
            },
            {
                title: 'Apps, Modernization & IT',
                description:
                    'Mobile and cross-platform apps, legacy modernization, and IT consultancy with network architecture.',
                href: '/solutions/apps-modernization-it',
                icon: Smartphone,
            },
        ],
        cta: {
            title: 'Start with the workflow, not another tool.',
            description:
                'We’ll look at how your team works and help identify what to automate, what to eliminate and which system fits.',
            primary: { label: 'Book a Free Workflow Audit', href: AUDIT_URL },
        },
    },
    'custom-engineering': {
        key: 'custom-engineering',
        label: 'Custom Engineering & IT',
        eyebrow: 'SOLUTIONS · CUSTOM ENGINEERING',
        title: 'Custom systems for the workflows standard tools miss.',
        description:
            'Custom ERP and operational systems, CRM architecture, and full-stack web apps built around your rules and needs.',
        metaTitle: 'Custom Engineering Solutions | AsuraTECH Solutions',
        metaDescription:
            'Explore custom ERP and operational systems, lightweight CRM architecture, and full-stack web apps built around your workflows.',
        intro:
            'Off-the-shelf tools can include features you do not need while missing the workflows that run your company. We build around the rules and work your team needs.',
        services: [
            {
                id: 'custom-erp',
                title: 'Custom ERP & Operational Systems',
                shortTitle: 'Custom ERP & operations',
                icon: Database,
                description: 'Inventory, supply chain, accounting and operations built around your rules.',
                detail:
                    'Build inventory, supply chain, accounting and operational systems around the rules your business uses.',
                problems: [
                    'Off-the-shelf tools can include features you do not need while missing the workflows that run your company.',
                    'Inventory, supply chain, accounting and operations need to follow your rules.',
                    'Standard software may not fit the workflows your company relies on.',
                ],
                points: [
                    'Inventory systems built around your rules',
                    'Supply chain workflows',
                    'Accounting and operations',
                ],
                goodFit: [
                    'You need systems for inventory, supply chain, accounting or operations.',
                    'Your operational rules need to shape how the system works.',
                    'Off-the-shelf software misses workflows your company needs.',
                ],
            },
            {
                id: 'custom-crm',
                title: 'Custom CRM Architecture',
                shortTitle: 'Custom CRM',
                icon: Users,
                description: 'A lightweight, fast CRM when standard ones don’t fit.',
                detail:
                    'Shape a lightweight CRM architecture around your needs when standard CRM tools do not fit.',
                problems: [
                    'Standard CRM tools do not fit your needs.',
                    'You need a CRM that stays lightweight.',
                    'Your CRM needs to be fast and suited to your requirements.',
                ],
                points: [
                    'Lightweight CRM architecture',
                    'A CRM shaped around your needs',
                    'A focus on speed',
                ],
                goodFit: [
                    'Standard CRM tools do not fit.',
                    'You are looking for a lightweight CRM.',
                    'You need a CRM architecture built for speed.',
                ],
            },
            {
                id: 'web-apps',
                title: 'Full-Stack Web Apps',
                shortTitle: 'Full-stack web apps',
                icon: Globe,
                description: 'Customer portals, dashboards and SaaS built for speed and clarity.',
                detail:
                    'Build customer portals, dashboards and SaaS applications with speed and clarity in mind.',
                problems: [
                    'You need a customer portal, dashboard or SaaS application.',
                    'The application needs to prioritize speed and clarity.',
                    'Off-the-shelf tools may miss workflows that are important to your company.',
                ],
                points: [
                    'Customer portals',
                    'Dashboards',
                    'SaaS applications built for speed and clarity',
                ],
                goodFit: [
                    'You need a customer portal or dashboard.',
                    'You are building a SaaS application.',
                    'Speed and clarity are priorities for the application.',
                ],
            },
        ],
        process: PROCESS_STEPS,
        faq: [
            {
                question: 'What can a custom ERP or operational system cover?',
                answer:
                    'The current scope includes inventory, supply chain, accounting and operations, built around your rules.',
            },
            {
                question: 'What if standard CRM tools do not fit?',
                answer:
                    'Custom CRM architecture can provide a lightweight, fast CRM when standard ones do not fit.',
            },
            {
                question: 'What kinds of web apps can you build?',
                answer:
                    'The service covers customer portals, dashboards and SaaS applications built for speed and clarity.',
            },
            {
                question: 'How does a custom engineering project get started?',
                answer:
                    'The process starts with an audit, followed by a tailored workflow blueprint before the system is built, deployed and refined.',
            },
        ],
        relatedTitle: 'Explore custom engineering',
        relatedSolutions: [
            {
                title: 'Tailored Automation & AI',
                description:
                    'CRM and sales pipelines, practical AI integration, and tool syncing built around your workflow.',
                href: '/solutions/automation-ai',
                icon: Bot,
            },
            {
                title: 'Apps, Modernization & IT',
                description:
                    'Mobile and cross-platform apps, legacy modernization, and IT consultancy with network architecture.',
                href: '/solutions/apps-modernization-it',
                icon: Smartphone,
            },
        ],
        cta: {
            title: 'Build around the workflows your company needs.',
            description:
                'We’ll look at your workflow and help identify what to automate, what to eliminate and which system fits.',
            primary: { label: 'Scope Your Custom System', href: AUDIT_URL },
        },
    },
    'apps-modernization-it': {
        key: 'apps-modernization-it',
        label: 'Apps, Modernization & IT',
        eyebrow: 'SOLUTIONS · APPS, MODERNIZATION & IT',
        title: 'Apps and IT shaped around the way your team works.',
        description:
            'Mobile and cross-platform apps, legacy modernization, and IT consultancy with network architecture.',
        metaTitle: 'Apps, Modernization & IT | AsuraTECH Solutions',
        metaDescription:
            'Explore mobile and cross-platform apps, legacy modernization, and IT consultancy with secure network architecture.',
        intro:
            'From Android, iOS and local-network apps to clean cloud databases and secure network design, we help shape technology around your team and its processes.',
        services: [
            {
                id: 'mobile-apps',
                title: 'Mobile & Cross-Platform Apps',
                shortTitle: 'Mobile & cross-platform apps',
                icon: Smartphone,
                description: 'Android, iOS and local-network apps for field teams and customers.',
                detail:
                    'Build Android, iOS and local-network apps for the field teams and customers who use them.',
                problems: [
                    'Field teams or customers need an app for Android or iOS.',
                    'The app needs to support both Android and iOS users.',
                    'A workflow needs an app that operates on a local network.',
                ],
                points: [
                    'Android apps',
                    'iOS apps',
                    'Local-network apps for field teams and customers',
                ],
                goodFit: [
                    'Your field teams need a mobile app.',
                    'You need an app for customers on Android or iOS.',
                    'Your use case calls for a local-network app.',
                ],
            },
            {
                id: 'legacy-modernization',
                title: 'Legacy Modernization',
                shortTitle: 'Legacy modernization',
                icon: RefreshCw,
                description:
                    'Spreadsheets and old software replaced by clean cloud databases, without disrupting your day.',
                detail:
                    'Replace spreadsheets and old software with clean cloud databases while keeping the day-to-day work in mind.',
                problems: [
                    'Important workflows still rely on spreadsheets or old software.',
                    'Existing information needs to move into clean cloud databases.',
                    'Modernization needs to account for the work happening each day.',
                ],
                points: [
                    'Modernization of spreadsheet-based workflows',
                    'Replacement of old software',
                    'Clean cloud databases',
                ],
                goodFit: [
                    'Your team relies on spreadsheets for important workflows.',
                    'You are working with old software that needs modernization.',
                    'You need cloud databases considered as part of the transition.',
                ],
            },
            {
                id: 'it-consultancy',
                title: 'IT Consultancy & Network Architecture',
                shortTitle: 'IT consultancy',
                icon: Lightbulb,
                description:
                    'Honest advice, process audits and secure network design, including what to skip.',
                detail:
                    'Get honest advice through process audits and secure network design, including guidance on what to skip.',
                problems: [
                    'You need an independent view of your processes and technology choices.',
                    'Your team needs a process audit before deciding what to change.',
                    'Network design needs to account for security.',
                ],
                points: [
                    'Honest IT advice',
                    'Process audits',
                    'Secure network design, including what to skip',
                ],
                goodFit: [
                    'You want advice on what to implement and what to skip.',
                    'You need a process audit to inform IT decisions.',
                    'You need secure network design.',
                ],
            },
        ],
        process: PROCESS_STEPS,
        faq: [
            {
                question: 'What platforms can the mobile and cross-platform apps support?',
                answer:
                    'The current service scope includes Android, iOS and local-network apps for field teams and customers.',
            },
            {
                question: 'What does legacy modernization cover?',
                answer:
                    'The service covers replacing spreadsheets and old software with clean cloud databases, without disrupting your day.',
            },
            {
                question: 'What is included in IT consultancy?',
                answer:
                    'The current scope includes honest advice, process audits and secure network design, including what to skip.',
            },
            {
                question: 'How does a project get started?',
                answer:
                    'The process starts with an audit, followed by a tailored blueprint before implementation, deployment, training and refinement.',
            },
        ],
        relatedTitle: 'Explore connected solutions',
        relatedSolutions: [
            {
                title: 'Tailored Automation & AI',
                description:
                    'CRM and sales pipelines, practical AI integration, and tool syncing built around your workflow.',
                href: '/solutions/automation-ai',
                icon: Bot,
            },
            {
                title: 'Custom Engineering & IT',
                description:
                    'Custom ERP and operational systems, CRM architecture, and full-stack web apps built around your rules and needs.',
                href: '/solutions/custom-engineering',
                icon: Database,
            },
        ],
        cta: {
            title: 'Start with an honest look at your IT needs.',
            description:
                'We’ll review your processes and technology needs, then help identify what fits and what to skip.',
            primary: { label: 'Book a Free Workflow Audit', href: AUDIT_URL },
        },
    },
};

