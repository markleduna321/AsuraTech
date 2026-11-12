// Lightweight analytics hooks: pushes to a GTM-style dataLayer when one exists and always emits a DOM event,
// so any analytics tool can subscribe with window.addEventListener('asura:track', ...).
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORAGE_KEY = 'asura_attribution';

export function track(event, props = {}) {
    if (typeof window === 'undefined') return;
    const detail = { event, ...props };
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent('asura:track', { detail }));
}

function read() {
    try {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

function write(data) {
    try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // Storage can be blocked (private mode); attribution is best-effort.
    }
}

// Keeps the first-seen UTM values for the session so they survive in-page navigation.
export function captureUtm() {
    const params = new URLSearchParams(window.location.search);
    const stored = read();
    const utm = { ...(stored.utm || {}) };
    UTM_KEYS.forEach((key) => {
        const value = params.get(key);
        if (value && !utm[key]) utm[key] = value.slice(0, 100);
    });
    write({ ...stored, utm });
}

export function rememberCtaSource(source) {
    const clean = source.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 50);
    if (clean) write({ ...read(), source: clean });
}

export function getAttribution() {
    const { utm = {}, source } = read();
    return { ...utm, source: source || 'final-cta' };
}
