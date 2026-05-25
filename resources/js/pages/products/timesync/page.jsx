import React from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import TimeSyncHero from './_sections/TimeSyncHero';
import TimeSyncFeatures from './_sections/TimeSyncFeatures';
import TimeSyncCTA from './_sections/TimeSyncCTA';

export default function TimeSyncPage() {
    return (
        <>
            <Head title="TimeSync — Online Time Keeping & Payroll System" />

            {/* Product hero */}
            <TimeSyncHero />

            {/* Feature grid */}
            <TimeSyncFeatures />

            {/* Bottom CTA */}
            <TimeSyncCTA />
        </>
    );
}

TimeSyncPage.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
