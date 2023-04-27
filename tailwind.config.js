/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  // These paths are just examples, customize them to match your project structure
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
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
        'divider': '#d5d5d5',

        'primary-dark': '#087e7b',
        'secondary-dark': '#32adaa',
        'danger-dark': '#b4251b',
        'accept-dark': '#499f13',
        'inactive-dark': '#414141',
        'divider-dark': '#a9a9a9',

        red: {
          550: '#F42E32'
        },

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
      },
      borderRadius: {
        'rs': '5px',
        'rm': '10px',
        'rl': '20px',
      },
      boxShadow: {
        'button': '0 6px 18px -5px',
      },
      backgroundColor: {
        'primary': '#089E9B',
        'secondary': '#40e7e4',
        'danger': '#EA3023',
        'accept': '#5fd316',
        'inactive': '#575757FF',
        'divider': '#d5d5d5',
      }
    },
  },
  plugins: [],
}

