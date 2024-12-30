/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
      screens:{
        "3xl":"1580px",
        
      },
      keyframes: {
        loading: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }},
        animation: {
          'loading': 'loading 2s ease-in-out',
        },
      fontFamily: {
        sans: ['Poppins', 'serif'],
      },
  		colors: {
        geantSap:{
          primary:{
            5: "#E6F1EE",
            15: "#DDECE8",
            25: "#D5E7E2",
            50: "#CCE2DC",
            100: "#AACEC5",
            200: "#80B6A8",
            300: "#559D8A",
            400: "#2A856D",
            500: "#006C50",
            600: "#005A43",
            700: "#004835",
            800: "#003628",
          },
          gray: {
            5: "#F5F5F5",
            25: "#F0F0F0",
            50: "#DADADA",
            100: "#CBCBCC",
            200: "#ADADAE",
            300: "#909091",
            400: "#727273",
            500: "#545456",
            600: "#434345",
            700: "#323234",
          },
          error: {
            50: "#FFD8D6",
            100: "#FFBEBA",
            500: "#FF3B30",
            600: "#DD4433",
          },
          black: "#141414",
          bg: "#FCFCFC",
        }
      }
  	}
  },
  plugins: [require("tailwindcss-animate"),function ({ addUtilities }) {
    addUtilities({
      ".popover-content-width-same-as-its-trigger": {
        width: "var(--radix-popover-trigger-width)",
        "max-height": "var(--radix-popover-content-available-height)",
      },
    });
  },],
}

