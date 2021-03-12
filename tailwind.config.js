module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {
    backgroundColor: ['focus', 'active'],
    borderColor: ['active'],
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}
