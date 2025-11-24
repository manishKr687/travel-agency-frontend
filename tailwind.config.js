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
          DEFAULT: '#0A4F4A', // Forest Green
          '50': '#E6F5F4',
          '100': '#D1EBE9',
          '200': '#A8D7D3',
          '300': '#7FC3BD',
          '400': '#56AFA7',
          '500': '#2D9B91',
          '600': '#0A4F4A',
          '700': '#083F3B',
          '800': '#062F2C',
          '900': '#04201D',
          '950': '#02100F',
        },
        'accent': {
          DEFAULT: '#FFC107', // Warm Yellow
          '50': '#FFF8E1',
          '100': '#FFECB3',
          '200': '#FFE082',
          '300': '#FFD54F',
          '400': '#FFCA28',
          '500': '#FFC107',
          '600': '#FFB300',
          '700': '#FFA000',
          '800': '#FF8F00',
          '900': '#FF6F00',
          '950': '#4D3800',
        },
        'secondary': {
          DEFAULT: '#20A1FF', // Sky Blue
          '50': '#F0F8FF',
          '100': '#E0F2FF',
          '200': '#C0E5FF',
          '300': '#A0D8FF',
          '400': '#80CBFF',
          '500': '#87CEEB',
          '600': '#60BFFF',
          '700': '#40B0FF',
          '800': '#20A1FF',
          '900': '#0092FF',
          '950': '#0080E0',
        },
        'tertiary': {
          DEFAULT: '#FF7F50', // Coral
          '50': '#FFEAE0',
          '100': '#FFD5C2',
          '200': '#FFC0A3',
          '300': '#FFAB85',
          '400': '#FF9666',
          '500': '#FF7F50',
          '600': '#FF6A3B',
          '700': '#FF5526',
          '800': '#FF4012',
          '900': '#FF2B00',
          '950': '#E02600',
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
