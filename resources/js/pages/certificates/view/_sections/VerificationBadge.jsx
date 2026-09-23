import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar } from 'lucide-react';

/**
 * VerificationBadge — Displays a verified status indicator with issue date.
 * Animated entrance with Framer Motion.
 *
 * @param {string} issuedDate - ISO date string of when the certificate was created
 */
export default function VerificationBadge({ issuedDate }) {
	const formatted = new Date(issuedDate).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 16, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ delay: 0.6, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
			className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl
				border border-emerald-500/20 bg-emerald-500/[0.06] backdrop-blur-xl
				shadow-[0_0_30px_rgba(16,185,129,0.12)]"
		>
			<div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/20">
				<ShieldCheck className="w-5 h-5 text-emerald-400" />
			</div>
			<div>
				<p className="text-sm font-semibold text-emerald-400">
					Verified Certificate
				</p>
				<div className="flex items-center gap-1.5 mt-0.5">
					<Calendar className="w-3 h-3 text-slate-500" />
					<p className="text-xs text-slate-500">
						Issued on {formatted}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
