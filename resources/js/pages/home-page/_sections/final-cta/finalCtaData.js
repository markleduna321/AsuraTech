// Copy only promises what the audit call and demos really deliver (confirmed with the owner).
export const AUDIT = {
    eyebrow: 'Not sure where to start?',
    title: 'Not sure which solution fits your business?',
    offer: 'Schedule a free 15-minute Systems Audit.',
    bullets: [
        'We review your current tools and workflows',
        'We show you what to automate first',
        'You leave with a clear recommendation',
    ],
    submitLabel: 'Book Your Free Audit',
    trustLine: '15 minutes. No obligation. No sales pressure.',
};

export const DEMO_PORTAL = {
    eyebrow: 'Ready to see it in action?',
    title: 'Ready to test drive our software?',
    offer: 'Access our instant Demo Portal.',
    bullets: [
        'HRIS, Gym and Clinic systems in one place',
        'Each demo opens in a new tab, no call needed',
        'Explore at your own pace',
    ],
    label: 'Access the Demo Portal',
    // The portal page (/demos) lists every live demo; it opens in a new tab.
    url: '/demos',
    // Set to { email: '...', password: '...' } if the portal needs a login.
    credentials: null,
};

// Values must match StoreLeadRequest::BUSINESS_TYPES.
export const BUSINESS_TYPES = [
    { value: 'fitness', label: 'Gym or fitness studio' },
    { value: 'healthcare', label: 'Clinic or healthcare' },
    { value: 'professional', label: 'Professional services' },
    { value: 'retail', label: 'Retail or e-commerce' },
    { value: 'agency', label: 'Agency or marketing' },
    { value: 'enterprise', label: 'Enterprise or multi-branch' },
    { value: 'other', label: 'Something else' },
];

