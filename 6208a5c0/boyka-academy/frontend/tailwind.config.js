/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pitch: "#09090b",
          dark: "#121318",
          card: "#181a20",
          border: "#272a34",
          red: "#dc2626",
          redHover: "#b91c1c",
          amber: "#f97316",
          text: "#f8fafc",
          muted: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif']
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.35)',
        'glow-amber': '0 0 20px rgba(249, 115, 22, 0.35)',
      }
    },
  },
  plugins: [],
}
