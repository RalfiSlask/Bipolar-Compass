import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-96': 'calc(100vh - 96px)',
      },
      colors: {
        'primary-accent': '#46737c',
        'primary-light': '#eff7f7',
        'primary-medium': '#659598',
        'primary-border': '#a1b8bd',
        'primary-dark': '#19505b',

        'secondary-light': '#D0E8E6',
        'secondary-dark': '#25424e',

        'tertiary-light': '#fff5f0',
        'tertiary-medium': '#d6c4a8',
        'tertiary-dark': '#7d3819',

        'dark': '#202020',

        'footer-color': '#1a1f20',

        /* Replaces tailwinds custom colors */

        'gray-700': '#374151',
        'gray-300': '#d1d5db',
      },
      keyframes: {
        'modal-slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'modal-slide-up': 'modal-slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
