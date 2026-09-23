import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Pencil, Trash2, Copy, Check, Search, ChevronLeft, ChevronRight, FolderOpen, Plus } from 'lucide-react';

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1, y: 0,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
	}
};

const staggerContainer = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.06, delayChildren: 0.05 }
	}
};

/**
 * CertificateTable — Premium dark table with search, pagination, and row actions.
 *
 * @param {object}   data         - Paginated API response { data: [...], meta: {...} }
 * @param {boolean}  isLoading    - Loading state
 * @param {string}   searchValue  - Current search query
 * @param {Function} onSearchChange - Search handler
 * @param {number}   page         - Current page number
 * @param {Function} onPageChange - Page change handler
 * @param {Function} onEdit       - Called with certificate when Edit is clicked
 * @param {Function} onDelete     - Called with certificate when Delete is clicked
 * @param {Function} onViewQr     - Called with certificate when QR is clicked
 * @param {Function} onCreateNew  - Called when empty state CTA is clicked
 */
export default function CertificateTable({
	data,
	isLoading,
	searchValue,
	onSearchChange,
	page,
	onPageChange,
	onEdit,
	onDelete,
	onViewQr,
	onCreateNew,
}) {
	const [copiedId, setCopiedId] = useState(null);
	const certificates = data?.data || [];
	const meta = data?.meta || {};
	const totalPages = meta.last_page || 1;

	const handleCopyUrl = async (cert) => {
		try {
			await navigator.clipboard.writeText(cert.verification_url);
			setCopiedId(cert.uuid);
			setTimeout(() => setCopiedId(null), 2000);
		} catch (err) {
			console.error('Copy failed:', err);
		}
	};

	const formatDate = (dateStr) => {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	return (
		<motion.div
			variants={fadeUp}
			initial="hidden"
			animate="visible"
			className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden"
		>
			{/* Table Header with Search */}
			<div className="px-6 py-4 border-b border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
				<h3 className="text-base font-semibold text-slate-100">
					Certificates
					{meta.total !== undefined && (
						<span className="ml-2 text-xs font-normal text-slate-500">
							({meta.total} total)
						</span>
					)}
				</h3>
				<div className="relative w-full sm:w-64">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
					<input
						type="text"
						value={searchValue}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Search by name or title..."
						className="w-full pl-9 pr-4 py-2 text-sm text-slate-100
							bg-white/[0.04] border border-white/[0.08] rounded-xl
							placeholder:text-slate-600
							focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
							transition-all duration-200"
					/>
				</div>
			</div>

			{/* Loading Skeleton */}
			{isLoading && (
				<div className="divide-y divide-white/[0.04]">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="px-6 py-4 flex items-center gap-4">
							<div className="flex-1 space-y-2">
								<div className="h-4 w-40 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
								<div className="h-3 w-56 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
							</div>
							<div className="h-4 w-20 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
						</div>
					))}
				</div>
			)}

			{/* Empty State */}
			{!isLoading && certificates.length === 0 && (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<div className="relative mb-5">
						<div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
							<FolderOpen className="w-6 h-6 text-slate-600" />
						</div>
						<div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl" />
					</div>
					<h4 className="text-base font-semibold text-slate-200">No certificates yet</h4>
					<p className="mt-1.5 text-sm text-slate-500 max-w-xs">
						{searchValue
							? `No certificates match "${searchValue}". Try a different search.`
							: 'Create your first certificate or bulk import from CSV.'
						}
					</p>
					{!searchValue && (
						<button
							onClick={onCreateNew}
							className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
						>
							<Plus className="w-4 h-4" />
							Create Certificate
						</button>
					)}
				</div>
			)}

			{/* Table */}
			{!isLoading && certificates.length > 0 && (
				<>
					{/* Desktop Table */}
					<div className="hidden md:block">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-white/[0.04]">
									<th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
										Recipient
									</th>
									<th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
										Webinar
									</th>
									<th className="text-left px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
										Date
									</th>
									<th className="text-right px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<motion.tbody
								variants={staggerContainer}
								initial="hidden"
								animate="visible"
								className="divide-y divide-white/[0.04]"
							>
								{certificates.map((cert) => (
									<motion.tr
										key={cert.uuid}
										variants={fadeUp}
										className="hover:bg-white/[0.03] transition-colors duration-150 group"
									>
										<td className="px-6 py-4">
											<p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
												{cert.recipient_name}
											</p>
										</td>
										<td className="px-6 py-4">
											<p className="text-sm text-slate-400 max-w-[200px] truncate">
												{cert.webinar_title}
											</p>
										</td>
										<td className="px-6 py-4">
											<p className="text-sm text-slate-500">
												{formatDate(cert.webinar_date)}
											</p>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-end gap-1">
												{/* Copy URL */}
												<button
													onClick={() => handleCopyUrl(cert)}
													className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
													title="Copy verification URL"
													aria-label={`Copy verification URL for ${cert.recipient_name}`}
												>
													{copiedId === cert.uuid ? (
														<Check className="w-4 h-4 text-emerald-400" />
													) : (
														<Copy className="w-4 h-4" />
													)}
												</button>
												{/* View QR */}
												<button
													onClick={() => onViewQr(cert)}
													className="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/[0.08] transition-colors"
													title="View QR Code"
													aria-label={`View QR code for ${cert.recipient_name}`}
												>
													<QrCode className="w-4 h-4" />
												</button>
												{/* Edit */}
												<button
													onClick={() => onEdit(cert)}
													className="p-2 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/[0.08] transition-colors"
													title="Edit"
													aria-label={`Edit certificate for ${cert.recipient_name}`}
												>
													<Pencil className="w-4 h-4" />
												</button>
												{/* Delete */}
												<button
													onClick={() => onDelete(cert)}
													className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-colors"
													title="Delete"
													aria-label={`Delete certificate for ${cert.recipient_name}`}
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									</motion.tr>
								))}
							</motion.tbody>
						</table>
					</div>

					{/* Mobile Card List */}
					<div className="md:hidden divide-y divide-white/[0.04]">
						{certificates.map((cert) => (
							<div key={cert.uuid} className="px-4 py-4 space-y-2">
								<div className="flex items-start justify-between">
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-slate-200 truncate">
											{cert.recipient_name}
										</p>
										<p className="text-xs text-slate-500 truncate mt-0.5">
											{cert.webinar_title}
										</p>
										<p className="text-xs text-slate-600 mt-0.5">
											{formatDate(cert.webinar_date)}
										</p>
									</div>
									<div className="flex items-center gap-1 ml-2">
										<button
											onClick={() => handleCopyUrl(cert)}
											className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
											aria-label={`Copy URL for ${cert.recipient_name}`}
										>
											{copiedId === cert.uuid ? (
												<Check className="w-3.5 h-3.5 text-emerald-400" />
											) : (
												<Copy className="w-3.5 h-3.5" />
											)}
										</button>
										<button
											onClick={() => onViewQr(cert)}
											className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 transition-colors"
											aria-label={`QR for ${cert.recipient_name}`}
										>
											<QrCode className="w-3.5 h-3.5" />
										</button>
										<button
											onClick={() => onEdit(cert)}
											className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 transition-colors"
											aria-label={`Edit ${cert.recipient_name}`}
										>
											<Pencil className="w-3.5 h-3.5" />
										</button>
										<button
											onClick={() => onDelete(cert)}
											className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
											aria-label={`Delete ${cert.recipient_name}`}
										>
											<Trash2 className="w-3.5 h-3.5" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
							<p className="text-xs text-slate-500">
								Page {meta.current_page} of {totalPages}
							</p>
							<div className="flex items-center gap-1">
								<button
									onClick={() => onPageChange(page - 1)}
									disabled={page <= 1}
									className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
									aria-label="Previous page"
								>
									<ChevronLeft className="w-4 h-4" />
								</button>

								{/* Page numbers */}
								{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
									let pageNum;
									if (totalPages <= 5) {
										pageNum = i + 1;
									} else if (page <= 3) {
										pageNum = i + 1;
									} else if (page >= totalPages - 2) {
										pageNum = totalPages - 4 + i;
									} else {
										pageNum = page - 2 + i;
									}
									return (
										<button
											key={pageNum}
											onClick={() => onPageChange(pageNum)}
											className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
												pageNum === page
													? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
													: 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.06]'
											}`}
										>
											{pageNum}
										</button>
									);
								})}

								<button
									onClick={() => onPageChange(page + 1)}
									disabled={page >= totalPages}
									className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
									aria-label="Next page"
								>
									<ChevronRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					)}
				</>
			)}

			{/* Shimmer animation */}
			<style>{`
				@keyframes shimmer {
					0% { background-position: -200% center; }
					100% { background-position: 200% center; }
				}
				.animate-shimmer {
					animation: shimmer 2s linear infinite;
				}
			`}</style>
		</motion.div>
	);
}
