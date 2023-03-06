---
title: onDestroy
---

Pour exécuter du code lorsque votre instance est détruite, utilisez `onDestroy`.

Par exemple, nous pouvons ajouter une fonction `setInterval` lorsque notre composant s'instancie, et supprimer l'intervalle lorsqu'il n'est plus pertinent. Cela permet d'éviter des fuites de mémoire.

```html
<script>
	import { onDestroy } from 'svelte';

	let counter = 0;
	const interval = setInterval(() => counter += 1, 1000);

	onDestroy(() => clearInterval(interval));
</script>
```

Bien qu'il soit important d'exécuter les fonctions de cycle de vie pendant l'instantiation du composant, peu importe **l'endroit** depuis lequel vous les exécutez. Nous pouvons notamment extraire la logique de l'intervalle dans une fonction utilitaire que nous définissons dans `utils.js`...

```ts
import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}
```

...et l'importer dans notre composant :

```html
<script>
	import { onInterval } from './utils.js';

	let counter = 0;
	onInterval(() => counter += 1, 1000);
</script>
```

Ouvrez et fermer le timer plusieurs fois, et vérifiez bien que le compteur et votre processeur commencent à s'affoler. Cela est dû à une fuite de mémoire liées aux précédents intervalles qui n'ont jamais été supprimés. N'oubliez pas de rafraîchir la page avant de résoudre l'exemple.
