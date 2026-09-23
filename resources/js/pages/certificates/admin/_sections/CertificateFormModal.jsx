import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Save, Plus } from 'lucide-react';
import {
	useCreateCertificateMutation,
	useUpdateCertificateMutation,
} from '@/features/certificate/certificateApi';

/**
 * CertificateFormModal — Create or Edit a single certificate.
 *
 * @param {boolean}      isOpen        - Whether the modal is open
 * @param {Function}     onClose       - Close handler
 * @param {object|null}  certificate   - If provided, modal is in Edit mode; otherwise Create mode
 * @param {object|null}  defaults      - Default values for webinar fields (convenience for batch creation)
 * @param {Function}     onSuccess     - Called after successful create/update
 */
export default function CertificateFormModal({ isOpen, onClose, certificate, defaults, onSuccess }) {
	const isEditMode = !!certificate;

	const [createCertificate, { isLoading: isCreating }] = useCreateCertificateMutation();
	const [updateCertificate, { isLoading: isUpdating }] = useUpdateCertificateMutation();

	const isLoading = isCreating || isUpdating;

	const [form, setForm] = useState({
		recipient_name: '',
		email: '',
		webinar_title: '',
		webinar_date: '',
		speaker_name: '',
		speaker_signature: null,
		speaker_role: '',
		coordinator_name: '',
		coordinator_signature: null,
		coordinator_role: '',
	});

	const [errors, setErrors] = useState({});

	// Populate form when modal opens
	useEffect(() => {
		if (isOpen) {
			if (isEditMode && certificate) {
				setForm({
					recipient_name: certificate.recipient_name || '',
					email: certificate.email || '',
					webinar_title: certificate.webinar_title || '',
					webinar_date: certificate.webinar_date || '',
					speaker_name: certificate.speaker_name || '',
					speaker_signature: null,
					speaker_role: certificate.speaker_role || '',
					coordinator_name: certificate.coordinator_name || '',
					coordinator_signature: null,
					coordinator_role: certificate.coordinator_role || '',
				});
			} else {
				// Use defaults for convenience when creating multiple certs for the same webinar
				setForm({
					recipient_name: '',
					email: '',
					webinar_title: defaults?.webinar_title || '',
					webinar_date: defaults?.webinar_date || '',
					speaker_name: defaults?.speaker_name || '',
					speaker_signature: null,
					speaker_role: defaults?.speaker_role || '',
					coordinator_name: defaults?.coordinator_name || '',
					coordinator_signature: null,
					coordinator_role: defaults?.coordinator_role || '',
				});
			}
			setErrors({});
		}
	}, [isOpen, isEditMode, certificate, defaults]);

	const handleChange = (field, value) => {
		setForm((prev) => ({ ...prev, [field]: value }));
		// Clear field error on change
		if (errors[field]) {
			setErrors((prev) => {
				const next = { ...prev };
				delete next[field];
				return next;
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});

		const formData = new FormData();
		Object.entries(form).forEach(([key, value]) => {
			if (value !== null && value !== '') {
				formData.append(key, value);
			}
		});

		try {
			if (isEditMode) {
				formData.append('_method', 'PUT');
				await updateCertificate({ uuid: certificate.uuid, body: formData }).unwrap();
			} else {
				await createCertificate(formData).unwrap();
			}
			onSuccess?.(form);
			onClose();
		} catch (err) {
			// Map 422 errors to field-level
			if (err?.data?.errors) {
				const fieldErrors = {};
				Object.entries(err.data.errors).forEach(([key, messages]) => {
					fieldErrors[key] = Array.isArray(messages) ? messages[0] : messages;
				});
				setErrors(fieldErrors);
			}
		}
	};

	const fields = [
		{ key: 'recipient_name', label: 'Recipient Name', placeholder: 'e.g., Juan Dela Cruz' },
		{ key: 'email', label: 'Email Address', placeholder: 'e.g., juan@example.com', type: 'email' },
		{ key: 'webinar_title', label: 'Webinar Title', placeholder: 'e.g., UX/UI & Figma Wireframing Workshop' },
		{ key: 'webinar_date', label: 'Webinar Date', type: 'date' },
		{ key: 'speaker_name', label: 'Speaker Name', placeholder: 'e.g., Christ Vein Cabalida' },
		{ key: 'speaker_signature', label: 'Speaker Signature (Optional)', type: 'file', accept: 'image/png, image/jpeg' },
		{ key: 'speaker_role', label: 'Speaker Role', placeholder: 'e.g., Speaker' },
		{ key: 'coordinator_name', label: 'Coordinator Name', placeholder: 'e.g., Wacky D. Hojilla' },
		{ key: 'coordinator_signature', label: 'Coordinator Signature (Optional)', type: 'file', accept: 'image/png, image/jpeg' },
		{ key: 'coordinator_role', label: 'Coordinator Role', placeholder: 'e.g., Webinar Coordinator' },
	];

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				{/* Backdrop */}
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#111827] backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
								{/* Close button */}
								<button
									onClick={onClose}
									className="absolute top-4 right-4 p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] transition-colors"
									aria-label="Close modal"
								>
									<X className="w-4 h-4" />
								</button>

								{/* Title */}
								<Dialog.Title className="text-lg font-semibold text-white mb-1">
									{isEditMode ? 'Edit Certificate' : 'Create Certificate'}
								</Dialog.Title>
								<p className="text-xs text-slate-500 mb-6">
									{isEditMode
										? 'Update the certificate details below.'
										: 'Fill in the details to issue a new certificate.'
									}
								</p>

								{/* Form */}
								<form onSubmit={handleSubmit} className="space-y-4">
									{fields.map((field) => (
										<div key={field.key} className="space-y-1.5">
											<label
												htmlFor={`cert-${field.key}`}
												className="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
											>
												{field.label}
											</label>
											<input
												id={`cert-${field.key}`}
												type={field.type || 'text'}
												accept={field.accept}
												value={field.type === 'file' ? undefined : form[field.key]}
												onChange={(e) => handleChange(field.key, field.type === 'file' ? e.target.files[0] : e.target.value)}
												placeholder={field.placeholder || ''}
												className={`w-full px-4 py-2.5 text-sm text-slate-100
													bg-white/[0.04] border rounded-xl
													${field.type === 'file' ? 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' : 'placeholder:text-slate-600'}
													focus:outline-none focus:ring-2 focus:bg-white/[0.06]
													transition-all duration-200
													${errors[field.key]
														? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
														: 'border-white/[0.08] focus:border-blue-500/50 focus:ring-blue-500/20'
													}`}
											/>
											{errors[field.key] && (
												<p className="text-xs text-red-400">{errors[field.key]}</p>
											)}
										</div>
									))}

									{/* Actions */}
									<div className="flex gap-3 pt-4">
										<button
											type="button"
											onClick={onClose}
											disabled={isLoading}
											className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-colors disabled:opacity-50"
										>
											Cancel
										</button>
										<button
											type="submit"
											disabled={isLoading}
											className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{isLoading ? (
												<>
													<svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
														<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
														<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
													</svg>
													{isEditMode ? 'Saving...' : 'Creating...'}
												</>
											) : (
												<>
													{isEditMode ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
													{isEditMode ? 'Save Changes' : 'Create Certificate'}
												</>
											)}
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
