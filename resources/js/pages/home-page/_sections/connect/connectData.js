// Monochrome Plum & Mist accents as space-separated RGB for rgb(var(--accent) / a).
// All clear 3:1 as icon colors on the light node/glass: plum-500, plum-600, mauve-700, plum-900.
export const STEPS = [
    {
        key: 'leads',
        title: 'Generate Leads',
        benefit: 'Fill your pipeline with the right prospects.',
        accent: '131 80 174',
        links: [{ label: 'Diskobre.com', href: '#ecosystem' }],
    },
    {
        key: 'nurture',
        title: 'Capture & Nurture',
        benefit: 'Every lead followed up instantly, by SMS, email and AI chat.',
        accent: '106 52 151',
        links: [{ label: 'Automation & AI', href: '#platform' }],
    },
    {
        key: 'operations',
        title: 'Manage Operations',
        benefit: 'Run the business on a system built for it, off-the-shelf or custom.',
        accent: '91 80 102',
        links: [
            { label: 'HRIS · Gym · Clinic', href: '#demos' },
            { label: 'Custom ERP', href: '#engineering' },
        ],
    },
    {
        key: 'scale',
        title: 'Scale Securely',
        benefit: 'Grow on infrastructure that stays fast and protected.',
        accent: '43 2 74',
        links: [
            { label: 'Caleho.cloud', href: '#ecosystem' },
            { label: 'IT Consultancy', href: '#engineering' },
        ],
    },
];

export const COMPARISON = [
    { agencies: '4 contracts, 4 invoices', partner: 'One relationship, one invoice' },
    { agencies: 'Tools that don’t talk to each other', partner: 'Systems built to connect' },
    { agencies: 'You are the project manager', partner: 'We handle the integration' },
    { agencies: 'Finger-pointing when something breaks', partner: 'One team accountable end to end' },
];
