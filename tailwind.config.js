// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta de colores para el proyecto
        'primary': '#2563eb', // Azul principal
        'primary-hover': '#1d4ed8',
        'secondary': '#3b82f6', // Azul más claro
        'accent': '#60a5fa', // Azul muy claro
        'panel': 'rgba(15, 23, 42, 0.85)', // Fondo del panel (slate-900 con opacidad)
        'panel-border': 'rgba(59, 130, 246, 0.4)', // Borde azul semitransparente
        'text-main': '#e2e8f0', // Texto principal (slate-200)
        'text-secondary': '#94a3b8', // Texto secundario (slate-400)
        'text-accent': '#60a5fa', // Texto de acento (blue-400)
      },
      backdrop_blur: {
        'xl': '24px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};