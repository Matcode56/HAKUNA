module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'lavender' : 'var(--lavender)',
        'paleyellow' : 'var(--paleyellow)',
        'fontgray' : 'var(--fontgray)',
      },
      fontFamily: {
        'title': ['title', 'sans-serif' ],
        'subtitle': ['subtitle', 'sans-serif'],
        'paragraph': ['paragraph', 'sans-serif']
      }
    },
  },
  plugins: [],
}
