import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useDeleteCertificateMutation } from '@/features/certificate/certificateApi';

/**
 * DeleteConfirmModal — Destructive action confirmation for deleting a certificate.
 *
 * @param {boolean}  isOpen       - Whether the modal is open
 * @param {Function} onClose      - Close handler
 * @param {object}   certificate  - The certificate to delete (needs uuid, recipient_name)
 * @param {Function} onSuccess    - Called after successful deletion
 */
export default function DeleteConfirmModal({ isOpen, onClose, certificate, onSuccess }) {
	const [deleteCertificate, { isLoading }] = useDeleteCertificateMutation();

	const handleDelete = async () => {
		if (!certificate?.uuid) return;

		try {
			await deleteCertificate(certificate.uuid).unwrap();
			onSuccess?.();
			onClose();
		} catch (err) {
			console.error('Failed to delete certificate:', err);
		}
	};

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
							<Dialog.Panel className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111827] backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
								{/* Close button */}
								<button
									onClick={onClose}
									className="absolute top-4 right-4 p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] transition-colors"
									aria-label="Close modal"
								>
									<X className="w-4 h-4" />
								</button>

								{/* Icon */}
								<div className="flex justify-center mb-4">
									<div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
										<AlertTriangle className="w-6 h-6 text-red-400" />
									</div>
								</div>

								{/* Title */}
								<Dialog.Title className="text-lg font-semibold text-white text-center">
									Delete Certificate
								</Dialog.Title>

								{/* Description */}
								<p className="mt-3 text-sm text-slate-400 text-center leading-relaxed">
									Are you sure you want to delete the certificate for{' '}
									<span className="font-semibold text-slate-200">
										{certificate?.recipient_name}
									</span>
									? This action cannot be undone.
								</p>

								{/* Actions */}
								<div className="mt-6 flex gap-3">
									<button
										onClick={onClose}
										disabled={isLoading}
										className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-colors disabled:opacity-50"
									>
										Cancel
									</button>
									<button
										onClick={handleDelete}
										disabled={isLoading}
										className="flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isLoading ? (
											<span className="flex items-center justify-center gap-2">
												<svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
													<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
													<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
												</svg>
												Deleting...
											</span>
										) : (
											'Delete'
										)}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
