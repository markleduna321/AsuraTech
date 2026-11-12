// Accents are Tailwind palette values (amber-400, cyan-400) as space-separated RGB for rgb(var(--accent) / a).
// Copy only claims what each platform's public site lists; mini-UI numbers are labelled "Sample data".
const UTM = 'utm_source=asuratech&utm_medium=landing&utm_campaign=ecosystem';

export const BRANDS = [
    {
        key: 'diskobre',
        name: 'Diskobre',
        tld: '.com',
        accent: '251 191 36',
        question: 'Need more clients to feed your CRM?',
        pitch: 'Fill your pipeline before you automate it. Diskobre finds local businesses and companies hiring for your services, so every follow-up has someone to talk to.',
        proofs: [
            'Local business discovery by industry and location',
            'Hiring signals from companies that need your services',
            'AI-drafted outreach you review before it sends',
        ],
        cta: 'Explore Diskobre.com',
        href: `https://diskobre.com/?${UTM}`,
    },
    {
        key: 'caleho',
        name: 'Caleho',
        tld: '.cloud',
        accent: '34 211 238',
        question: 'Need fast, reliable infrastructure?',
        pitch: 'Host your sites and apps on infrastructure that stays up. Connect a GitHub repo, attach your domain and add a database from one dashboard.',
        proofs: [
            'Deploy straight from GitHub, with auto-pull on push',
            'Managed databases with one-click export',
            'Custom domains, verified right in the dashboard',
        ],
        cta: 'Deploy on Caleho.cloud',
        href: `https://www.caleho.cloud/?${UTM}`,
    },
];
