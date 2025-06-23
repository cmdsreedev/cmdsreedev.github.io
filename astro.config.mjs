import { defineConfig } from "astro/config";
import github from "@astrojs/github";

export default defineConfig({
  site: "https://cmdsreedev.github.io",
  base: "/",
  integrations: [github()],
});
