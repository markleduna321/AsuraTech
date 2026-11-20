import React from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import ChatWidget from '@/components/ui/ChatWidget';

export default function LandingLayout({ children }) {
    // "Plum & Mist" site chrome (header, footer, chat, aurora accents) on every public route; see app.css.
    // Body token overrides stay on the home page's own [data-theme="plum"] wrapper.
    return (
        <div className="min-h-screen bg-black text-gray-900" data-nav-theme="plum">
            <SiteHeader />
            <main className="-mt-[72px]">{children}</main>
            <ChatWidget />
        </div>
    );
}
