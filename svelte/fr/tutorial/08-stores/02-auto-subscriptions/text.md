---
title: Abonnements automatiques
---

L'application de l'exemple précédent fonctionne, mais il y a un bug subtil — on s'abonne bien au <span class="vo">_store_</span>, mais on ne s'en désabonne jamais. Si le composant était instancié et détruit plusieurs fois, cela conduirait à une **fuite de mémoire**.

Commençons par déclarer `unsubscribe` dans `App.svelte` :

```ts
const unsubscribe = count.subscribe(value => {
	countValue = value;
});
```
> La méthode `subscribe` retourne une fonction `unsubscribe` quand on l'exécute.

Vous avez maintenant déclaré `unsubscribe`, mais vous avez toujours besoin de l'exécuter, par exemple grâce à la [méthode de cycle de vie `onDestroy`](/tutorial/ondestroy) :

```html
<script>
	import { onDestroy } from 'svelte';
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	let countValue;

	const unsubscribe = count.subscribe(value => {
		countValue = value;
	});

	onDestroy(unsubscribe);
</script>

<h1>Le compteur vaut {countValue}</h1>
```

Mais le code commence à devenir complexe, particulièrement si votre composant s'abonne à plusieurs <span class="vo">_stores_</span>.
Heureusement, Svelte a un atout dans sa manche — vous pouvez référencer la valeur d'un <span class="vo">_store_</span> en préfixant le nom du <span class="vo">_store_</span> avec `$` :

```html
<script>
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';
</script>

<h1>The count is {$count}</h1>
```

> Les abonnements automatiques ne marchent qu'avec des variables de <span class="vo">_store_</span> déclarées (ou importées) au niveau racine d'un composant.

Vous n'êtes pas non plus limité•e•s à utiliser `$count` dans le <span class="vo">_markup_</span> — vous pouvez également vous servir n'importe où dans le `<script>`, par exemple dans des gestionnaires d'évènement ou des déclarations réactives.

> Les noms commençant par `$` sont supposés faire référence à une valeur de store. C'est un caractère réservé — Svelte vous empêchera de déclarer vos propres variables avec le préfixe `$`.
