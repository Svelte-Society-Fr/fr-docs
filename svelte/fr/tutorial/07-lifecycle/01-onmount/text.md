---
title: onMount
---

Chaque instance de composant possède un **cycle de vie** qui débute lorsqu'elle est créée, et qui se termine lorsqu'elle est détruite. Il existe plusieurs fonctions qui vous permettent d'exécuter du code à des moments clés de ce cycle de vie.

Celle que vous utiliserez le plus souvent est `onMount`, qui s'exécute après le tout premier rendu de l'instance dans le <span class="vo">_DOM_</span>. Nous l'avons déjà brièvement croisée [plus tôt dans ce tutoriel](/tutorial/bind-this) lorsque nous avions besoin d'interagir avec un élément `<canvas>` après son rendu.

Nous allons ajouter un gestionnaire `onMount` qui va charger de la donnée sur le réseau :

```html
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`/tutorial/api/album`);
		photos = await res.json();
	});
</script>
```
> Il est recommandé de mettre l'appel à `fetch` dans `onMount` plutôt qu'à la racine du `<script>` à cause du rendu côté serveur (<span class="vo">_SSR_</span>). À l'exception de `onDestroy`, les fonctions de cycle de vie ne sont pas exécutées lors du <span class="vo">_SSR_</span>, ce qui nous permet d'éviter de télécharger de la donnée qui devrait être récupérée à la volée une fois que le composant a été monté dans le <span class="vo">_DOM_</span>.

Les fonctions de cycle de vie doivent être appelées pendant que l'instantiation du composant, de sorte que la fonction de rappel (<span class="vo">_callback_</span>) soit liée à l'instance — pas (par ex.) dans un `setTimeout`.

Si le <span class="vo">_callback_</span> de `onMount` retourne une fonction, celle-ci sera exécutée à la destruction de l'instance.
