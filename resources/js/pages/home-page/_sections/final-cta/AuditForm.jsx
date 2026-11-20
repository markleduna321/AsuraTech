import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useSubmitLeadMutation } from '@/features/chat/leadApi';
import { getAttribution, track } from '@/features/analytics/tracking';
import { CONTACT } from '@/features/site/siteConfig';
import { AUDIT, BUSINESS_TYPES } from './finalCtaData';
import { usePrefersReducedMotion } from '../platform/scrollHooks';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER = ['name', 'email', 'business_type', 'requirements', 'consent'];
const EMPTY = { name: '', email: '', business_type: '', requirements: '', consent: false };

function validate(values) {
    const errors = {};
    if (!values.name.trim()) errors.name = 'Please tell us your name.';
    if (!values.email.trim()) errors.email = 'Please enter your work email.';
    else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email address doesn’t look right.';
    if (!values.business_type) errors.business_type = 'Please choose your business type.';
    if (values.requirements.length > 500) errors.requirements = 'Please keep this under 500 characters.';
    if (!values.consent) errors.consent = 'Please confirm we can contact you about your audit.';
    return errors;
}

const inputClass = (invalid) =>
    `block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-plum-900 placeholder:text-mauve-700 ring-1 ring-inset transition-shadow focus:outline-none focus:ring-2 focus:ring-magenta-600 motion-reduce:transition-none ${
        invalid ? 'ring-rose-600' : 'ring-mauve-500 hover:ring-mauve-700'
    }`;

function Field({ id, label, optional, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-xs font-medium text-plum-900">
                {label}
                {optional && <span className="font-normal text-mauve-700">Optional</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-700">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function AuditForm() {
    const uid = useId();
    const ids = Object.fromEntries(FIELD_ORDER.map((f) => [f, `${uid}-${f}`]));
    const [values, setValues] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [done, setDone] = useState(false);
    const [submitLead, { isLoading }] = useSubmitLeadMutation();
    const fieldRefs = useRef({});
    const successRef = useRef(null);
    const reducedMotion = usePrefersReducedMotion();

    // Prefill from ad / email links, e.g. ?name=Ana&email=ana@clinic.ph&business_type=healthcare
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const prefill = {};
        if (params.get('name')) prefill.name = params.get('name').slice(0, 255);
        if (params.get('email')) prefill.email = params.get('email').slice(0, 255);
        const type = params.get('business_type');
        if (type && BUSINESS_TYPES.some((t) => t.value === type)) prefill.business_type = type;
        if (Object.keys(prefill).length) setValues((v) => ({ ...v, ...prefill }));
    }, []);

    useEffect(() => {
        if (!done || !successRef.current) return;
        successRef.current.focus({ preventScroll: true });
        successRef.current.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
    }, [done, reducedMotion]);

    const update = (field, value) => {
        const next = { ...values, [field]: value };
        setValues(next);
        // Once a field shows an error, re-check it live so the message clears as soon as it's fixed.
        if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(next)[field] }));
    };

    const blur = (field) => {
        const message = validate(values)[field];
        const touched = field === 'consent' ? false : values[field] !== '';
        if (touched || errors[field]) setErrors((e) => ({ ...e, [field]: message }));
    };

    const focusFirstError = (errs) => {
        const first = FIELD_ORDER.find((f) => errs[f]);
        if (first) fieldRefs.current[first]?.focus();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        const clientErrors = validate(values);
        setErrors(clientErrors);
        if (Object.keys(clientErrors).length) {
            focusFirstError(clientErrors);
            return;
        }

        const attribution = getAttribution();
        track('audit_form_submit', { source: attribution.source, business_type: values.business_type });

        const body = {
            name: values.name.trim(),
            email: values.email.trim(),
            business_type: values.business_type,
            requirements: values.requirements.trim() || null,
            service_interest: 'audit',
            consent: true,
            ...attribution,
        };
        if (honeypot) body.website = honeypot;

        try {
            await submitLead(body).unwrap();
            track('audit_form_success', { source: attribution.source, business_type: values.business_type });
            setDone(true);
        } catch (err) {
            if (err?.status === 422 && err.data?.errors) {
                const serverErrors = Object.fromEntries(
                    Object.entries(err.data.errors).map(([field, messages]) => [field, messages[0]]),
                );
                const fieldErrors = Object.fromEntries(Object.entries(serverErrors).filter(([f]) => FIELD_ORDER.includes(f)));
                setErrors(fieldErrors);
                if (Object.keys(fieldErrors).length) focusFirstError(fieldErrors);
                else setFormError('Something in the form needs another look. Please check and try again.');
            } else if (err?.status === 429) {
                setFormError('Too many attempts. Please wait a minute and try again.');
            } else {
                setFormError(`We couldn’t send that. Please try again, or email us at ${CONTACT.email}.`);
            }
        }
    };

    if (done) {
        return (
            <div role="status" className="rounded-xl bg-plum-600/[0.06] p-6 ring-1 ring-inset ring-plum-600/30">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-magenta-600 bg-[image:var(--aurora-deep)] shadow-[0_6px_20px_-10px_rgba(255,46,126,0.45)]" aria-hidden="true">
                    <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
                </span>
                <h4 ref={successRef} tabIndex={-1} className="mt-3 text-lg font-semibold text-plum-900 focus:outline-none">
                    You’re all set. We’ll email you to pick a time.
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-mauve-700">
                    We’ve sent a confirmation to <span className="font-medium text-plum-900">{values.email.trim()}</span>. Within 24 hours on business days,
                    we’ll email you a few times to choose from for your 15-minute audit.
                </p>
            </div>
        );
    }

    const describedBy = (field) => (errors[field] ? `${ids[field]}-error` : undefined);
    const bind = (field) => ({
        id: ids[field],
        name: field,
        ref: (el) => {
            fieldRefs.current[field] = el;
        },
        'aria-invalid': errors[field] ? 'true' : undefined,
        'aria-describedby': describedBy(field),
        onBlur: () => blur(field),
    });

    return (
        <form noValidate onSubmit={onSubmit} aria-label="Book your free Systems Audit" className="relative space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field id={ids.name} label="Name" error={errors.name}>
                    <input
                        {...bind('name')}
                        type="text"
                        autoComplete="name"
                        required
                        maxLength={255}
                        value={values.name}
                        onChange={(e) => update('name', e.target.value)}
                        className={inputClass(errors.name)}
                    />
                </Field>
                <Field id={ids.email} label="Work email" error={errors.email}>
                    <input
                        {...bind('email')}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        maxLength={255}
                        value={values.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={inputClass(errors.email)}
                    />
                </Field>
            </div>

            <Field id={ids.business_type} label="Business type" error={errors.business_type}>
                <select
                    {...bind('business_type')}
                    required
                    value={values.business_type}
                    onChange={(e) => update('business_type', e.target.value)}
                    className={`${inputClass(errors.business_type)} pr-10 ${values.business_type ? '' : 'text-mauve-700'}`}
                >
                    <option value="" disabled className="bg-white text-mauve-700">
                        Choose one
                    </option>
                    {BUSINESS_TYPES.map((t) => (
                        <option key={t.value} value={t.value} className="bg-white text-plum-900">
                            {t.label}
                        </option>
                    ))}
                </select>
            </Field>

            <Field id={ids.requirements} label="What are you trying to fix?" optional error={errors.requirements}>
                <input
                    {...bind('requirements')}
                    type="text"
                    maxLength={500}
                    placeholder="e.g. Leads slip through between Facebook and our CRM"
                    value={values.requirements}
                    onChange={(e) => update('requirements', e.target.value)}
                    className={inputClass(errors.requirements)}
                />
            </Field>

            {/* Honeypot: invisible to people and skipped by keyboard; bots that fill it are rejected server-side. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                <label htmlFor={`${uid}-website`}>Website</label>
                <input id={`${uid}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>

            <div>
                <div className="flex items-start gap-3">
                    <input
                        {...bind('consent')}
                        type="checkbox"
                        required
                        checked={values.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className={`mt-0.5 h-4 w-4 shrink-0 rounded bg-white text-plum-900 focus:ring-2 focus:ring-magenta-600 focus:ring-offset-0 ${
                            errors.consent ? 'border-rose-600' : 'border-mauve-500'
                        }`}
                    />
                    <label htmlFor={ids.consent} className="text-xs leading-relaxed text-mauve-700">
                        I agree that AsuraTECH Solutions may email or call me about this audit. We use your details only to arrange it, as
                        described in our{' '}
                        <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener"
                            className="rounded font-medium text-plum-900 underline decoration-plum-900/40 underline-offset-2 transition-colors hover:decoration-plum-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-900 motion-reduce:transition-none"
                        >
                            Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        .
                    </label>
                </div>
                {errors.consent && (
                    <p id={`${ids.consent}-error`} className="mt-1.5 pl-7 text-xs text-rose-700">
                        {errors.consent}
                    </p>
                )}
            </div>

            {formError && (
                <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-800 ring-1 ring-inset ring-rose-600/30">
                    {formError}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading || undefined}
                className="aurora-btn group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white focus-visible:outline-none disabled:cursor-wait disabled:opacity-70"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                        Sending…
                    </>
                ) : (
                    <>
                        {AUDIT.submitLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-mauve-700">{AUDIT.trustLine}</p>
        </form>
    );
}
