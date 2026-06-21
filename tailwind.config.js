/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
        neutral: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
          700: '#475569', 800: '#1e293b', 900: '#0f172a',
        },
        dark: { bg: '#0f0f1a', card: '#1a1a2e', surface: '#252540' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: { 'glass-pulse': 'glassPulse 4s ease-in-out infinite' },
      keyframes: { glassPulse: { '0%,100%': { opacity: '0.8' }, '50%': { opacity: '1' } } },
    },
  },
  plugins: [],
}
