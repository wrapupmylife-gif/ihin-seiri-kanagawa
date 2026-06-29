# かながわ遺品整理ガイド（静的サイト雛形）

神奈川県の遺品整理・生前整理の「比較サイト」雛形です。Astro（静的サイト生成）でできています。
**広告（有料掲載）を直接営業して載せる**運用を前提に、編集コンテンツ（中立）と広告枠（有料・PR表記）を構造的に分けてあります。

## セットアップ

```bash
npm install
npm run dev      # ローカル開発（http://localhost:4321）
npm run build    # dist/ に静的書き出し
npm run preview  # ビルド結果の確認
```

Vercel / Cloudflare Pages / Netlify などにそのままデプロイできます（出力先 `dist/`）。
デプロイ後、`astro.config.mjs` と `src/config/site.ts` の `url` を本番URLに変更してください。

## ディレクトリ構成

```
ihin-seiri-kanagawa/
├── astro.config.mjs          # site(公開URL)などの設定
├── package.json
├── src/
│   ├── config/
│   │   └── site.ts           # サイト名・運営者・対応エリア・ナビ（ここを最初に編集）
│   ├── data/
│   │   ├── providers.ts      # 比較表の事業者データ（= 中立の編集情報）
│   │   └── ads.ts            # 広告枠データ（= 有料掲載。PR表記される）
│   ├── content/
│   │   ├── config.ts         # 記事のフロントマター定義
│   │   └── articles/         # ★記事は .md を1枚足すだけで増える
│   │       └── ihin-seiri-towa.md   # 遺品整理の記事テンプレ
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro       # 運営者情報・広告を含む旨の注記
│   │   ├── PrBadge.astro      # 「広告/PR」バッジ
│   │   ├── AdSlot.astro       # ★広告枠（PR表記つき・rel=sponsored）
│   │   └── ComparisonTable.astro  # ★比較表（中立・非ランキング）
│   ├── layouts/
│   │   └── BaseLayout.astro   # head/フォント/構造化データ
│   ├── pages/
│   │   ├── index.astro        # ★トップ（ヒーロー＋広告枠＋比較表＋新着）
│   │   ├── articles/
│   │   │   ├── index.astro    # 記事一覧
│   │   │   └── [...slug].astro# 記事描画（記事末に広告枠）
│   │   ├── advertise.astro    # 掲載をご希望の事業者へ（営業着地ページ）
│   │   ├── disclosure.astro   # 広告・PR表記ポリシー（ステマ規制対応）
│   │   ├── about.astro        # 運営者情報
│   │   └── privacy.astro      # プライバシーポリシー
│   └── styles/
│       └── global.css         # デザイントークン（配色・書体）
```

## よくある編集작업

### 記事を1本追加する
`src/content/articles/` に `.md` を1枚追加するだけ。フロントマターは既存記事をコピーして使う。
一覧・トップの新着・URL（`/articles/スラッグ/`）は自動で反映される。

### 比較表に事業者を追加する
`src/data/providers.ts` の配列に1件足す。これは**中立の編集情報**であり、有料枠ではない。

### 広告（有料掲載）を追加する
`src/data/ads.ts` の配列に1件足し、`active: true` に。表示したいページの該当箇所に
`<AdSlot slot="top" />` のように置く（slot: `top` / `article-inline` / `article-bottom` / `sidebar`）。
広告は必ず「広告」バッジ・広告主名・`rel="sponsored"` が付く。

## 設計上の重要ポイント（景表法・ステマ規制）

- **編集コンテンツ（中立）と広告枠（有料）を構造的に分離**。比較表＝`providers.ts`、広告＝`ads.ts`。
- 比較表は**ランキングではない**。並び順の基準を表のキャプションで明示している。
  順位づけする場合は料金・エリア等の客観的根拠を必ず併記する。
- 広告には**「広告/PR」表記**と広告主名を必須化（`AdSlot` が自動で出す）。
- 「No.1」「絶対」等の根拠なき断定や、有利誤認・優良誤認となる表現は使わない。
- 詳細は `/disclosure/`（広告・PR表記ポリシー）に明記。

## 次にやるとよいこと

- `src/config/site.ts` の運営者情報・連絡先を実値に。
- 比較表の事業者情報は、公式サイト等の一次情報で裏取りしてから掲載。
- 問い合わせはメール導線。フォームが必要なら外部フォーム（Googleフォーム等）にリンクが簡単。
- デプロイ後、エリア別記事（例「横浜市 遺品整理」）を足してSEOの土台を作る。
