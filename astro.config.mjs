import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false })],
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  i18n: {
    routing: {      
      prefixDefaultLocale: true
    },
    locales: ["fi", "en"],
    defaultLocale: "en"
  },
});