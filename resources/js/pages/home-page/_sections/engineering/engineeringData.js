// Each offer maps to one zone of the architecture scene (and the SVG fallback).
export const OFFERS = [
    {
        key: 'erp',
        title: 'Custom ERP & CRM',
        outcome: 'Modules built around your exact operations.',
        chips: ['Finance', 'Inventory', 'HR'],
        caption: 'ERP core: Finance, HR, Inventory and Sales modules on one shared database.',
    },
    {
        key: 'apps',
        title: 'Web & Mobile Apps',
        outcome: 'Portals and apps that run on your live business data.',
        chips: ['Web apps', 'Mobile apps', 'Client portals'],
        caption: 'App layer: a web panel and a mobile app, both reading and writing to the core.',
    },
    {
        key: 'ai',
        title: 'AI API Integration',
        outcome: 'AI that works inside your tools, grounded in your data.',
        chips: ['OpenAI', 'Claude', 'Custom LLMs', 'Internal tools', 'Your databases'],
        caption: 'AI layer: model APIs connected to your database and apps.',
    },
    {
        key: 'consult',
        title: 'IT Consultancy',
        outcome: 'Architecture guidance before you commit budget.',
        chips: ['Architecture reviews', 'Stack audits', 'Roadmaps'],
        caption: 'Full architecture: the security shell around every layer of the system.',
    },
];

export const TRUST = [
    { title: 'Security-first architecture', detail: 'Role-based access and least-privilege by default.' },
    { title: 'Integrates with your existing stack', detail: 'APIs, databases and the tools you already run.' },
    { title: 'Documented and handed over', detail: 'Source, docs and credentials stay with you.' },
];

export const PRIMARY_CTA = { label: 'Book a Technical Consultation', href: '#get-started' };
export const SECONDARY_CTA = { label: 'See how we work', href: '#connected' };
