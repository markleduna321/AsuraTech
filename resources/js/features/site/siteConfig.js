// Site-wide contact details and footer links, shared by the home page and inner pages.
export const CONTACT = {
    email: 'cv@asuratechsolutions.com',
    phone: '+63 995 982 2419',
    phoneHref: 'tel:+639959822419',
    location: 'Philippines',
};

const FOOTER_UTM = 'utm_source=asuratech&utm_medium=landing&utm_campaign=footer';

// '#' anchors point at home page sections; SiteFooter renders them through SectionLink, which prefixes '/' on other pages.
export const FOOTER_COLUMNS = [
    {
        title: 'Solutions',
        links: [
            { label: 'Business Automation', href: '#platform' },
            { label: 'HRIS & Payroll', href: '/demos' },
            { label: 'Gym Management', href: '/demos' },
            { label: 'Clinic Management', href: '/demos' },
            { label: 'Custom Engineering', href: '/solutions/custom-engineering' },
        ],
    },
    {
        title: 'Ecosystem',
        links: [
            { label: 'Diskobre.com', href: `https://diskobre.com/?${FOOTER_UTM}`, external: true },
            { label: 'Caleho.cloud', href: `https://www.caleho.cloud/?${FOOTER_UTM}`, external: true },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: `mailto:${CONTACT.email}` },
            { label: 'Book a Systems Audit', href: '#get-started' },
        ],
    },
];

export const LEGAL_LINKS = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
];
