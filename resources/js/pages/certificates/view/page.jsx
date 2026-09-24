import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { Download, ArrowLeft, Zap } from 'lucide-react';
import { useGetCertificateQuery } from '@/features/certificate/certificateApi';
import CertificateCard from './_sections/CertificateCard';
import VerificationBadge from './_sections/VerificationBadge';

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
		transition: { staggerChildren: 0.12, delayChildren: 0.1 }
	}
};

/**
 * Public Certificate Verification Page
 *
 * Accessed via QR code scan: /certificates/{uuid}
 * Fetches certificate data from the API and renders the certificate visual.
 */
export default function CertificateViewPage() {
	const { uuid } = usePage().props;
	const certRef = useRef(null);
	const wrapperRef = useRef(null);
	const [scale, setScale] = useState(1);

	useEffect(() => {
		const updateScale = () => {
			if (wrapperRef.current) {
				const availableWidth = wrapperRef.current.offsetWidth;
				// 820 is the fixed width of the certificate
				if (availableWidth < 820) {
					setScale(availableWidth / 820);
				} else {
					setScale(1);
				}
			}
		};

		updateScale();
		window.addEventListener('resize', updateScale);
		return () => window.removeEventListener('resize', updateScale);
	}, []);

	const {
		data: certificateResponse,
		isLoading,
		isError,
		error,
	} = useGetCertificateQuery(uuid);

	const certificate = certificateResponse?.data;

	const handleDownload = useCallback(async () => {
		if (!certRef.current) return;

		try {
			const dataUrl = await toPng(certRef.current, {
				quality: 1,
				pixelRatio: 2,
				backgroundColor: '#ffffff',
			});

			const link = document.createElement('a');
			link.download = `certificate-${certificate?.recipient_name?.replace(/\s+/g, '-').toLowerCase() || 'download'}.png`;
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error('Failed to generate certificate image:', err);
		}
	}, [certificate]);

	return (
		<>
			<Head title={certificate ? `Certificate — ${certificate.recipient_name}` : 'Certificate Verification'}>
				<meta
					name="description"
					content={
						certificate
							? `Verified certificate of participation for ${certificate.recipient_name} in ${certificate.webinar_title}.`
							: 'Verify an AsuraTECH webinar certificate.'
					}
				/>
			</Head>

			<div className="min-h-screen bg-[#080C14] relative overflow-hidden">

				{/* Ambient gradient orbs */}
				<div className="pointer-events-none fixed inset-0 overflow-hidden">
					<div className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
					<div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-cyan-600/5 blur-[150px]" />
				</div>

				{/* Top bar */}
				<header className="relative z-20 border-b border-white/[0.06]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
						<a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
							<span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
								<Zap className="w-4 h-4 text-white" />
							</span>
							<span className="text-lg font-extrabold tracking-tight text-white">
								Asura<span className="text-indigo-400">TECH</span>
							</span>
						</a>
						<a
							href="/"
							className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to home
						</a>
					</div>
				</header>

				{/* Main content */}
				<main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

					{/* Loading State */}
					{isLoading && (
						<motion.div
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="space-y-8"
						>
							<div className="text-center space-y-3">
								<div className="mx-auto h-5 w-48 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
								<div className="mx-auto h-4 w-32 rounded-lg bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
							</div>
							<div className="mx-auto max-w-[820px] rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden" style={{ aspectRatio: '1.414 / 1' }}>
								<div className="h-full w-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
							</div>
						</motion.div>
					)}

					{/* Error State */}
					{isError && (
						<motion.div
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="flex flex-col items-center justify-center py-24 text-center"
						>
							<div className="relative mb-6">
								<div className="w-16 h-16 rounded-2xl bg-red-500/[0.08] border border-red-500/20 flex items-center justify-center">
									<svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
									</svg>
								</div>
								<div className="absolute inset-0 rounded-2xl bg-red-500/10 blur-xl" />
							</div>
							<h3 className="text-lg font-semibold text-slate-200">Certificate Not Found</h3>
							<p className="mt-2 text-sm text-slate-500 max-w-xs leading-relaxed">
								{error?.status === 404
									? 'This certificate does not exist or may have been removed.'
									: 'An error occurred while verifying this certificate. Please try again.'
								}
							</p>
							<a
								href="/"
								className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
							>
								<ArrowLeft className="w-4 h-4" />
								Go to Homepage
							</a>
						</motion.div>
					)}

					{/* Success State — Certificate Display */}
					{certificate && (
						<motion.div
							variants={staggerContainer}
							initial="hidden"
							animate="visible"
							className="space-y-8"
						>
							{/* Page Header */}
							<motion.div variants={fadeUp} className="text-center space-y-3">
								<p className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
									Certificate Verification
								</p>
								<h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
									{certificate.recipient_name}
								</h1>
								<p className="text-sm text-slate-500">
									{certificate.webinar_title}
								</p>
							</motion.div>

							{/* Verification Badge */}
							<motion.div variants={fadeUp} className="flex justify-center">
								<VerificationBadge issuedDate={certificate.created_at} />
							</motion.div>

							{/* Certificate Card */}
							<motion.div
								variants={fadeUp}
								className="relative w-full flex justify-center"
								ref={wrapperRef}
							>
								{/* Ambient glow behind certificate */}
								<div className="absolute -inset-4 rounded-3xl bg-blue-500/[0.04] blur-2xl pointer-events-none" />
								
								<div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-4 sm:p-6 md:p-8 overflow-hidden w-full flex justify-center" style={{ height: 580 * scale + 64 }}>
									<div 
										className="origin-top" 
										style={{ transform: `scale(${scale})` }}
									>
										<CertificateCard
											certificate={certificate}
											innerRef={certRef}
										/>
									</div>
								</div>
							</motion.div>

							{/* Download Button */}
							<motion.div variants={fadeUp} className="flex justify-center">
								<motion.button
									onClick={handleDownload}
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
									transition={{ type: "spring", stiffness: 400, damping: 30 }}
									className="inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-[box-shadow,background] duration-300"
								>
									<Download className="w-4 h-4" />
									Download Certificate
								</motion.button>
							</motion.div>

							{/* Certificate ID footer */}
							<motion.div variants={fadeUp} className="text-center">
								<p className="text-xs text-slate-600">
									Certificate ID: <span className="font-mono text-slate-500">{certificate.uuid}</span>
								</p>
							</motion.div>
						</motion.div>
					)}
				</main>

				{/* Footer */}
				<footer className="relative z-10 border-t border-white/[0.04] mt-12">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
						<p className="text-xs text-slate-600">
							© {new Date().getFullYear()} AsuraTECH. All rights reserved.
						</p>
					</div>
				</footer>
			</div>

			{/* Shimmer animation CSS */}
			<style>{`
				@keyframes shimmer {
					0% { background-position: -200% center; }
					100% { background-position: 200% center; }
				}
				.animate-shimmer {
					animation: shimmer 2s linear infinite;
				}
			`}</style>
		</>
	);
}
