/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#089E9B',
        'secondary': '#40e7e4',
        'danger': '#EA3023',
        'accept': '#5fd316',
        'inactive': '#575757FF',
        'divider': '#d5d5d5'
      },
      transitionDuration: {
        '250': '250ms',
      },
      translate: {
        'm1.5': '-1.5rem',
      },
      spacing: {
        's': '8px',
        'm': '16px',
        'l': '32px',
      }
    },
  },
  plugins: [],
}

