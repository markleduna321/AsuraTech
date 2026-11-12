import { useEffect, useState } from 'react';
import { CalendarCheck, Check, Mail, MessageSquare, MessagesSquare, Send, Sparkles, Star } from 'lucide-react';
import { easeOutExpo } from './scrollHooks';

const d = (seconds) => ({ '--d': `${seconds}s` });

function Avatar({ initials }) {
    return (
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] font-semibold text-slate-200">
            {initials}
        </span>
    );
}

function Tag({ icon: Icon, children }) {
    return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
            <Icon className="h-3 w-3" aria-hidden="true" />
            {children}
        </span>
    );
}

function LeadNurtureStage() {
    const days = ['Day 1', 'Day 3', 'Day 7'];
    return (
        <div className="flex h-full flex-col gap-5">
            <div className="stage-in flex items-center justify-between" style={d(0)}>
                <div className="flex items-center gap-3">
                    <Avatar initials="MS" />
                    <div>
                        <p className="text-sm font-medium text-slate-100">Maria Santos</p>
                        <p className="text-xs text-slate-500">New lead · Website form</p>
                    </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" /> Sequence active
                </span>
            </div>

            <div className="stage-in relative" style={d(0.1)}>
                <div className="absolute left-0 right-0 top-[5px] h-px bg-white/10" />
                <div className="stage-grow absolute left-0 right-0 top-[5px] h-px origin-left bg-indigo-400/70" style={{ ...d(0.25), '--dur': '2.6s' }} />
                <ol className="relative flex justify-between">
                    {days.map((day) => (
                        <li key={day} className="flex flex-col items-center gap-2 first:items-start last:items-end">
                            <span className="h-[11px] w-[11px] rounded-full border border-white/20 bg-[#060a18]" />
                            <span className="font-mono text-[11px] tabular-nums text-slate-400">{day}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-3">
                <div className="stage-in ml-auto max-w-[78%]" style={d(0.5)}>
                    <Tag icon={MessageSquare}>SMS · 42s after sign-up</Tag>
                    <p className="mt-1.5 rounded-2xl rounded-tr-md border border-white/10 bg-white/[0.07] px-3.5 py-2.5 text-sm text-slate-100">
                        Hi Maria, thanks for reaching out! Want to grab a quick call this week?
                    </p>
                </div>
                <div className="stage-in ml-auto w-[78%]" style={d(1.1)}>
                    <Tag icon={Mail}>Email · Day 3</Tag>
                    <div className="mt-1.5 rounded-2xl rounded-tr-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                        <p className="text-sm font-medium text-slate-100">3 ways our clients save 10 hours a week</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">Plus a link to pick a time that suits you…</p>
                    </div>
                </div>
                <div className="stage-in max-w-[70%]" style={d(1.7)}>
                    <Tag icon={MessagesSquare}>Chat · Day 7</Tag>
                    <p className="mt-1.5 rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-sm text-slate-300">
                        Yes! Thursday works for me.
                    </p>
                </div>
            </div>
        </div>
    );
}

const COLUMNS = [
    { name: 'New', count: 12, cards: [['Daniel Cruz', '$1,200'], ['Ana Lim', '$2,400']] },
    { name: 'Contacted', count: 8, cards: [['Leo Reyes', '$3,100']] },
    { name: 'Qualified', count: 5, cards: [['Grace Tan', '$6,500']] },
    { name: 'Won', count: 3, cards: [['Mark Uy', '$2,900']] },
];

function DealCard({ name, value, highlight = false }) {
    return (
        <div
            className={`rounded-lg border px-2.5 py-2 ${
                highlight ? 'border-indigo-400/50 bg-[#060a18] shadow-[0_0_24px_-6px_rgba(129,140,248,0.6)]' : 'border-white/[0.07] bg-white/[0.03]'
            }`}
        >
            <p className={`truncate text-xs font-medium ${highlight ? 'text-white' : 'text-slate-300'}`}>{name}</p>
            <p className="mt-0.5 font-mono text-[11px] tabular-nums text-slate-500">{value}</p>
        </div>
    );
}

function PipelineStage() {
    return (
        <div className="flex h-full flex-col">
            <div className="stage-in flex items-center justify-between" style={d(0)}>
                <p className="text-sm font-medium text-slate-100">Sales pipeline</p>
                <p className="font-mono text-xs tabular-nums text-slate-500">$48,250 open</p>
            </div>
            <div className="stage-in relative mt-5 flex-1" style={d(0.1)}>
                <div className="grid h-full grid-cols-4 gap-2">
                    {COLUMNS.map((col) => (
                        <div key={col.name} className="flex flex-col gap-2 rounded-xl bg-white/[0.02] p-1.5">
                            <div className="flex h-6 items-center justify-between px-1">
                                <span className="truncate text-[11px] font-medium text-slate-400">{col.name}</span>
                                <span className="font-mono text-[10px] tabular-nums text-slate-600">{col.count}</span>
                            </div>
                            <div className="h-[52px]" aria-hidden="true" />
                            {col.cards.map(([name, value]) => (
                                <DealCard key={name} name={name} value={value} />
                            ))}
                        </div>
                    ))}
                </div>
                {/* The lead card travels New → Won across the same column grid */}
                <div className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-4 gap-2 p-0">
                    <div className="stage-slide px-1.5 pt-[38px]" style={d(0.5)}>
                        <DealCard name="Maria Santos" value="$4,800" highlight />
                    </div>
                </div>
            </div>
            <p className="stage-in mt-4 inline-flex items-center gap-2 text-xs text-slate-400" style={d(3.3)}>
                <Check className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
                Moved to <span className="text-slate-200">Won</span> · owner notified automatically
            </p>
        </div>
    );
}

const SLOTS = [
    { time: '9:00', label: 'Team stand-up', busy: true },
    { time: '10:00', label: null },
    { time: '11:00', label: 'Site visit', busy: true },
    { time: '12:00', label: null },
    { time: '13:00', label: 'Supplier call', busy: true },
];

function BookingStage() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    return (
        <div className="relative flex h-full flex-col">
            <div className="stage-in flex items-center justify-between" style={d(0)}>
                <p className="text-sm font-medium text-slate-100">Thursday, 14 November</p>
                <div className="flex gap-1">
                    {days.map((day) => (
                        <span
                            key={day}
                            className={`rounded-md px-2 py-1 text-[11px] ${day === 'Thu' ? 'bg-white/10 text-white' : 'text-slate-500'}`}
                        >
                            {day}
                        </span>
                    ))}
                </div>
            </div>
            <ul className="stage-in mt-5 flex flex-1 flex-col gap-2" style={d(0.1)}>
                {SLOTS.map((slot) => (
                    <li key={slot.time} className="flex flex-1 items-stretch gap-3">
                        <span className="w-11 pt-2 font-mono text-[11px] tabular-nums text-slate-500">{slot.time}</span>
                        <div className="relative flex-1 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
                            {slot.busy && (
                                <div className="flex h-full items-center bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0_6px,transparent_6px_12px)] px-3 text-xs text-slate-500">
                                    {slot.label}
                                </div>
                            )}
                            {slot.time === '10:00' && (
                                <div className="stage-fill absolute inset-0 flex origin-left items-center gap-2 border-l-2 border-indigo-400 bg-indigo-500/15 px-3" style={d(0.7)}>
                                    <span className="text-xs font-medium text-white">Discovery call</span>
                                    <span className="text-xs text-slate-400">· Maria Santos · booked online</span>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div
                className="stage-toast absolute bottom-2 right-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#060a18]/90 px-4 py-3 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.6)]"
                style={d(1.5)}
            >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#060a18]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                    <p className="text-sm font-medium text-white">Appointment confirmed</p>
                    <p className="font-mono text-[11px] tabular-nums text-slate-400">Thu 10:00 AM · reminder scheduled</p>
                </div>
            </div>
        </div>
    );
}

function Stars({ size = 'h-4 w-4', className = '' }) {
    return (
        <span className={`flex gap-0.5 ${className}`}>
            {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className={`${size} fill-current`} aria-hidden="true" />
            ))}
        </span>
    );
}

// Rating ticks 4.6 → 4.9 each time the stage becomes active.
function RatingTicker({ active, reduced }) {
    const [value, setValue] = useState(reduced ? 4.9 : 4.6);
    useEffect(() => {
        if (reduced) {
            setValue(4.9);
            return undefined;
        }
        if (!active) {
            setValue(4.6);
            return undefined;
        }
        let raf = 0;
        const start = performance.now() + 500;
        const tick = (now) => {
            const t = Math.max(0, Math.min(1, (now - start) / 1400));
            setValue(4.6 + 0.3 * easeOutExpo(t));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, reduced]);
    return <>{value.toFixed(1)}</>;
}

function ReputationStage({ active, reduced }) {
    return (
        <div className="flex h-full flex-col gap-4">
            <div className="stage-in flex items-end justify-between" style={d(0)}>
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">Average rating</p>
                    <p className="mt-1 font-mono text-5xl font-semibold tabular-nums tracking-tight text-white">
                        <RatingTicker active={active} reduced={reduced} />
                    </p>
                </div>
                <div className="pb-2 text-right">
                    <span className="relative inline-block">
                        <Stars className="text-white/15" />
                        <span className="stage-stars-clip absolute inset-0 overflow-hidden" style={d(0.5)}>
                            <span className="stage-stars-inner block" style={d(0.5)}>
                                <Stars className="text-white" />
                            </span>
                        </span>
                    </span>
                    <p className="mt-1 font-mono text-[11px] tabular-nums text-slate-500">212 reviews</p>
                </div>
            </div>

            <div className="stage-in flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3" style={d(0.6)}>
                <Send className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-200">Review request sent to Maria Santos</p>
                    <p className="text-xs text-slate-500">SMS · 2 hours after her visit</p>
                </div>
                <span className="font-mono text-[11px] tabular-nums text-slate-500">10:42</span>
            </div>

            <ul className="stage-in space-y-1.5" style={d(0.9)} aria-label="Rating breakdown">
                {[
                    [5, 86],
                    [4, 10],
                    [3, 3],
                    [2, 1],
                ].map(([stars, pct], i) => (
                    <li key={stars} className="flex items-center gap-3 font-mono text-[11px] tabular-nums text-slate-500">
                        <span className="w-3">{stars}</span>
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                            <span
                                className="stage-grow block h-full origin-left rounded-full bg-slate-300/70"
                                style={{ width: `${pct}%`, '--d': `${1 + i * 0.07}s`, '--dur': '0.9s' }}
                            />
                        </span>
                        <span className="w-8 text-right">{pct}%</span>
                    </li>
                ))}
            </ul>

            <div
                className="stage-in mt-auto rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                style={d(1.5)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <Avatar initials="MS" />
                        <div>
                            <p className="text-sm font-medium text-white">Maria S.</p>
                            <Stars size="h-3 w-3" className="mt-0.5 text-white" />
                        </div>
                    </div>
                    <span className="text-[11px] text-slate-500">Just now</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    “Booked online in a minute and got reminders before my visit. Super smooth.”
                </p>
            </div>
        </div>
    );
}

function Typing({ delay }) {
    return (
        <div className="stage-typing [grid-area:1/1] flex w-fit items-center gap-1 rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.03] px-3.5 py-3" style={d(delay)}>
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400 [animation-delay:150ms]" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-slate-400 [animation-delay:300ms]" />
        </div>
    );
}

function BotStage() {
    return (
        <div className="flex h-full flex-col">
            <div className="stage-in flex items-center gap-3" style={d(0)}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/10 text-indigo-200">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                    <p className="text-sm font-medium text-slate-100">AI Assistant</p>
                    <p className="text-xs text-slate-500">Replies instantly · 24/7</p>
                </div>
            </div>
            <div className="mt-5 flex flex-1 flex-col justify-end gap-3">
                <p className="stage-in ml-auto max-w-[75%] rounded-2xl rounded-tr-md border border-white/10 bg-white/[0.07] px-3.5 py-2.5 text-sm text-slate-100" style={d(0.3)}>
                    Do you have anything open this week?
                </p>
                <div className="grid">
                    <Typing delay={0.8} />
                    <p className="stage-in [grid-area:1/1] max-w-[80%] rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-300" style={d(1.9)}>
                        Yes! Thursday 10:00 AM or Friday 2:00 PM. Want me to book one for you?
                    </p>
                </div>
                <p className="stage-in ml-auto max-w-[75%] rounded-2xl rounded-tr-md border border-white/10 bg-white/[0.07] px-3.5 py-2.5 text-sm text-slate-100" style={d(2.6)}>
                    Thursday, please.
                </p>
                <div className="grid">
                    <Typing delay={3.0} />
                    <div className="stage-in [grid-area:1/1] flex max-w-[80%] items-center gap-3 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-3.5 py-3" style={d(4.1)}>
                        <CalendarCheck className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-medium text-white">Booked: Thu 10:00 AM</p>
                            <p className="text-xs text-slate-500">Confirmation sent by SMS and email</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const STAGES = {
    nurture: LeadNurtureStage,
    pipeline: PipelineStage,
    booking: BookingStage,
    reputation: ReputationStage,
    bots: BotStage,
};

export default function FeatureStage({ featureKey, active, reduced }) {
    const StageBody = STAGES[featureKey];
    return <StageBody active={active} reduced={reduced} />;
}
