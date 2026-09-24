/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#d9e3f0',
          500: '#1e40af',
          800: '#002B49',
          900: '#0A2540',
        },
        brand: {
          blue: '#0066CC',
          blueHover: '#0052A3',
          navy: '#0A2540',
          navyDark: '#001A33',
          lightBg: '#F8FAFC',
          cardBg: '#FFFFFF',
          textDark: '#1F2937',
          textMuted: '#4B5563',
          accentGreen: '#16A34A',
          accentAmber: '#D97706',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
