import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);
    return matches;
}

export function usePrefersReducedMotion() {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}

// Flips to true once the element enters the viewport (falls back to true without IntersectionObserver).
export function useInViewOnce(ref, { threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || !('IntersectionObserver' in window)) {
            setInView(true);
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold, rootMargin },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [ref, threshold, rootMargin]);
    return inView;
}

// Soft cursor spotlight: feeds pointer position into the .glass-panel radial gradient.
export function trackSpotlight(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const smoothstep = (a, b, v) => {
    const t = clamp01((v - a) / (b - a));
    return t * t * (3 - 2 * t);
};
