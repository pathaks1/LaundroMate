import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#016b40",
          "secondary": "#501e89",
          "accent": "#9dd3f9",
          "neutral": "#18171c",
          "base-100": "#e7e3ed",
          "info": "#53c6e9",
          "success": "#56e1a5",
          "warning": "#f8dc54",
          "error": "#eb6685",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config
