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

        'variant0': '#F42E32',
        'variant1': '#F29532',
        'variant2': '#E7D518',
        'variant3': '#18E76D',
        'variant4': '#2EF4F0',
        'variant5': '#196dda',
        'variant6': '#8D2EF4',
        'variant7': '#E71892',
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
      backgroundImage: {
        'buttonGradient': 'linear-gradient(#0000, rgb(0 0 0/40%)) top/100% 800%',
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

