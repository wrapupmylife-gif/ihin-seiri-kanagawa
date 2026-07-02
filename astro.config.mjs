import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// ★公開前に必ず site を実際のドメインに変更してください。
//   sitemap.xml・canonical・OGP の絶対URLがこの値を基準に生成されます。
export default defineConfig({
  site: "https://ihin-seiri-kanagawa.wrapupmylife.workers.dev",

  integrations: [
    sitemap({
      // noindex のページ（プライバシーポリシー等）は sitemap から除外
      filter: (page) => !page.includes("/privacy"),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],

  build: {
    inlineStylesheets: "auto",
  },

  output: "hybrid",
  adapter: cloudflare()
});