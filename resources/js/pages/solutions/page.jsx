import { useCallback, useEffect, useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import SiteFooter from '@/components/layout/SiteFooter';
import {
    ClosingCta,
    FaqSection,
    NotFoundState,
    ProcessSection,
    RelatedSolutions,
    ServiceSection,
    SolutionHero,
    SolutionTabs,
} from './_sections/SolutionSections';
import { SOLUTION_GROUPS } from './solutionsData';

function SolutionsPage({ group }) {
    const solutionGroup = typeof group === 'string' ? SOLUTION_GROUPS[group] : undefined;
    const [activeId, setActiveId] = useState(solutionGroup?.services[0]?.id ?? '');
    const [highlightedId, setHighlightedId] = useState('');
    const highlightTimer = useRef(null);

    const highlightService = useCallback((id) => {
        setHighlightedId(id);
        window.clearTimeout(highlightTimer.current);
        highlightTimer.current = window.setTimeout(() => setHighlightedId(''), 1900);
    }, []);

    useEffect(() => {
        if (!solutionGroup) return undefined;

        const scrollToHash = () => {
            let id;
            try {
                id = decodeURIComponent(window.location.hash.slice(1));
            } catch {
                return;
            }
            const target = solutionGroup.services.find((service) => service.id === id);
            if (!target) return;

            const element = document.getElementById(target.id);
            if (element) {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
                setActiveId(target.id);
                highlightService(target.id);
            }
        };

        const initialHashTimer = window.setTimeout(scrollToHash, 0);
        window.addEventListener('hashchange', scrollToHash);
        return () => {
            window.clearTimeout(initialHashTimer);
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, [highlightService, solutionGroup]);

    useEffect(() => {
        if (!solutionGroup || !('IntersectionObserver' in window)) return undefined;

        const sections = solutionGroup.services
            .map((service) => document.getElementById(service.id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visibleEntry) setActiveId(visibleEntry.target.id);
            },
            { rootMargin: '-132px 0px -58% 0px', threshold: [0.05, 0.25, 0.5] }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [solutionGroup]);

    useEffect(
        () => () => window.clearTimeout(highlightTimer.current),
        []
    );

    const handleTabNavigate = (id) => {
        setActiveId(id);
        highlightService(id);
    };

    return (
        <div data-theme="plum" className="bg-black text-mist">
            <Head>
                <title>{solutionGroup?.metaTitle ?? 'Solutions | AsuraTECH Solutions'}</title>
                <meta
                    name="description"
                    content={
                        solutionGroup?.metaDescription ??
                        'This solution group is not available. Explore AsuraTECH Solutions to find a service that fits your workflow.'
                    }
                />
            </Head>

            {solutionGroup ? (
                <>
                    <SolutionHero group={solutionGroup} />
                    <SolutionTabs group={solutionGroup} activeId={activeId} onNavigate={handleTabNavigate} />
                    <div id="solutions-content">
                        {solutionGroup.services.map((service, index) => (
                            <ServiceSection
                                key={service.id}
                                service={service}
                                index={index}
                                highlighted={highlightedId === service.id}
                            />
                        ))}
                        <ProcessSection steps={solutionGroup.process} />
                        <FaqSection group={solutionGroup} />
                        <RelatedSolutions group={solutionGroup} />
                        <ClosingCta group={solutionGroup} />
                    </div>
                </>
            ) : (
                <div>
                    <div aria-hidden="true" className="h-[72px] bg-black" />
                    <NotFoundState />
                </div>
            )}

            <SiteFooter />
        </div>
    );
}

SolutionsPage.layout = (page) => <LandingLayout>{page}</LandingLayout>;

export default SolutionsPage;
