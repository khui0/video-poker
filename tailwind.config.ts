import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [typography, daisyui, containerQueries],

  daisyui: {
    themes: [
      {
        light: {
          accent: "#1349a5",
          "accent-content": "#ffffff",
          neutral: "#525252",
          "neutral-content": "#dcdcdc",
          error: "#de4343",
          "error-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#eaeaea",
          "base-300": "#d9d9d9",
          "base-content": "#232323",
        },
      },
    ],
  },

  theme: {
    extend: {},
  },
} satisfies Config;
