import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Activity, ChevronDown, Loader2, CheckCircle } from 'lucide-react';
import { useSendMessageMutation } from '@/features/chat/chatApi';
import { useSubmitLeadMutation } from '@/features/chat/leadApi';

const SERVICE_LABELS = {
    automation: 'Business Automation',
    web: 'Web & App Development',
    network: 'Network Infrastructure',
    cctv: 'CCTV & Hardware',
    starlink: 'Starlink / Connectivity',
    timesync: 'TimeSync',
    gymasura: 'GymAsura',
    general: 'General Inquiry',
};

// Extracts [COLLECT_INFO:service] token — returns { clean, service } or null
function extractCollectToken(text) {
    const match = text.match(/\[COLLECT_INFO:([a-z]+)\]/i);
    if (!match) return { clean: text, service: null };
    return {
        clean: text.replace(match[0], '').trim(),
        service: match[1].toLowerCase(),
    };
}

// Extracts [SUGGEST:A|B|C] token — returns { clean, suggestions }
function extractSuggestToken(text) {
    const match = text.match(/\[SUGGEST:([^\]]+)\]/i);
    if (!match) return { clean: text, suggestions: [] };
    return {
        clean: text.replace(match[0], '').trim(),
        suggestions: match[1].split('|').map((s) => s.trim()).filter(Boolean).slice(0, 3),
    };
}

const INITIAL_MESSAGES = [
    {
        id: 1,
        role: 'assistant',
        content: "Hi there! 👋 Welcome to AsuraTECH Solutions. We build **websites that convert** and **automations that follow up** — so you never lose a lead.",
    },
    {
        id: 2,
        role: 'assistant',
        content: 'What would you like to explore today?',
    },
];

const QUICK_REPLIES = ['Automate my follow-ups', 'Build my website', 'Book a Demo', 'Pricing'];

function parseBold(text) {
    const parts = text.split(/\*\*(.*?)\*\*/);
    return parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
    );
}

function renderContent(text) {
    return text.split('\n').map((line, i) => {
        if (/^[-•]\s/.test(line)) {
            const content = line.replace(/^[-•]\s*/, '');
            return (
                <div key={i} className="flex items-start gap-1.5 mt-0.5">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-current opacity-50 flex-shrink-0" />
                    <span>{parseBold(content)}</span>
                </div>
            );
        }
        if (line.trim() === '') return <div key={i} className="h-1" />;
        return <p key={i} className={i > 0 ? 'mt-1' : ''}>{parseBold(line)}</p>;
    });
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [showDot, setShowDot] = useState(false);
    const [suggestions, setSuggestions] = useState(QUICK_REPLIES);
    const [staging, setStaging] = useState(false);
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadService, setLeadService] = useState('general');
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' });
    const [leadErrors, setLeadErrors] = useState({});
    const messagesEndRef = useRef(null);

    const [sendMessage, { isLoading }] = useSendMessageMutation();
    const [submitLead, { isLoading: isSubmittingLead }] = useSubmitLeadMutation();

    // Listen for 'open-chat' event fired by CTA buttons
    useEffect(() => {
        const handler = () => { setOpen(true); setShowDot(false); };
        window.addEventListener('open-chat', handler);
        return () => window.removeEventListener('open-chat', handler);
    }, []);

    // Show notification dot after 4s if not yet opened
    useEffect(() => {
        const t = setTimeout(() => { if (!open) setShowDot(true); }, 4000);
        return () => clearTimeout(t);
    }, []);

    // Scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading, staging]);

    // Build the conversation history to send (role + content only, no ids)
    const buildHistory = (currentMessages) =>
        currentMessages
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map(({ role, content }) => ({ role, content }));

    // Reveal reply chunks sequentially for a natural conversation rhythm
    const deliverReply = (text, nextSuggestions, service) => {
        const parts = text.split(/\n\s*---\s*\n/).map((p) => p.trim()).filter(Boolean);
        if (parts.length === 0) parts.push(text.trim());
        setStaging(true);
        parts.forEach((part, i) => {
            setTimeout(() => {
                setMessages((prev) => [...prev, { id: Date.now() + i, role: 'assistant', content: part }]);
                if (i === parts.length - 1) {
                    setStaging(false);
                    setSuggestions(service ? [] : nextSuggestions);
                    if (service) {
                        setLeadService(service);
                        setShowLeadForm(true);
                    }
                }
            }, i * 700);
        });
    };

    const submitMessage = async (text) => {
        if (!text.trim() || isLoading || staging) return;

        const userMsg = { id: Date.now(), role: 'user', content: text.trim() };
        const nextMessages = [...messages, userMsg];
        setMessages(nextMessages);
        setInput('');
        setSuggestions([]);

        try {
            const result = await sendMessage(buildHistory(nextMessages)).unwrap();
            const { clean, service } = extractCollectToken(result.reply);
            const { clean: finalText, suggestions: nextSuggestions } = extractSuggestToken(clean);
            deliverReply(finalText, nextSuggestions, service);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: 'assistant',
                    content: "Sorry, I'm having trouble connecting right now. Please try again or email us at hello@asuratechsolutions.com.",
                },
            ]);
        }
    };

    const validateLead = () => {
        const errs = {};
        if (!leadForm.name.trim()) errs.name = 'Name is required.';
        if (!leadForm.email.trim()) errs.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) errs.email = 'Enter a valid email.';
        return errs;
    };

    const handleLeadSubmit = async () => {
        const errs = validateLead();
        if (Object.keys(errs).length > 0) { setLeadErrors(errs); return; }
        setLeadErrors({});

        const requirements = buildHistory(messages)
            .map((m) => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.content}`)
            .slice(-6)
            .join('\n');

        try {
            await submitLead({
                name: leadForm.name.trim(),
                email: leadForm.email.trim(),
                phone: leadForm.phone.trim() || undefined,
                company: leadForm.company.trim() || undefined,
                service_interest: leadService,
                requirements,
                conversation: buildHistory(messages),
            }).unwrap();

            setLeadSubmitted(true);
            setShowLeadForm(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 2,
                    role: 'assistant',
                    content: `✅ **Thank you, ${leadForm.name}!** Your request has been received. We'll get back to you at **${leadForm.email}** within 24 hours. Check your inbox for a confirmation email!`,
                },
            ]);
        } catch {
            setLeadErrors({ submit: 'Submission failed. Please try again or email us at hello@asuratechsolutions.com.' });
        }
    };

    const handleOpen = () => { setOpen(true); setShowDot(false); };

    return (
        <>
            {/* â”€â”€ Chat Panel â”€â”€ */}
            <div
                className={`fixed bottom-[88px] right-5 z-50 w-[340px] sm:w-[370px] origin-bottom-right transition-all duration-300 ease-out ${
                    open
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 scale-95 translate-y-3 pointer-events-none'
                }`}
                role="dialog"
                aria-label="Chat with AsuraTECH Support"
                aria-modal="false"
            >
                <div
                    className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80"
                    style={{ height: '480px' }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
                        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 flex-shrink-0">
                            <Activity className="w-5 h-5 text-white" />
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white leading-none">AsuraTECH Support</p>
                            <p className="flex items-center gap-1.5 text-xs text-indigo-200 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                Online · AI Automation Assistant
                            </p>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors flex-shrink-0"
                            aria-label="Close chat"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-3 min-h-0">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'assistant' && (
                                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 mb-0.5">
                                        <Activity className="w-3 h-3 text-white" />
                                    </span>
                                )}
                                <div
                                    className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl rounded-br-sm'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl rounded-bl-sm'
                                    }`}
                                >
                                    {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator while waiting for reply or between staged bubbles */}
                        {(isLoading || staging) && (
                            <div className="flex items-end gap-2 justify-start">
                                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center flex-shrink-0 mb-0.5">
                                    <Activity className="w-3 h-3 text-white" />
                                </span>
                                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                                    <span className="flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Contextual quick-reply chips — refreshed every assistant turn */}
                        {suggestions.length > 0 && !isLoading && !staging && !showLeadForm && messages[messages.length - 1]?.role === 'assistant' && (
                            <div className="flex flex-wrap gap-2 pl-8">
                                {suggestions.map((qr) => (
                                    <button
                                        key={qr}
                                        onClick={() => submitMessage(qr)}
                                        className="text-xs text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1.5 transition-colors shadow-sm"
                                    >
                                        {qr}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Lead capture form */}
                    {showLeadForm && !leadSubmitted && (
                        <div className="bg-white border-t border-gray-100 px-4 py-4 flex-shrink-0">
                            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">
                                {SERVICE_LABELS[leadService] || 'Your Request'} — Contact Details
                            </p>
                            <div className="space-y-2">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full name *"
                                        value={leadForm.name}
                                        onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                                        className={`w-full text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow ${leadErrors.name ? 'border-red-400' : 'border-gray-200'}`}
                                    />
                                    {leadErrors.name && <p className="text-xs text-red-500 mt-1">{leadErrors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email address *"
                                        value={leadForm.email}
                                        onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                                        className={`w-full text-sm bg-gray-50 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow ${leadErrors.email ? 'border-red-400' : 'border-gray-200'}`}
                                    />
                                    {leadErrors.email && <p className="text-xs text-red-500 mt-1">{leadErrors.email}</p>}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="tel"
                                        placeholder="Phone (optional)"
                                        value={leadForm.phone}
                                        onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                                        className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Company (optional)"
                                        value={leadForm.company}
                                        onChange={(e) => setLeadForm((f) => ({ ...f, company: e.target.value }))}
                                        className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow"
                                    />
                                </div>
                                {leadErrors.submit && <p className="text-xs text-red-500">{leadErrors.submit}</p>}
                                <button
                                    onClick={handleLeadSubmit}
                                    disabled={isSubmittingLead}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white text-sm font-semibold py-2.5 rounded-lg transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmittingLead ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                    ) : (
                                        <><CheckCircle className="w-4 h-4" /> Submit Request</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    {!showLeadForm && (
                        <div className="bg-white border-t border-gray-100 px-3 py-3 flex items-center gap-2 flex-shrink-0">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isLoading && !staging && submitMessage(input)}
                                placeholder="Type a message..."
                                disabled={isLoading || staging}
                                className="flex-1 min-w-0 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-shadow disabled:opacity-50"
                            />
                            <button
                                onClick={() => submitMessage(input)}
                                disabled={!input.trim() || isLoading || staging}
                                className="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
                                aria-label="Send message"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* â”€â”€ Floating Trigger Button â”€â”€ */}
            <button
                onClick={open ? () => setOpen(false) : handleOpen}
                className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
                aria-label={open ? 'Close chat' : 'Open support chat'}
            >
                {showDot && !open && (
                    <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-40 pointer-events-none" />
                )}
                {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                {showDot && !open && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white pointer-events-none" />
                )}
            </button>
        </>
    );
}
