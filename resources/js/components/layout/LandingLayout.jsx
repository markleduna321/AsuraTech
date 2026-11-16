import React from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import ChatWidget from '@/components/ui/ChatWidget';

export default function LandingLayout({ children }) {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <SiteHeader />
            <main>{children}</main>
            <ChatWidget />
        </div>
    );
}
