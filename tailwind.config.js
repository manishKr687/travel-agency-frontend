/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#1a73e8', // A strong blue for primary actions
          '50': '#e8f0fe',
          '100': '#d2e3fc',
          '200': '#a7c6f7',
          '300': '#7ba9f1',
          '400': '#508deb',
          '500': '#1a73e8',
          '600': '#165fbc',
          '700': '#104b90',
          '800': '#0b3664',
          '900': '#062039',
          '950': '#03101c',
        },
        'accent': {
          DEFAULT: '#e91e63', // A vibrant pink for accents
          '50': '#fce4ec',
          '100': '#f8bbd0',
          '200': '#f48fb1',
          '300': '#f06292',
          '400': '#ec407a',
          '500': '#e91e63',
          '600': '#d81b60',
          '700': '#c2185b',
          '800': '#ad1457',
          '900': '#880e4f',
          '950': '#4a052b',
        },
        'gray': {
          DEFAULT: '#4a5568', // A standard dark gray for text
          '50': '#f7fafc',
          '100': '#edf2f7',
          '200': '#e2e8f0',
          '300': '#cbd5e0',
          '400': '#a0aec0',
          '500': '#718096',
          '600': '#4a5568',
          '700': '#2d3748',
          '800': '#1a202c',
          '900': '#062039',
          '950': '#03101c',
        },
        // You can add more custom colors here (e.g., 'success', 'warning', 'danger')
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '0.5': '0.125rem', // 2px
        '2.5': '0.625rem', // 10px
        '3.5': '0.875rem', // 14px
        '13': '3.25rem',   // 52px
        '15': '3.75rem',   // 60px
        '18': '4.5rem',   // 72px
      },
      maxWidth: {
        'container': '1200px', // A common max-width for main content
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
