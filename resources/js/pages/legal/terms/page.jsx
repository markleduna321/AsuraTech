import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import DarkPageShell, { DocSection } from '@/components/layout/DarkPageShell';
import { CONTACT } from '@/features/site/siteConfig';

// Website terms of use only; client projects are governed by their own signed agreements.
// Have it reviewed by counsel before relying on it.
export default function Terms() {
    return (
        <>
            <Head title="Terms of Use — AsuraTECH Solutions" />
            <DarkPageShell
                eyebrow="Legal"
                title="Terms of Use"
                intro="The ground rules for using this website, its live demos and the chat assistant."
                meta="Last updated: November 12, 2026"
            >
                <DocSection title="About these terms">
                    <p>
                        By using this website you agree to these terms. They cover the website only. Any project, subscription or service we deliver is
                        governed by the separate agreement we sign with you.
                    </p>
                </DocSection>

                <DocSection title="Information on this site">
                    <p>
                        We keep the content accurate and up to date, but it is general information, not a quote or a binding offer. Features, pricing
                        and availability are confirmed in writing before any engagement.
                    </p>
                </DocSection>

                <DocSection title="Live demos">
                    <ul>
                        <li>Demos are shared, public environments. Don’t enter real personal, patient, employee or payment information.</li>
                        <li>Demo data may be reset at any time, and demos may occasionally be unavailable.</li>
                        <li>Demos are for evaluation only and may not be used to run a live business.</li>
                    </ul>
                </DocSection>

                <DocSection title="Chat assistant">
                    <p>
                        The chat assistant is AI-powered and can make mistakes. Treat its answers as a starting point, and confirm anything important with
                        our team. Don’t share passwords or sensitive information in the chat.
                    </p>
                </DocSection>

                <DocSection title="Acceptable use">
                    <p>
                        Don’t misuse the website, its forms, the demos or the chat. This includes sending spam, trying to break or overload our systems,
                        or accessing data that isn’t yours.
                    </p>
                </DocSection>

                <DocSection title="Intellectual property">
                    <p>
                        The website, its design, text and software belong to AsuraTECH Solutions or our licensors. Third-party names mentioned on the
                        site belong to their owners.
                    </p>
                </DocSection>

                <DocSection title="Links to other sites">
                    <p>Links to other websites, including Diskobre.com and Caleho.cloud, are governed by those sites’ own terms and policies.</p>
                </DocSection>

                <DocSection title="Liability">
                    <p>
                        The website and demos are provided “as is”. To the extent the law allows, we aren’t liable for losses that come from using
                        them.
                    </p>
                </DocSection>

                <DocSection title="Privacy and contact">
                    <p>
                        How we handle your data is explained in our <Link href="/privacy">Privacy Policy</Link>. Questions about these terms? Email{' '}
                        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. These terms are governed by the laws of the Philippines.
                    </p>
                </DocSection>
            </DarkPageShell>
        </>
    );
}

Terms.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
