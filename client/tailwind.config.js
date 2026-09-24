/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090E',
          900: '#0B0F17',
          850: '#111723',
          800: '#161F30',
          750: '#1E293B',
          700: '#334155'
        },
        brand: {
          50: '#ecfeff',
          100: '#cffaff',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
