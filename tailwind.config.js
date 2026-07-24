/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EFEDE4',
        paperDark: '#E3E0D3',
        ink: '#2B2A26',
        pine: {
          DEFAULT: '#22392E',
          light: '#345244',
          dark: '#162720'
        },
        turmeric: {
          DEFAULT: '#C98A2B',
          light: '#E0A94F'
        },
        brick: {
          DEFAULT: '#B23A2E',
          light: '#C85B4F'
        },
        line: '#C7C2B4'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        nota: '0 2px 0 0 rgba(43,42,38,0.08), 0 12px 24px -12px rgba(43,42,38,0.25)'
      }
    }
  },
  plugins: []
}
