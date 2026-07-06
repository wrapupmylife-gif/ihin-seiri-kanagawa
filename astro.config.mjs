import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// =============================================================
// kanagawa-shukatsu.com のサブディレクトリ /ihin-seiri/ で公開する構成。
// - site + base から sitemap.xml・canonical・OGP の絶対URLが生成される
// - outDir を dist/ihin-seiri にして、Cloudflare Workers の静的アセット
//   （アセットディレクトリ = dist）がそのまま /ihin-seiri/* のURLに一致する
// - 記事(.md)内のルート相対リンクはビルド時に base を自動付与（下のプラグイン）
// =============================================================

const BASE = "/ihin-seiri";

function rehypePrefixInternalLinks() {
  const walk = (node) => {
    if (node.type === "element" && node.tagName === "a") {
      const href = node.properties?.href;
      if (
        typeof href === "string" &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith(`${BASE}/`) &&
        href !== BASE
      ) {
        node.properties.href = BASE + href;
      }
    }
    if (node.children) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: "https://kanagawa-shukatsu.com",
  base: BASE,
  outDir: `./dist${BASE}`,
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      // noindex のページ（プライバシーポリシー等）は sitemap から除外
      filter: (page) => !page.includes("/privacy"),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  markdown: {
    rehypePlugins: [rehypePrefixInternalLinks],
  },
  build: {
    inlineStylesheets: "auto",
  },
});