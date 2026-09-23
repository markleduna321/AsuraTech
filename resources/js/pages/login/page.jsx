import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

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
		transition: { staggerChildren: 0.1, delayChildren: 0.1 }
	}
};

export default function LoginPage({ status, canResetPassword }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: '',
		password: '',
		remember: false,
	});

	const submit = (e) => {
		e.preventDefault();
		post(route('login'), {
			onFinish: () => reset('password'),
		});
	};

	return (
		<>
			<Head title="Log in | AsuraTECH" />

			<div className="min-h-screen bg-[#080C14] flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
				{/* Ambient background orbs */}
				<div className="pointer-events-none fixed inset-0 overflow-hidden">
					<div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
					<div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-600/5 blur-[150px]" />
				</div>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					animate="visible"
					className="relative z-10 w-full max-w-md space-y-8"
				>
					{/* Logo and Header */}
					<motion.div variants={fadeUp} className="text-center">
						<Link href="/" className="inline-flex items-center gap-2 mb-6 group">
							<span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300">
								<Zap className="w-5 h-5 text-white" />
							</span>
							<span className="text-2xl font-extrabold tracking-tight text-white">
								Asura<span className="text-indigo-400">TECH</span>
							</span>
						</Link>
						<h2 className="text-3xl font-bold tracking-tight text-white">
							Welcome back
						</h2>
						<p className="mt-2 text-sm text-slate-400">
							Sign in to your account to continue
						</p>
					</motion.div>

					{status && (
						<motion.div variants={fadeUp} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400">
							{status}
						</motion.div>
					)}

					{/* Login Form */}
					<motion.div
						variants={fadeUp}
						className="bg-[#111827]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
					>
						<form onSubmit={submit} className="space-y-6">
							<div className="space-y-4">
								{/* Email Input */}
								<div className="space-y-2">
									<label
										htmlFor="email"
										className="block text-sm font-medium text-slate-300"
									>
										Email address
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<Mail className="h-5 w-5 text-slate-500" />
										</div>
										<input
											id="email"
											type="email"
											name="email"
											value={data.email}
											className={`block w-full pl-11 pr-4 py-3 bg-white/[0.03] border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white/[0.06] transition-all duration-200 ${
												errors.email
													? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
													: 'border-white/[0.08] focus:border-indigo-500/50 focus:ring-indigo-500/20'
											}`}
											autoComplete="username"
											onChange={(e) => setData('email', e.target.value)}
											placeholder="you@example.com"
										/>
									</div>
									{errors.email && (
										<p className="text-sm text-red-400 flex items-center gap-1.5 mt-1.5">
											<AlertCircle className="w-4 h-4" />
											{errors.email}
										</p>
									)}
								</div>

								{/* Password Input */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="block text-sm font-medium text-slate-300"
										>
											Password
										</label>
										{canResetPassword && (
											<Link
												href={route('password.request')}
												className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
											>
												Forgot password?
											</Link>
										)}
									</div>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<Lock className="h-5 w-5 text-slate-500" />
										</div>
										<input
											id="password"
											type="password"
											name="password"
											value={data.password}
											className={`block w-full pl-11 pr-4 py-3 bg-white/[0.03] border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white/[0.06] transition-all duration-200 ${
												errors.password
													? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
													: 'border-white/[0.08] focus:border-indigo-500/50 focus:ring-indigo-500/20'
											}`}
											autoComplete="current-password"
											onChange={(e) => setData('password', e.target.value)}
											placeholder="••••••••"
										/>
									</div>
									{errors.password && (
										<p className="text-sm text-red-400 flex items-center gap-1.5 mt-1.5">
											<AlertCircle className="w-4 h-4" />
											{errors.password}
										</p>
									)}
								</div>
							</div>

							{/* Remember Me */}
							<div className="flex items-center">
								<input
									id="remember"
									name="remember"
									type="checkbox"
									checked={data.remember}
									onChange={(e) => setData('remember', e.target.checked)}
									className="h-4 w-4 rounded border-white/[0.1] bg-white/[0.05] text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0 focus:ring-2 transition-colors cursor-pointer"
								/>
								<label htmlFor="remember" className="ml-2 block text-sm text-slate-400 cursor-pointer">
									Remember me
								</label>
							</div>

							{/* Submit Button */}
							<div>
								<button
									type="submit"
									disabled={processing}
									className="group relative flex w-full justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#080C14] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{processing ? (
										<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
									) : (
										<>
											Sign in
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
										</>
									)}
								</button>
							</div>
						</form>
					</motion.div>
				</motion.div>
			</div>
		</>
	);
}
