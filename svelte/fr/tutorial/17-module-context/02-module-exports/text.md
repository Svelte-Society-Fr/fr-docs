---
title: Exports
---

Tout ce qui est exporté par un bloc `<script context="module">` devient un export du module. Si nous exportons une fonction `stopAll` depuis `AudioPlayer.svelte`...

```html
<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>
```

...nous pouvons alors l'importer dans `App.svelte`...

```html
<script>
	import AudioPlayer, { stopAll } from './AudioPlayer.svelte';
</script>
```

...et nous en servir dans un gestionnaire d'évènement :

```html
<button on:click={stopAll}>
	arrêter tous les lecteurs
</button>
```

> Vous ne pouvez pas définir d'export par défaut, car le composant **est** l'export par défaut.
