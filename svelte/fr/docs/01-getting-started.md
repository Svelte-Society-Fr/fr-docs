---
title: Démarrer avec Svelte
---

---

Pour essayer Svelte dans un environnement interactif, vous pouvez essayer le [REPL](https://svelte.dev/repl) ou [StackBlitz](https://node.new/svelte).

Pour créer un projet localement, nous recommandons d'utiliser [SvelteKit](https://kit.svelte.dev/), le framework d'application officiel créé par la team Svelte:

```
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```

SvelteKit se chargera d'exécuter [le compilateur Svelte](https://www.npmjs.com/package/svelte) pour convertir vos fichiers `.svelte` en fichiers `.js` qui créent le DOM, et en fichiers `.css` qui le stylisent. Il fournit également tout ce dont vous avez besoin pour créer une application web, comme un serveur de développement, du routage, et des outils de déploiement. [SvelteKit](https://kit.svelte.dev/) utilise [Vite](https://vitejs.dev/) pour empaqueter votre code et effectuer le rendu côté serveur (SSR). Il y a des [plugins pour les bundlers web majeurs](https://sveltesociety.dev/tools#bundling) pour gérer la compilation Svelte, tous capables de générer les `.js` et `.css` à insérer dans votre HTML, mais la plupart ne gèreront pas pas le SSR.

Si vous n'avez pas besoin d'un framework d'aplication mature, et préférez plutôt construire un site ou une application simple purement front-end, vous pouvez aussi utiliser Svelte (sans Kit) avec Vite en exécutant `npm init vite`, puis en choisissant l'option `svelte`. De cette manière, `npm run build` génèrera les fichiers HTML, JS et CSS dans le dossier `dist`.

La team Svelte maintient une extension [VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode), et des intégrations existent également pour d'autres [éditeurs](https://sveltesociety.dev/tools#editor-support) ou outils.

Si vous rencontrez des difficultés, vous trouverez de l'aide sur [Discord](https://svelte.dev/chat) ou sur [StackOverflow](https://stackoverflow.com/questions/tagged/svelte).
