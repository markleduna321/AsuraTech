import {
    Activity,
    Bell,
    CalendarDays,
    ChartColumn,
    Check,
    CircleCheck,
    ClipboardList,
    Clock,
    CreditCard,
    Dumbbell,
    MessageSquare,
    Plus,
    Settings,
    Stethoscope,
    Users,
    Wallet,
} from 'lucide-react';

// Decorative HTML mock dashboards for the device stage. Drawn at a fixed 880x550 design size and scaled
// by DeviceStage, so they read like a real screenshot at any width. Numbers are illustrative.

const d = (s) => ({ '--d': `${s}s` });

function AppShell({ initials, nav, title, subtitle, action, children }) {
    return (
        <div className="flex h-full w-full text-slate-300">
            <aside className="flex w-[60px] shrink-0 flex-col items-center gap-3 border-r border-white/[0.06] bg-white/[0.02] py-5">
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--tint)/0.16)] text-xs font-semibold text-[rgb(var(--tint))] ring-1 ring-[rgb(var(--tint)/0.35)]">
                    {initials}
                </span>
                {nav.map((Icon, i) => (
                    <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-lg ${i === 0 ? 'bg-white/[0.07] text-slate-200' : 'text-slate-500'}`}>
                        <Icon className="h-4 w-4" />
                    </span>
                ))}
                <span className="mt-auto flex h-9 w-9 items-center justify-center text-slate-600">
                    <Settings className="h-4 w-4" />
                </span>
            </aside>
            <div className="relative flex min-w-0 flex-1 flex-col p-7">
                <header className="stage-in flex items-start justify-between" style={d(0)}>
                    <div>
                        <p className="text-xl font-semibold tracking-[-0.01em] text-white">{title}</p>
                        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-slate-500" />
                        {action}
                    </div>
                </header>
                <div className="mt-6 min-h-0 flex-1">{children}</div>
            </div>
        </div>
    );
}

function Card({ className = '', delay = 0, children }) {
    return (
        <div className={`stage-in rounded-xl border border-white/[0.07] bg-white/[0.03] ${className}`} style={d(delay)}>
            {children}
        </div>
    );
}

function Stat({ label, value, note, delay }) {
    return (
        <Card className="px-4 py-3" delay={delay}>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums tracking-tight text-white">{value}</p>
            {note && <p className="mt-0.5 text-xs text-slate-500">{note}</p>}
        </Card>
    );
}

function Toast({ title, detail, delay }) {
    return (
        <div
            className="stage-toast absolute bottom-6 right-6 flex items-center gap-3 rounded-xl border border-white/10 bg-[#060a18]/95 px-4 py-3 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.6)]"
            style={d(delay)}
        >
            <CircleCheck className="h-5 w-5 text-[rgb(var(--tint))]" />
            <div>
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="font-mono text-xs text-slate-500">{detail}</p>
            </div>
        </div>
    );
}

function Meter({ pct, delay, dur = '1.2s' }) {
    return (
        <span className="block h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <span className="stage-grow block h-full origin-left rounded-full bg-[rgb(var(--tint)/0.85)]" style={{ width: `${pct}%`, '--d': `${delay}s`, '--dur': dur }} />
        </span>
    );
}

function HrisScreen() {
    const rows = [
        ['Maria Santos', 'Operations', '88.0', '₱24,310'],
        ['Leo Reyes', 'Sales', '86.5', '₱21,780'],
        ['Ana Lim', 'Finance', '88.0', '₱26,045'],
    ];
    return (
        <AppShell
            initials="TS"
            nav={[Wallet, Users, Clock, CalendarDays, ChartColumn]}
            title="Payroll run"
            subtitle="Nov 1 – 15, 2026 · Semi-monthly"
            action={<span className="rounded-lg bg-[rgb(var(--tint))] px-4 py-2 text-sm font-semibold text-[#060a18]">Run payroll</span>}
        >
            <div className="grid grid-cols-3 gap-4">
                <Stat label="Employees" value="48" delay={0.08} />
                <Stat label="Hours logged" value="3,812" delay={0.14} />
                <Stat label="Net pay" value="₱1.28M" delay={0.2} />
            </div>
            <Card className="mt-4 px-4 py-3" delay={0.28}>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Computing BIR tax · SSS · PhilHealth · Pag-IBIG</span>
                    <span className="font-mono tabular-nums text-slate-500">48 / 48</span>
                </div>
                <div className="mt-2">
                    <Meter pct={100} delay={0.45} dur="1.6s" />
                </div>
            </Card>
            <Card className="mt-4 overflow-hidden" delay={0.36}>
                <div className="grid grid-cols-[1.4fr_1fr_0.7fr_0.9fr_0.7fr] border-b border-white/[0.06] px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-slate-500">
                    <span>Employee</span>
                    <span>Department</span>
                    <span>Hours</span>
                    <span>Net pay</span>
                    <span>Status</span>
                </div>
                {rows.map(([name, dept, hours, pay], i) => (
                    <div
                        key={name}
                        className="stage-in grid grid-cols-[1.4fr_1fr_0.7fr_0.9fr_0.7fr] items-center border-b border-white/[0.04] px-4 py-2.5 text-sm last:border-0"
                        style={d(0.5 + i * 0.07)}
                    >
                        <span className="text-slate-200">{name}</span>
                        <span className="text-slate-500">{dept}</span>
                        <span className="font-mono tabular-nums text-slate-400">{hours}</span>
                        <span className="font-mono tabular-nums text-slate-200">{pay}</span>
                        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] text-slate-300">
                            <Check className="h-3 w-3" /> Ready
                        </span>
                    </div>
                ))}
            </Card>
            <Toast title="Payslips sent to 48 employees" detail="Nov 15 · 09:42" delay={2.2} />
        </AppShell>
    );
}

function GymScreen() {
    const classes = [
        ['HIIT', '6:00 AM', 'Coach Mia', 18, 20],
        ['Spin', '7:30 AM', 'Coach Raf', 14, 16],
        ['Yoga', '12:00 PM', 'Coach Jen', 9, 15],
        ['Strength', '6:00 PM', 'Coach Ben', 20, 20],
    ];
    const bars = [52, 58, 55, 64, 70, 76, 84];
    const billing = [
        ['J. Cruz', 'Monthly'],
        ['K. Bautista', 'Quarterly'],
        ['P. Garcia', 'Monthly'],
    ];
    return (
        <AppShell
            initials="GA"
            nav={[CalendarDays, Users, Dumbbell, CreditCard, ChartColumn]}
            title="Today's classes"
            subtitle="Thursday, 12 November"
            action={
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300">
                    <Plus className="h-4 w-4" /> New class
                </span>
            }
        >
            <div className="grid h-full grid-cols-[1.45fr_1fr] gap-4">
                <div className="grid grid-cols-2 content-start gap-4">
                    {classes.map(([name, time, coach, booked, cap], i) => (
                        <Card key={name} className="px-4 py-4" delay={0.1 + i * 0.07}>
                            <div className="flex items-baseline justify-between">
                                <p className="text-base font-semibold text-white">{name}</p>
                                <p className="font-mono text-xs tabular-nums text-slate-500">{time}</p>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{coach}</p>
                            <div className="mt-4">
                                <Meter pct={(booked / cap) * 100} delay={0.5 + i * 0.08} />
                            </div>
                            <p className="mt-2 flex justify-between font-mono text-xs tabular-nums">
                                <span className="text-slate-300">
                                    {booked}/{cap}
                                </span>
                                <span className={booked === cap ? 'text-[rgb(var(--tint))]' : 'text-slate-500'}>{booked === cap ? 'Full' : 'Booked'}</span>
                            </p>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    <Card className="px-4 py-3" delay={0.2}>
                        <p className="text-xs text-slate-500">Active members</p>
                        <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">
                            412 <span className="text-xs font-normal text-slate-500">+18 this month</span>
                        </p>
                        <div className="mt-3 flex h-16 items-end gap-1.5">
                            {bars.map((h, i) => (
                                <span
                                    key={i}
                                    className={`stage-grow-y block flex-1 origin-bottom rounded-sm ${i === bars.length - 1 ? 'bg-[rgb(var(--tint)/0.85)]' : 'bg-white/[0.12]'}`}
                                    style={{ height: `${h}%`, '--d': `${0.45 + i * 0.05}s`, '--dur': '0.9s' }}
                                />
                            ))}
                        </div>
                    </Card>
                    <Card className="px-4 py-3" delay={0.3}>
                        <p className="text-xs text-slate-500">Auto-billing today</p>
                        <ul className="mt-2 space-y-2">
                            {billing.map(([name, plan], i) => (
                                <li key={name} className="stage-in flex items-center justify-between text-sm" style={d(0.7 + i * 0.12)}>
                                    <span className="text-slate-200">
                                        {name} <span className="text-xs text-slate-500">· {plan}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-slate-300">
                                        <Check className="h-3 w-3" /> Paid
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
            <Toast title="Payment collected automatically" detail="J. Cruz · ₱1,500 · Monthly" delay={2} />
        </AppShell>
    );
}

function ClinicScreen() {
    const queue = [
        ['#12', 'Ana Lim', 'Check-up', 'Now'],
        ['#13', 'Rico Diaz', 'Follow-up', '~5 min'],
        ['#14', 'Joy Tan', 'Consult', '~12 min'],
        ['#15', 'Mark Cruz', 'Lab results', '~20 min'],
    ];
    return (
        <AppShell
            initials="CL"
            nav={[ClipboardList, CalendarDays, Stethoscope, MessageSquare, Activity]}
            title="Patient queue"
            subtitle="Today · Main clinic"
            action={
                <span className="inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--tint)/0.14)] px-3 py-2 text-sm font-medium text-[rgb(var(--tint))] ring-1 ring-[rgb(var(--tint)/0.3)]">
                    Now serving <span className="font-mono">#12</span>
                </span>
            }
        >
            <div className="grid grid-cols-3 gap-4">
                <Stat label="Average wait" value="8 min" note="↓ 35% this month" delay={0.08} />
                <Stat label="No-shows" value="3%" note="↓ from 14% with reminders" delay={0.14} />
                <Stat label="Booked today" value="42" note="31 booked online" delay={0.2} />
            </div>
            <div className="mt-4 grid grid-cols-[1.3fr_1fr] gap-4">
                <Card className="overflow-hidden" delay={0.28}>
                    {queue.map(([no, name, reason, eta], i) => (
                        <div
                            key={no}
                            className={`stage-in flex items-center gap-3 border-b border-white/[0.04] px-4 py-2.5 text-sm last:border-0 ${i === 0 ? 'bg-[rgb(var(--tint)/0.08)]' : ''}`}
                            style={d(0.4 + i * 0.07)}
                        >
                            <span className={`font-mono tabular-nums ${i === 0 ? 'text-[rgb(var(--tint))]' : 'text-slate-500'}`}>{no}</span>
                            <span className="flex-1 text-slate-200">{name}</span>
                            <span className="text-xs text-slate-500">{reason}</span>
                            <span className="w-14 text-right font-mono text-xs tabular-nums text-slate-400">{eta}</span>
                        </div>
                    ))}
                </Card>
                <Card className="flex flex-col gap-2 px-4 py-3" delay={0.34}>
                    <p className="text-xs text-slate-500">Reminder · SMS</p>
                    <p className="stage-in w-fit max-w-[95%] rounded-2xl rounded-tl-md bg-white/[0.06] px-3 py-2 text-xs leading-relaxed text-slate-200" style={d(0.7)}>
                        Hi Ana, your check-up is tomorrow at 10:00 AM. Reply 1 to confirm.
                    </p>
                    <p className="stage-in ml-auto w-fit rounded-2xl rounded-tr-md bg-[rgb(var(--tint)/0.18)] px-3 py-2 text-xs text-white" style={d(1.2)}>
                        1
                    </p>
                    <p className="stage-in inline-flex items-center gap-1 text-xs text-slate-400" style={d(1.5)}>
                        <Check className="h-3 w-3" /> Confirmed automatically
                    </p>
                </Card>
            </div>
            <Toast title="Ana Lim checked in" detail="10:02 AM · on time" delay={2.1} />
        </AppShell>
    );
}

const SCREENS = { hris: HrisScreen, gym: GymScreen, clinic: ClinicScreen };

export default function DemoScreen({ demoKey }) {
    const Screen = SCREENS[demoKey];
    return Screen ? <Screen /> : null;
}
