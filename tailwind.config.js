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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        terciary: "var(--terciary)",
        white: "var(--white)",
        alter1: "var(--alter1)",
        alter2: "var(--alter2)",
        alter3: "var(--alter3)",
        alter4: "var(--alter4)",
      },
      fontFamily: {
        poppins: ["Poppins"],
        manrope: ["Manrope"],
      },
    },
  },
  plugins: [],
};
