import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';

/**
 * QrPreviewModal — Displays a large QR code for a certificate with copy-link functionality.
 *
 * @param {boolean}  isOpen       - Whether the modal is open
 * @param {Function} onClose      - Close handler
 * @param {object}   certificate  - Certificate data (needs verification_url, recipient_name)
 */
export default function QrPreviewModal({ isOpen, onClose, certificate }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		if (!certificate?.verification_url) return;

		try {
			await navigator.clipboard.writeText(certificate.verification_url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
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
							<Dialog.Panel className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#111827] backdrop-blur-xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
								{/* Close button */}
								<button
									onClick={onClose}
									className="absolute top-4 right-4 p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] transition-colors"
									aria-label="Close modal"
								>
									<X className="w-4 h-4" />
								</button>

								{/* Title */}
								<Dialog.Title className="text-base font-semibold text-white text-center mb-1">
									QR Code Preview
								</Dialog.Title>
								<p className="text-xs text-slate-500 text-center mb-5">
									{certificate?.recipient_name}
								</p>

								{/* QR Code */}
								<div className="flex justify-center">
									<div className="p-4 bg-white rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.1)]">
										<QRCodeSVG
											value={certificate?.verification_url || ''}
											size={200}
											level="H"
											bgColor="#ffffff"
											fgColor="#1e293b"
											includeMargin={false}
										/>
									</div>
								</div>

								{/* Verification URL */}
								<div className="mt-5 space-y-3">
									<label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
										Verification URL
									</label>
									<div className="flex items-center gap-2">
										<div className="flex-1 px-3 py-2 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.08] rounded-lg font-mono truncate">
											{certificate?.verification_url}
										</div>
										<button
											onClick={handleCopy}
											className="flex-shrink-0 p-2 rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
											aria-label="Copy verification URL"
										>
											{copied ? (
												<Check className="w-4 h-4 text-emerald-400" />
											) : (
												<Copy className="w-4 h-4" />
											)}
										</button>
									</div>

									{/* Open in new tab */}
									<a
										href={certificate?.verification_url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
									>
										<ExternalLink className="w-3 h-3" />
										Open in new tab
									</a>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
