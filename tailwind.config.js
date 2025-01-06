/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '5px': '5px',
      },
      width : {
        '520px' : '520px'
      },
      backgroundColor : {
        'thumb' : '#f4f4f4'
      }
    },
  },
  plugins: [],
}

