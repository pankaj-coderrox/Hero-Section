import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fbf6eb",
        ink: "#17191d",
        forest: "#007a4c",
        emeraldDeep: "#00643f",
        mist: "#edf4ea"
      },
      boxShadow: {
        soft: "0 28px 70px rgba(11, 80, 52, 0.16)",
        button: "0 18px 34px rgba(0, 122, 76, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
