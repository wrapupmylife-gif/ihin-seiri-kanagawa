// =============================================================
// 記事の公開判定（日付による自動公開）。
//
// 公開される条件: draft が false かつ publishedAt が「今日(JST)以前」。
//   - publishedAt を未来日にしておくと、その日が来るまで自動で非表示。
//   - draft: true は日付に関係なく強制非表示（執筆中の保険）。
//
// ※静的サイトのため、未来日の記事は「再ビルド」されて初めて表に出ます。
//   毎日の自動再ビルドは .github/workflows/daily-rebuild.yml で行います。
// =============================================================
import { getCollection, type CollectionEntry } from "astro:content";

type ArticleData = CollectionEntry<"articles">["data"];

// 日本時間(JST)での「今日」を YYYY-MM-DD で返す
export function todayJst(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

// 公開条件の判定
export function isPublished(data: ArticleData, today = todayJst()): boolean {
  return !data.draft && data.publishedAt.slice(0, 10) <= today;
}

// 公開済み記事を「公開日の新しい順」で取得
export async function getPublishedArticles(): Promise<CollectionEntry<"articles">[]> {
  const today = todayJst();
  return (await getCollection("articles"))
    .filter((entry) => isPublished(entry.data, today))
    .sort(
      (a, b) => Date.parse(b.data.publishedAt) - Date.parse(a.data.publishedAt),
    );
}
