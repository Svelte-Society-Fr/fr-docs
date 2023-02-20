---
title: Créer une application
---

Ce tutoriel est construit pour que vous vous familiarisiez avec le processus d'écriture de composants. Mais au bout d'un moment, vous aurez envie d'écrire vos composants dans le confort de votre éditeur de texte préféré.

Tout d'abord, vous aurez besoin d'un outil de compilation pour vous servir de Svelte. Nous recommandons d'utiliser [SvelteKit](https://kit.svelte.dev), qui met en place [Vite](https://vitejs.dev/) et [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte/) pour vous...


```bash
npm create svelte@latest myapp
```

Il existe également un certain nombre d'[outils gérés par la communauté](https://sveltesociety.dev/tools).

Si vous êtes relativement débutant•e dans le développement web, ne vous inquiétez pas si vous n'avez jamais utilisé ces outils. Nous avons préparé le guide [Svelte for new developers](/blog/svelte-for-new-developers), qui vous guidera pas-à-pas.

Vous aurez certainement besoin de configurer votre éditeur de texte. Il y a des <span class='vo'>[_plugins_](https://sveltesociety.dev/tools#editor-support)</span> pour la plupart des éditeurs à la mode, ainsi qu'[une extension VS Code officielle](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).


<!--
NOTE: Removed until we have better place for setting-up-your-editor guide. https://github.com/sveltejs/svelte/pull/7310#issuecomment-1049923609
If your editor does not have a Svelte plugin then you can follow [this guide](/blog/setting-up-your-editor) to configure your text editor to treat `.svelte` files the same as `.html` for the sake of syntax highlighting. -->

Une fois que votre projet est en place, utiliser des composants Svelte est très simple. Le compilateur transforme chaque composant en une classe JavaScript classique — vous n'avez qu'à l'importer et l'instancier avec `new` :

```ts
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// nous verrons les props plus tard
		answer: 42
	}
});
```

Vous pouvez interagir avec l'`app` en utilisant l'[<span class='vo'>_API_</span> de composant](/docs#run-time-client-side-component-api) si besoin.

