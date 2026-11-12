// Generic tool categories only (no competitor names or logos). x/y are fractions of the stage, centred on the core.
export const STACK_TOOLS = [
    { label: 'Funnel Builder', price: 97, x: -0.37, y: -0.27 },
    { label: 'Email Tool', price: 79, x: -0.1, y: -0.34 },
    { label: 'SMS Tool', price: 65, x: 0.17, y: -0.27 },
    { label: 'CRM', price: 129, x: 0.37, y: -0.05 },
    { label: 'Scheduler', price: 29, x: 0.29, y: 0.22 },
    { label: 'Review Manager', price: 149, x: 0.05, y: 0.34 },
    { label: 'Chatbot', price: 99, x: -0.2, y: 0.27 },
    { label: 'Unified Inbox', price: 59, x: -0.38, y: 0.08 },
    { label: 'Workflow Automation', price: 99, x: -0.2, y: -0.07 },
    { label: 'Form Builder', price: 39, x: 0.16, y: 0.09 },
];

export const STACK_TOTAL = STACK_TOOLS.reduce((sum, tool) => sum + tool.price, 0);

// Set to a string such as '$297/mo' to show a real price on the platform card.
export const PLATFORM_PRICE = null;

export const PLATFORM_INCLUDES = ['Funnels', 'Email & SMS', 'CRM', 'Booking', 'Reviews', 'AI Chat'];

export const FEATURES = [
    { key: 'nurture', title: 'Lead Nurture', benefit: 'Every lead gets a reply in under a minute, then follow-ups for days.' },
    { key: 'pipeline', title: 'Pipeline & CRM', benefit: 'See every deal and its next step without chasing spreadsheets.' },
    { key: 'booking', title: 'Appointment Booking', benefit: 'Prospects book themselves straight into your calendar.' },
    { key: 'reputation', title: 'Reputation Management', benefit: 'Happy customers become five-star reviews on autopilot.' },
    { key: 'bots', title: 'AI Conversation Bots', benefit: 'An AI assistant answers questions and books calls around the clock.' },
];

export const VALUE_POINTS = [
    { value: '1', unit: 'login', label: 'Every tool behind one dashboard' },
    { value: '<60', unit: 'sec', label: 'First reply to every new lead' },
    { value: '24/7', unit: '', label: 'AI answers while you sleep' },
    { value: `$${STACK_TOTAL}`, unit: '/mo', label: 'Typical tool spend replaced' },
];
