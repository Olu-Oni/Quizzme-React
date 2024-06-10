/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '550px', 
      },
      gridTemplateColumns: {
        // Custom grid templates
        'custom-1': '58% auto'
        },
        gridTemplateRows: {
          // Custom grid templates
          'custom-1': '38% auto'
          },

    },
  },
  plugins: [],
}