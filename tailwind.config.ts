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
        // Tertiary colors (yellow tones)
        'tertiary-light': '#fcd961', // Light yellow
        'tertiary-medium': '#f9b732', // Medium yellow
        'tertiary-dark': '#f4c31f', // Dark yellow

        // Primary colors (green tones)
        'primary-light': '#d6e9d8', // Light green
        'primary-medium': '#045346', // Medium green
        'primary-dark': '#13404f', // Dark green

        // Secondary colors (teal tones)
        'secondary-light': '#2ebe7e', // Light teal
        'secondary-medium': '#257f69', // Medium teal
        'secondary-dark': '#1e594f', // Dark teal

        // Quaternary colors (orange tones)
        'quaternary-light': '#f5be99', // Light orange
        'quaternary-medium': '#e58748', // Medium orange
        'quaternary-dark': '#c5672d', // Dark orange

        // Neutral colors
        beige: '#f8f4ed', // Neutral beige
        'footer-color': '#1a1f20', // Footer dark gray
      },
    },
  },
  plugins: [],
} satisfies Config;
