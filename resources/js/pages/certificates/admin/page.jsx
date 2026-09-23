import React, { useState, useCallback, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Plus, Upload, Award, Zap, ArrowLeft } from 'lucide-react';
import { useGetCertificatesQuery } from '@/features/certificate/certificateApi';
import CertificateTable from './_sections/CertificateTable';
import CertificateFormModal from './_sections/CertificateFormModal';
import BulkImportModal from './_sections/BulkImportModal';
import DeleteConfirmModal from './_sections/DeleteConfirmModal';
import QrPreviewModal from './_sections/QrPreviewModal';

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1, y: 0,
		transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
	}
};

/**
 * Admin Certificate Management Page
 *
 * Authenticated page for managing webinar certificates.
 * Route: /admin/certificates
 */
export default function CertificateAdminPage() {
	// Search & pagination
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const searchTimeoutRef = useRef(null);
	const [debouncedSearch, setDebouncedSearch] = useState('');

	// Modal states
	const [formModal, setFormModal] = useState({ open: false, certificate: null });
	const [bulkModal, setBulkModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState({ open: false, certificate: null });
	const [qrModal, setQrModal] = useState({ open: false, certificate: null });

	// Track last used defaults for convenience
	const [lastDefaults, setLastDefaults] = useState({
		webinar_title: 'UX/UI & Figma Wireframing Workshop',
		webinar_date: '2026-09-18',
		speaker_name: 'Christ Vein Cabalida',
		speaker_role: 'Speaker',
		coordinator_name: 'Wacky D. Hojilla',
		coordinator_role: 'Webinar Coordinator',
	});

	// Debounced search
	const handleSearch = useCallback((value) => {
		setSearch(value);
		if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
		searchTimeoutRef.current = setTimeout(() => {
			setDebouncedSearch(value);
			setPage(1); // Reset to page 1 on search
		}, 400);
	}, []);

	// RTK Query
	const { data, isLoading, isFetching } = useGetCertificatesQuery({
		page,
		perPage: 15,
		search: debouncedSearch,
	});

	// Modal handlers
	const openCreateModal = () => {
		setFormModal({ open: true, certificate: null });
	};

	const openEditModal = (cert) => {
		setFormModal({ open: true, certificate: cert });
	};

	const openDeleteModal = (cert) => {
		setDeleteModal({ open: true, certificate: cert });
	};

	const openQrModal = (cert) => {
		setQrModal({ open: true, certificate: cert });
	};

	const handleFormSuccess = (formData) => {
		// Persist last-used webinar defaults for convenience
		if (formData?.webinar_title) {
			setLastDefaults((prev) => ({
				...prev,
				webinar_title: formData.webinar_title,
				webinar_date: formData.webinar_date || prev.webinar_date,
				speaker_name: formData.speaker_name || prev.speaker_name,
				speaker_role: formData.speaker_role || prev.speaker_role,
				coordinator_name: formData.coordinator_name || prev.coordinator_name,
				coordinator_role: formData.coordinator_role || prev.coordinator_role,
			}));
		}
	};

	return (
		<>
			<Head>
				<title>Certificate Management | AsuraTECH</title>
				<meta name="description" content="Manage and issue webinar certificates for AsuraTECH events." />
			</Head>

			<div className="min-h-screen bg-[#080C14] relative">

				{/* Ambient background orbs */}
				<div className="pointer-events-none fixed inset-0 overflow-hidden">
					<div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
					<div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[120px]" />
				</div>

				{/* Top bar */}
				<header className="relative z-20 border-b border-white/[0.06]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
						<a href="/" className="flex items-center gap-2">
							<span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
								<Zap className="w-4 h-4 text-white" />
							</span>
							<span className="text-lg font-extrabold tracking-tight text-white">
								Asura<span className="text-indigo-400">TECH</span>
							</span>
						</a>
						<a
							href="/dashboard"
							className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Dashboard
						</a>
					</div>
				</header>

				{/* Main content */}
				<main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

					{/* Page Header */}
					<motion.div
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
					>
						<div>
							<p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">
								Admin
							</p>
							<h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
								<Award className="w-7 h-7 text-yellow-500" />
								Certificate Management
							</h1>
							<p className="mt-1 text-sm text-slate-500">
								Create, manage, and issue webinar certificates.
							</p>
						</div>
						<div className="flex items-center gap-3">
							{/* Bulk Import */}
							<motion.button
								onClick={() => setBulkModal(true)}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
								className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-200"
							>
								<Upload className="w-4 h-4" />
								Bulk Import
							</motion.button>
							{/* Create Certificate */}
							<motion.button
								onClick={openCreateModal}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
								className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
							>
								<Plus className="w-4 h-4" />
								Create Certificate
							</motion.button>
						</div>
					</motion.div>

					{/* Certificate Table */}
					<CertificateTable
						data={data}
						isLoading={isLoading || isFetching}
						searchValue={search}
						onSearchChange={handleSearch}
						page={page}
						onPageChange={setPage}
						onEdit={openEditModal}
						onDelete={openDeleteModal}
						onViewQr={openQrModal}
						onCreateNew={openCreateModal}
					/>
				</main>
			</div>

			{/* ═══════════════ MODALS ═══════════════ */}

			{/* Create / Edit Form */}
			<CertificateFormModal
				isOpen={formModal.open}
				onClose={() => setFormModal({ open: false, certificate: null })}
				certificate={formModal.certificate}
				defaults={lastDefaults}
				onSuccess={handleFormSuccess}
			/>

			{/* Bulk Import */}
			<BulkImportModal
				isOpen={bulkModal}
				onClose={() => setBulkModal(false)}
				defaults={lastDefaults}
				onSuccess={handleFormSuccess}
			/>

			{/* Delete Confirmation */}
			<DeleteConfirmModal
				isOpen={deleteModal.open}
				onClose={() => setDeleteModal({ open: false, certificate: null })}
				certificate={deleteModal.certificate}
			/>

			{/* QR Code Preview */}
			<QrPreviewModal
				isOpen={qrModal.open}
				onClose={() => setQrModal({ open: false, certificate: null })}
				certificate={qrModal.certificate}
			/>
		</>
	);
}
