# Changelog

## [1.0.0](https://github.com/tufusa/kaniwriter/compare/v1.4.0...v1.0.0) (2025-07-19)


### ⚠ BREAKING CHANGES

* チャンク最適化をv2のものに更新

### Features

* 　tryEnterWriteModeを追加した ([2520f5f](https://github.com/tufusa/kaniwriter/commit/2520f5fbcfd88b37ccc17eb4e8c47ccbda74ec56))
* Browser RouterからFramework Routerに移行 ([#474](https://github.com/tufusa/kaniwriter/issues/474)) ([a309cec](https://github.com/tufusa/kaniwriter/commit/a309ceccb69ecee4fd86869115bd8465876d4092))
* **experiment:** Sentryを試験的に導入 ([#549](https://github.com/tufusa/kaniwriter/issues/549)) ([87edb35](https://github.com/tufusa/kaniwriter/commit/87edb351155626ae01bda427cf3da6074a7dab47))
* **test:** Release Please App ([395fc25](https://github.com/tufusa/kaniwriter/commit/395fc25e91528119da8f3e81042616dbd0f863e0))
* verifyコマンドの実装,コマンドモードへの入り方をCRLFを送る形に変更 ([6b34c48](https://github.com/tufusa/kaniwriter/commit/6b34c48f8f77684ab8fb00199f629ce9ae0b6bc3))
* verifyの実装 ([1a0cc5a](https://github.com/tufusa/kaniwriter/commit/1a0cc5aa08ab8e56562eeae2e3efc6ffd00303a1))
* エラーをAlertではなく通知形式での表示に変更 ([#434](https://github.com/tufusa/kaniwriter/issues/434)) ([6d54b42](https://github.com/tufusa/kaniwriter/commit/6d54b4202cc1ab3b785692237badf4c0ff98f828))
* コンパイルエラー時にメッセージを表示 ([3a4679c](https://github.com/tufusa/kaniwriter/commit/3a4679ce7d6d1e22edb827a1bf96b4bf72ae5ad3))
* ソースコードをコピーできるようにした ([#559](https://github.com/tufusa/kaniwriter/issues/559)) ([1c5e9d0](https://github.com/tufusa/kaniwriter/commit/1c5e9d04df2b09e5a73d74c8f102e6e77164d916))
* バージョン番号をヘッダーに表示 ([#592](https://github.com/tufusa/kaniwriter/issues/592)) ([463f7e5](https://github.com/tufusa/kaniwriter/commit/463f7e5c08364daa996141707c75959e0f26bbf2))
* プログラムがない場合はソースコードタブを開けなくした ([#662](https://github.com/tufusa/kaniwriter/issues/662)) ([137c274](https://github.com/tufusa/kaniwriter/commit/137c27415d7d9fd8864ab4c077874615b0310d31))
* 多言語対応 ([a0f69a8](https://github.com/tufusa/kaniwriter/commit/a0f69a82ae672c6e88280c7a59140588e84439d5))
* 接続ボタンと切断ボタンを統合した ([#657](https://github.com/tufusa/kaniwriter/issues/657)) ([78c5fbf](https://github.com/tufusa/kaniwriter/commit/78c5fbfed10c9fdcd24c4bc03213f6b6012c7754))
* 日本語フォントをKosugi Maruに変更 ([#426](https://github.com/tufusa/kaniwriter/issues/426)) ([e9ad42c](https://github.com/tufusa/kaniwriter/commit/e9ad42ce6a264a742608d73f37a5fcf7c505f95d))
* 書き込み修了後にコードチェックするようにした ([85e6a2f](https://github.com/tufusa/kaniwriter/commit/85e6a2f26c806e0b6a42750783df5a23d5e5854d))
* 自動でverifyコマンドを送信できるようにした ([5ea90e4](https://github.com/tufusa/kaniwriter/commit/5ea90e4de59097cd202d61f0b4ed0e3d73a1beac))


### Bug Fixes

* ci実行時にちゃんと警告が出るように ([7c5aaab](https://github.com/tufusa/kaniwriter/commit/7c5aaabb81978cd068817ba9a32e865ad6f31564))
* CRC計算の修正，コメントアウトを外した ([0181003](https://github.com/tufusa/kaniwriter/commit/0181003ffaa770e459d0c50807ea96cfb88ebae4))
* CRLFを定期的に送るようにした ([8ed4c0e](https://github.com/tufusa/kaniwriter/commit/8ed4c0ea6bf61709fe61e483a1f5956bd650db7b))
* joyUIのAPI対応 ([ca95c38](https://github.com/tufusa/kaniwriter/commit/ca95c383d66678139cfe57745197ad3edc385dfe))
* **lint:** 依存配列を修正 ([9e72305](https://github.com/tufusa/kaniwriter/commit/9e72305cab436d71a6adb92ebfde62eb8c4004bb))
* Safariで背景のblurの表示がおかしくなるのを修正 ([e003043](https://github.com/tufusa/kaniwriter/commit/e00304316b2493112555566d473e28476e183bae))
* SSH時に環境変数が読み込まれない問題の修正 ([#617](https://github.com/tufusa/kaniwriter/issues/617)) ([975992a](https://github.com/tufusa/kaniwriter/commit/975992a2a5d1e7306b8d18d9cd8bbf98de9ab692))
* Typographyをmuiからjoyに修正 ([7ed79a2](https://github.com/tufusa/kaniwriter/commit/7ed79a28324e112d74fc1e7e4c782f8916b8a103))
* アップロード後にソースマップを削除する設定を追加 ([#553](https://github.com/tufusa/kaniwriter/issues/553)) ([89dfbdd](https://github.com/tufusa/kaniwriter/commit/89dfbddd0f3b008684966910d767fd8ff0635a6d))
* コマンドモードに入るキーワードの修正 ([3137aa0](https://github.com/tufusa/kaniwriter/commit/3137aa0594be2d3923917b74f21e62ec6ee9e51a))
* コマンドモードに入る方法の変更 ([01d3ff8](https://github.com/tufusa/kaniwriter/commit/01d3ff8645db42fc8f5ef6f7d1f61498ff771f1a))
* コマンドを送る部分にignoreResponseオプションを追加 ([dd39526](https://github.com/tufusa/kaniwriter/commit/dd39526c11ecf64ec40299e4b25ebeee05fdf064))
* スクリプトのパスを修正 ([#618](https://github.com/tufusa/kaniwriter/issues/618)) ([f29df8e](https://github.com/tufusa/kaniwriter/commit/f29df8e3eab791b7cfc8d30fb19f317cf9d97062))
* フォントを修正 ([41495f6](https://github.com/tufusa/kaniwriter/commit/41495f6f0aff991303aa1474b30945f35546b974))
* ベースURLを変更した場合にもURLが正しく解決されるよう修正 ([#533](https://github.com/tufusa/kaniwriter/issues/533)) ([f760e81](https://github.com/tufusa/kaniwriter/commit/f760e812dfcc32811ebf4dde6100279391c6d077))
* メインのBoxの高さをflexGrowで伸ばす ([#541](https://github.com/tufusa/kaniwriter/issues/541)) ([da4c94e](https://github.com/tufusa/kaniwriter/commit/da4c94e208e7ed5beffce30aa343d4d7eadc4b38))
* 入力したコマンドのまま送信できるように ([bf1e236](https://github.com/tufusa/kaniwriter/commit/bf1e236aa5fd8cdd1fdadad3c4ddbe0f9c8735b1))
* 実行したらwriteモードから抜けるようにした ([29f670e](https://github.com/tufusa/kaniwriter/commit/29f670e0475069275bbe39c8bc6c9ae42600f893))
* 実行ボタンを押したのちに切断するときにエラーが発生していたのを修正 ([6d77ca4](https://github.com/tufusa/kaniwriter/commit/6d77ca46e8b6e17f897bb22112908e4ba5da6c8a))
* 書き込みモード終了キーワードの変更 ([52649b2](https://github.com/tufusa/kaniwriter/commit/52649b27bcbd51daf2e2728f841d776f94691b3b))
* 自動検証が失敗したときにclearしていたのを削除 ([#530](https://github.com/tufusa/kaniwriter/issues/530)) ([9f640d9](https://github.com/tufusa/kaniwriter/commit/9f640d9f70a3483fb724a4390013ff96d215f7f8))
* 自動検証の場合の処理を自動実行の前に ([54adee3](https://github.com/tufusa/kaniwriter/commit/54adee38c2283491aa4857f045575b766cfbc838))
* 自動補完されるコマンド以外も送信できるように修正 ([b8f9617](https://github.com/tufusa/kaniwriter/commit/b8f9617624c020cfcf9db144117f68968b3f25ac))


### Miscellaneous Chores

* release 0.1.0 ([02a2537](https://github.com/tufusa/kaniwriter/commit/02a25376e2150718e6d28ed6234ddda571eb7943))
* release 0.2.0 ([#425](https://github.com/tufusa/kaniwriter/issues/425)) ([ab5e7f5](https://github.com/tufusa/kaniwriter/commit/ab5e7f5a4f8294f1be8f12a1c1a03a17c32c1ed5))
* release 1.0.0 ([#463](https://github.com/tufusa/kaniwriter/issues/463)) ([0382dc4](https://github.com/tufusa/kaniwriter/commit/0382dc44c26ca0850c342460259ef8c00376cf33))
* チャンク最適化をv2のものに更新 ([3c30b31](https://github.com/tufusa/kaniwriter/commit/3c30b31b0bb34c8254cae133450df5a0ac80e3a2))
* リリース v0.1.0 ([e97898c](https://github.com/tufusa/kaniwriter/commit/e97898cd8056f928c9830fb5d5feabe4d5e0d852))

## [1.4.0](https://github.com/poporonnet/kaniwriter/compare/v1.3.0...v1.4.0) (2025-06-27)


### Features

* バージョン番号をヘッダーに表示 ([#592](https://github.com/poporonnet/kaniwriter/issues/592)) ([463f7e5](https://github.com/poporonnet/kaniwriter/commit/463f7e5c08364daa996141707c75959e0f26bbf2))


### Bug Fixes

* SSH時に環境変数が読み込まれない問題の修正 ([#617](https://github.com/poporonnet/kaniwriter/issues/617)) ([975992a](https://github.com/poporonnet/kaniwriter/commit/975992a2a5d1e7306b8d18d9cd8bbf98de9ab692))
* スクリプトのパスを修正 ([#618](https://github.com/poporonnet/kaniwriter/issues/618)) ([f29df8e](https://github.com/poporonnet/kaniwriter/commit/f29df8e3eab791b7cfc8d30fb19f317cf9d97062))

## [1.3.0](https://github.com/poporonnet/kaniwriter/compare/v1.2.0...v1.3.0) (2025-05-18)


### Features

* ソースコードをコピーできるようにした ([#559](https://github.com/poporonnet/kaniwriter/issues/559)) ([1c5e9d0](https://github.com/poporonnet/kaniwriter/commit/1c5e9d04df2b09e5a73d74c8f102e6e77164d916))

## [1.2.0](https://github.com/poporonnet/kaniwriter/compare/v1.1.1...v1.2.0) (2025-05-10)


### Features

* **experiment:** Sentryを試験的に導入 ([#549](https://github.com/poporonnet/kaniwriter/issues/549)) ([87edb35](https://github.com/poporonnet/kaniwriter/commit/87edb351155626ae01bda427cf3da6074a7dab47))


### Bug Fixes

* アップロード後にソースマップを削除する設定を追加 ([#553](https://github.com/poporonnet/kaniwriter/issues/553)) ([89dfbdd](https://github.com/poporonnet/kaniwriter/commit/89dfbddd0f3b008684966910d767fd8ff0635a6d))

## [1.1.1](https://github.com/poporonnet/kaniwriter/compare/v1.1.0...v1.1.1) (2025-05-01)


### Bug Fixes

* 画面高が大きい場合にソースコードタブが画面下に揃わない問題を修正 ([#541](https://github.com/poporonnet/kaniwriter/issues/541)) ([da4c94e](https://github.com/poporonnet/kaniwriter/commit/da4c94e208e7ed5beffce30aa343d4d7eadc4b38))

## [1.1.0](https://github.com/poporonnet/kaniwriter/compare/v1.0.0...v1.1.0) (2025-04-26)


### Features

* Browser RouterからFramework Routerに移行 ([#474](https://github.com/poporonnet/kaniwriter/issues/474)) ([a309cec](https://github.com/poporonnet/kaniwriter/commit/a309ceccb69ecee4fd86869115bd8465876d4092))


### Bug Fixes

* ベースURLを変更した場合にもURLが正しく解決されるよう修正 ([#533](https://github.com/poporonnet/kaniwriter/issues/533)) ([f760e81](https://github.com/poporonnet/kaniwriter/commit/f760e812dfcc32811ebf4dde6100279391c6d077))
* 自動検証が失敗したときにclearしていたのを削除 ([#530](https://github.com/poporonnet/kaniwriter/issues/530)) ([9f640d9](https://github.com/poporonnet/kaniwriter/commit/9f640d9f70a3483fb724a4390013ff96d215f7f8))

## [1.0.0](https://github.com/poporonnet/kaniwriter/compare/v0.2.0...v1.0.0) (2025-03-18)


### Features

* エラーをAlertではなく通知形式での表示に変更 ([#434](https://github.com/poporonnet/kaniwriter/issues/434)) ([6d54b42](https://github.com/poporonnet/kaniwriter/commit/6d54b4202cc1ab3b785692237badf4c0ff98f828))
* 日本語フォントをKosugi Maruに変更 ([#426](https://github.com/poporonnet/kaniwriter/issues/426)) ([e9ad42c](https://github.com/poporonnet/kaniwriter/commit/e9ad42ce6a264a742608d73f37a5fcf7c505f95d))
* コードチェック機能の実装 ([#362](https://github.com/poporonnet/kaniwriter/pull/362)) ([d506e05](https://github.com/poporonnet/kaniwriter/commit/d506e05a1e59d7e2903b836a62156351a51d3fcd))
* WebSerialAPIに対応していないブラウザで開くと警告のモーダルを出す ([#331](https://github.com/poporonnet/kaniwriter/pull/331)) ([091503f](https://github.com/poporonnet/kaniwriter/commit/091503fdc8bdfd6e8fa549601054a8d9cad8a11c))


### Bug Fixes

* joyUIのAPI対応 ([ca95c38](https://github.com/poporonnet/kaniwriter/commit/ca95c383d66678139cfe57745197ad3edc385dfe))
* Safariで背景のblurの表示がおかしくなるのを修正 ([e003043](https://github.com/poporonnet/kaniwriter/commit/e00304316b2493112555566d473e28476e183bae))
* Typographyをmuiからjoyに修正 ([7ed79a2](https://github.com/poporonnet/kaniwriter/commit/7ed79a28324e112d74fc1e7e4c782f8916b8a103))
* フォントを修正 ([41495f6](https://github.com/poporonnet/kaniwriter/commit/41495f6f0aff991303aa1474b30945f35546b974))
* 自動検証の場合の処理を自動実行の前に ([54adee3](https://github.com/poporonnet/kaniwriter/commit/54adee38c2283491aa4857f045575b766cfbc838))


### Miscellaneous Chores

* release 1.0.0 ([#463](https://github.com/poporonnet/kaniwriter/issues/463)) ([0382dc4](https://github.com/poporonnet/kaniwriter/commit/0382dc44c26ca0850c342460259ef8c00376cf33))

## [0.2.0](https://github.com/poporonnet/kaniwriter/compare/v0.1.0...v0.2.0) (2025-02-20)


### ⚠ BREAKING CHANGES

* チャンク最適化をv2のものに更新

### Miscellaneous Chores

* release 0.2.0 ([#425](https://github.com/poporonnet/kaniwriter/issues/425)) ([ab5e7f5](https://github.com/poporonnet/kaniwriter/commit/ab5e7f5a4f8294f1be8f12a1c1a03a17c32c1ed5))
* チャンク最適化をv2のものに更新 ([3c30b31](https://github.com/poporonnet/kaniwriter/commit/3c30b31b0bb34c8254cae133450df5a0ac80e3a2))

## [0.1.0](https://github.com/poporonnet/kaniwriter/compare/v0.1.0...v0.1.0) (2024-12-04)


### Features

* 　tryEnterWriteModeを追加した ([2520f5f](https://github.com/poporonnet/kaniwriter/commit/2520f5fbcfd88b37ccc17eb4e8c47ccbda74ec56))
* localeを切り替えるセレクトボックス ([df65962](https://github.com/poporonnet/kaniwriter/commit/df659625af91207ee942305f4dbc5fdb607d593b))
* sendCommandに書き込みモードかを問わず送信するオプションを追加 ([77019ac](https://github.com/poporonnet/kaniwriter/commit/77019ac86527d5f3845ceabfcef04ffa2f78e7f5))
* Sendボタンで強制的に送信する ([dda3ca6](https://github.com/poporonnet/kaniwriter/commit/dda3ca6c4d504e111c1fb0ecee4a62bf9c155cb3))
* アイコンをホバーすると言語リストがフェードインする ([6c5b701](https://github.com/poporonnet/kaniwriter/commit/6c5b701678ac3c85f59f70dda49ff30b4a5540cd))
* エラーメッセージがない場合はモーダルを開けない ([bf2b4c5](https://github.com/poporonnet/kaniwriter/commit/bf2b4c5020ecbf9cb17bc11834a7af3cd086f5d5))
* エラーメッセージを表示 ([4b53fd1](https://github.com/poporonnet/kaniwriter/commit/4b53fd1a086ea9432c9be9f055ae5db8c2980e21))
* コードを表示する箇所のフォントと、横幅のスタイルを修正 ([58f955d](https://github.com/poporonnet/kaniwriter/commit/58f955dd4f01b6b713ed10f2fa7403ce48c790aa))
* コンパイラバージョンがlocalStorageに保存される ([3e612e8](https://github.com/poporonnet/kaniwriter/commit/3e612e8d3f494259060516d73f6727e243bd7865))
* コンパイラバージョンを取得するフックを追加 ([29a1f87](https://github.com/poporonnet/kaniwriter/commit/29a1f87d38f35418172cf348d2867b4be3f34ff7))
* コンパイラバージョンを選択するセレクトボックスを追加 ([2a617f8](https://github.com/poporonnet/kaniwriter/commit/2a617f8dea42f37321474b62e0d9d42404fe3342))
* テキストをi18nextで置き換え ([6f62757](https://github.com/poporonnet/kaniwriter/commit/6f6275701c97469131d06dcbaa70b49abe44a7bd))
* バージョンの差異に対応 ([1796aa4](https://github.com/poporonnet/kaniwriter/commit/1796aa4367bdb0ae72a82b106eb5b537e2408f0a))
* リンク先をリファレンスのURLに変更 ([d7b8cb0](https://github.com/poporonnet/kaniwriter/commit/d7b8cb04d488e3f8591220f7646bbab56b63ee31))
* 切断ボタンを追加 ([cefd900](https://github.com/poporonnet/kaniwriter/commit/cefd9006ee2a1c72a79a7e7883b1cdf51f636cc8))
* 多言語対応 ([a0f69a8](https://github.com/poporonnet/kaniwriter/commit/a0f69a82ae672c6e88280c7a59140588e84439d5))
* 安全に切断するdisconnect関数を追加 ([51a2406](https://github.com/poporonnet/kaniwriter/commit/51a24065e88871ece266402265d529c6378b8a23))
* 実行ボタンを追加 ([6eb97ac](https://github.com/poporonnet/kaniwriter/commit/6eb97aceaa12bc7dbb4e7023b0461c7c5a833786))
* 接続済みの時には接続ボタンをグレーアウトする ([a2dcd14](https://github.com/poporonnet/kaniwriter/commit/a2dcd14f8be5afeb728f957d1ad923b201236529))
* 送信したソースコードを見れるようにした ([e668f2b](https://github.com/poporonnet/kaniwriter/commit/e668f2b0d1db14534e703e71d19c65fa3bb851f4))


### Bug Fixes

* ci実行時にちゃんと警告が出るように ([7c5aaab](https://github.com/poporonnet/kaniwriter/commit/7c5aaabb81978cd068817ba9a32e865ad6f31564))
* CRLFを定期的に送るようにした ([8ed4c0e](https://github.com/poporonnet/kaniwriter/commit/8ed4c0ea6bf61709fe61e483a1f5956bd650db7b))
* **deps:** update emotion monorepo to v11.11.4 ([6530934](https://github.com/poporonnet/kaniwriter/commit/6530934a95dfba8838565b8e9a94f28acc4fb5a4))
* detectEventが反応する文字列をターゲットで変えるように ([b8376e3](https://github.com/poporonnet/kaniwriter/commit/b8376e37f6d25a326416734f333092dbd93f8cbe))
* jsonのパースに失敗する場合の対応 ([1eee739](https://github.com/poporonnet/kaniwriter/commit/1eee739a0b84019adad81776095a225256448920))
* linkタグのurlを修正 ([362cc86](https://github.com/poporonnet/kaniwriter/commit/362cc86db2cfa3de7a0e234eaff855d73bb6cd34))
* **lint:** catchにundefinedを返す関数を渡す ([430d54c](https://github.com/poporonnet/kaniwriter/commit/430d54cd39003f914b2aa633eabc5edf0e479277))
* **lint:** IResultの型を修正 ([24ebc44](https://github.com/poporonnet/kaniwriter/commit/24ebc4455c7741c60108dde5732befacdcedcd2a))
* **lint:** isTargetの引数型をstringに修正 ([1fa6f55](https://github.com/poporonnet/kaniwriter/commit/1fa6f5536da2a36816ae691b4fbaec27ff4d05fe))
* **lint:** Jobの型を修正 ([d68d2cf](https://github.com/poporonnet/kaniwriter/commit/d68d2cf5da252ea886bc2db4d5f06af3227596cf))
* **lint:** Loggerの型を修正 ([7804277](https://github.com/poporonnet/kaniwriter/commit/780427761f94f6cef481e80029b90ee08f6dc549))
* **lint:** whileの条件式を修正 ([5e620f0](https://github.com/poporonnet/kaniwriter/commit/5e620f00f99d56b705b79892085f83303043f5d2))
* **lint:** 不必要にPromiseを生成していたのを修正 ([c9973ff](https://github.com/poporonnet/kaniwriter/commit/c9973ff72255ba720a5ba19a72d5be0d927a1ef8))
* **lint:** 不必要にPromiseを生成していたのを修正 ([d2639f6](https://github.com/poporonnet/kaniwriter/commit/d2639f6ae6071ee3b475275f9de2adb925e85c50))
* **lint:** 依存リストを修正 ([8c613d7](https://github.com/poporonnet/kaniwriter/commit/8c613d77b092eaff0baf0a787b17d8885c1c198d))
* **lint:** 依存リストを修正 ([fdf7c95](https://github.com/poporonnet/kaniwriter/commit/fdf7c95bc368172e2102713f2ea56be0c30a9a77))
* **lint:** 依存配列を修正 ([9e72305](https://github.com/poporonnet/kaniwriter/commit/9e72305cab436d71a6adb92ebfde62eb8c4004bb))
* **lint:** 関数をuseCallbackでラップ ([4190c39](https://github.com/poporonnet/kaniwriter/commit/4190c39f8373272ea5fef8924618d4744462145d))
* localeをlocalStorageに保存し忘れていたのを修正 ([3f9dae1](https://github.com/poporonnet/kaniwriter/commit/3f9dae1b1533cbb31a24984f2bd1866c6b801264))
* **refactor:** ファイル名を変更 ([f0c1a80](https://github.com/poporonnet/kaniwriter/commit/f0c1a801a1e4ad6532d297b097bc4754db93173b))
* typo ([0e2820b](https://github.com/poporonnet/kaniwriter/commit/0e2820b3ba7c154653b8e823609a5eb78670241a))
* typo ([bc4ce8a](https://github.com/poporonnet/kaniwriter/commit/bc4ce8a729b5f20018a1d1ddf816e2b52e1b6764))
* **ui:** gap ([6bd97af](https://github.com/poporonnet/kaniwriter/commit/6bd97aff9e0d6bc57554149713cb278b2ac5ff2c))
* **ui:** コンパイルのエラーメッセージがずれる問題の修正 ([fc70934](https://github.com/poporonnet/kaniwriter/commit/fc709346c20aff0c644682d087ca7c643824f23b))
* **ui:** ログとボタンがずれる問題の修正 ([0867089](https://github.com/poporonnet/kaniwriter/commit/0867089e4f98435f4eb197f294a3c75521ba84d9))
* **ui:** ログの幅を以前とほぼ同じ幅にする ([9feaab4](https://github.com/poporonnet/kaniwriter/commit/9feaab4fbf84875e12525d850ca9ac45958666fb))
* **ui:** 不要なスタイルを削除、改行されないように ([8f4f4b8](https://github.com/poporonnet/kaniwriter/commit/8f4f4b823e9bcbe7317505c85baedbac1af0a32e))
* **ui:** 常にウィンドウサイズを覆うように ([0ca8033](https://github.com/poporonnet/kaniwriter/commit/0ca8033e79d910f736a9a83ed87a6317fcb23124))
* **ui:** 幅が小さいときにヘッダーが欠ける問題の修正 ([62d1452](https://github.com/poporonnet/kaniwriter/commit/62d1452a6834f708cd4c3c9a3a0062b9905b9ee6))
* **ui:** 操作ボタンをモニタの下に移動 ([35c8606](https://github.com/poporonnet/kaniwriter/commit/35c8606246631b7c3ebf40d5b08e09e13078a3ca))
* **ui:** 自動スクロールのチェックボックスを左下に移動 ([b5be5a7](https://github.com/poporonnet/kaniwriter/commit/b5be5a78ac5b5ff6f256888e605f0eedc4416917))
* useTranslationのimportの修正とコンポーネント名の変更 ([f6a9ef0](https://github.com/poporonnet/kaniwriter/commit/f6a9ef0eea7e7466314af618e43e61cd1130dd62))
* コマンドの末尾に改行を追加 ([f7d396d](https://github.com/poporonnet/kaniwriter/commit/f7d396d88577a311442584a9764cacf23d028031))
* コマンドモードに入るキーワードの修正 ([3137aa0](https://github.com/poporonnet/kaniwriter/commit/3137aa0594be2d3923917b74f21e62ec6ee9e51a))
* コマンドを送る部分にignoreResponseオプションを追加 ([dd39526](https://github.com/poporonnet/kaniwriter/commit/dd39526c11ecf64ec40299e4b25ebeee05fdf064))
* バージョンの取得に失敗した場合にローディングが表示され続けてしまう問題の修正 ([5a25e19](https://github.com/poporonnet/kaniwriter/commit/5a25e1965736451de27eef4da777680cd6dcff15))
* バージョン表記を`mrbc n.n.n`に修正 ([b09154e](https://github.com/poporonnet/kaniwriter/commit/b09154e315c20ea3de29d908c40e6d38fdd75641))
* ハイライターが変更されたらソースコードを再変換するように修正 ([81fb6b6](https://github.com/poporonnet/kaniwriter/commit/81fb6b6836a67de75b05d631b867977d94b0cb45))
* ファイル位置を修正 ([5f98078](https://github.com/poporonnet/kaniwriter/commit/5f98078b353572206bb286a959d6ccb935b0198c))
* ファイル名の変更 ([ad37261](https://github.com/poporonnet/kaniwriter/commit/ad372614f6c157cef060c90de09ecc25a12dec9f))
* メモリ使用量を制限 ([1aa4d74](https://github.com/poporonnet/kaniwriter/commit/1aa4d74bd6227bffe9f3c138cb930d13e3427a2f))
* 入力したコマンドのまま送信できるように ([bf1e236](https://github.com/poporonnet/kaniwriter/commit/bf1e236aa5fd8cdd1fdadad3c4ddbe0f9c8735b1))
* 全ての改行コードを置換するように修正 ([48e90b6](https://github.com/poporonnet/kaniwriter/commit/48e90b6ca30a271b1fd45cb1abb9df3db27db6d5))
* 受信したCRLFをLFに置換 ([329cae0](https://github.com/poporonnet/kaniwriter/commit/329cae0cfd10a7d49bf794221dfef939a09a244e))
* 横に長いプログラムが来たときにレイアウトが壊れるのを修正 ([af404eb](https://github.com/poporonnet/kaniwriter/commit/af404eb35c9876c2f816cd78ad862bc0a4ca8825))
* 自動実行をオフに ([33c1603](https://github.com/poporonnet/kaniwriter/commit/33c1603ef180eda0fc5fddce78292f76e7ed94f6))
* 関数内でjobを待機する ([83a7774](https://github.com/poporonnet/kaniwriter/commit/83a7774c739e056bcd88392e8cb58149ff312f09))


### Miscellaneous Chores

* release 0.1.0 ([02a2537](https://github.com/poporonnet/kaniwriter/commit/02a25376e2150718e6d28ed6234ddda571eb7943))
