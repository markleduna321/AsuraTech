/**
 * About page configuration and content.
 * Single source of truth for the About Us page.
 * Unprovided facts are strictly kept as empty arrays (so optional sections hide gracefully).
 */

import { DEMOS } from '@/features/demos/demoData';

// ---------------------------------------------------------------------------
// 2. Our Story (white section)
// ---------------------------------------------------------------------------
export const STORY = {
    eyebrow: 'OUR STORY',
    headline: 'Business software shouldn’t create more work.',
    paragraphs: [
        'Most growing businesses end up with the same setup: one tool for leads, another for follow-up, a spreadsheet for operations, and a hosting account nobody really owns. Each works on its own. Together, they make more work than they remove.',
        'AsuraTECH was built to be the alternative. We built our own lead-generation and hosting platforms and design the systems around them, from turnkey tools to fully custom software. Based in the Philippines, our engineering team works directly with business owners and operations leads to replace fragmented tools with systems that fit how their people actually work.',
    ],
    pullQuote: 'Software should remove work, not add it.',
    link: {
        label: 'See what we build',
        href: '/what-we-do',
    },
};

// Backwards-compatible alias in case anything imports STORY_PARAGRAPHS
export const STORY_PARAGRAPHS = STORY.paragraphs;

// ---------------------------------------------------------------------------
// 3. Our Team (soft-white band)
// Each card: photo, name, role, oneLiner, and social/code links (repo, github, linkedin).
// Leave links as '' (blank) for now — they render as disabled/placeholder pills until filled in.
// ---------------------------------------------------------------------------
export const TEAM_MEMBERS = [
   // {
    //    name: 'Mark Harvey Leduna',
      //  role: 'Founder / Solutions Architect',
        //oneLiner: 'Architects custom ERPs, cloud infrastructure, and end-to-end systems. Cares about eliminating busywork.',
        //photo: null,
        //links: {
          //  repo: '',
           // github: '',
           // linkedin: '',
    //    },
    //},
    {
        name: 'CV Kyle',
        role: 'Founder / UX/UI Designer',
        oneLiner: 'Builds lead generation pipelines and growth campaigns. Cares about turning cold traffic into booked calls.',
        photo: '/./images/kyle.jpg',
        links: {
            repo: 'https://kyledes.caleho.cloud/',
            github: 'https://github.com/ccvk-coder',
            linkedin: 'https://www.linkedin.com/in/christ-vein-cabalida-258562291/',
        },
    },
    {
        name: 'Wacky',
        role: 'Co-Founder / AI & Automation Engineer',
        oneLiner: 'Builds AI agents, LLM pipelines, and webhook automations. Cares about making tools talk to each other.',
        photo: '/./images/wacky.png',
        links: {
            repo: 'https://wakinhojilla.vercel.app/',
            github: 'https://github.com/smalpray',
            linkedin: 'https://www.linkedin.com/in/wacky-hojilla/',
        },
    },
];

// ---------------------------------------------------------------------------
// 4. What We Believe (white section)
// ---------------------------------------------------------------------------
export const PRINCIPLES = [
    {
        title: 'Honest advice, even when it costs us a sale.',
        desc: 'We’ll tell you what you need and what to skip, before you spend anything.',
    },
    {
        title: 'Built for the people who use it.',
        desc: 'A system only works if your staff enjoys it, so we train your team and keep refining after launch.',
    },
    {
        title: 'One partner, start to finish.',
        desc: 'From finding leads to hosting your systems, one team stays accountable for the whole chain.',
    },
];

// ---------------------------------------------------------------------------
// 5. By the Numbers (dark section)
// Add real stats, client logos or testimonials only when verified and permitted.
// ---------------------------------------------------------------------------
export const PROOF_STATS = [
    {
        value: '6',
        label: 'live platforms and systems you can open today',
    },
    {
        value: '3',
        label: 'industry systems with working demos',
    },
];

export const CLIENT_LOGOS = []; // e.g. [{ name: '...', logoUrl: '...' }]
export const TESTIMONIALS = []; // e.g. [{ quote: '...', author: '...', company: '...' }]

// ---------------------------------------------------------------------------
// 6. Live Systems You Can Open Today (soft-white band)
// Cards: name, type and a "Visit live system" link, with no descriptions.
// Only cards with a non-null `url` are rendered.
// ---------------------------------------------------------------------------
export const PRODUCTS_BUILT = [
    {
        name: 'Diskobre.com',
        type: 'Lead generation',
        url: 'https://diskobre.com',
        external: true,
    },
    {
        name: 'Caleho.cloud',
        type: 'Cloud hosting',
        url: 'https://www.caleho.cloud',
        external: true,
    },
    {
        name: 'Business Automation Platform',
        type: 'Sales & marketing automation',
        url: '/what-we-do#automation-ai',
        external: false,
    },
    {
        name: 'HRIS & Payroll System',
        type: 'Live demo, HR & payroll',
        url: DEMOS.find((d) => d.key === 'hris')?.url ?? 'https://demo.asuratechsolutions.com',
        external: true,
    },
    {
        name: 'Gym Management System',
        type: 'Live demo, Gym',
        url: DEMOS.find((d) => d.key === 'gym')?.url ?? 'https://demogym.asuratechsolutions.com',
        external: true,
    },
    {
        name: 'Clinic Booking System',
        type: 'Live demo, Clinic',
        url: DEMOS.find((d) => d.key === 'clinic')?.url ?? 'https://democlinic.asuratechsolutions.com',
        external: true,
    },
];
