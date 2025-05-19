<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark), (max-height: 50px)" srcset="https://raw.githubusercontent.com/haruyukitanuki/kumoha-react/refs/heads/main/TanudenKumohaReact-LogoWhite.svg">
  <source media="(prefers-color-scheme: light), (max-height: 50px)" srcset="https://raw.githubusercontent.com/haruyukitanuki/kumoha-react/refs/heads/main/TanudenKumohaReact-LogoBlack.svg">
  <img src="https://raw.githubusercontent.com/haruyukitanuki/kumoha-react/refs/heads/main/TanudenKumohaReact-LogoBlack.svg" alt="Tanuden Kumoha Logo" width="40%">
</picture>
</p>
<br>
<p align="center">This library provides React hooks for easier integration with the core `@tanuden/kumoha` library for React projects.</p>
<br>

[![GitHub release](https://img.shields.io/github/release/haruyukitanuki/kumoha-react?include_prereleases=&sort=semver&color=388270)](https://github.com/haruyukitanuki/kumoha/releases/)
[![License](https://img.shields.io/badge/License-LGPL--2.1-388270)](#license)
[![dependency - @tanuden/kumoha](https://img.shields.io/badge/dependency-%40tanuden%2Fkumoha-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/package/@tanuden/kumoha)

> [!TIP]
> This documentation is available in English & Japanese<br>
> このドキュメントは英語版と日本語版があります。
> 
> [![docs - en](https://img.shields.io/static/v1?label=docs&message=en&color=397eed)](https://github.com/haruyukitanuki/kumoha-react/blob/main/README.md) 
> [![ドキュメント - ja](https://img.shields.io/static/v1?label=ドキュメント&message=ja&color=e32b47)](https://github.com/haruyukitanuki/kumoha-react/blob/main/README-ja.md)

---

### 🪝 Available Hooks

* **`useInitializeKumoha(uri, options?)`**
  Initializes the Kumoha engine. This must be called before using any other hook. Accepts an optional configuration including test data.

* **`useKumohaClientMeta()`**
  Provides real-time metadata about the client's connection status, current state, and login response.

* **`useKumohaData()`**
  Returns the current synced game state and data (`KumohaArisuData`).

* **`useKumoha()`**
  Exposes the underlying `Kumoha` engine instance. Useful for calling methods directly.
 
  This hook is especially important for users who want to use `sendButtonAction`. Use of other internal engine functions is intended for advanced users familiar with the inner workings of `@tanuden/kumoha`.

  For more details, refer to the main Kumoha library on GitHub: [@tanuden/kumoha](https://github.com/haruyukitanuki/kumoha)

### 📦 Installation

Install `@tanuden/kumoha-react` and its required dependencies `@tanuden/kumoha` and `opentetsu`:

```bash
npm install @tanuden/kumoha @tanuden/kumoha-react
npm install opentetsu -D
```

Make sure the packages are included in your project to ensure proper functionality.

### ⚙️ Usage

To get started, call `useInitializeKumoha()` at the top level of your component tree or inside a dedicated initialization component. All other hooks (`useKumohaClientMeta`, `useKumohaData`, and `useKumoha`) should only be used after initialization.

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

  // If you want to call Kumoha methods directly in other components, you can use this:
  // const kumoha = useKumoha();

  return (
    <div>
      <p>Connected: {clientMeta.connected ? 'Yes' : 'No'}</p>
      <p>Game state: {data.state}</p>
      {/* Refer to the main Kumoha documentation for more details on sendButtonAction */}
      <button onClick={() => kumoha.sendButtonAction('DoorOpn', 'pulse')}>Open Door</button>
    </div>
  );
};
```

> [!NOTE]
> Always call `useInitializeKumoha()` before using any other hooks from this library.

## 💾 Tanuden OSS
This project is licensed under the GNU Lesser General Public License v2.1 (LGPL-2.1).
For more details, please see the LICENSE file.

> [!IMPORTANT] 
> This repository may contain trademarks or logos owned by Tanukigawa Railway. Unauthorized use is prohibited.

## 💝 Support
If you have some spare change you'll like to contribute to my ramen fund (helps keep me filled while working on projects), visit my [Fanbox](https://haruyukitanuki.fanbox.cc). 

[Tanuden Discord Server](https://go.tanu.ch/tanuden-discord) | [Twitter](https://go.tanu.ch/twitter) | [YouTube](https://go.tanu.ch/tanutube)

**Tanukigawa Electric Railway | Copyright &copy; 2025 Haruyuki Tanukiji.**

