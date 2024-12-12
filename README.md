# kaniwriter

Matz葉がにロボコン マイコン書き込みツール  
[コンパイルサーバはこちら](https://github.com/poporonnet/kanicc)

## 開発者向け情報

### requires

- Node.js(latest)
- pnpm(latest)

依存関係のインストール

```bash
pnpm i
```

サーバの起動(開発モード)
```bash
pnpm dev
```

ビルド(プロダクション用)

⚠️**デプロイ先がドメイン直下(`/`)でないと動作しません。**  
⚠️**パスを掘る場合は個別のビルド設定が必要です(ceres用はこの下にあります)。**

```bash
pnpm build
```

ビルド(ceres用)

⚠️**デプロイ先が`/writer`でないと動作しません。**

```bash
pnpm build:ceres
```

### Authors

| <img src="https://github.com/tufusa.png" width=100px /> | <img src="https://github.com/kiharu3112.png" width=100px /> | <img src="https://github.com/Suzune2741.png" width=100px /> | <img src="https://github.com/laminne.png" width=100px /> |
| :-----------------------------------------------------: | :---------------------------------------------------------: | :---------------------------------------------------------: | :------------------------------------------------------: |
|                         tufusa                          |                         kiharu3112                          |                         Suzune2741                          |                         laminne                          |