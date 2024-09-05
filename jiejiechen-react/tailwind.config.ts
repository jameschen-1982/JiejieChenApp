import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import tailwindcssforms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/assets/background.jpg')",
      },
    },
  },
  plugins: [
    daisyui,
    tailwindcssforms
  ],
  daisyui: {
    darkTheme: false,
  },
};
export default config;
