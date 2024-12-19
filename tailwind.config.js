/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        taviraj: ['Taviraj', 'serif'],
        rokkitt: ['Rokkitt', 'serif'],
        marcellus: ['Marcellus SC', 'serif'],
        advent: ['Advent Pro', 'serif'],  
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        'custom-light': '#E0DDDC',
        'custom-medium': '#998E8A',
        'custom-dark': '#655B58',
        'custom-deep': '#4A4340',
        'custom-sale': '#B23227',
      },
      spacing: {
        100: '100px',
        200: '200px', 
      },
    },
  },
  plugins: [],
}
