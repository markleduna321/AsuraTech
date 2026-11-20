import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Home palette "Plum & Mist" (#000 · #2b024a · #93879c · #f7f7f7), hue ~277°.
                // 900 = deep plum #2b024a (white text 17:1). 600 = #6a3497 (decorative glows only).
                plum: {
                    50: '#F7F2FB',
                    100: '#EEE4F6',
                    200: '#DCCBEC',
                    300: '#C1A8DB',
                    400: '#A27CC6',
                    500: '#8350AE',
                    600: '#6A3497',
                    700: '#55237D',
                    800: '#401364',
                    900: '#2B024A',
                    950: '#1A012D',
                },
                // 500 = mauve band #93879c (body text on #000 6.2:1). 700 = muted text in glass (~5.4:1). 300 = light borders.
                mauve: {
                    50: '#F7F6F8',
                    100: '#EDEAEF',
                    200: '#DDD7E1',
                    300: '#C9C1CF',
                    400: '#AEA4B6',
                    500: '#93879C',
                    600: '#776B81',
                    700: '#5B5066',
                    800: '#3F374A',
                    900: '#26212D',
                    950: '#16131A',
                },
                mist: {
                    DEFAULT: '#F7F7F7',
                },
                // Accent Phase A "aurora": magenta (hue ~337°) + iris violet bridge.
                // On black: 500 5.9:1, iris-400 7.6:1. White text only on 600 (5.05:1) / iris-600 (5.7:1).
                magenta: {
                    400: '#FF5C9D',
                    500: '#FF2E7E',
                    600: '#D6136B',
                    700: '#BE185D',
                },
                iris: {
                    300: '#C4B5FD',
                    400: '#A78BFA',
                    600: '#7C3AED',
                },
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-14px)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
                    '50%': { opacity: '0.9', transform: 'scale(1.06)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '200% 50%' },
                },
            },
            animation: {
                marquee: 'marquee 28s linear infinite',
                'fade-up': 'fadeUp 0.7s ease-out forwards',
                float: 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'text-shimmer': 'shimmer 4s linear infinite',
            },
        },
    },

    plugins: [forms],
};
