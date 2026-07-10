> [!CAUTION]
> **このスタンドアロンの `@tanuden/kumoha-react` リポジトリは非推奨（deprecated）となり、メンテナンスを終了しました。**
>
> 後継である **[Kumoha モノレポ](https://github.com/haruyukitanuki/kumoha)** に置き換えられました。`@tanuden/kumoha` と `@tanuden/kumoha-react` は現在このモノレポで一緒に開発されています。
>
> このリポジトリへの今後の更新・修正・サポートは行われません。

<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark), (max-height: 50px)" srcset="https://raw.githubusercontent.com/haruyukitanuki/kumoha-react/refs/heads/main/TanudenKumohaReact-LogoWhite.svg">
  <source media="(prefers-color-scheme: light), (max-height: 50px)" srcset="https://raw.githubusercontent.com/haruyukitanuki/kumoha-react/refs/heads/main/TanudenKumohaReact-LogoBlack.svg">
  <img src="https://raw.githubusercontent.com/haruyukitanuki/kumoha-react/refs/heads/main/TanudenKumohaReact-LogoBlack.svg" alt="Tanuden Kumoha Logo" width="40%">
</picture>
</p>
<br>
<p align="center">Reactプロジェクトで基本Kumohaライブラリを簡単に統合するためのReact Hookを提供します。</p>
<br>

[![GitHub release](https://img.shields.io/github/release/haruyukitanuki/kumoha-react?include_prereleases=&sort=semver&color=388270)](https://github.com/haruyukitanuki/kumoha/releases/)
[![License](https://img.shields.io/badge/License-LGPL--2.1-388270)](#license)
[![dependency - @tanuden/kumoha](https://img.shields.io/badge/dependency-%40tanuden%2Fkumoha-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/package/@tanuden/kumoha)

> [!TIP]
> This documentation is available in English & Japanese<br>
> このドキュメントは英語版と日本語版があります。
> 
> [![docs - en](https://img.shields.io/static/v1?label=docs&message=en&color=397eed)](https://github.com/haruyukitanuki/kumoha/blob/main/README.md) 
> [![ドキュメント - ja](https://img.shields.io/static/v1?label=ドキュメント&message=ja&color=e32b47)](https://github.com/haruyukitanuki/kumoha/blob/main/README-ja.md)

---

### 🪝 利用可能なフック

* **`useInitializeKumoha(uri, options?)`**
  Kumoha エンジンを初期化します。他のフックを使用する前に必ず呼び出す必要があります。テストデータなどを含むオプション設定を渡すことができます。

* **`useKumohaClientMeta()`**
  クライアントの接続状態、現在のステート、ログイン情報などのメタデータをリアルタイムで提供します。

* **`useKumohaData()`**
  現在のゲーム状態および同期された`KumohaArisuData`を返します。

* **`useKumoha()`**
  内部の`Kumoha`エンジンインスタンスに直接アクセスします。メソッドの直接呼び出しに使用します。

  `sendButtonAction`を使用したいユーザーにとって重要なフックです。他の関数の使用は、`@tanuden/kumoha`の内部動作に精通している上級ユーザー向けです。

  詳細はメインライブラリの GitHub を参照してください: [@tanuden/kumoha](https://github.com/haruyukitanuki/kumoha)

### 📦 インストール

`@tanuden/kumoha-react`とその依存関係である`@tanuden/kumoha`と`opentetsu`をインストールしてください:

```bash
npm install @tanuden/kumoha @tanuden/kumoha-react
npm install opentetsu -D
```

パッケージをプロジェクトに含めることで、正しく動作します。

### ⚙️ 使用方法

まず、`useInitializeKumoha()` をコンポーネントツリーの上位、または専用の初期化コンポーネント内で呼び出します。他のフック（`useKumohaClientMeta`、`useKumohaData`、`useKumoha`）は初期化後に使用してください。

```tsx
import {
  useInitializeKumoha,
  useKumohaClientMeta,
  useKumohaData,
  useKumoha,
} from '@tanuden/kumoha-react';

export const KumohaDemo = () => {
  const kumoha = useInitializeKumoha(`http://${window.location.hostname}:58680`);

  const clientMeta = useKumohaClientMeta();
  const data = useKumohaData();

  // 他のComponentでKumohaのメソッドを直接呼び出すために使用します
  // const kumoha = useKumoha();

  return (
    <div>
      <p>Connected: {clientMeta.connected ? 'Yes' : 'No'}</p>
      <p>Game state: {data.state}</p>
      {/* sendButtonAction の詳細についてはメインの Kumoha ドキュメントを参照してください */}
      <button onClick={() => kumoha.sendButtonAction('DoorOpn', 'pulse')}>ドアを開ける</button>
    </div>
  );
};
```

> [!NOTE] 
> このライブラリの他のフックを使用する前に、必ず useInitializeKumoha() を呼び出してください。

## 💾 タヌ電OSS
このプロジェクトはGNU LGPL v2.1のもとでライセンスされています。
詳細についてはLICENSEファイルをご覧ください。

> [!IMPORTANT] 
> このリポジトリには、狸河電鉄が所有するプロジェクト、製品、またはサービスの商標やロゴが含まれている場合があります。無断使用は禁止されています。

## 💝 サポート
もし開発支援としてラーメン代を恵んでくださる方がいらっしゃれば、私の[FANBOX](https://haruyukitanuki.fanbox.cc)までぜひ！

[タヌ電 Discordサーバー](https://go.tanu.ch/タヌ電-discord) | [Twitter](https://go.tanu.ch/twitter) | [YouTube](https://go.tanu.ch/tanutube)

**狸河電鉄作品｜Copyright &copy; 2025 Haruyuki Tanukiji.**