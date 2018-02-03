# node.jsではじめるプログラミング入門

## node を起動する

コマンドを開いて `node` と入力します。
これでnode.jsが起動します。

```bash
$ node
```

## 数値と文字列

数値と文字列は値です。
文字列は`"`又は`'`で囲みます。

```js
> 123
123
> "あいうえお"
'あいうえお'
```

## 変数

次のように入力するとエラーが表示されます。

```bash
> あいうえお
ReferenceError: あいうえお is not defined
```

この`あいうえお`は値ではないため、変数になります。
値の入っていない（未定義）の変数を表示しようとするとエラーになります。

変数は値を代入したりすると宣言されます。

```bash
> あいうえお = 123
123
> あいうえお
123
```

```bash
> a = 123
123
> a
123
> y = 456
456
> z = x + y
579
> z
579
```

## エクセルファイルから値を取る

エクセルファイルから値を取得しましょう。

node.jsではライブラリを利用してプログラムを組みます。
ここでは、`xlsx`というライブラリを利用してエクセルファイル内のデータを読み込んでみます。

### ライブラリを使う

ライブラリを利用するにはパソコンにライブラリをダウンロードします。
次のコマンドを実行してダウンロードしてください。

```bash
$ npm install xlsx
```

ダウンロードが完了したらnode.jsを起動しましょう。

```js
> require('xlsx')
```

なにか沢山表示されていればダウンロードが成功している証拠です。
失敗していると次のように表示されます。

```bash
Error: Cannot find module 'xlsx'
    at Function.Module._resolveFilename (module.js:538:15)
    at Function.Module._load (module.js:468:25)
    at Module.require (module.js:587:17)
    at require (internal/module.js:11:18)
```

### エクセルファイルを読み込む

次のコマンドを打ってエクセルファイルが読み込める事を確認しましょう。

```js
> xlsx = require('xlsx')
> file = xlsx.readFile('Book.xlsx')
> sheet = file.Sheets['Sheet1']
> A1 = sheet['A1']
> A1.v
'家計簿'
```

### 連想配列と配列

連想配列は`key`と`value`の組み合わせを格納しているものです。（順不同）

`{` と `}`で囲まれており、`key : value`の組み合わせを`,`で区切ります。

```js
{"jp":"日本","cn":"中国","tw":"台湾"}
```

配列は値を順番に格納しているものです。

`[`と`]`で囲まれており、`,`で区切ります。

```js
["日本","中国","台湾"]
```

連想配列と配列の値の取り方は、`key`か`位置`かの違いだけです。

```js
> hash = {"jp":"日本","cn":"中国","tw":"台湾"}
> hash["jp"]
'日本'
```

```js
> arr = ["日本","中国","台湾"]
> arr[0]
'日本'
```

配列は0番から始まります。

### 連想配列の値の取り方

連想配列は次のような値の取り方もできます。

```js
> hash.jp
'日本'
```

## ファイルにプログラムを書く

毎回コマンドを打つのは面倒なのでファイルにプログラムを書きます。

node.jsを起動していた時と違い、表示は自動で行われません。次の方法で値を表示します。

```js
console.log("あいうえお")
```

```js
console.log(A1.v)
```

プログラムは次のコマンドを打つ事で実行できます。

```bash
$ node ファイルパス
```

## 引数を使う

プログラムは常に固定では使い勝手がよくありません。

**引数**を使ってファイル名や読み込む位置を変えてみましょう。
引数は`process.argv`に格納されています。

次のプログラムを作成して引数を加えて実行してみてください。

```js
console.log(process.argv)
```

```bash
$ node test.js あいうえお かきくけこ
[ 'C:\\Program Files (x86)\\nodejs\\node.exe',
  'プログラムファイルパス',
  'あいうえお',
  'かきくけこ' ]
```

引数が表示されましたか？
引数の0番目と1番目はnode.jsとプログラムファイルのパスが含まれています。


## 関数を作る

同じような処理を繰り返す場合、関数で処理をまとめると便利です。
関数は次のように宣言します。

```js
getCell = function(arg1, arg2) {
    return "戻り値"
}
```

セルの値を取得する処理を関数にしてみましょう。

```js
getCell = function(arg1, arg2) {
    xlsx = require('xlsx')
    file = xlsx.readFile(arg1)
    sheet = file.Sheets['Sheet1']
    value = sheet[arg2]
    return value.v
}
```

関数は定義しただけでは呼び出されません。

関数の呼び出しは関数名（変数）の後ろに`()`をつけます。引数がある場合は`()`内に`,`区切りで指定します。

```js
value = getCell("Book.xlsx", "A1")
```

## 繰り返し処理で値を取る

次のようにすることで、配列の値を順番に取得した処理が実行できます。（次の例以外にも書き方は沢山あります）

```js
["A1","A2","A3","A4"].forEach(function(value, index) {
    console.log(index + ":" + value);
})
```

```bash
$ node test2.js
0:A1
1:A2
2:A3
3:A4
```

繰り返し処理内で関数を呼び出してみましょう。

```js
["A1","A2","A3","A4"].forEach(function(value, index) {
    value = getCell("Book.xlsx", value);
    console.log(value);
})
```

## 関数をファイルから読み込む

何回も使う関数をコピー＆ペーストするのは大変です。

出来の良い関数はファイルから読み込めるようにしましょう。`get_cell.js`というファイルを作って下さい。

`module.exports`という変数に入れた値が、読み込む側で利用できるようになります。

```js
getCell = function(arg1, arg2) {
    xlsx = require('xlsx')
    file = xlsx.readFile(arg1)
    sheet = file.Sheets['Sheet1']
    value = sheet[arg2]
    return value.v
}

module.exports = getCell
```

ファイルの読み込みは次の方法で行います。（.jsは省略できます）

```js
getCell = require('./get_cell')
```

きちんと読み込めるか確認してみましょう。

```js
getCell = require('./get_cell')
value = getCell("Book.xlsx", "A1")
console.log(value)
```

