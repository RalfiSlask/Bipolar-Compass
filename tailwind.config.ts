import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#46737c',
        'primary-light': '#eff7f7',
        'primary-medium': '#659598',
        'primary-border': '#a1b8bd',
        'primary-dark': '#19505b',

        'secondary-light': '#D0E8E6',
        'secondary-dark': '#25424e',

        'tertiary-light': '#fff5f0',
        'tertiary-medium': '#EDE8D0',
        'tertiary-dark': '#aa5535',

        'light': '#b0d9d566',
        'dark': '#202020',

        'footer-color': '#1a1f20', // Footer dark gray
        'beige': '#f5f5dc', // Beige color
        'gray-700': '#374151',
        'gray-300': '#d1d5db',
      },
    },
  },
  plugins: [],
} satisfies Config;
