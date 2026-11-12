import { Head } from '@inertiajs/react';
import LandingLayout from '@/components/layout/LandingLayout';
import DarkPageShell, { DocSection } from '@/components/layout/DarkPageShell';
import { CONTACT } from '@/features/site/siteConfig';

// Describes only what the site actually collects (audit form, chat widget, session attribution).
// Have it reviewed by counsel before relying on it for compliance.
export default function PrivacyPolicy() {
    const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;

    return (
        <>
            <Head title="Privacy Policy — AsuraTECH Solutions" />
            <DarkPageShell
                eyebrow="Legal"
                title="Privacy Policy"
                intro="What we collect when you use this website, why we collect it, and the choices you have."
                meta="Last updated: November 12, 2026"
            >
                <DocSection title="Who we are">
                    <p>
                        AsuraTECH Solutions (“we”, “us”) is based in the {CONTACT.location} and operates this website. For any privacy question or
                        request, email {mail} or call <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
                    </p>
                </DocSection>

                <DocSection title="What we collect">
                    <ul>
                        <li>
                            <strong className="text-white">Systems Audit form:</strong> your name, work email, business type, the optional “what are you
                            trying to fix?” note, the time you gave consent, and which page section or campaign link (UTM parameters) brought you to the
                            form.
                        </li>
                        <li>
                            <strong className="text-white">Chat assistant:</strong> the messages you type. If you share your contact details in the
                            chat, we save them together with the conversation so we can follow up.
                        </li>
                        <li>
                            <strong className="text-white">Technical data:</strong> like most websites, our server records your IP address and
                            browser details (user agent) with your visit session, and uses your IP address to limit repeated form and chat
                            submissions. Campaign and section information is kept in your browser’s session storage and cleared when you close the tab.
                        </li>
                    </ul>
                    <p>We don’t ask for payment details or sensitive personal information on this website.</p>
                </DocSection>

                <DocSection title="Cookies">
                    <p>
                        We only use cookies the website needs to work: a session cookie that keeps your visit together, and a security token that
                        protects forms from cross-site request forgery. Session records expire after a period of inactivity. We don’t use
                        advertising cookies.
                    </p>
                </DocSection>

                <DocSection title="How we use it">
                    <ul>
                        <li>To arrange and run the Systems Audit or answer the question you asked.</li>
                        <li>To send you a confirmation email and follow up about your request.</li>
                        <li>To understand which parts of the website and which campaigns bring in enquiries.</li>
                        <li>To protect the website from spam and abuse.</li>
                    </ul>
                    <p>We don’t sell your personal information, and we don’t add you to marketing lists without asking.</p>
                </DocSection>

                <DocSection title="Who we share it with">
                    <p>We only share data with services that help us run the website, and only for the purposes above:</p>
                    <ul>
                        <li>Chat messages are sent to OpenAI to generate the assistant’s replies.</li>
                        <li>Our email provider delivers the confirmation email.</li>
                        <li>Our hosting provider stores the website and its database.</li>
                    </ul>
                    <p>We may also disclose information when the law requires it.</p>
                </DocSection>

                <DocSection title="How long we keep it">
                    <p>
                        We keep enquiry details for as long as we need them to respond and follow up, or to meet legal obligations. You can ask us to
                        delete them at any time.
                    </p>
                </DocSection>

                <DocSection title="Your rights">
                    <p>
                        Under the Philippine Data Privacy Act of 2012, you can ask to access, correct or delete your personal data, object to its
                        processing, or withdraw your consent. Email {mail} and we’ll respond as soon as we can. You may also file a complaint with the
                        National Privacy Commission.
                    </p>
                </DocSection>

                <DocSection title="Changes to this policy">
                    <p>If we change how we handle your data, we’ll update this page and the date at the top.</p>
                </DocSection>
            </DarkPageShell>
        </>
    );
}

PrivacyPolicy.layout = (page) => <LandingLayout {...page.props}>{page}</LandingLayout>;
