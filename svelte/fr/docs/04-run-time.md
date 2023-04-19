---
titre : Runtime
---

### `svelte`

Le paquet `svelte` expose les [fonctions de cycle de vie](/tutorial/onmount) et l'[API de contexte](/tutorial/context-api).

#### `onMount`

``js
onMount(callback : () => void)
```

```ts
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
```ts
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

```ts
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

```ts
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

```ts
store = derived(a, callback: (a: any) => any)
```
```ts
store = derived(a, callback: (a: any, set: (value: any) => void) => void | () => void, initial_value: any)
```
```ts
store = derived([a, ...b], callback: ([a: any, ...b: any[]]) => any)
```
```ts
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

```ts
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

```ts
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

```ts
import { get } from 'svelte/store';

const value = get(store);
```

#### `readonly`

```js
readableStore = readonly(writableStore);
```

---

Cette fonction utilitaire permet de faire de n'importe quel <span class='vo'>_store_</span> un <span class='vo'>_store_</span> en lecture seule. Vous pouvez toujours vous abonner aux changements du <span class='vo'>_store_</span> original en vous abonnant à ce nouveau <span class='vo'>_store_</span> en lecture seule.


```js
import { readonly } from 'svelte/store';
const writableStore = writable(1);
const readableStore = readonly(writableStore);
readableStore.subscribe(console.log);
writableStore.set(2); // console: 2
readableStore.set(2); // ERROR
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
* `easing` (`function`, par défaut `t => t`) - une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)
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

```ts
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

```ts
store = spring(value: any, options)
```

Un store `spring` change progressivement vers sa valeur cible en fonction de ses paramètres `stiffness` (raideur) et `damping` (amortissement). Alors que les stores `tweened` changent leur valeur sur une durée fixe, les stores `spring` changent leur valeur sur une durée qui est déterminée par leur vélocité courante, permettant un mouvement plus naturel dans de nombreuses situations. Les options suivantes sont disponibles :

* `stiffness` (`number`, par défaut `0.15`) - une valeur entre 0 et 1, où une valeur plus grande signifie un ressort plus 'raide'.
* `damping` (`number`, par défaut `0.8`) - une valeur entre 0 et 1, où une valeur plus basse signifie un ressort plus 'élastique'.
* `precision` (`number`, par défaut `0.01`) - détermine le seuil à partir duquel le ressort est considéré comme 'arrêté'. Une valeur plus basse signifie un ressort plus précis.

---

Toutes les options ci-dessus peuvent être changées pendant que le ressort est en mouvement, et prendront effet immédiatement.

```ts
const size = spring(100);
size.stiffness = 0.3;
size.damping = 0.4;
size.precision = 0.005;
```

---

Comme avec les stores [`tweened`](/docs#run-time-svelte-motion-tweened), `set` et `update` retournent une Promesse qui se résout lorsque le ressort s'arrête.

Les deux méthodes `set` et `update` peuvent prendre un second argument - un objet avec les propriétés `hard` ou `soft`. `{ hard: true }` fixe immédiatement la valeur cible ; `{ soft: n }` préserve l'élan actuel pendant `n` secondes avant de s'arrêter. `{ soft: true }` est équivalent à `{ soft: 0.5 }`.

```ts
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

```ts
const size = spring();
$: $size = big ? 100 : 10;
```

### `svelte/transition`

Le module `svelte/transition` exporte 7 fonctions : `fade`, `blur`, `fly`, `slide`, `scale`, `draw` et `crossfade`. Ces fonctions sont utilisables avec les [`transitions`](/docs#template-syntax-element-directives-transition-fn) Svelte.

#### `fade`

```sv
transition:fade={params}
```
```sv
in:fade={params}
```
```sv
out:fade={params}
```

---

Anime l'opacité d'un élément de 0 jusqu'à l'opacité courante pour les transitions de type `in` et depuis l'opacité courante vers 0 pour les transitions de type `out`.

Les paramètres suivants peuvent être utilisés avec `fade` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number`, par défaut 400) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `linear`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)

Un exemple de transition de type `fade` est présenté dans le [tutoriel relatif aux transitions](/tutorial/transition).

```sv
<script>
	import { fade } from 'svelte/transition';
</script>

{#if condition}
	<div transition:fade="{{delay: 250, duration: 300}}">
		Apparaît et disparaît en s'estompant
	</div>
{/if}
```

#### `blur`

```sv
transition:blur={params}
```
```sv
in:blur={params}
```
```sv
out:blur={params}
```

---

Anime le filtre de flou (`blur`) en même temps que l'opacité d'un élément.

Les paramètres suivants peuvent être utilisés avec `blur` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number`, par défaut 400) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `cubicInOut`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)
* `opacity` (`number`, par défaut 0) - opacité cible de l'animation
* `amount` (`number | string`, par défaut 5) - la taille du flou. Supporte les unités CSS (par exemple : `"4rem"`). L'unité par défaut est `px`.

```sv
<script>
	import { blur } from 'svelte/transition';
</script>

{#if condition}
	<div transition:blur="{{amount: 10}}">
		Apparaît et disparaît avec un flou
	</div>
{/if}
```

#### `fly`

```sv
transition:fly={params}
```
```sv
in:fly={params}
```
```sv
out:fly={params}
```

---

Anime les positions x, y et l'opacité d'un élément. Les transitions entrantes (`in`) permettent d'animer les propriétés depuis les valeurs spécifiées, passées en tant que paramètres, vers les valeurs par défaut. Les transitions sortantes (`out`) permettent quant à elles d'animer depuis les valeurs par défaut de l'élément vers les valeurs spécifiées.

Les paramètres suivants peuvent être utilisés avec `fly` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number`, par défaut 400) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `cubicOut`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)
* `x` (`number | string`, par défaut 0) - décalage horizontal de l'animation
* `y` (`number | string`, par défaut 0) - décalage vertical de l'animation
* `opacity` (`number`, par défaut 0) - opacité cible de l'animation

x et y utilisent `px` par défaut mais supportent les unités CSS, par exemple `x: '100vw'` ou `y: '50%'`.

Un exemple de transition de type `fly` est présenté dans le [tutoriel relatif aux transitions](/tutorial/adding-parameters-to-transitions).

```sv
<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:fly="{{delay: 250, duration: 300, x: 100, y: 500, opacity: 0.5, easing: quintOut}}">
		apparaît et disparaît avec un déplacement
	</div>
{/if}
```

#### `slide`

```sv
transition:slide={params}
```
```sv
in:slide={params}
```
```sv
out:slide={params}
```

---

L'animation de type `slide` permet de faire apparaître et disparaître un élément en glissant depuis et vers le haut.

Les paramètres suivants peuvent être utilisés avec `slide` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number`, par défaut 400) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `cubicOut`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)
* `axis` (`x` | `y`, par défaut `y`) — l'axe de déplacement utilisé pour la transition

```sv
<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:slide="{{delay: 250, duration: 300, easing: quintOut, axis: 'x' }}">
		Apparaît et disparaît en glissant horizontalement
	</div>
{/if}
```

#### `scale`

```sv
transition:scale={params}
```
```sv
in:scale={params}
```
```sv
out:scale={params}
```

---

Anime l'opacité et l'échelle d'un élément. Les transitions entrantes (`in`) s'animent à partir des valeurs fournies en paramètre vers les valeurs par défaut de l'élément, passées en paramètres. Les transitions sortantes (`out`) s'animent à partir des valeurs par défaut de l'élément vers les valeurs fournies en paramètre.

Les paramètres suivants peuvent être utilisés avec `scale` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number`, par défaut 400) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `cubicInOut`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)
* `start` (`number`, par défaut 0) - ratio d'agrandissement de l'animation
* `opacity` (`number`, par défaut 0) - opacité cible de l'animation

```sv
<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

{#if condition}
	<div transition:scale="{{duration: 500, delay: 500, opacity: 0.5, start: 0.5, easing: quintOut}}">
		Anime l'agrandissement
	</div>
{/if}
```

#### `draw`

```sv
transition:draw={params}
```
```sv
in:draw={params}
```
```sv
out:draw={params}
```

---

Anime le tracé d'un élément SVG. Les transitions entrantes (`in`) commencent avec le tracé non visible et dessinent le tracé. Les transitions sortantes (`out`) commencent avec le tracé visible et l'effacent au fur et à mesure. L'animation `draw` ne fonctionne qu'avec les éléments ayant la méthode `getTotalLength`, comme `<path>` et `<polyline>`.

Les paramètres suivants peuvent être utilisés avec `draw` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `speed` (`number`, par défaut undefined) - vitesse de l'animation, voir ci-dessous.
* `duration` (`number` | `function`, par défaut 800) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `cubicInOut`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)

Le paramètre de vitesse `speed` peut être utilisé à la place du paramètre durée `duration` pour spécifier la vitesse de la transition en fonction de la longueur totale du chemin. Il s'agit d'un coefficient permettant de calculer la durée de l'animation : `durée = longueur / vitesse` (`duration = length / speed`). Par exemple, un chemin qui mesure 1000 pixels de long avec une vitesse de 1 aura une durée de 1000ms. Avec une vitesse de `0.5`, l'animation aura un temps doublé. Avec une vitesse de `2`, l'animation sera deux fois plus lente.

```sv
<script>
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
	{#if condition}
		<path transition:draw="{{duration: 5000, delay: 500, easing: quintOut}}"
			d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
			fill="none"
			stroke="cornflowerblue"
			stroke-width="0.1px"
			stroke-linejoin="round"
		/>
	{/if}
</svg>

```


#### `crossfade`

La fonction de fondu croisé `crossfade` crée deux [transitions](/docs#template-syntax-element-directives-transition-fn) appelées `send` et `receive`. Quand un élément est "envoyé", Svelte cherche un élément correspondant "reçu" et génère une transition qui déplace l'élément vers la position de sa contrepartie en le faisant disparaître. Quand un élément est "reçu", l'inverse s'applique. S'il n'y a pas d'élément reçu, la transition par défaut `fallback` s'applique.

---

Les paramètres suivants peuvent être utilisés avec `crossfade` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number` | `function`, par défaut 800) - durée de la transition en millisecondes
* `easing` (`function`, par défaut `cubicOut`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)
* `fallback` (`function`) — une [transition](/docs#template-syntax-element-directives-transition-fn) à utiliser lorsqu'il n'y a pas d'élément "reçu" correspondant.

```sv
<script>
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const [send, receive] = crossfade({
		duration:1500,
		easing: quintOut
	});
</script>

{#if condition}
	<h1 in:send={{key}} out:receive={{key}}>GROS ELEMENT</h1>
{:else}
	<small in:send={{key}} out:receive={{key}}>petit élément</small>
{/if}
```


### `svelte/animate`

Le module `svelte/animate` exporte une fonction à utiliser avec les [animations](/docs#template-syntax-element-directives-animate-fn) Svelte.

#### `flip`

```sv
animate:flip={params}
```

La méthode `flip` calcule la position de départ et d'arrivée d'un élément et génère une animation de translation des coordonnées `x` et `y`. Le mot `flip` est l'acronyme de [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/) (Premier, Dernier, Inverser, Jouer).

Les paramètres suivants peuvent être utilisés avec `flip` :

* `delay` (`number`, par défaut 0) - millisecondes avant le démarrage
* `duration` (`number` | `function`, par défaut `d => Math.sqrt(d) * 120`) - voir ci-dessous
* `easing` (`function`, par défaut `cubicOut`) — une [fonction de lissage (`easing function`)](/docs#run-time-svelte-easing)


Le paramètre de durée `duration` peut être:

- soit un nombre, en millisecondes.
- une fonction, `distance: number => duration: number`, dont le paramètre correspond à la distance que l'élément va parcourir en pixels et qui retourne la durée en millisecondes. Cela permet de définir une durée, relative à la distance parcourue de l'élément.

---

Un exemple complet est présenté dans le [tutoriel relatif aux animations](/tutorial/animate).


```sv
<script>
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	let list = [1, 2, 3];
</script>

{#each list as n (n)}
	<div animate:flip="{{delay: 250, duration: 250, easing: quintOut}}">
		{n}
	</div>
{/each}
```



### `svelte/easing`

Les fonctions de lissage permettent de configurer la vitesse de transitions ou d'animations. Elles peuvent également être utilisées avec les stores `tweened` et `spring`. `svelte/easing` exporte 31 utilitaires, une fonction de lissage linéaire (`linear`), et 3 variantes de 10 différentes fonctions de lissage : `in`, `out` et `inOut`.

Un exemple de chaque méthode est présenté dans le [démonstrateur des fonctions de lissage](/examples/easing) ainsi que dans les [exemples](/examples).


| ease | in | out | inOut |
| --- | --- | --- | --- |
| **back** | `backIn` | `backOut` | `backInOut` |
| **bounce** | `bounceIn` | `bounceOut` | `bounceInOut` |
| **circ** | `circIn` | `circOut` | `circInOut` |
| **cubic** | `cubicIn` | `cubicOut` | `cubicInOut` |
| **elastic** | `elasticIn` | `elasticOut` | `elasticInOut` |
| **expo** | `expoIn` | `expoOut` | `expoInOut` |
| **quad** | `quadIn` | `quadOut` | `quadInOut` |
| **quart** | `quartIn` | `quartOut` | `quartInOut` |
| **quint** | `quintIn` | `quintOut` | `quintInOut` |
| **sine** | `sineIn` | `sineOut` | `sineInOut` |


### `svelte/register`

Pour construire des composants Svelte avec Node.js sans bundler, vous pouvez utiliser `require('svelte/register')`. Avec cet import, vous pouvez utiliser la syntaxe `require` pour inclure n'importe quel fichier `.svelte`.

```ts
require('svelte/register');

const App = require('./App.svelte').default;

...

const { html, css, head } = App.render({ answer: 42 });
```

> L'ajout de `.default` est nécessaire car Svelte convertit un module JavaScript natif vers un module CommonJS, reconnu par Node. Notez que si votre composant importe lui-même des modules JavaScript, ces imports ne seront pas reconnus par Node et vous serez obligé d'utiliser un bundler.

Pour paramétrer les options de compilation, ou pour utiliser une autre extension de fichier, appelez le hook `register` comme une fonction :

```ts
require('svelte/register')({
  extensions: ['.customextension'], // par défaut ['.html', '.svelte']
	preserveComments: true
});
```


### API des composants rendus côté client

#### Création d'un composant

```ts
const component = new Component(options)
```

Un composant rendu côté client est une classe JavaScript correspondant à un composant compilé avec l'option `generate: 'dom'` (ou avec l'option `generate` non spécifiée).

```ts
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// en supposant que App.svelte contienne :
		// `export let answer`:
		answer: 42
	}
});
```

Les options d'initialisation suivantes peuvent être utilisées :

| option | valeur par défaut | description |
| --- | --- | --- |
| `target` | **none** | Un élément `HTMLElement` ou `ShadowRoot` sur lequel rendre le composant. Cette option est obligatoire
| `anchor` | `null` | Un enfant de la cible `target` à rendre juste avant le composant
| `props` | `{}` | Des propriétés avec lesquelles le composant sera initialisé
| `context` | `new Map()` | Une `Map` de paires clé-valeur de contexte à fournir au composant
| `hydrate` | `false` | Voir plus bas
| `intro` | `false` | Si `true`, jouera les transitions au premier rendu, plutôt que d'attendre de futurs changements d'état

Les enfants existants de la cible `target` ne sont pas affectés.


---

L'option d'hydratation `hydrate` indique à Svelte de mettre à jour le DOM existant (habituellement à partir du rendu côté serveur) plutôt que de créer de nouveaux éléments. Cela ne fonctionnera que si le composant a été compilé avec l'option [`hydratable: true`](/docs#compile-time-svelte-compile). L'hydratation de la section `<head>` ne fonctionnera que si le code rendu côté serveur a également été compilé avec l'option `hydratable: true`. Cette option a pour effet d'identifier chaque élément à l'intérieur de la section `<head>` de telle sorte que le composant sache quels éléments il peut supprimer pendant l'hydratation.

Alors que les enfants de la cible `target` ne sont normalement pas modifiés, l'option `hydrate: true` causera leur suppression. Pour cette raison, l'option `anchor` ne peut pas être utilisée en même temps que `hydrate: true`.

Le DOM existant n'a pas besoin de correspondre au composant, Svelte "réparera" le DOM au fur et à mesure.

```ts
import App from './App.svelte';

const app = new App({
	target: document.querySelector('#server-rendered-html'),
	hydrate: true
});
```

#### `$set`

```ts
component.$set(props)
```

---

`$set` définit les props d'une instance de composant. `component.$set({ x: 1 })` est équivalent à `x = 1` à l'intérieur de la balise `<script>` du composant.

L'appel de cette méthode déclenchera une mise à jour à la prochaine micro-tâche — le DOM **n'est pas** mis à jour de manière synchrone.

```ts
component.$set({ answer: 42 });
```

#### `$on`

```ts
component.$on(event, callback)
```

---

`$on` enregistre un `callback` qui sera appelé à chaque génération d'un évènement de type `event`.

`$on` retourne une fonction dont l'exécution permet de supprimer l'écoute de cet événement.

```ts
const off = app.$on('selected', event => {
	console.log(event.detail.selection);
});

off();
```

#### `$destroy`

```ts
component.$destroy()
```

Retire un composant du DOM et déclenche les callbacks de type `onDestroy` associés.

#### props des composants

```ts
component.prop
```
```ts
component.prop = value
```

---

Si un composant est compilé avec l'option `accessors: true`, chaque instance sera générée avec des *getters* et *setters* correspondant à chacune de ses propriétés. Mettre à jour une des propriétés déclenchera une mise à jour *synchrone*. Ce comportement est différent de la mise à jour asynchrone déclenchée par l'appel `component.$set(...)`.

Par défaut, `accessors` est initialisé à `false`, à moins que vous ne compiliez un *web component* (voir section suivante).

```ts
console.log(app.count);
app.count += 1;
```


### API des *web components*

---

Les composants Svelte peuvent également être compilés en *web components* (ou *custom elements*) en utilisant l'option `customElement: true`. Il est recommandé de spécifier un nom de tag pour le composant en utilisant la [balise `<svelte:options>`](/docs#template-syntax-svelte-options).

```sv
<svelte:options tag="my-element" />

<script>
	export let name = 'tout le monde';
</script>

<h1>Bonjour {name} !</h1>
<slot></slot>
```

---

Vous pouvez également passer l'option `tag={null}` afin d'indiquer que le consommateur du composant devra le nommer lui-même.

```ts
import MyElement from './MyElement.svelte';

customElements.define('my-element', MyElement);
```

---

Une fois qu'un web component a été défini, il peut être utilisé comme un élément du DOM classique :

```ts
document.body.innerHTML = `
	<my-element>
		<p>Ceci est du contenu enfant</p>
	</my-element>
`;
```

---

Par défaut, les web components sont compilés avec l'option `accessors: true`, qui indique que n'importe quelle [`props`](/docs#template-syntax-attributes-and-props) sera exposée comme propriété de l'élément DOM (et sera traitée comme un attribut modifiable lorsque ce sera possible).

Pour empêcher ce comportement, vous pouvez ajouter l'option `accessors={false}` à la balise `<svelte:options>`.

```ts
const el = document.querySelector('my-element');

// affiche la valeur courante de la propriété 'name'
console.log(el.name);

// met à jour une nouvelle valeur, mettant à jour le shadow DOM
el.name = 'everybody';
```

Les web components sont un bon moyen de packager des composants pour une utilisation dans une application développée dans une autre technologie que Svelte, puisqu'ils fonctionneront avec du HTML et JavaScript natifs mais aussi avec [la plupart des frameworks](https://custom-elements-everywhere.com/). Il y a cependant des différences importantes à connaître :

* Le style est *encapsulé*, plutôt que simplement *scopé*. Cela signifie que tout style défini en dehors du composant (par exemple, celui défini dans un fichier `global.css` et celui défini avec `:global(...)`) ne s'appliquera pas au web component
* Plutôt que d'être extrait dans un fichier `.css` séparé, le style est mis en propriété du composant
* Les web components ne sont généralement pas faits pour être rendus côté serveur, puisque le *shadow DOM* est invisible tant que le code JavaScript n'est pas chargé
* En Svelte, les éléments slottés sont rendus de manière *lazy*. Dans le DOM, le rendu est "impatient". En d'autres termes, le composant sera toujours créé même si l'élément `<slot>` est à l'intérieur d'un bloc `{#if ...}`. De la même manière, inclure un `<slot>` dans un bloc `{#each ...}` ne rendra pas l'enfant plusieurs fois
* La directive `let:` n'a aucun effet
* Des *polyfills* sont nécessaires pour supporter de vieux navigateurs



### API des composants rendus côté serveur

```ts
const result = Component.render(...)
```

---

A la différence des composants rendus côté client, les composants rendus côté serveur n'ont pas de cycle de vie une fois qu'ils sont rendus, leur unique intérêt est de créer du HTML et du CSS. Pour cette raison, l'API est différente.

Un composant rendu côté serveur expose une méthode `render` qui peut être appelée avec des propriétés optionnelles. Cette méthode retourne un objet avec les propriétés  `head`, `html`, et `css`, où `head` contient les éléments de toutes les balises `<svelte:head>` présentes.

Vous pouvez importer un composant directement dans Node.js en utilisant [`svelte/register`](/docs#run-time-svelte-register).

```ts
require('svelte/register');

const App = require('./App.svelte').default;

const { head, html, css } = App.render({
	answer: 42
});
```

---

La méthode `.render()` accepte les arguments suivants :

| argument | valeur par défaut | description |
| --- | --- | --- |
| `props` | `{}` | Un objet de propriétés à passer au composant
| `options` | `{}` | Un objet d'options

L'objet `options` est de la forme suivante :

| option | valeur par défaut | description |
| --- | --- | --- |
| `context` | `new Map()` | Une `Map` de paires clé-valeur de contexte à fournir au composant

```ts
const { head, html, css } = App.render(
	// props
	{ answer: 42 },
	// options
	{
		context: new Map([['context-key', 'context-value']])
	}
);
```
