import React from 'react';
import { CheckCircle, Globe, Server, Cpu, ArrowRight } from 'lucide-react';

const CATEGORIES = [
    {
        key: 'web',
        icon: Globe,
        color: 'bg-indigo-600',
        lightColor: 'bg-indigo-50 text-indigo-600',
        title: 'Web & Applications',
        tagline: 'Beautiful, fast and scalable digital products.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        items: [
            'Custom-built websites',
            'WordPress & GoHighLevel',
            'SaaS platform development',
            'Desktop, mobile & web apps',
        ],
    },
    {
        key: 'infra',
        icon: Server,
        color: 'bg-violet-600',
        lightColor: 'bg-violet-50 text-violet-600',
        title: 'Infrastructure & Security',
        tagline: 'Resilient, secure, and always-on networks.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        items: [
            'Network infrastructure design',
            'Firewall setup & hardening',
            'VLAN segmentation & SD-WAN',
            'Starlink & WAN deployments',
        ],
    },
    {
        key: 'install',
        icon: Cpu,
        color: 'bg-emerald-600',
        lightColor: 'bg-emerald-50 text-emerald-600',
        title: 'Hardware & Installation',
        tagline: 'End-to-end on-site setup and commissioning.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        items: [
            'Server rack setup & cabling',
            'CCTV system installation',
            'IT rack commissioning',
            'On-site maintenance plans',
        ],
    },
];

export default function Services() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CATEGORIES.map(({ key, icon: Icon, color, lightColor, title, tagline, image, items }) => (
                <article
                    key={key}
                    className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col"
                >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                        {/* Icon badge */}
                        <span className={`absolute bottom-3 left-4 flex items-center justify-center w-10 h-10 rounded-xl ${color} shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                        </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-5">
                        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{tagline}</p>

                        <ul className="mt-4 space-y-2 flex-1">
                            {items.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="#contact"
                            className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${lightColor} px-3 py-1.5 rounded-lg w-fit group-hover:gap-2.5 transition-all`}
                        >
                            Talk to us
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </article>
            ))}
        </div>
    );
}

