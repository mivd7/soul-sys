/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lcars: {
          orange: '#FF9900',
          gold: '#FFCC00',
          blue: '#9999FF',
          purple: '#CC99CC',
          coral: '#FF9999',
          tan: '#FFCC99',
          background: 'rgba(0, 0, 0, 0.85)',
        }
      },
      fontFamily: {
        lcars: ['Antonio', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lcars': '24px',
      }
    },
  },
  plugins: [],
}