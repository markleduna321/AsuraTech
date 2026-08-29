import React from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import Hero from './_sections/Hero';
import Stats from './_sections/Stats';
import TechStack from './_sections/TechStack';
import Services from './_sections/Services';
import FeaturedProject from './_sections/FeaturedProject';
import Contact from './_sections/Contact';
import Footer from './_sections/Footer';

export default function Home(props) {
	return (
		<>
			<Head title="asuraTECH Solutions — Web Development & Business Automation" />

			{/* Full-bleed premium hero */}
			<Hero />

			{/* Proven Results — 4 metric cards */}
			<Stats />

			{/* Tech expertise ribbon */}
			<TechStack />

			{/* Services grouped by category */}
			<section id="services" aria-labelledby="services-heading" className="py-16 md:py-24 bg-gray-50 dark:bg-slate-950">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 id="services-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
							Websites that work — automation that never sleeps
						</h2>
						<p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
							We build fast, modern websites and connect them to automated workflows that capture leads and follow up for you.
						</p>
					</div>
					<Services />
				</div>
			</section>

			{/* Featured case study */}
			<FeaturedProject />

			{/* Contact CTA */}
			<Contact />

			{/* Footer */}
			<Footer />
		</>
	);
}

Home.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
