export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'shine': 'shine 1s',
        'line': 'lineGrow 1s ease-in-out',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' }
        },
        lineGrow: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        }
      }
    },
  },
  plugins: [],
}