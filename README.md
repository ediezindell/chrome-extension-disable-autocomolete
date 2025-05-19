# disable-autocomplete

URLの指定した要素に対し、 `autocomplete="off"` を付与するだけの Chrome 拡張機能です。

# 使い方

Chrome ウェブストアには公開していませんので、以下の手順でインストールしてください。

1. [Releases ページ](https://github.com/ediezindell/chrome-extension-disable-autocomplete/releases) の最新の Release から ZIP ファイルをダウンロードします。
2. ダウンロードした ZIP ファイルを解凍します。
3. Chrome の拡張機能ページを開きます。
4. 「デベロッパーモード」をオンにします。
5. 「パッケージ化されていない拡張機能を読み込む」をクリックします。
6. 解凍したフォルダを選択します。
7. 拡張機能が追加されます。
8. 拡張機能のアイコンをクリックし、オプションページを開きます。
9. 「ADD SITE」ボタンから入力欄を追加します。
10. URL を入力し、 `autocomplete="off"` を付与したい要素のセレクタを入力します。 (開発者ツールで調べることができます)
    - 例: `https://example.com/` と `input[name="email"]`
    - 開発者ツールで要素を選択し、右クリックして「Copy > Copy selector」を選択すると、セレクタをコピーできます。
    - セレクタは、複数指定することもできます。 (カンマ区切り)
11. 「SAVE」ボタンをクリックします。
