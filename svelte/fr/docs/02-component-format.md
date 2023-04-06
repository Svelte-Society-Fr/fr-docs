---
title: Structure d'un composant
---

---

Les composants sont les briques de base d'une application Svelte. Ils sont décrits dans des fichiers `.svelte`, qui utilisent un HTML augmenté.

Les trois sections qui le composent - scripts, styles, et markup - sont optionnelles.

```sv
<script>
	// la logique
</script>

<!-- le markup (avec ou sans éléments) -->

<style>
	/* les styles */
</style>
```

### &lt;script&gt;

Un bloc `<script>` contient du JavaScript qui est exécuté lorsqu'une instance de composant est créée. Les variables déclarées (ou importées) à la racine du composant sont 'visibles' pour le markup du composant. Il y a quatre règles supplémentaires:

#### 1. `export` crée une prop de composant

---

Svelte utilise le mot-clé `export` pour déclarer une variable en tant que *propriété* ou *prop*, ce qui la rend accessible lorsque l'on consomme le composant (voir la section sur les [attributs et props](/docs#template-syntax-attributes-and-props)) pour plus d'informations.


```sv
<script>
	export let foo;

	// Les valeurs passées en tant que props
	// sont immédiatement disponibles
	console.log({ foo });
</script>
```

---

Vous pouvez spécifier une valeur initiale par défaut d'une prop. Elle sera utilisée si la prop n'est pas fournie au composant par le parent lors de l'instanciation du composant (ou si la valeur fournie est `undefined`). Notez que dès qu'une prop est supprimée par le parent, sa valeur est mise à `undefined` plutôt qu'à sa valeur initiale.

En mode développement (voir les [options de compilation](/docs#compile-time-svelte-compile)), un warning sera affiché si aucune valeur initiale par défaut n'est fournie et que le parent ne précise pas de valeur. Pour museler ce warning, assurez-vous qu'une valeur initiale par défaut est définie, même si celle-ci est `undefined`.


```sv
<script>
	export let bar = 'valeur initiale par défaut, optionnelle';
	export let baz = undefined;
</script>
```

---

Si vous exportez une `const`, une `class` ou une `function`, elle sera en lecture seule à l'extérieur du composant. En revanche, les fonctions sont des valeurs de prop valides, comme montré ci-dessous.

```sv
<script>
	// ces exports sont en lecture seule
	export const thisIs = 'readonly';

	export function greet(name) {
		alert(`hello ${name}!`);
	}

	// ceci est une prop
	export let format = n => n.toFixed(2);
</script>
```

Les props en lecture seule sont accessibles comme propriétés de l'instance en utilisant la [syntaxe `bind:this`](/docs#template-syntax-component-directives-bind-this).

---

Vous pouvez utiliser les mots réservés comme noms de prop.

```sv
<script>
	let className;

	// crée une propriété `class`, même
	// si le mot est réservé
	export { className as class };
</script>
```

#### 2. Les assignations sont 'réactives'

---

Pour changer l'état d'un composant et déclencher une mise-à-jour du rendu, il suffit d'assigner une variable déclarée localement.

Les expressions de mise-à-jour (`count += 1`) et les assignations de propriété (`obj.x = y`) produisent le même effet.


```sv
<script>
	let count = 0;

	function handleClick () {
		// l'exécution de cette fonction déclenchera
		// une mise à jour si le markup référence `count`
		count = count + 1;
	}
</script>
```

---

Puisque la réactivité de Svelte est basée sur les assignations, l'utilisation de méthodes de tableaux comme `.push()` et `.splice()` ne déclenchera pas de rendu. Une assignation sera alors nécessaire pour déclencher un nouveau rendu. Vous retrouverez cet exemple ainsi que plus de détails dans le [tutoriel](/tutorial/updating-arrays-and-objects).

```sv
<script>
	let arr = [0, 1];

	function handleClick () {
		// l'appel de cette méthode ne déclenche pas de rendu
		arr.push(2);

		// cette assignation déclenchera un rendu
		// si le markup référence `arr`
		arr = arr
	}
</script>
```

---

En Svelte, les blocs `<script>` sont exécutés uniquement lorsque le composant est créé, ce qui signifie que les assignations au sein d'un bloc `<script>` ne sont pas automatiquement rejouées lorsqu'une prop est mise à jour. Si vous souhaitez suivre les changements d'une prop, allez voir le prochain exemple dans la section qui suit.

```sv
<script>
	export let person;
	// ceci assigne seulement `name` lors de la création de l'instance
	// `name` ne sera pas mise à jour lorsque `person` changera
	let { name } = person;
</script>
```

#### 3. `$:` déclare une expression comme réactive

---

Toute expression à la racine du composant (i.e. ni dans un bloc ni dans une fonction) peut être rendu réactive en la préfixant avec la syntaxe `$:` empruntées aux [labels JS](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/label). Les expressions réactives sont exécutées après tout autre code du script, et avant le rendu du markup du composant, à chaque fois que les valeurs dont elle dépend changent.

```sv
<script>
	export let title;
	export let person;

	// ceci met à jour `document.title` lorsque
	// la prop `title` change
	$: document.title = title;

	$: {
		console.log(`plusieurs expressions peuvent être combinées`);
		console.log(`le titre actuel est ${title}`);
	}

	// ceci met à jour `name` lorsque `person` change
	$: ({ name } = person);

	// ne faites pas ça:
	// cette expression est exécutée avant la ligne précédente
	let name2 = name;
</script>
```

---

Seules les valeurs qui apparaissent directement au sein d'un bloc `$:` sont des dépendances de l'expression réactive. Par exemple, dans le code ci-dessous `total` sera mise à jour uniquement lorsque `x` change, mais pas lorsque `y` change.

```sv
<script>
	let x = 0;
	let y = 0;

	function yPlusAValue(value) {
		return value + y;
	}

	$: total = yPlusAValue(x);
</script>

Total: {total}
<button on:click={() => x++}>
	Incrémenter X
</button>

<button on:click={() => y++}>
	Incrémenter Y
</button>
```

---

Il est important de noter que les blocs réactifs sont ordonnés par une analyse statique simple au moment de la compilation, et tout ce que le compilateur considère sont les variables qui sont assignées et utilisées au sein du bloc lui-même, pas au sein d'éventuelles fonctions appelées par le bloc. Cela implique que `yDependent` ne sera pas mise à jour quand `x` change dans l'exemple suivant:

```sv
<script>
	let x = 0;
	let y = 0;

	const setY = (value) => {
		y = value;
	}

	$: yDependent = y;
	$: setY(x);
</script>
```

Déplacer la ligne `$: yDependent = y` en-dessous de `$: setY(x)` implique que `yDependent` sera mise à jour lorsque `x` change.

---

Si une expression est entièrement constituée d'une assignation à une variable non déclarée, Svelte injectera une déclaration `let` à votre place.

```sv
<script>
	export let num;

	// nous n'avons pas besoin de déclarer `squared` et `cubed`
	// — Svelte le fait pour nous
	$: squared = num * num;
	$: cubed = squared * num;
</script>
```

#### 4. Préfixer les stores avec `$` pour accéder à leur valeur

---

Un *store* est un objet qui permet un accès réactif à une valeur via un simple *contrat de store*. Le [module `svelte/store`](/docs#run-time-svelte-store) contient des implémentations minimales qui remplissent ce contrat.

À chaque fois que vous avez une référence à un store, vous pouvez accéder à sa valeur au sein d'un composant en le préfixant avec le caractère `$`. Cela indique à Svelte de déclarer la variable préfixée, de s'abonner au store à l'initialisation du composant, et de se désabonner lorsque c'est pertinent.

Les assignations aux variables préfixées avec `$` nécessitent que la variable soit un *writable store*, et cela fera appel à la méthode `.set` du store.

Notez que le store doit être déclaré à la racine du composant — et non au sein d'un bloc `if` ou d'une fonction, par exemple.

Les variables locales (qui ne représentent pas la valeur d'un store) ne doivent *pas* être préfixées avec `$`.

```sv
<script>
	import { writable } from 'svelte/store';

	const count = writable(0);
	console.log($count); // affiche 0

	count.set(1);
	console.log($count); // affiche 1

	$count = 2;
	console.log($count); // affiche 2
</script>
```

##### Le contrat de store

```ts
store = { subscribe: (subscription: (value: any) => void) => (() => void), set?: (value: any) => void }
```

Vous pouvez créer vos propres stores sans dépendre de [`svelte/store`](/docs#run-time-svelte-store), en implémentant vous-même le *contrat de store*:

1. Un store doit contenir une méthode `.subscribe`, qui doit accepter comme argument une fonction d'abonnement. Lorsque `.subscribe` est appelée, cette fonction d'abonnement doit être appelée immédiatement et de manière synchrone avec la valeur actuelle du store. Toutes les fonctions d'abonnements actives d'un store doivent ensuite être appelées de manière synchrone à chaque fois que la valeur du store est mise à jour.
2. La méthode `.subscribe` doit retourner une fonction de désabonnement. Exécuter une fonction de désabonnement doit mettre fin à l'abonnement, et la fonction d'abonnement correspondant ne doit plus être appelée par le store.
3. Un store peut de manière *optionnelle* contenir une méthode `.set`, qui doit accepter comme argument une nouvelle valeur pour le store, et qui appellera de manière synchrone toutes les fonctions d'abonnement actives du store. Un tel store est appelé un store d'écriture (*writable store*).

Pour l'interopérabilité avec les Observables RxJS, la méthode `.subscribe` est également autorisée à retourner un objet avec une méthode `.unsubscribe`, au lieu de renvoyer directement la fonction de désabonnement. Notez toutefois qu'à moins que `.subscribe` appelle de manière synchrone la fonction d'abonnement (ce qui n'est pas requis par la spec Observable), Svelte aura `undefined` pour valeur du store jusqu'à ce qu'elle soit appelée.

### &lt;script context="module"&gt;

---

Une balise `<script>` avec un attribut `context="module"` est exécutée une seule fois quand le module est évalué la première fois, au lieu d'une fois pour chaque instance de composant. Les valeurs déclarées au sein de ce bloc sont accessibles depuis un `<script>` classique (et depuis le markup du composant), mais pas inversement.

Vous pouvez `export` des valeurs depuis ce bloc, et elles seront exposées comme exports du module compilés.

Vous ne pouvez pas `export default`, puisque l'export par défaut est le composant lui-même.

> Les variables définies dans des scripts `module` ne sont pas réactives — les réassigner ne déclenchera pas de nouveau rendu même si la variable elle-même est mise à jour. Pour partager des valeurs entre différents composants, priviléviez l'usage d'un [store](/docs#run-time-svelte-store).

```sv
<script context="module">
	let totalComponents = 0;

	// cela permet d'écrire dans un parent (par exemple)
	// `import Example, { alertTotal } from './Example.svelte'`
	export function alertTotal() {
		alert(totalComponents);
	}
</script>

<script>
	totalComponents += 1;
	console.log(`Nb de fois total où ce composant a été créé: ${totalComponents}`);
</script>
```


### &lt;style&gt;

---

Le CSS au sein d'un bloc `<style>` sera cantonné (*scoped*) à ce composant.

Cela est possible grâce à l'ajout d'une classe aux éléments concernés, classe basée sur un hash des styles du composant (par ex. `svelte-123xyz`).

```sv
<style>
	p {
		/* cela affectera uniquement les éléments `<p>` dans ce composant */
		color: burlywood;
	}
</style>
```

---

Pour appliquer les styles d'un sélecteur globalement, vous pouvez utiliser le modificateur `:global(...)`.

```sv
<style>
	:global(body) {
		/* ceci s'applique au `<body>` */
		margin: 0;
	}

	div :global(strong) {
		/* ceci s'applique à tous les éléments `<strong>`, dans n'importe
			 quel composant, qui sont à l'intérieur d'éléments `<div>`
			 appartenant à ce composant */
		color: goldenrod;
	}

	p:global(.red) {
		/* ceci s'applique à tous les éléments `<p>` appartenant à ce
			 composant avec une classe `red`, même si `class="red"` n'apparaît pas
			 initialement dans le markup, mais est ajoutée plus tard à runtime.
			 Cela sert quand la classe de l'élément est dynamiquement appliquée,
			 par exemple lorsque l'on met à jour la propriété `classList` d'un élément. */
	}
</style>
```

---

Si vous voulez utiliser des @keyframes accessibles globalement, vous devez préfixer votre keyframe avec `-global-`.

Le préfixe `-global-` sera supprimé à la compilation, et la keyframe pourra alors être référencée en utilisant simplement `my-animation-name` ailleurs dans le code.

```html
<style>
	@keyframes -global-my-animation-name {...}
</style>
```

---

Il ne peut y avoir qu'une 1 seule balise `<style>` à la racine d'un component.

Toutefois, il est possible d'avoir une balise `<style>` imbriquée dans d'autres éléments ou blocs logiques.

Dans ce cas, la balise `<style>` sera injectée telle quelle dans le DOM, aucun scoping ou formattage ne lui sera appliqué.


```html
<div>
	<style>
		/* cette balise sera injectée telle quelle */
		div {

			/* ceci s'appliquera à tous les éléments `<div>` du DOM */
			color: red;
		}
	</style>
</div>
```
