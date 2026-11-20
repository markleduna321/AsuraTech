import React from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import SiteFooter from '@/components/layout/SiteFooter';
import GymAsuraHero from './_sections/GymAsuraHero';
import GymAsuraFeatures from './_sections/GymAsuraFeatures';
import GymAsuraCTA from './_sections/GymAsuraCTA';

export default function GymAsuraPage() {
    return (
        <div data-theme="plum" className="bg-black">
            <Head title="GymAsura — Gym Management System" />
            <GymAsuraHero />
            <GymAsuraFeatures />
            <GymAsuraCTA />
            <SiteFooter />
        </div>
    );
}

GymAsuraPage.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
