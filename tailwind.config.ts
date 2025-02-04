import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          accent: "#382d7b",
          "accent-content": "#ffffff",
          neutral: "#525252",
          "neutral-content": "#dcdcdc",
          error: "#de4343",
          "error-content": "#ffffff",
          "base-100": "#111111",
          "base-200": "#202020",
          "base-300": "#252525",
          "base-content": "#ffffff",
        },
      },
    ],
  },
} satisfies Config;
