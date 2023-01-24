---
titre : Runtime
---

### `svelte`

Le paquet `svelte` expose les [fonctions de cycle de vie](/tutorial/onmount) et l'[API de contexte](/tutorial/context-api).

#### `onMount`

``js
onMount(callback : () => void)
```

```js
onMount(callback : () => () => void)
```

---

La fonction `onMount` permet d'executer un callback dès que le composant a été monté dans le DOM. Elle doit être appelée pendant l'initialisation du composant (mais elle n'a pas besoin de se trouver *à l'intérieur* du composant ; elle peut être appelée depuis un module externe).

`onMount` ne fonctionne pas à l'intérieur d'un [composant côté serveur] (/docs#run-time-server-side-component-api).

``sv
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('le composant est monté');
	});
</script>
```

---

Si une fonction est renvoyée par `onMount`, elle sera appelée lorsque le composant sera démonté.

```sv
<script>
	Importez { onMount } from 'svelte';

	onMount(() => {
		const interval = setInterval(() => {
			console.log('beep');
		}, 1000);

		return () => clearInterval(interval);
	});
</script>
```

> Ce comportement ne fonctionne que si la fonction passée à `onMount` renvoie une valeur de manière *synchrone*. Les fonctions `async` renvoient toujours un `Promise`, et en tant que telles ne peuvent pas renvoyer une fonction de manière *synchrone*.

#### `beforeUpdate`

``js
beforeUpdate(callback: () => void)
```

---

Planifie l'exécution d'un callback immédiatement avant la mise à jour du composant après tout changement d'état.

> La première execution du callback s'exécutera just avant l'appel à `onMount` initial.

```sv
<script>
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		console.log('le composant est sur le point de se mettre à jour');
	});
</script>
```

#### `afterUpdate`

``js
afterUpdate(callback: () => void)
```

---

Planifie un callback à exécuter immédiatement après la mise à jour du composant.

> La première execution du callback s'exécutera just après l'appel à `onMount` initial.

```sv
<script>
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		console.log('le composant vient d'être mis à jour');
	});
</script>
```

#### `onDestroy`

``js
onDestroy(callback: () => void)
```

---

Planifie un callback à exécuter immédiatement avant que le composant ne soit démonté.

Parmi `onMount`, `beforeUpdate`, `afterUpdate` et `onDestroy`, c'est le seul qui s'exécute dans un composant côté serveur.

``sv
<script>
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		console.log('le composant est détruit');
	});
</script>
```

#### `tick`

``js
promise: Promise = tick()
```

---

Renvoie une promesse qui se résout une fois que tous les changements d'état en attente ont été appliqués, ou dans la micro-tâche suivante s'il n'y en a pas.

```sv
<script>
	import { beforeUpdate, tick } from 'svelte';

	beforeUpdate(async () => {
		console.log('le composant est sur le point de se mettre à jour');
		await tick();
		console.log('le composant vient de se mettre à jour');
	});
</script>
```

#### `setContext`

``js
setContext(key: any, context: any)
```

---

Associe un objet `context` arbitraire avec le composant courant et la `key` spécifiée et retourne cet objet. Le contexte est alors disponible pour les enfants du composant (y compris le contenu en slot) avec `getContext`.

Comme les fonctions de cycle de vie, elle doit être appelée pendant l'initialisation du composant.

```sv
<script>
	import { setContext } from 'svelte';

	setContext('answer', 42);
</script>
```

> Le contexte n'est pas intrinsèquement réactif. Si vous avez besoin de valeurs réactives dans le contexte, alors vous pouvez passer un store dans le contexte, qui *va* être réactifs.

#### `getContext`

``js
context: any = getContext(key: any)
```

---

Récupère le contexte qui appartient au composant parent le plus proche avec la `clé` spécifiée. Doit être appelé pendant l'initialisation du composant.

```sv
<script>
	import { getContext } from 'svelte';

	const answer = getContext('answer');
</script>
```

#### `hasContext`

``js
hasContext: boolean = hasContext(key: any)
```

---

Vérifie si une `clé` donnée a été définie dans le contexte d'un composant parent. Doit être appelé pendant l'initialisation du composant.

```sv
<script>
	importez { hasContext } from 'svelte';

	if (hasContext('answer')) {
		// faites quelque chose
	}
</script>
```

#### `getAllContexts`

``js
contextes: Map<any, any> = getAllContexts()
```

---

Récupère l'ensemble de la carte des contextes appartenant au composant parent le plus proche. Doit être appelé pendant l'initialisation du composant. Utile, par exemple, si vous créez un composant de manière programmatique et que vous voulez lui passer le contexte existant.

```sv
<script>
	import { getAllContexts } from 'svelte';

	const contextes = getAllContexts();
</script>
```

#### `createEventDispatcher`

``js
dispatch: ((name: string, detail?: any, options?: DispatchOptions) => boolean) = createEventDispatcher();
```

---

Crée un répartiteur d'événements qui peut être utilisé pour répartir les [événements de composants] (/docs#template-syntaxe-component-directives-on-eventname). Les répartiteurs d'événements sont des fonctions qui peuvent prendre deux arguments : `name` et `detail`.

Les événements de composants créés avec `createEventDispatcher` créent un [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). Ces événements ne remontent pas la [chaine des événements (bubble)] (https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture). L'argument `detail` correspond à la propriété [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) et peut contenir tout type de données.

```sv
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button on:click="{() => dispatch('notify', 'detail value')}">Fire Event</button>
```

---

Les événements envoyés par les composants enfants peuvent être écoutés par leur parent. Toutes les données fournies lors de l'envoi de l'événement sont disponibles dans la propriété `detail` de l'objet événement.

```sv
<script>
	function callbackFunction(event) {
		console.log(`Notify fired ! Detail: ${event.detail}`)
	}
</script>

<Child on:notify="{callbackFunction}"/>
```

---

Les événements peuvent être annulés en passant un troisième paramètre à la fonction dispatch. La fonction renvoie `false` si l'événement est annulé avec `event.preventDefault()`, sinon elle renvoie `true`.

```sv
<script>
	Importez { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function notify() {
		const shouldContinue = dispatch('notify', 'detail value', { cancelable: true });
		if (shouldContinue) {
			// personne n'a appelé preventDefault
		} else {
			// un auditeur a appelé preventDefault
		}
	}
</script>
```

### `svelte/store`.

Le module `svelte/store` exporte des fonctions pour créer des magasins [readable](/docs#run-time-svelte-store-readable), [writable](/docs#run-time-svelte-store-writable) et [derived](/docs#run-time-svelte-store-derived).

Gardez à l'esprit que vous n'êtes pas *obligé* d'utiliser ces fonctions pour profiter de la [syntaxe réactive `$store`](/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values) dans vos composants. Tout objet qui implémente correctement `.subscribe`, unsubscribe, et (optionnellement) `.set` est un store valide, et fonctionnera à la fois avec la syntaxe spéciale, et avec les [magasins `derived`] intégrés de Svelte (/docs#run-time-svelte-store-derived).

Cela permet d'envelopper presque toute autre bibliothèque de gestion d'état réactif pour l'utiliser dans Svelte. Pour en savoir plus sur le [contrat de magasin](/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract), voyez à quoi ressemble une implémentation correcte.

#### ``writable``

``js
store = writable(value?: any)
```
```js
store = writable(valeur?: any, start?: (set: (valeur: any) => void) => () => void)
```

---

Fonction qui crée un magasin dont les valeurs peuvent être définies à partir de composants "extérieurs". Il est créé comme un objet avec des méthodes supplémentaires `set` et `update`.

`set` est une méthode qui prend un argument qui est la valeur à définir. La valeur du magasin est remplacée par la valeur de l'argument si elle n'est pas déjà égale à la valeur du magasin.

`update` est une méthode qui prend un argument qui est un callback. Le callback prend la valeur existante du magasin comme argument et renvoie la nouvelle valeur à définir pour le magasin.

``js
import { writable } de 'svelte/store';

const count = writable(0);

count.subscribe(valeur => {
	console.log(valeur);
}); // enregistre '0'.

count.set(1); // enregistre '1'.

count.update(n => n + 1); // journal '2'.
```

---

Si une fonction est passée comme deuxième argument, elle sera appelée lorsque le nombre d'abonnés passera de zéro à un (mais pas de un à deux, etc.). Cette fonction se verra passer une fonction `set` qui changera la valeur du magasin. Elle doit retourner une fonction `stop` qui sera appelée lorsque le nombre d'abonnés passera de un à zéro.

```js
Importez { writable } de 'svelte/store';

const count = writable(0, () => {
	console.log('got a subscriber');
	return () => console.log('no more subscribers');
});

count.set(1); // ne fait rien

const unsubscribe = count.subscribe(value => {
	console.log(valeur);
}); // enregistre 'got a subscriber', puis '1'.

unsubscribe(); // enregistre "plus d'abonnés".
```

Notez que la valeur d'un `writable` est perdue lorsqu'il est détruit, par exemple lorsque la page est rafraîchie. Cependant, vous pouvez écrire votre propre logique pour synchroniser la valeur, par exemple dans le `localStorage`.

#### ``readable``

``js
store = readable(valeur?: any, start?: (set: (valeur: any) => void) => () => void)
```

---

Crée un magasin dont la valeur ne peut pas être définie de l'extérieur, le premier argument est la valeur initiale du magasin, et le second argument de `readable` est le même que le second argument de `writable`.

```js
Importez { readable } de 'svelte/store';

const time = readable(null, set => {
	set(new Date());

	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return () => clearInterval(interval);
});
```

#### `derived`

```js
store = derived(a, callback: (a: any) => any)
```
```js
store = derived(a, callback: (a: any, set: (value: any) => void) => void | () => void, initial_value: any)
```
```js
store = derived([a, ...b], callback: ([a: any, ...b: any[]]) => any)
```
```js
store = derived([a, ...b], callback: ([a: any, ...b: any[]], set: (value: any) => void) => void | () => void, initial_value: any)
```
---

Dérive un magasin à partir d'un ou plusieurs autres magasins. La callback s'exécute initialement lorsque le premier abonné s'abonne, puis à chaque fois que les dépendances du magasin changent.

Dans la version la plus simple, `derived` prend un seul magasin, et le callback renvoie une valeur dérivée.

``js
Importez { derived } de 'svelte/store';

const doubled = derived(a, $a => $a * 2);
```

---

La callback peut définir une valeur de manière asynchrone en acceptant un second argument, `set`, et en l'appelant au moment opportun.

Dans ce cas, vous pouvez également passer un troisième argument à `derived` - la valeur initiale du magasin dérivé avant le premier appel de `set`.

``js
Importez { derived } de 'svelte/store';

const delayed = derived(a, ($a, set) => {
	setTimeout(() => set($a), 1000);
}, 'un moment...');
```

---

Si vous renvoyez une fonction à partir du callback, elle sera appelée lorsque a) la callback s'exécute à nouveau, ou b) le dernier abonné se désabonne.

```js
import { derived } from 'svelte/store';

const tick = derived(frequency, ($frequency, set) => {
	const interval = setInterval(() => {
	  set(Date.now());
	}, 1000 / $frequency);

	return () => {
		clearInterval(interval);
	};
}, 'one moment...');
```

---

Dans les deux cas, un tableau d'arguments peut être passé comme premier argument au lieu d'un seul magasin.

```js
import { derived } from 'svelte/store';

const summed = derived([a, b], ([$a, $b]) => $a + $b);

const delayed = derived([a, b], ([$a, $b], set) => {
	setTimeout(() => set($a + $b), 1000);
});
```

#### ``get``

``js
valeur: any = get(store)
```

---

De manière général, vous devez lire la valeur d'un magasin en vous y abonnant et en utilisant la valeur lorsqu'elle change au fil du temps. Occasionnellement, vous pouvez avoir besoin de récupérer la valeur d'un magasin auquel vous n'êtes pas abonné. `get` vous permet de le faire.

> Cela fonctionne en créant un abonnement, en lisant la valeur, puis en se désabonnant. Elle n'est donc pas recommandée dans les chemins de code chauds (!!!).

```js
Importez { get } de 'svelte/store';

const value = get(store);
```


### `svelte/motion`

Le module `svelte/motion` exporte deux fonctions, `tweened` et `spring`, pour créer des magasins de type `writable` dont les valeurs changent dans le temps après `set` et `update`, plutôt qu'immédiatement.

#### `tweened`

``js
store = tweened(value: any, options)
```

Les magasins `tweened` mettent à jour leurs valeurs sur une durée fixe. Les options suivantes sont disponibles:

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number` | `function`, default 400) - durée en millisecondes de la transition.
* `easing` (`function`, par défaut `t => t`) - une [fonction d'assouplissement](/docs#run-time-svelte-easing)
* `interpolate` (`function`) - voir ci-dessous

`store.set` et `store.update` peuvent accepter un second argument `options` qui remplacera les options passées à l'instanciation.

Les deux fonctions retournent une Promise qui se résout lorsque la transition se termine. Si la transition est interrompu, la promesse ne sera jamais résolue.

---

D'emblée, Svelte interpolera entre deux nombres, deux tableaux ou deux objets (tant que les tableaux et les objets ont la même "forme" et que leurs propriétés "leaf" sont également des nombres). (!!!)

```sv
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const size = tweened(1, {
		duration: 300,
		easing: cubicOut
	});

	function handleClick() {
		// this is equivalent to size.update(n => n + 1)
		$size += 1;
	}
</script>

<button
	on:click={handleClick}
	style="transform: scale({$size}); transform-origin: 0 0"
>embiggen</button>
```

---

Si la valeur initiale est `undefined` ou `null`, le premier changement de valeur prendra effet immédiatement. Ceci est utile lorsque vous avez des valeurs d'interpolation qui sont basées sur des propriétés de composant et que vous ne voulez pas qu'il y ait de mouvement lors du premier rendu du composant.

```js
const size = tweened(undefined, {
	duration: 300,
	easing: cubicOut
});

$: $size = big ? 100 : 10;
```

---

L'option `interpolate` vous permet de faire une transition entre *n'importe quelle* valeur arbitraire. Ce doit être une fonction `(a, b) => t => valeur`, où `a` est la valeur de départ, `b` est la valeur cible, `t` est un nombre entre 0 et 1, et `value` est le résultat. Par exemple, nous pouvons utiliser le package [d3-interpolate](https://github.com/d3/d3-interpolate) pour interpoler entre deux couleurs.

```sv
<script>
	import { interpolateLab } from 'd3-interpolate';
	import { tweened } from 'svelte/motion';

	const colors = [
		'rgb(255, 62, 0)',
		'rgb(64, 179, 255)',
		'rgb(103, 103, 120)'
	];

	const color = tweened(colors[0], {
		duration: 800,
		interpolate: interpolateLab
	});
</script>

{#each colors as c}
	<button
		style="background-color: {c}; color: white; border: none;"
		on:click="{e => color.set(c)}"
	>{c}</button>
{/each}

<h1 style="color: {$color}">{$color}</h1>
```

#### `spring`

```js
store = spring(value: any, options)
```

Un magasin `spring` change progressivement vers sa valeur cible en fonction de ses paramètres `stiffness` et `damping`. Alors que les magasins `tweened` changent leurs valeurs sur une durée fixe, les magasins `spring` changent sur une durée qui est déterminée par leur vélocité existante, permettant un mouvement plus naturel dans de nombreuses situations. Les options suivantes sont disponibles :

* `stiffness` (`number`, default `0.15`) - une valeur entre 0 et 1 où une valeur plus grande signifie un ressort plus 'serré'.
* `damping` (`number`, default `0.8`) - une valeur entre 0 et 1 où une valeur plus basse signifie un ressort plus 'élastique'.
* `precision` (`number`, default `0.01`) - détermine le seuil à partir duquel le ressort est considéré comme 'arrêté'. Une valeur plus basse signifie un ressort plus précis.

---

Toutes les options ci-dessus peuvent être changées pendant que le ressort est en mouvement, et prendront effet immédiatement.

```js
const size = spring(100);
size.stiffness = 0.3;
size.damping = 0.4;
size.precision = 0.005;
```

---

Comme avec les magasins [`tweened`](/docs#run-time-svelte-motion-tweened), `set` et `update` retournent une Promise qui se résout si le ressort s'arrêter.

Les deux méthodes `set` et `update` peuvent prendre un second argument - un objet avec les propriétés `hard` ou `soft`. `{ hard: true }` fixe immédiatement la valeur cible ; `{ soft: n }` préserve l'élan existant pendant `n` secondes avant de se tasser. `{ soft: true }` est équivalent à `{ soft: 0.5 }`.

```js
const coords = spring({ x: 50, y: 50 });
// updates the value immediately
coords.set({ x: 100, y: 200 }, { hard: true });
// preserves existing momentum for 1s
coords.update(
	(target_coords, coords) => {
		return { x: target_coords.x, y: coords.y };
	},
	{ soft: 1 }
);
```

[Voir un exemple complet sur le tutoriel des magasins de type `spring`.](/tutorial/spring)

```sv
<script>
	import { spring } from 'svelte/motion';

	const coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25
	});
</script>
```

---

Si la valeur initiale est `undefined` ou `null`, le premier changement de valeur prendra effet immédiatement, comme pour les valeurs `tweened` (voir ci-dessus).

```js
const size = spring();
$: $size = big ? 100 : 10;
```
