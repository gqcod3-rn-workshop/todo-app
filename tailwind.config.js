/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/presentation/**/*.{js,jsx,ts,tsx}",
    "./src/shared/components/**/*.{js,jsx,ts,tsx}",
    "./src/shared/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [
    require("nativewind/preset")
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A3780',
        secondary: '#E0E0E0'
      }
    },
  },
  plugins: [],
}

