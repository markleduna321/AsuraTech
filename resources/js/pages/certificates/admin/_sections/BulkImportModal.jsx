import React, { useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useBulkCreateCertificatesMutation } from '@/features/certificate/certificateApi';

/**
 * BulkImportModal — CSV upload for bulk certificate creation.
 *
 * @param {boolean}      isOpen     - Whether the modal is open
 * @param {Function}     onClose    - Close handler
 * @param {object|null}  defaults   - Default values for webinar fields
 * @param {Function}     onSuccess  - Called after successful import
 */
export default function BulkImportModal({ isOpen, onClose, defaults, onSuccess }) {
	const fileInputRef = useRef(null);
	const [bulkCreate, { isLoading }] = useBulkCreateCertificatesMutation();

	const [csvFile, setCsvFile] = useState(null);
	const [rowCount, setRowCount] = useState(0);
	const [result, setResult] = useState(null);
	const [errors, setErrors] = useState({});

	const [form, setForm] = useState({
		webinar_title: '',
		webinar_date: '',
		speaker_name: '',
		speaker_signature: null,
		speaker_role: '',
		coordinator_name: '',
		coordinator_signature: null,
		coordinator_role: '',
	});

	// Reset state when modal opens
	React.useEffect(() => {
		if (isOpen) {
			setCsvFile(null);
			setRowCount(0);
			setResult(null);
			setErrors({});
			setForm({
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
	}, [isOpen, defaults]);

	const handleFileChange = (file) => {
		if (!file) return;
		setCsvFile(file);
		setResult(null);

		// Count rows (estimate)
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target.result;
			const lines = text.split('\n').filter((line) => line.trim().length > 0);
			setRowCount(Math.max(0, lines.length - 1)); // subtract header
		};
		reader.readAsText(file);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
			handleFileChange(file);
		}
	};

	const handleChange = (field, value) => {
		setForm((prev) => ({ ...prev, [field]: value }));
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
		setResult(null);

		if (!csvFile) {
			setErrors({ csv_file: 'Please select a CSV file.' });
			return;
		}

		const formData = new FormData();
		formData.append('csv_file', csvFile);
		Object.entries(form).forEach(([key, value]) => {
			if (value !== null && value !== '') {
				formData.append(key, value);
			}
		});

		try {
			const response = await bulkCreate(formData).unwrap();
			setResult(response);
			onSuccess?.(response);
		} catch (err) {
			if (err?.data?.errors) {
				const fieldErrors = {};
				Object.entries(err.data.errors).forEach(([key, messages]) => {
					fieldErrors[key] = Array.isArray(messages) ? messages[0] : messages;
				});
				setErrors(fieldErrors);
			}
		}
	};

	const webinarFields = [
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
							<Dialog.Panel className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#111827] backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
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
									Bulk Import Certificates
								</Dialog.Title>
								<p className="text-xs text-slate-500 mb-5">
									Upload a CSV file with <code className="text-blue-400 font-mono">recipient_name</code> and optional <code className="text-blue-400 font-mono">email</code> columns.
								</p>

								<form onSubmit={handleSubmit} className="space-y-4">
									{/* CSV Upload Zone */}
									<div
										onDragOver={(e) => e.preventDefault()}
										onDrop={handleDrop}
										onClick={() => fileInputRef.current?.click()}
										className={`relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200
											${csvFile
												? 'border-emerald-500/30 bg-emerald-500/[0.04]'
												: errors.csv_file
													? 'border-red-500/30 bg-red-500/[0.04]'
													: 'border-white/[0.12] bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/[0.04]'
											}`}
									>
										<input
											ref={fileInputRef}
											type="file"
											accept=".csv"
											className="hidden"
											onChange={(e) => handleFileChange(e.target.files[0])}
										/>

										{csvFile ? (
											<div className="flex flex-col items-center gap-2">
												<FileText className="w-8 h-8 text-emerald-400" />
												<p className="text-sm font-medium text-emerald-400">{csvFile.name}</p>
												<p className="text-xs text-slate-500">
													{rowCount} recipient{rowCount !== 1 ? 's' : ''} detected
												</p>
												<p className="text-xs text-slate-600">Click to change file</p>
											</div>
										) : (
											<div className="flex flex-col items-center gap-2">
												<Upload className="w-8 h-8 text-slate-500" />
												<p className="text-sm text-slate-400">
													Drop CSV file here or <span className="text-blue-400 font-medium">browse</span>
												</p>
												<p className="text-xs text-slate-600">Must contain "recipient_name" or "name", optionally "email"</p>
											</div>
										)}
									</div>
									{errors.csv_file && (
										<p className="text-xs text-red-400">{errors.csv_file}</p>
									)}

									{/* Webinar Fields */}
									<div className="border-t border-white/[0.06] pt-4">
										<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
											Shared Webinar Details
										</p>
										<div className="space-y-3">
											{webinarFields.map((field) => (
												<div key={field.key} className="space-y-1.5">
													<label
														htmlFor={`bulk-${field.key}`}
														className="block text-xs font-medium text-slate-400"
													>
														{field.label}
													</label>
													<input
														id={`bulk-${field.key}`}
														type={field.type || 'text'}
														accept={field.accept}
														value={field.type === 'file' ? undefined : form[field.key]}
														onChange={(e) => handleChange(field.key, field.type === 'file' ? e.target.files[0] : e.target.value)}
														placeholder={field.placeholder || ''}
														className={`w-full px-3 py-2 text-sm text-slate-100
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
										</div>
									</div>

									{/* Result Display */}
									{result && (
										<div className={`rounded-xl p-4 border ${
											result.errors?.length > 0
												? 'bg-amber-500/[0.06] border-amber-500/20'
												: 'bg-emerald-500/[0.06] border-emerald-500/20'
										}`}>
											<div className="flex items-center gap-2 mb-2">
												{result.errors?.length > 0 ? (
													<AlertCircle className="w-4 h-4 text-amber-400" />
												) : (
													<CheckCircle className="w-4 h-4 text-emerald-400" />
												)}
												<p className="text-sm font-semibold text-white">
													{result.message}
												</p>
											</div>
											{result.errors?.length > 0 && (
												<div className="space-y-1 mt-2">
													{result.errors.map((err, i) => (
														<p key={i} className="text-xs text-amber-400/80">• {err}</p>
													))}
												</div>
											)}
										</div>
									)}

									{/* Actions */}
									<div className="flex gap-3 pt-2">
										<button
											type="button"
											onClick={onClose}
											disabled={isLoading}
											className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-colors disabled:opacity-50"
										>
											{result ? 'Close' : 'Cancel'}
										</button>
										{!result && (
											<button
												type="submit"
												disabled={isLoading || !csvFile}
												className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{isLoading ? (
													<>
														<svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
															<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
															<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
														</svg>
														Importing...
													</>
												) : (
													<>
														<Upload className="w-4 h-4" />
														Import {rowCount > 0 ? `${rowCount} Certificate${rowCount !== 1 ? 's' : ''}` : 'Certificates'}
													</>
												)}
											</button>
										)}
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
