// Tints come from the Tailwind palette (blue-400, orange-400, teal-400) and drive the per-tab glow.
export const DEMOS = [
    {
        key: 'hris',
        tab: 'HRIS & Payroll',
        product: 'TimeSync',
        eyebrow: 'HRIS & Payroll',
        outcome: 'Run payroll in minutes, not days.',
        bullets: [
            'Attendance flows straight into payroll, no spreadsheets',
            'BIR-compliant deductions calculated for you',
            'Shifts scheduled around real-time team availability',
        ],
        launchLabel: 'Launch HRIS Live Demo',
        url: 'https://demo.asuratechsolutions.com',
        domain: 'demo.asuratechsolutions.com',
        tint: { css: '96 165 250', gl: [0.376, 0.647, 0.98] },
        // Set to { email: '...', password: '...' } to show a copyable login chip next to the button.
        credentials: null,
    },
    {
        key: 'gym',
        tab: 'Gym',
        product: 'GymAsura',
        eyebrow: 'Gym Management',
        outcome: 'Bill members automatically, fill every class.',
        bullets: [
            'Memberships renew and charge on schedule',
            'Members book classes and you see capacity live',
            'Check-ins and attendance tracked at the door',
        ],
        launchLabel: 'Launch Gym Live Demo',
        url: 'https://demogym.asuratechsolutions.com',
        domain: 'demogym.asuratechsolutions.com',
        tint: { css: '251 146 60', gl: [0.984, 0.573, 0.235] },
        credentials: null,
    },
    {
        key: 'clinic',
        tab: 'Clinic',
        product: 'Clinic System',
        eyebrow: 'Clinic Management',
        outcome: 'Fewer no-shows, shorter queues.',
        bullets: [
            'Automatic reminders before every appointment',
            'Patients book online and join a live queue',
            'Records and visit history in one place',
        ],
        launchLabel: 'Launch Clinic Live Demo',
        url: 'https://democlinic.asuratechsolutions.com',
        domain: 'democlinic.asuratechsolutions.com',
        tint: { css: '45 212 191', gl: [0.176, 0.831, 0.749] },
        credentials: null,
    },
];

// Left blank on purpose: set a booking URL to show the quiet "Book a walkthrough" link.
export const WALKTHROUGH_URL = null;

// Optional line under the launch button. Only set it once the claim is verified for every demo.
export const TRUST_LINE = null;

export const ROTATE_MS = 8000;
