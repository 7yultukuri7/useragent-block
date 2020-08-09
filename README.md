# Useraghent_block
7yultukuri7さんがNode.jsのサーバーの負荷を軽減させるために作成したモジュールです。

ユーザーエージェントから
* 脆弱性のあるブラウザー・OS　False
* バージョンが判別できないブラウザー・OS　False
* 7yultukuri7さんが設定したブラウザー　true(文字列で返されるのでtrueになります。)
```js
const ReactionController = require('useragent-block')
//こんなかんじ（適当）

const o = new Useraghent_block(
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
).getSupported_OS();
console.log(o)

const b = new Useraghent_block(
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
).getSupported_browser();
console.log(b)
```
