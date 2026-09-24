import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Award } from 'lucide-react';

/**
 * CertificateCard — Renders the certificate visual matching the provided design.
 * 
 * Design: Blue geometric accents, gold medal, "CERTIFICATE OF PARTICIPATION" header,
 * recipient name, webinar title/date, appreciation text, speaker + coordinator signatures,
 * and an embedded QR code in the bottom-right.
 * 
 * @param {object}  certificate  - Certificate data from API
 * @param {object}  innerRef     - Ref for html-to-image capture
 */
export default function CertificateCard({ certificate, innerRef }) {
	const verificationUrl = certificate.verification_url;
	const formattedDate = new Date(certificate.webinar_date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	return (
		<div
			ref={innerRef}
			className="relative w-[820px] h-[580px] shrink-0 mx-auto bg-white rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
		>
			{/* ═══════════════ BACKGROUND DECORATIONS ═══════════════ */}

			{/* Top-left geometric blue accent */}
			<div className="absolute top-0 left-0 w-40 h-40 pointer-events-none">
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
					<div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-blue-600 to-blue-400" />
					<div className="absolute top-4 left-4 w-20 h-0.5 bg-blue-500/40 rotate-45 origin-left" />
					<div className="absolute top-2 left-6 w-16 h-16 border-l-2 border-t-2 border-blue-500/30 rounded-tl-lg" />
				</div>
				{/* Geometric triangle accents */}
				<svg className="absolute top-0 left-0 w-36 h-36 opacity-70" viewBox="0 0 140 140">
					<polygon points="0,0 120,0 0,120" fill="url(#blueGrad1)" />
					<polygon points="0,0 80,0 0,80" fill="url(#blueGrad2)" />
					<polygon points="0,0 45,0 0,45" fill="url(#blueGrad3)" />
					<defs>
						<linearGradient id="blueGrad1" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#1e40af" stopOpacity="0.15" />
							<stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
						</linearGradient>
						<linearGradient id="blueGrad2" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#1e40af" stopOpacity="0.25" />
							<stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
						</linearGradient>
						<linearGradient id="blueGrad3" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
							<stop offset="100%" stopColor="#2563eb" stopOpacity="0.15" />
						</linearGradient>
					</defs>
				</svg>
			</div>

			{/* Bottom-right geometric blue accent */}
			<div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none">
				<div className="absolute bottom-0 right-0 w-full h-full">
					<div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-blue-600 to-blue-400" />
					<div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-blue-600 to-blue-400" />
					<div className="absolute bottom-2 right-6 w-16 h-16 border-r-2 border-b-2 border-blue-500/30 rounded-br-lg" />
				</div>
				<svg className="absolute bottom-0 right-0 w-36 h-36 opacity-70" viewBox="0 0 140 140">
					<polygon points="140,140 20,140 140,20" fill="url(#blueGrad4)" />
					<polygon points="140,140 60,140 140,60" fill="url(#blueGrad5)" />
					<polygon points="140,140 95,140 140,95" fill="url(#blueGrad6)" />
					<defs>
						<linearGradient id="blueGrad4" x1="1" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor="#1e40af" stopOpacity="0.15" />
							<stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
						</linearGradient>
						<linearGradient id="blueGrad5" x1="1" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor="#1e40af" stopOpacity="0.25" />
							<stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
						</linearGradient>
						<linearGradient id="blueGrad6" x1="1" y1="1" x2="0" y2="0">
							<stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
							<stop offset="100%" stopColor="#2563eb" stopOpacity="0.15" />
						</linearGradient>
					</defs>
				</svg>
			</div>

			{/* Subtle circuit/tech pattern background */}
			<div className="absolute inset-0 pointer-events-none opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}}
			/>

			{/* ═══════════════ CERTIFICATE CONTENT ═══════════════ */}
			<div className="relative z-10 flex flex-col items-center justify-between h-full px-16 py-12">

				{/* Top section: Title */}
				<div className="flex flex-col items-center justify-center w-full mb-2">
					<div className="text-center w-full">
						<h1
							className="text-6xl font-black tracking-[0.2em] text-gray-800 leading-tight"
							style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
						>
							CERTIFICATE
						</h1>
						<p
							className="text-2xl font-semibold tracking-[0.35em] text-gray-600 mt-1"
							style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
						>
							OF PARTICIPATION
						</p>
					</div>
				</div>

				{/* Subtitle */}
				<p className="text-base text-gray-500 mt-4"
					style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
				>
					This certificate is proudly present to :
				</p>

				{/* Recipient Name */}
				<div className="mt-4 w-full max-w-lg text-center">
					<div className="border-b-2 border-yellow-500/60 pb-2">
						<p className="text-4xl font-bold text-gray-800 truncate px-4"
							style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
						>
							{certificate.recipient_name}
						</p>
					</div>
				</div>

				{/* Webinar Details */}
				<div className="mt-4 text-center space-y-1">
					<p className="text-sm text-gray-500"
						style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
					>
						for actively participating in the
					</p>
					<h2 className="text-xl font-bold text-gray-800 tracking-wide uppercase px-4">
						{certificate.webinar_title}
					</h2>
					<p className="text-sm text-gray-600"
						style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
					>
						held on {formattedDate}.
					</p>
				</div>

				{/* Appreciation text */}
				<p className="mt-3 text-sm text-gray-500 text-center max-w-lg leading-relaxed"
					style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
				>
					We extend our sincere appreciation for your participation, enthusiasm,
					and meaningful engagement throughout the event.
				</p>

				{/* Signatures + QR Code row */}
				<div className="mt-auto w-full flex items-end justify-between gap-4 relative z-20 pb-2">
					{/* Speaker signature */}
					<div className="flex-1 text-center relative flex flex-col items-center justify-end min-h-[4rem]">
						{certificate.speaker_signature_url && (
							<img 
								src={certificate.speaker_signature_url} 
								alt="Speaker Signature" 
								className="w-auto h-16 object-contain absolute bottom-[90%] -mb-2 mix-blend-multiply"
							/>
						)}
						<div className="border-t border-gray-300 pt-2 mx-8 w-full relative z-10">
							<p className="text-base font-bold text-gray-800"
								style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
							>
								{certificate.speaker_name}
							</p>
							<p className="text-sm font-medium text-yellow-600 italic">
								{certificate.speaker_role}
							</p>
						</div>
					</div>

					{/* QR Code — embedded on certificate */}
					<div className="flex flex-col items-center gap-1 flex-shrink-0">
						<div className="p-1.5 bg-white rounded-lg border border-gray-200 shadow-sm">
							<QRCodeSVG
								value={verificationUrl}
								size={64}
								level="M"
								bgColor="#ffffff"
								fgColor="#1e293b"
								includeMargin={false}
							/>
						</div>
						<span className="text-[8px] text-gray-400 font-medium tracking-wider uppercase">
							Scan to verify
						</span>
					</div>

					{/* Coordinator signature */}
					<div className="flex-1 text-center relative flex flex-col items-center justify-end min-h-[4rem]">
						{certificate.coordinator_signature_url && (
							<img 
								src={certificate.coordinator_signature_url} 
								alt="Coordinator Signature" 
								className="w-auto h-16 object-contain absolute bottom-[90%] -mb-2 mix-blend-multiply" 
							/>
						)}
						<div className="border-t border-gray-300 pt-2 mx-8 w-full relative z-10">
							<p className="text-base font-bold text-gray-800"
								style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
							>
								{certificate.coordinator_name}
							</p>
							<p className="text-sm font-medium text-yellow-600 italic">
								{certificate.coordinator_role}
							</p>
						</div>
					</div>
				</div>

				{/* Verified watermark */}
				<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-30">
					<ShieldCheck className="w-3 h-3 text-emerald-600" />
					<span className="text-[8px] text-emerald-700 font-semibold tracking-wider uppercase">
						Verified by AsuraTECH
					</span>
				</div>
			</div>
		</div>
	);
}
