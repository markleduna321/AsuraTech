/**
 * About page configuration and content.
 * Single source of truth for the About Us page.
 * Unprovided facts are strictly kept as TODO placeholders.
 */

// ---------------------------------------------------------------------------
// Our Story (2-3 short paragraphs, TODO placeholder copy)
// ---------------------------------------------------------------------------
export const STORY_PARAGRAPHS = [
    'TODO: Paragraph 1 — Founded with the mission to help modern businesses stop duct-taping disconnected software tools together and instead operate on a single, coherent technology backbone.',
    'TODO: Paragraph 2 — Describe the background of AsuraTECH, the problems seen across growing companies managing multiple disparate subscriptions, and how our unified approach transforms operational efficiency.',
    'TODO: Paragraph 3 — Describe the vision forward: uniting custom full-stack engineering, specialized SaaS platforms, and intelligent automated workflows under one roof.',
];

// ---------------------------------------------------------------------------
// What We Believe (3-4 principle cards)
// ---------------------------------------------------------------------------
export const PRINCIPLES = [
    {
        title: 'TODO: Principle 1 Title',
        desc: 'TODO: Principle 1 description — One partner is better than five disconnected agencies.',
    },
    {
        title: 'TODO: Principle 2 Title',
        desc: 'TODO: Principle 2 description — Automation should serve people, not replace thoughtful strategy.',
    },
    {
        title: 'TODO: Principle 3 Title',
        desc: 'TODO: Principle 3 description — Architecture must be secure, maintainable, and built to scale.',
    },
    {
        title: 'TODO: Principle 4 Title',
        desc: 'TODO: Principle 4 description — Transparent delivery, no black boxes, full ownership stays with you.',
    },
];

// ---------------------------------------------------------------------------
// Team members (data-driven with placeholder avatars and TODO names)
// ---------------------------------------------------------------------------
export const TEAM_MEMBERS = [
    {
        name: 'TODO: Team Member 1',
        role: 'Founder & Systems Architect',
        oneLiner: 'TODO: One-line bio describing background and focus.',
        photo: null, // placeholder avatar rendered when null
    },
    {
        name: 'TODO: Team Member 2',
        role: 'Lead Full-Stack Engineer',
        oneLiner: 'TODO: One-line bio describing engineering expertise.',
        photo: null,
    },
    {
        name: 'TODO: Team Member 3',
        role: 'Automation & AI Specialist',
        oneLiner: 'TODO: One-line bio describing pipeline and AI workflow work.',
        photo: null,
    },
];

// ---------------------------------------------------------------------------
// Proof Section data
// Per specification: only render if real data exists. Empty arrays hide the section.
// NEVER invent numbers, clients, or quotes.
// ---------------------------------------------------------------------------
export const PROOF_STATS = []; // e.g. [{ label: '...', value: '...' }]
export const CLIENT_LOGOS = []; // e.g. [{ name: '...', logoUrl: '...' }]
export const TESTIMONIALS = []; // e.g. [{ quote: '...', author: '...', company: '...' }]

// ---------------------------------------------------------------------------
// Products We Built (linking to Diskobre.com, Caleho.cloud, and Demos)
// ---------------------------------------------------------------------------
export const PRODUCTS_BUILT = [
    {
        name: 'Diskobre.com',
        type: 'Lead Generation Platform',
        desc: 'Local business discovery and automated outreach pipeline.',
        url: 'https://diskobre.com',
        external: true,
        accent: 'violet',
    },
    {
        name: 'Caleho.cloud',
        type: 'Cloud Hosting & Infrastructure',
        desc: 'High-availability Git-to-cloud deployment and database hosting.',
        url: 'https://www.caleho.cloud',
        external: true,
        accent: 'cyan',
    },
    {
        name: 'TimeSync',
        type: 'Turnkey Industry System',
        desc: 'Complete HRIS, biometric attendance, and BIR-compliant payroll.',
        url: 'https://demo.asuratechsolutions.com',
        external: true,
        accent: 'blue',
    },
    {
        name: 'GymAsura',
        type: 'Turnkey Industry System',
        desc: 'Automated memberships, door access tracking, and class scheduling.',
        url: 'https://demogym.asuratechsolutions.com',
        external: true,
        accent: 'blue',
    },
    {
        name: 'Clinic System',
        type: 'Turnkey Industry System',
        desc: 'Patient records, appointments, and live queue management.',
        url: 'https://democlinic.asuratechsolutions.com',
        external: true,
        accent: 'blue',
    },
];
