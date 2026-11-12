// Accents reuse the earlier sections as space-separated RGB for rgb(var(--accent) / a):
// amber-400 (Diskobre), indigo-400 (automation platform), slate-300 (neutral), cyan-400 (Caleho).
export const STEPS = [
    {
        key: 'leads',
        title: 'Generate Leads',
        benefit: 'Fill your pipeline with the right prospects.',
        accent: '251 191 36',
        links: [{ label: 'Diskobre.com', href: '#ecosystem' }],
    },
    {
        key: 'nurture',
        title: 'Capture & Nurture',
        benefit: 'Every lead followed up instantly, by SMS, email and AI chat.',
        accent: '129 140 248',
        links: [{ label: 'Automation & AI', href: '#platform' }],
    },
    {
        key: 'operations',
        title: 'Manage Operations',
        benefit: 'Run the business on a system built for it, off-the-shelf or custom.',
        accent: '203 213 225',
        links: [
            { label: 'HRIS · Gym · Clinic', href: '#demos' },
            { label: 'Custom ERP', href: '#engineering' },
        ],
    },
    {
        key: 'scale',
        title: 'Scale Securely',
        benefit: 'Grow on infrastructure that stays fast and protected.',
        accent: '34 211 238',
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
