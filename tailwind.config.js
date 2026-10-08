/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        canvas: '#0B0F17',
        surface: {
          50: '#1A2130',
          100: '#151C2A',
          200: '#111723',
          card: '#131926',
          border: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.04)',
        },
        brand: {
          50: '#EEF2FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          accent: '#4F46E5',
        },
      },
      boxShadow: {
        'card': '0 4px 24px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)',
        'card-hover': '0 12px 36px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(99, 102, 241, 0.3)',
        'modal': '0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'pill': '0 2px 8px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
