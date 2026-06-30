// =============================================================
// 広告枠（= 有料掲載）のデータ。
// ここに入るものは「企業からお金をもらって載せる枠」です。
// 表示する AdSlot コンポーネントが、必ず「広告 / PR」バッジと
// 「有料掲載」の旨を出すようにしてあります（ステマ規制対応）。
//
// 編集記事（中立）と広告枠（有料）を構造的に分けるための入口。
// 営業して獲得した案件は、原則ここに追加 → ページに <AdSlot> を置く。
// =============================================================

export type Ad = {
  id: string;
  // 掲載スロットの位置キー（ページ側で slot を指定して呼び出す）
  // "area" は各エリアの比較表直下の広告枠（region でエリアを指定）。
  slot: "top" | "area" | "article-inline" | "article-bottom" | "sidebar";
  // slot="area" のときの対象エリア区分（site.ts の regions[].id）。
  // 省略すると全エリア共通の広告として扱う。
  region?: string;
  advertiser: string;       // 広告主名（PR表記とセットで明示）
  headline: string;
  body: string;
  ctaLabel: string;
  href: string;             // 遷移先（計測パラメータを付ける場合もここで）
  active: boolean;          // 掲載期間外は false にして非表示
};

// ダミー。契約した案件をここに追加していく。
export const ads: Ad[] = [
  {
    id: "ad-top-001",
    slot: "top",
    advertiser: "広告主サンプル株式会社",
    headline: "神奈川県全域・最短即日の訪問見積",
    body: "遺品整理から生前整理、特殊清掃まで。無料で見積もりに伺います。",
    ctaLabel: "無料で見積もりを依頼する",
    href: "https://example.com/lp?utm_source=ihin-guide&utm_medium=ad&utm_campaign=top",
    active: false,
  },
  {
    id: "ad-article-001",
    slot: "article-bottom",
    advertiser: "広告主サンプル株式会社",
    headline: "費用が不安な方へ：見積後の追加料金なし",
    body: "作業前に総額を提示。ご納得いただいてからの作業です。",
    ctaLabel: "料金の相談をする",
    href: "https://example.com/lp?utm_source=ihin-guide&utm_medium=ad&utm_campaign=article",
    active: false,
  },

  // --- 各エリア比較表の直下に出る広告枠（サンプル） ---
  // region を比較表の区分IDに合わせると、そのエリアにだけ表示されます。
  // 契約前のサンプルです。掲載しない場合は active:false にしてください。
  {
    id: "ad-area-yokohama-kawasaki",
    slot: "area",
    region: "yokohama-kawasaki",
    advertiser: "広告主サンプル株式会社",
    headline: "横浜・川崎エリア対応｜無料の訪問見積",
    body: "遺品整理・生前整理・特殊清掃まで。横浜市・川崎市は最短即日でお伺いします。",
    ctaLabel: "このエリアで無料見積もりを依頼",
    href: "https://example.com/lp?utm_source=ihin-guide&utm_medium=ad&utm_campaign=area-yokohama",
    active: false,
  },
  {
    id: "ad-area-shonan",
    slot: "area",
    region: "shonan",
    advertiser: "広告主サンプル株式会社",
    headline: "湘南エリア対応｜鎌倉〜平塚の整理はお任せ",
    body: "藤沢・茅ヶ崎・平塚など湘南沿岸エリアに対応。供養品の取り扱いもご相談ください。",
    ctaLabel: "このエリアで無料見積もりを依頼",
    href: "https://example.com/lp?utm_source=ihin-guide&utm_medium=ad&utm_campaign=area-shonan",
    active: false,
  },
  {
    id: "ad-area-kenou",
    slot: "area",
    region: "kenou",
    advertiser: "広告主サンプル株式会社",
    headline: "県央エリア対応｜厚木・海老名・伊勢原",
    body: "県央エリアの遺品整理・不用品回収・買取に対応。お見積もりは無料です。",
    ctaLabel: "このエリアで無料見積もりを依頼",
    href: "https://example.com/lp?utm_source=ihin-guide&utm_medium=ad&utm_campaign=area-kenou",
    active: false,
  },
  {
    id: "ad-area-seisho",
    slot: "area",
    region: "seisho",
    advertiser: "広告主サンプル株式会社",
    headline: "西湘エリア対応｜大磯以西・足柄も",
    body: "小田原・南足柄・箱根など西湘エリアに対応。空き家整理もご相談いただけます。",
    ctaLabel: "このエリアで無料見積もりを依頼",
    href: "https://example.com/lp?utm_source=ihin-guide&utm_medium=ad&utm_campaign=area-seisho",
    active: false,
  },
];

export function adsForSlot(slot: Ad["slot"]): Ad[] {
  return ads.filter((a) => a.active && a.slot === slot);
}

// エリア区分向けの広告を取得（region 指定なしの全エリア共通広告も含む）。
export function adsForArea(region: string): Ad[] {
  return ads.filter(
    (a) => a.active && a.slot === "area" && (!a.region || a.region === region),
  );
}
