import React from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import SiteFooter from '@/components/layout/SiteFooter';
import TimeSyncHero from './_sections/TimeSyncHero';
import TimeSyncFeatures from './_sections/TimeSyncFeatures';
import TimeSyncCTA from './_sections/TimeSyncCTA';

export default function TimeSyncPage() {
    return (
        <div data-theme="plum" className="bg-black">
            <Head title="TimeSync — Online Time Keeping & Payroll System" />

            {/* Product hero (black band) */}
            <TimeSyncHero />

            {/* Feature grid (mauve band) */}
            <TimeSyncFeatures />

            {/* Bottom CTA (plum-900 band) */}
            <TimeSyncCTA />

            <SiteFooter />
        </div>
    );
}

TimeSyncPage.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
