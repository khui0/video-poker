import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import version from "vite-plugin-package-version";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    enhancedImages(),
    version(),
  ],
});
