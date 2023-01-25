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

La fonction `onMount` permet de planifier l'exécution d'un callback dès que le composant a été monté dans le DOM. Elle doit être appelée pendant l'instantiation du composant (mais elle n'a pas besoin d'être définie *à l'intérieur* du composant ; elle peut être appelée depuis un module externe).

`onMount` n'est pas exécutée pas à l'intérieur d'un [composant côté serveur] (/docs#run-time-server-side-component-api).

``sv
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('le composant est monté');
	});
</script>
```

---

Si une fonction est renvoyée par `onMount`, celle-ci sera appelée lorsque le composant sera démonté.

```sv
<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const interval = setInterval(() => {
			console.log('beep');
		}, 1000);

		return () => clearInterval(interval);
	});
</script>
```

> Ce comportement ne fonctionne que si la fonction passée à `onMount` renvoie une valeur de manière *synchrone*. Les fonctions `async` renvoient toujours une `Promise`, ce qui implique qu'elles ne peuvent jamais renvoyer une fonction de manière *synchrone*.

#### `beforeUpdate`

``js
beforeUpdate(callback: () => void)
```

---

Planifie l'exécution d'un callback immédiatement avant la mise à jour du composant, lorsqu'un changement d'état s'est produit.

> La première exécution du callback se produit juste avant l'appel du `onMount` initial.

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

> La première exécution du callback se produit juste après l'appel du `onMount` initial.

```sv
<script>
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		console.log("le composant vient d'être mis à jour");
	});
</script>
```

#### `onDestroy`

``js
onDestroy(callback: () => void)
```

---

Planifie un callback à exécuter immédiatement avant que le composant ne soit démonté.

Parmi les callbacks de `onMount`, `beforeUpdate`, `afterUpdate` et `onDestroy`, c'est le seul qui s'exécute dans un composant côté serveur.

``sv
<script>
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		console.log('le composant va être détruit');
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

Associe un objet `context` arbitraire au composant courant et à la `key` spécifiée, puis retourne cet objet. Le contexte est alors accessible pour les enfants du composant (y compris le contenu de slot) avec `getContext`.

Comme les fonctions de cycle de vie, elle doit être appelée pendant l'instantiation du composant.

```sv
<script>
	import { setContext } from 'svelte';

	setContext('answer', 42);
</script>
```

> Le contexte n'est pas intrinsèquement réactif. Si vous avez besoin de valeurs réactives dans le contexte, alors vous pouvez passer un store dans le contexte, store qui *sera* réactif.

#### `getContext`

``js
context: any = getContext(key: any)
```

---

Récupère le contexte qui appartient au composant parent le plus proche avec la `key` spécifiée. Doit être appelé pendant l'instantiation du composant.

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

Vérifie si une `clé` donnée a été définie dans le contexte d'un composant parent. Doit être appelé pendant l'instantiation du composant.

```sv
<script>
	import { hasContext } from 'svelte';

	if (hasContext('answer')) {
		// faites quelque chose
	}
</script>
```

#### `getAllContexts`

``js
contexts: Map<any, any> = getAllContexts()
```

---

Récupère l'ensemble des contextes appartenant au composant parent le plus proche. Doit être appelé pendant l'instantiation du composant. Utile, par exemple, si vous créez un composant de manière programmatique et que vous voulez lui passer le contexte existant.

```sv
<script>
	import { getAllContexts } from 'svelte';

	const contexts = getAllContexts();
</script>
```

#### `createEventDispatcher`

``js
dispatch: ((name: string, detail?: any, options?: DispatchOptions) => boolean) = createEventDispatcher();
```

---

Crée un *dispatcher* d'événements qui peut être utilisé pour distribuer les [événements de composants] (/docs#template-syntaxe-component-directives-on-eventname). Les *dispatchers* d'événements sont des fonctions qui peuvent prendre deux arguments : `name` et `detail`.

Les événements de composants créés avec `createEventDispatcher` créent un [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). Ces événements ne suivent pas la [chaîne de *bubbling*](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture). L'argument `detail` correspond à la propriété [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) et peut contenir tout type de données.

```sv
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button on:click="{() => dispatch('notify', 'detail value')}">Générer un événement</button>
```

---

Les événements envoyés par les composants enfants peuvent être écoutés par leur parent. Toutes les données fournies lors de l'envoi de l'événement sont disponibles dans la propriété `detail` de l'objet événement.

```sv
<script>
	function callbackFunction(event) {
		console.log(`Événement reçu ! Détail: ${event.detail}`)
	}
</script>

<Child on:notify="{callbackFunction}"/>
```

---

Les événements peuvent être annulables en passant un troisième paramètre à la fonction dispatch. La fonction renvoie `false` si l'événement est annulé avec `event.preventDefault()`, sinon elle renvoie `true`.

```sv
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function notify() {
		const shouldContinue = dispatch('notify', 'detail value', { cancelable: true });
		if (shouldContinue) {
			// personne n'a appelé preventDefault
		} else {
			// un listener a appelé preventDefault
		}
	}
</script>
```

### `svelte/store`

Le module `svelte/store` exporte des fonctions pour créer des stores [de lecture (*readable*)](/docs#run-time-svelte-store-readable), [d'écriture (*writable*)](/docs#run-time-svelte-store-writable) et [dérivés (*derived*)](/docs#run-time-svelte-store-derived).

Gardez à l'esprit que vous n'êtes pas *obligé•e* d'utiliser ces fonctions pour profiter de la [syntaxe réactive `$store`](/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values) dans vos composants. Tout objet qui implémente correctement `.subscribe`, `unsubscribe`, et (éventuellement) `.set` est un store valide, et fonctionnera à la fois avec la syntaxe spéciale, et avec les [stores dérivés](/docs#run-time-svelte-store-derived) de Svelte.

Cela permet d'envelopper presque toute autre bibliothèque de gestion d'état réactif pour l'utiliser dans Svelte. Renseignez-vous sur le [contrat de store](/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract) pour voir à quoi ressemble une implémentation fonctionnelle.

#### ``writable``

``js
store = writable(value?: any)
```
```js
store = writable(value?: any, start?: (set: (value: any) => void) => () => void)
```

---

Fonction qui crée un store dont les valeurs peuvent être définies à partir de composants "extérieurs". Il est créé comme un objet avec les méthodes supplémentaires `set` et `update`.

`set` est une méthode qui prend un argument la valeur à définir. La valeur courante du store est remplacée par la valeur de l'argument si celle-ci n'est pas déjà égale à la valeur courante.

`update` est une méthode qui prend un callback comme seul argument. Le callback prend la valeur existante du store comme argument et renvoie la nouvelle valeur à définir pour le store.

``js
import { writable } from 'svelte/store';

const count = writable(0);

count.subscribe(valeur => {
	console.log(valeur);
}); // affiche '0'.

count.set(1); // affiche '1'.

count.update(n => n + 1); // affiche '2'.
```

---

Si une fonction est passée comme deuxième argument, elle sera appelée lorsque le nombre d'abonnés au store passera de zéro à un (mais pas de un à deux, etc.). Cette fonction a comme argument une fonction `set` qui peut changer la valeur du magasin. Elle doit retourner une fonction `stop` qui sera appelée lorsque le nombre d'abonnés passera de un à zéro.

```js
import { writable } from 'svelte/store';

const count = writable(0, () => {
	console.log('vous avez un abonné');
	return () => console.log('vous n'avez plus d'abonnés');
});

count.set(1); // ne fait rien

const unsubscribe = count.subscribe(value => {
	console.log(valeur);
}); // affiche 'vous avez un abonné', puis '1'.

unsubscribe(); // affiche "vous n'avez plus d'abonnés".
```

Notez que la valeur d'un `writable` est perdue lorsqu'il est détruit, par exemple lorsque la page est rafraîchie. Cependant, vous pouvez écrire votre propre logique pour synchroniser la valeur, par exemple dans le `localStorage`.

#### ``readable``

``js
store = readable(value?: any, start?: (set: (value: any) => void) => () => void)
```

---

Crée un store dont la valeur ne peut pas être modifiée de l'extérieur. Le premier argument est la valeur initiale du store, le second argument est le même que le second argument de `writable`.

```js
import { readable } from 'svelte/store';

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

Dérive un store à partir d'un ou plusieurs autres stores. Le callback s'exécute initialement lorsque le premier abonné s'abonne, puis à chaque fois que les dépendances du store changent.

Dans la version la plus simple, `derived` prend un seul store, et le callback renvoie une valeur dérivée.

``js
import { derived } from 'svelte/store';

const doubled = derived(a, $a => $a * 2);
```

---

Le callback peut définir une valeur de manière asynchrone en acceptant un second argument, `set`, et en l'appelant au moment opportun.

Dans ce cas, vous pouvez également passer un troisième argument à `derived` - la valeur initiale du store dérivé avant le premier appel de `set`.

``js
import { derived } from 'svelte/store';

const delayed = derived(a, ($a, set) => {
	setTimeout(() => set($a), 1000);
}, 'un moment...');
```

---

Si vous renvoyez une fonction à partir du callback, elle sera appelée lorsque a) le callback s'exécute à nouveau, ou b) le dernier abonné se désabonne.

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

Dans les deux cas, un tableau d'arguments peut être passé comme premier argument au lieu d'un seul store.

```js
import { derived } from 'svelte/store';

const summed = derived([a, b], ([$a, $b]) => $a + $b);

const delayed = derived([a, b], ([$a, $b], set) => {
	setTimeout(() => set($a + $b), 1000);
});
```

#### ``get``

``js
value: any = get(store)
```

---

De manière générale, il est recommandé de lire la valeur d'un store en vous y abonnant et en utilisant la valeur à mesure qu'elle change. Occasionnellement, vous pouvez avoir besoin de récupérer la valeur d'un store auquel vous n'êtes pas abonné. `get` vous permet de le faire.

> Cela fonctionne en créant un abonnement, en lisant la valeur, puis en se désabonnant. Cette méthode n'est donc pas recommandée lorsque le code concerné est exécuté à haute fréquence.

```js
import { get } from 'svelte/store';

const value = get(store);
```


### `svelte/motion`

Le module `svelte/motion` exporte deux fonctions, `tweened` et `spring`, pour créer des stores de type `writable` dont les valeurs changent dans le temps après `set` et `update`, plutôt qu'immédiatement.

#### `tweened`

``js
store = tweened(value: any, options)
```

Les stores `tweened` mettent à jour leur valeur sur une durée fixe. Les options suivantes sont disponibles:

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number` | `function`, par défaut 400) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `t => t`) - une [fonction d'assouplissement](/docs#run-time-svelte-easing)
* `interpolate` (`function`) - voir ci-dessous

`store.set` et `store.update` peuvent accepter un second argument `options` qui remplacera les options passées à l'instanciation.

Les deux fonctions retournent une Promesse qui se résout lorsque la transition se termine. Si la transition est interrompue, la promesse ne sera jamais résolue.

---

Sans que vous n'ayez rien à faire, Svelte interpolera entre deux nombres, deux tableaux ou deux objets (tant que les tableaux et les objets ont la même "forme" et que leurs propriétés "feuilles" sont également des nombres).

```sv
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const size = tweened(1, {
		duration: 300,
		easing: cubicOut
	});

	function handleClick() {
		// équivalent à size.update(n => n + 1)
		$size += 1;
	}
</script>

<button
	on:click={handleClick}
	style="transform: scale({$size}); transform-origin: 0 0"
>grossir</button>
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

L'option `interpolate` vous permet de faire une transition entre *n'importe quelles* valeurs arbitraires. Cette option doit être une fonction `(a, b) => t => value`, où `a` est la valeur de départ, `b` est la valeur cible, `t` est un nombre entre 0 et 1, et `value` est le résultat. Par exemple, il est possible d'utiliser [d3-interpolate](https://github.com/d3/d3-interpolate) pour interpoler entre deux couleurs.

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

Un store `spring` change progressivement vers sa valeur cible en fonction de ses paramètres `stiffness` (raideur) et `damping` (amortissement). Alors que les stores `tweened` changent leur valeur sur une durée fixe, les stores `spring` changent leur valeur sur une durée qui est déterminée par leur vélocité courante, permettant un mouvement plus naturel dans de nombreuses situations. Les options suivantes sont disponibles :

* `stiffness` (`number`, par défaut `0.15`) - une valeur entre 0 et 1, où une valeur plus grande signifie un ressort plus 'raide'.
* `damping` (`number`, par défaut `0.8`) - une valeur entre 0 et 1, où une valeur plus basse signifie un ressort plus 'élastique'.
* `precision` (`number`, par défaut `0.01`) - détermine le seuil à partir duquel le ressort est considéré comme 'arrêté'. Une valeur plus basse signifie un ressort plus précis.

---

Toutes les options ci-dessus peuvent être changées pendant que le ressort est en mouvement, et prendront effet immédiatement.

```js
const size = spring(100);
size.stiffness = 0.3;
size.damping = 0.4;
size.precision = 0.005;
```

---

Comme avec les stores [`tweened`](/docs#run-time-svelte-motion-tweened), `set` et `update` retournent une Promesse qui se résout lorsque le ressort s'arrête.

Les deux méthodes `set` et `update` peuvent prendre un second argument - un objet avec les propriétés `hard` ou `soft`. `{ hard: true }` fixe immédiatement la valeur cible ; `{ soft: n }` préserve l'élan actuel pendant `n` secondes avant de s'arrêter. `{ soft: true }` est équivalent à `{ soft: 0.5 }`.

```js
const coords = spring({ x: 50, y: 50 });
// change la valeur immédiatement
coords.set({ x: 100, y: 200 }, { hard: true });
// garde l'élan actuel pendant 1s
coords.update(
	(target_coords, coords) => {
		return { x: target_coords.x, y: coords.y };
	},
	{ soft: 1 }
);
```

[Un exemple complet de store de type `spring` est disponible dans le tutoriel.](/tutorial/spring)

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
