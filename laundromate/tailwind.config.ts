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
          "primary": {
            "khaki": "#C4AF9A"
          },
          "secondary": "#447cff",
          "accent": "#c5ef8b",
          "neutral": "#252230",
          "base-100": "#333144",
          "info": "#648ee8",
          "success": "#0d684a",
          "warning": "#f9b848",
          "error": "#e04262",
          "lightgrey": "#6b7280",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config
