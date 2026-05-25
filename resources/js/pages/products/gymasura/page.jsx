import React from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import GymAsuraHero from './_sections/GymAsuraHero';
import GymAsuraFeatures from './_sections/GymAsuraFeatures';
import GymAsuraCTA from './_sections/GymAsuraCTA';

export default function GymAsuraPage() {
    return (
        <>
            <Head title="GymAsura — Gym Management System" />
            <GymAsuraHero />
            <GymAsuraFeatures />
            <GymAsuraCTA />
        </>
    );
}

GymAsuraPage.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
