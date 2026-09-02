/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial "newsprint" system. One accent, locked across the whole site.
        paper: '#F6F4EF', // base background, warm newsprint white
        'paper-dim': '#EEEAE1', // alternating / recessed sections
        surface: '#FCFBF9', // raised cards
        ink: '#1B1A17', // primary text, warm near-black
        'ink-soft': '#3B3934', // secondary headings
        muted: '#6C6960', // secondary text (AA on paper)
        line: '#DBD6CA', // hairlines & borders
        'line-strong': '#C7C1B2',
        accent: '#C1372A', // editorial vermilion, large text / fills
        'accent-ink': '#97281C', // small text links (AA on paper)
        'accent-wash': '#F0E2DE', // faint accent tint background
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Franklin Gothic', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
      },
      letterSpacing: {
        'editorial': '0.18em',
      },
      maxWidth: {
        'prose-editorial': '68ch',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      target: 'modern',
      cssVariables: false,
    }),
  ],
}
