# Football Now V1

GitHub Pages で動くサッカーニュース PWA です。

## 入っている機能
- Google News RSSを利用した最新サッカーニュース取得
- おすすめ / バルセロナ / 移籍 / Jリーグ / 欧州 / 日本代表
- 検索
- お気に入り（端末内に保存）
- 記事タップで元記事を開く
- 更新ボタン
- PWA / ホーム画面追加対応
- オフライン時のアプリ本体キャッシュ
- ニュース取得失敗時の前回データ表示

## GitHubでの入れ替え
既存の index.html / manifest.webmanifest / sw.js を、このフォルダの同名ファイルで置き換えてください。
icon-180.png と icon-512.png は今のリポジトリにあるものをそのまま使えます。

## 注意
ニュースはブラウザからRSS変換サービス経由で取得します。
外部サービス側の制限で一時的に取得できない場合は、前回取得したニュースを表示します。


## V1.1
- ブスケツ背景
- バルサ配色へ変更
- ニュースを公開日時の新しい順にソート
- 直近7日を優先表示
- バルセロナ検索条件を強化


## V1.2
- BARÇA X: @ReshadRahman / @HermosaCule / @FootballCule
- TRANSFER X: @FabrizioRomano
- バルサ/移籍カテゴリーで厳選X情報源を表示
- 各カードからXの最新投稿へ直接アクセス


## V1.3 Random Busquets
- ユーザー提供のブスケツ画像 27 枚を収録
- アプリを開くたびにランダムで背景を変更
- 同一セッション内で同じ画像が連続しにくい処理
- 縦長/横長画像で背景位置を自動調整
- BARÇA X / TRANSFER X 機能はそのまま維持

## V1.4 Matches
- 「試合」ページを実装
- 昨日 / 今日 / 明日の切り替え
- キックオフ時刻（日本時間）
- 試合中 / 終了スコア表示
- バルセロナの試合を優先表示
- SportScore APIを利用（CORS対応・APIキー不要）

## V1.5 J.League fix
- J1/J2/J3開幕節をJ.LEAGUE公式日程ベースで確実に表示
- 一般試合APIが日本の試合を返さなくてもJリーグは表示
- 「すべて / Jリーグ / 海外」フィルター追加
- 一般APIの試合とJリーグ公式日程をマージ

## V1.6 Friendlies + Pitch detail
- 2026/8/8の海外プレシーズン親善試合を追加
- 「親善試合」フィルター追加
- FRIENDLYバッジ
- 試合カードをタップすると試合詳細へ
- ピッチ型スターティングメンバー画面を追加
- 未発表時は「スタメン未発表」と表示
- 選手スタッツ画面の土台を追加

## V1.7 Barça Triangular
- Friuli Venezia Giulia Cupを日本時間8/9に表示
- Udinese vs Nottingham Forest: 第1試合 03:00 JST
- FC Barcelona vs Nottingham Forest: 第2試合
- Udinese vs FC Barcelona: 第3試合
- 全試合45分制を明示
- バルサ2試合は通常の優先ソートで上位表示
- 公式未発表の第2・第3試合の正確なKO時刻は捏造せず「第2試合 / 第3試合」で表示

## V1.8 Predicted → Official lineups
- SportMonks Expected Lineups対応のフロント実装
- 予想スタメン/正式スタメンの表示切替
- formation_fieldからピッチ上に選手を配置
- 選手タップで個人スタッツ表示
- Cloudflare Workerテンプレート追加（API tokenをGitHub Pagesに露出しない）
- FotMobは規約上スクレイピングせず、データ基盤は利用条件が明確なAPIを使用

## V1.9 Auto Schedule
- 手入力の試合日程を廃止
- APIから期間指定で自動取得する構造へ変更
- 1日 / 7日間 / 30日間
- 日付横スクロール
- HTML date picker
- 今後の日程も選択可能
- 日本時間基準
