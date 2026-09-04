/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: '.admin-shell',
  content: [
    './src/app/**/*.html',
    './src/app/**/*.ts',
    './src/index.html'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4fb',
          100: '#d9e6f7',
          200: '#b8cff0',
          300: '#8db3e3',
          400: '#5e8fd1',
          500: '#366ebd',
          600: '#28579a',
          700: '#1f4478',
          800: '#17335c',
          900: '#0b1f3a'
        }
      },
      boxShadow: {
        soft: '0 18px 40px rgba(11, 31, 58, 0.10)',
        panel: '0 12px 32px rgba(11, 31, 58, 0.08)'
      },
      borderRadius: {
        xl: '0.875rem'
      }
    }
  },
  corePlugins: {
    preflight: false
  }
};