/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#211842",
        lightBlue: "#36314e",
        red: "#fe3f60",
        yellow: "#ffc600",
        white: "#ffffff",
        green: "#1addc2",
      },
    },
  },
  plugins: [],
};
