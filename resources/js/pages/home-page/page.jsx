import React from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import Hero from './_sections/Hero';
import ChoosePath from './_sections/ChoosePath';
import PlatformSection from './_sections/platform/PlatformSection';
import DemoShowcase from './_sections/demos/DemoShowcase';
import EcosystemSection from './_sections/ecosystem/EcosystemSection';
import EngineeringSection from './_sections/engineering/EngineeringSection';
import ConnectSection from './_sections/connect/ConnectSection';
import FinalCtaSection from './_sections/final-cta/FinalCtaSection';
import SiteFooter from '@/components/layout/SiteFooter';
import StickyCta from './_sections/final-cta/StickyCta';

export default function Home(props) {
	return (
		<>
			<Head title="asuraTECH Solutions — Web Development & Business Automation" />

			{/* Full-bleed premium hero */}
			<Hero />

			{/* Choose Your Path — bento grid right below the fold */}
			<ChoosePath />

			{/* All-in-one automation deep dive: stack collapse, feature showcase, value strip */}
			<PlatformSection />

			{/* Live demo showcase: tabbed product launcher with a device stage */}
			<DemoShowcase />

			{/* Ecosystem spotlight: Diskobre.com + Caleho.cloud (CSS-only, no WebGL) */}
			<EcosystemSection />

			{/* Custom engineering: explorable 3D system architecture (ERP, apps, AI, consultancy) */}
			<EngineeringSection />

			{/* How everything connects: four-step pipeline, agencies vs one partner, closing CTAs */}
			<ConnectSection />

			{/* Final CTA: free Systems Audit (lead capture) + instant Demo Portal */}
			<FinalCtaSection />

			<SiteFooter />

			{/* Book Free Audit pill: visible after Section 2, hidden near the final CTA */}
			<StickyCta />
		</>
	);
}

Home.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
