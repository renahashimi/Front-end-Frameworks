/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        taviraj: ['Taviraj', 'serif'],
        rokkitt: ['Rokkitt', 'serif'],
        marcellus: ['Marcellus SC', 'serif'],
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
        'custom-light': '#F2EDE8',
        'custom-medium': '#E1D5C8',
        'custom-dark': '#9E7B58',
        'custom-deep': '#6B4D35',
        'custom-sale': '#B64961',
      },
      spacing: {
        100: '100px',
        200: '200px', 
      },
    },
  },
  plugins: [],
}
