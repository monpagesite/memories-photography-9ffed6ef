/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#1A1A1A',
        accent: '#06B6D4',
        background: '#FAFAF9',
        surface: '#F5F5F4',
        text: '#0A0A0A',
        light: '#F1F1EE',
        'text-muted': '#737373',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      lineHeight: {
        tighter: '0.95',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
}
