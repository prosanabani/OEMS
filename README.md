## Features

- ⚡️ [React 18](https://react.dev/), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing with layouts support](https://github.com/ws-rush/unplugin-remix-router)

- 📦 [Components auto importing](./app/components)

- 🐻 [State Management via zustand](https://github.com/pmndrs/zustand)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🔤 [Remote fonts](https://github.com/unocss/unocss/tree/main/packages/preset-web-fonts) (for self hosted fonts use `FontSource` [install](https://fontsource.org/fonts/red-hat-text/install))

- 🌍 [I18n ready](https://lingui.dev/)

<!-- - 📲 [PWA](https://github.com/antfu/vite-plugin-pwa) -->

- 📥 [APIs auto importing](https://github.com/unjs/unimport)

- 🏷️ [Manage meta tsgs](https://react.dev/blog/2024/04/25/react-19#support-for-metadata-tags)

- 🖼 [Transform and Optmize images](https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite)

- 🦾 TypeScript, of course

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest),

- ☁️ Deploy on Netlify, zero-config

- 🔗 [Top Level Await](https://www.npmjs.com/package/vite-plugin-top-level-await) out of box

- 🔎 Inspect code with - [Vite Inspect](https://github.com/antfu/vite-plugin-inspect), and UnoCSS, visit them at `/__inspect` and `__unocss`. also open compnents in editor with [Alt + Right-Click](https://github.com/ArnaudBarre/vite-plugin-react-click-to-component)


> for component preview add [Preview.js](https://marketplace.visualstudio.com/items?itemName=zenclabs.previewjs) to vscode

<br>

## Try it now!

> Reactive requires Node >=14.18


## Make sure pnpm is installed!

> Reactive prefers using pnpm


### Clone to local

If you prefer to do it manually with the cleaner git history

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Remove the `.github` folder
- [ ] Clean up the READMEs and remove routes
- [ ] Remove tests and write your own

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:5173

```bash
pnpm run dev
```

### Lintfixing

To lint fix the entire project, run

```bash
pnpm lint:fix
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.


## Expanding the ESLint configuration 

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
