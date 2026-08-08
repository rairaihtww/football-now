# V1.8 スタメン自動取得セットアップ

この版では画面側は以下に対応しています。

- 予想スタメン → ピッチ表示
- 正式スタメン発表後 → 「✓ 正式スタメン」へ自動切替
- formation_field / grid を使ったピッチ配置
- 選手タップ → 試合スタッツ表示
- 既存のニュース、Xリンク、Jリーグ、親善試合、ブスケツ背景は維持

## データ元

予想スタメンには SportMonks の Expected Lineups を使う設計です。
正式スタメン、フォーメーション、選手スタッツも SportMonks から同じ試合IDで取得できます。

FotMob は参考・確認先としては便利ですが、利用規約上、自動クローラー等による体系的取得が禁止されているため、
Football Now のバックエンドから直接スクレイピングする設計にはしていません。

## なぜ worker.js が必要？

GitHub Pages の index.html に API token を書くと誰でも見られてしまいます。
そのため Cloudflare Worker 等に token を秘密として保存し、Football Now は Worker 経由でデータを受け取ります。

## 接続手順

1. SportMonks で API token を取得
2. Cloudflare Workers で新規 Worker を作成
3. このZIPの worker.js を貼り付ける
4. Worker の Secret に `SPORTMONKS_TOKEN` を登録
5. Worker をデプロイし、URLをコピー
6. Football Now をSafari/Chromeで一度開き、開発者コンソールで以下を実行

localStorage.setItem('footballNowApiBase','https://あなたのWorkerURL')

7. アプリを再読み込み

これで `/fixtures?date=YYYY-MM-DD` から、予想/正式スタメンと試合情報を取得する準備が整います。

※ SportMonks の契約プラン・リーグごとに Expected Lineups / stats のカバレッジは異なります。
