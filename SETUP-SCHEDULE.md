# Football Now V1.9 — 自動試合日程

V1.9では、コードに直接書いていたJリーグ・親善試合の日程を廃止しました。
日程はバックエンドから期間指定で自動取得します。

## 試合ページ
- 1日
- 7日間
- 30日間
- 横スクロールの日付選択
- カレンダーから任意の日付へ移動
- 日本時間表示
- バルセロナは一覧上部へ優先
- Jリーグ / 海外 / 親善試合フィルター
- 先の日程も同じ仕組みで取得

## 接続
V1.8と同じく、API tokenをGitHub Pagesへ直接置かないため worker.js を使います。

1. SportMonks tokenを用意
2. Cloudflare Workerを作る
3. worker.jsをデプロイ
4. Secret `SPORTMONKS_TOKEN` を設定
5. Football Now側で Worker URLを `footballNowApiBase` に設定

注意: SportMonksの契約プランによって取得可能なリーグ・機能が異なります。
worker.js のリーグフィルターIDは、実際に契約したプランのリーグIDに合わせて調整してください。
