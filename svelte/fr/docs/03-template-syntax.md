---
title: Syntaxe de template
---


### Balises

---

Une balise en minuscules, comme `<div>`, indique un élément HTML standard. Une balise avec la première lettre en majuscule, comme `<Widget>` ou `<Namespace.Widget>`, indique un *composant*.

```sv
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget/>
</div>
```


### Attributs et props

---

Par défaut, les attributs fonctionnent exactement comme leur équivalent HTML.

```sv
<div class="foo">
	<button disabled>pas touche</button>
</div>
```

---

Comme en HTML, les valeurs peuvent être fournies sans guillemets.

```sv
<input type=checkbox>
```

---

Les valeurs des attributs peuvent contenir des expressions JavaScript.

```sv
<a href="page/{p}">page {p}</a>
```

---

Ou elles peuvent *être définies* par des expressions JavaScript.

```sv
<button disabled={!clickable}>...</button>
```

---

Les attributs booléens sont inclus sur l'élément si leur valeur est [truthy](https://developer.mozilla.org/fr/docs/Glossary/Truthy) et exclus si leur valeur est [falsy](https://developer.mozilla.org/fr/docs/Glossary/Falsy).

Tous les autres attributs sont inclus à moins que leur valeur soit [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) (`null` ou `undefined`).

```sv
<input required={false} placeholder="Ce champ input n'est pas requis">
<div title={null}>Cette div n'a pas de titre</div>
```

---

Une expression peut éventuellement inclure des caractères qui casseraient la mise en valeur de la syntaxe dans du HTML classique, en conséquence il est permis de mettre la valeur en guillemets. Les guillemets n'ont pas d'influence sur le parsing de la valeur.

```sv
<button disabled="{number !== 42}">...</button>
```

---

Quand le nom d'un attribut et sa valeur sont identiques, (`name={name}`), il est possible d'écrire `{name}`.

```sv
<!-- Les syntaxes suivantes sont équivalentes -->
<button disabled={disabled}>...</button>
<button {disabled}>...</button>
```

---

Par convention, les valeurs passées aux composants sont appelées *propriétés* ou *props* plutôt qu'*attributs*, caractéristiques du DOM.

Comme pour les éléments, `name={name}` peut être raccourci en `{name}`.

```sv
<Widget foo={bar} answer={42} text="salut"/>
```

---

*Les attributs décomposés (spread attributes)* permettent de passer de nombreux attributs ou propriétés d'un seul coup.

Un élément ou un composant peut avoir plusieurs attributs décomposés, parsemés ou non d'attributs classiques.

```sv
<Widget {...things}/>
```

---

La variable *`$$props`* référence toutes les props qui sont fournies à un composant, y compris celles qui ne sont pas déclarées avec `export`. Il est en général déconseillé de l'utiliser, car Svelte a du mal à l'optimiser. Elle peut toutefois être utile dans de rares cas – par exemple lorsque vous ne savez pas à la compilation quelles props pourraient être passées à un composant.

```sv
<Widget {...$$props}/>
```

---

La variable *`$$restProps`* contient uniquement les props qui ne sont *pas* déclarées avec `export`. Elle peut être utilisée pour relayer des attributs inconnus à un élément dans un composant plus profond. Elle a les mêmes problèmes d'optimisation que *`$$props`*, et son utilisation n'est pas non plus recommandée.

```html
<input {...$$restProps}>
```

> L'attribut `value` d'un élément `input` ou ses éléments enfants de type `option` ne doivent pas être utilisés avec des attributs décomposés lorsque `bind:group` ou `bind:checked` est utilisé. Dans ce cas, Svelte doit être capable d'accéder à la `value` de l'élément directement dans le markup, afin de la relier à la variable correspondante.

> Parfois, l'ordre des attributs est important car Svelte gère les attributs séquentiellement dans JavaScript. Dans l'exemple `<input type="range" min="0" max="1" value={0.5} step="0.1"/>`, Svelte va essayer d'attribuer `1` à la valeur (arrondissant 0.5 à 1 car le pas par défaut est 1), puis va mettre le pas à `0.1`. Pour régler ce problème, utilisez plutôt `<input type="range" min="0" max="1" step="0.1" value={0.5}/>`.

> Un autre exemple est `<img src="..." loading="lazy" />`. Svelte va essayer d'attribuer la `src` de l'image avant d'appliquer `loading="lazy"` à l'élément `<img>`, ce qui arrive trop tard. Pour profiter du *lazy loading*, utilisez plutôt `<img loading="lazy" src="...">`.

---

### Expressions texte

```sv
{expression}
```

---

Le texte peut aussi contenir des expressions JavaScript:

> Si vous utilisez la [notation littérale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor) des expressions régulières (`RegExp`), vous devrez l'entourer de parenthèses.

```sv
<h1>Bonjour {name}!</h1>
<p>{a} + {b} = {a + b}.</p>

<div>{(/^[A-Za-z ]+$/).test(value) ? x : y}</div>
```

### Commentaires

---

Vous pouvez utiliser des commentaires HTML à l'intérieur des composants.

```sv
<!-- quel beau commentaire ! -->
<h1>Bonjour tout le monde</h1>
```

---

Les commentaires qui commencent par `svelte-ignore` désactivent les avertissements du prochain bloc de markup. En général, ce sont des avertissements d'accessibilité; essayez de ne les désactiver que pour une bonne raison.

```sv
<!-- svelte-ignore a11y-autofocus -->
<input bind:value={name} autofocus>
```

### {#if ...}

```sv
{#if expression}...{/if}
```
```sv
{#if expression}...{:else if expression}...{/if}
```
```sv
{#if expression}...{:else}...{/if}
```

---

Il est possible d'afficher conditionnellement du contenu en l'encadrant par un bloc `if`.

```sv
{#if answer === 42}
	<p>c'était quoi la question déjà ?</p>
{/if}
```

---

Des conditions supplémentaires peuvent être ajoutées avec `{:else if expression}`, et il est possible de terminer avec un `{:else}` optionnel.

```sv
{#if porridge.temperature > 100}
	<p>trop chaud !</p>
{:else if 80 > porridge.temperature}
	<p>trop froid !</p>
{:else}
	<p>parfait !</p>
{/if}
```

### {#each ...}

```sv
{#each expression as name}...{/each}
```
```sv
{#each expression as name, index}...{/each}
```
```sv
{#each expression as name (key)}...{/each}
```
```sv
{#each expression as name, index (key)}...{/each}
```
```sv
{#each expression as name}...{:else}...{/each}
```

---

Il est possible d'itérer sur des listes de valeurs avec un bloc `each`.

```sv
<h1>Liste de courses</h1>
<ul>
	{#each items as item}
		<li>{item.name} x {item.qty}</li>
	{/each}
</ul>
```

Vous pouvez utiliser des blocs `each` pour itérer sur n'importe quel tableau ou valeur similaire — c'est-à-dire un objet avec une propriété `length`.

---

Un bloc `each` peut aussi spécifier un *indice*, équivalent au deuxième argument du callback de `array.map(...)`:

```sv
{#each items as item, i}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

---

Vous pouvez spécifier une *clé* à un bloc `each`. Cette clé doit identifier de manière unique chaque élément de la liste. Svelte s'en servira pour mettre à jour la liste avec précision lorsque la donnée changera, plutôt que d'ajouter ou enlever des éléments à la fin. La clé peut être n'importe quel objet, mais les chaînes de caractères ou les nombres sont recommandés car ils permettent de persister l'identité, ce qui n'est pas le cas des objets.

```sv
{#each items as item (item.id)}
	<li>{item.name} x {item.qty}</li>
{/each}

<!-- ou en utilisant un indice -->
{#each items as item, i (item.id)}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

---

Vous pouvez librement utiliser la décomposition et la syntaxe *rest* dans les blocs `each`.

```sv
{#each items as { id, name, qty }, i (id)}
	<li>{i + 1}: {name} x {qty}</li>
{/each}

{#each objects as { id, ...rest }}
	<li><span>{id}</span><MyComponent {...rest}/></li>
{/each}

{#each items as [id, ...rest]}
	<li><span>{id}</span><MyComponent values={rest}/></li>
{/each}
```

---

Un bloc `each` peut aussi avoir une clause `{:else}`, qui sera affichée si la liste est vide.

```sv
{#each todos as todo}
	<p>{todo.text}</p>
{:else}
	<p>Rien à faire aujourd'hui !</p>
{/each}
```

### {#await ...}

```sv
{#await expression}...{:then name}...{:catch name}...{/await}
```
```sv
{#await expression}...{:then name}...{/await}
```
```sv
{#await expression then name}...{/await}
```
```sv
{#await expression catch name}...{/await}
```

---

Les blocs `await` permettent de différencier les trois états de Promesse possibles — en attente, résolue ou rejetée. En mode SSR, seul l'état d'attente sera rendu sur le serveur.

```sv
{#await promise}
	<!-- la promesse est en attente -->
	<p>en attente de la résolution de la promesse...</p>
{:then value}
	<!-- la promesse est résolue -->
	<p>La valeur est {value}</p>
{:catch error}
	<!-- la promesse est rejetée -->
	<p>Quelque chose ne va pas : {error.message}</p>
{/await}
```

---

Le bloc `catch` peut être ignoré si vous n'avez pas besoin d'afficher quoi que ce soit lorsque la promesse est rejetée (ou si aucune erreur n'est possible).

```sv
{#await promise}
	<!-- la promesse est en attente -->
	<p>en attente de la résolution de la promesse...</p>
{:then value}
	<!-- la promesse est résolue -->
	<p>La valeur est {value}</p>
{/await}
```

---

Si l'état d'attente ne vous concerne pas, vous pouvez aussi ignorer le bloc initial.

```sv
{#await promise then value}
	<p>La valeur est {value}</p>
{/await}
```

---

De manière similaire, si vous voulez uniquement afficher l'état d'erreur, vous pouvez ignorer le bloc `then`.

```sv
{#await promise catch error}
	<p>L'erreur est {error}</p>
{/await}
```

### {#key ...}

```sv
{#key expression}...{/key}
```

Les bloc `key` détruisent et reconstruisent leur contenu quand la valeur de leur expression change.

---

C'est utile lorsque vous voulez qu'un élément joue sa transition à chaque fois qu'une valeur se met à jour.

```sv
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

---

Utilisé autour de composants, un bloc `key` déclenchera leur réinstantiation et réinitialisation.

```sv
{#key value}
	<Component />
{/key}
```

### {@html ...}

```sv
{@html expression}
```

---

Dans une expression texte, les caractères `<` et `>` sont échappés ; ils ne sont en revanche pas échappés dans une expression HTML.

L'expression doit être du HTML valide en soi — `{@html "<div>"}contenu{@html "</div>"}` ne fonctionnera *pas*, car `</div>` n'est pas du HTML valide. De plus dans ce cas, Svelte ne réussira *pas* à compiler.

> Svelte ne nettoie pas les expressions avant d'injecter le HTML. Si la donnée provient d'une source non sûre, vous devez le nettoyer vous-même pour éviter d'exposer vos utilisateurs à des vulnérabilités de type XSS.

```sv
<div class="blog-post">
	<h1>{post.title}</h1>
	{@html post.content}
</div>
```

### {@debug ...}

```sv
{@debug}
```
```sv
{@debug var1, var2, ..., varN}
```

---

La balise `{@debug ...}` offre une alternative à `console.log(...)`. Elle affiche les valeurs des variables spécifiées lorsqu'elle changent, et met en pause l'exécution du code si vous avez les outils de développement ouverts.

```sv
<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

{@debug user}

<h1>Hello {user.firstname}!</h1>
```

---

`{@debug ...}` accepte une liste de noms de variables séparés par des virgules (mais pas des expressions).

```sv
<!-- Compile -->
{@debug user}
{@debug user1, user2, user3}

<!-- Ne compile pas -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```

La balise `${@debug}` sans argument insère une expression `debugger` qui est déclenchée lorsque *n'importe quel* état change, plutôt que certaines variables spécifiques.

### {@const ...}

```sv
{@const assignment}
```

---

La balise `{@const ...}` définit une constante locale.

```sv
<script>
	export let boxes;
</script>

{#each boxes as box}
	{@const area = box.width * box.height}
	{box.width} * {box.height} = {area}
{/each}
```

`{@const}` est uniquement utilisable en tant qu'enfant direct de `{#if}`, `{:else if}`, `{:else}`, `{#each}`, `{:then}`, `{:catch}`, `<Component />` ou `<svelte:fragment />`.

### Directives d'élément

En plus des attributs, les éléments peuvent avoir des *directives*, qui contrôlent le comportement des éléments de différentes manières.

#### on:*eventname*

```sv
on:eventname={handler}
```
```sv
on:eventname|modifiers={handler}
```

---

Utilisez la directive `on:` pour écouter des évènements du DOM.

```sv
<script>
	let count = 0;

	function handleClick(event) {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Compte: {count}
</button>
```

---

Les fonctions d'écoute peuvent être déclarées directement sans pénaliser les performances. Comme pour les attributs, les valeurs utilisées pour les directives peuvent être mises entre guillemets afin d'aider la coloration syntaxique.

```sv
<button on:click="{() => count += 1}">
	Compte: {count}
</button>
```

---

Ajoutez des *modificateurs* aux évènements DOM avec le caractère `|`.

```sv
<form on:submit|preventDefault={handleSubmit}>
	<!-- le comportement par défaut de l'évènement `submit` est ignoré,
	     ce qui permet de ne pas recharger la page -->
</form>
```

Les modificateurs suivants sont disponibles:

* `preventDefault` — appelle `event.preventDefault()` avant d'exécuter la fonction d'écoute
* `stopPropagation` — appelle `event.stopPropagation()`, empêchant l'évènement d'atteindre le prochain élément
* `passive` — améliore la performance du défilement pour les évènements touch/wheel (Svelte l'ajoutera automatiquement lorsque qu'il détecte que ce n'est pas problématique)
* `nonpassive` — déclare explicitement l'évènement avec `passive: false`
* `capture` — déclenche la fonction d'écoute pendant la phase de *capture* plutôt que pendant la phase de *bubbling*
* `once` — supprime la fonction d'écoute après sa première exécution
* `self` — ne déclenche la fonction d'écoute que si `event.target` est l'élément lui-même
* `trusted` — ne déclenche la fonction d'écoute que si `event.isTrusted` est `true`. C'est-à-dire si l'évènement est déclenché par une action utilisateur.

Vous pouvez chaîner les modificateurs, par ex. `on:click|once|capture={...}`.

---

Si la directive `on:` est utilisée sans valeur, le composant *relaiera* l'évènement, ce qui permet à un parent du composant d'écouter cet évènement.

```sv
<button on:click>
	Le composant lui-même va émettre un évènement clic
</button>
```

---

Il est possible d'avoir plusieurs fonctions d'écoute pour le même évènement:

```sv
<script>
	let counter = 0;
	function increment() {
		counter = counter + 1;
	}

	function track(event) {
		trackEvent(event)
	}
</script>

<button on:click={increment} on:click={track}>Cliquez moi !</button>
```

#### bind:*property*

```sv
bind:property={variable}
```

---

En général, la donnée *descend* du parent vers l'enfant. La directive `bind:` permet à la donnée de remonter de l'enfant vers le parent. Le plus souvent ces liaisons sont spécifiques à des éléments particuliers.

L'exemple le plus simple d'une liaison reflète la valeur d'une propriété, comme `input.value`.

```sv
<input bind:value={name}>
<textarea bind:value={text}></textarea>

<input type="checkbox" bind:checked={yes}>
```

---

Si le nom de la variable est le même que le nom de la propriété, vous pouvez simplifier l'écriture.

```sv
<!-- Ces écritures sont équivalentes -->
<input bind:value={value}>
<input bind:value>
```

---

Les valeurs numériques sont traitées comme des nombres ; même si `input.value` est une chaîne de caractères pour le DOM, Svelte traitera cette valeur comme un nombre. Si l'input est vide ou invalide (dans le cas de `type="number"` par exemple), la valeur sera `undefined`.

```sv
<input type="number" bind:value={num}>
<input type="range" bind:value={num}>
```

---

Sur les éléments `<input>` de type `type="file"`, vous pouvez utiliser `bind:files` pour obtenir la [`FileList` des fichiers sélectionnés](https://developer.mozilla.org/fr/docs/Web/API/FileList). Cette liste est en lecture seule.

```sv
<label for="avatar">Choisissez une image :</label>
<input
	accept="image/png, image/jpeg"
	bind:files
	id="avatar"
	name="avatar"
	type="file"
/>
```

---

Si vous utilisez des directives `bind:` conjointement à des directives `on:`, l'ordre dans lequel elles sont définies affectera la valeur de la variable liée lorsque la fonction d'écoute sera appelée.

```sv
<script>
	let value = 'Bonjour tout le monde';
</script>

<input
	on:input={() => console.log('Ancienne valeur:', value)}
	bind:value
	on:input={() => console.log('Nouvelle valeur:', value)}
/>
```

Dans ce cas, nous avons lié la valeur d'un input de texte qui utilise l'évènement `input`. Des liaisons sur d'autres éléments pourraient utiliser d'autres évènements comme `change`.

##### Lier les valeurs de `<select>`

---

Une liaison sur un `<select>` correspond à la propriété `value` de l'`<option>` sélectionnée, qui peut être n'importe quelle valeur (pas uniquement des chaînes de caractères, comme c'est le cas en général dans le DOM).

```sv
<select bind:value={selected}>
	<option value={a}>a</option>
	<option value={b}>b</option>
	<option value={c}>c</option>
</select>
```

---

Un élément `<select multiple>` se comporte de manière similaire à un groupe de checkbox.

```sv
<select multiple bind:value={fillings}>
	<option value="Riz">Riz</option>
	<option value="Haricots">Haricots</option>
	<option value="Fromage">Fromage</option>
	<option value="Guacamole (supplément)">Guacamole (supplément)</option>
</select>
```

---

Quand la valeur d'une `<option>` correspond à son contenu texte, l'attribut peut être ignoré.

```sv
<select multiple bind:value={fillings}>
	<option>Riz</option>
	<option>Haricots</option>
	<option>Formage</option>
	<option>Guacamole (supplément)</option>
</select>
```

---

Les éléments avec l'attribut `contenteditable` permettent les liaisons avec `innerHTML` et `textContent`.

```sv
<div contenteditable="true" bind:innerHTML={html}></div>
```

---

Les éléments `<details>` permettent les liaisons avec la propriété `open`.

```sv
<details bind:open={isOpen}>
	<summary>Détails</summary>
	<p>
    Quelque chose suffisamment petit pour passer inaperçu.
	</p>
</details>
```

##### Liaisons d'éléments media

---

Les éléments media (`<audio>` et `<video>`) ont leurs propres liaisons — au nombre de 6 et en *lecture seule* ...

* `duration` (readonly) — durée totale de la vidéo, en secondes
* `buffered` (readonly) — tableau d'objets `{start, end}`
* `played` (readonly) — idem
* `seekable` (readonly) — idem
* `seeking` (readonly) — booléen
* `ended` (readonly) — booléen

... et 5 liaisons *bi-latérales* :

* `currentTime` — temps actuel de lecture de la vidéo, en secondes
* `playbackRate` — vitesse de lecture de la vidéo, 1 étant 'normal'
* `paused` — a priori vous voyez ce que c'est
* `volume` — une valeur entre 0 et 1
* `muted` — booléen indiquant si le lecteur est en sourdine

Les vidéos ont de plus des liaisons en lecture seule pour les attributs `videoWidth` et `videoHeight`.

```sv
<video
	src={clip}
	bind:duration
	bind:buffered
	bind:played
	bind:seekable
	bind:seeking
	bind:ended
	bind:currentTime
	bind:playbackRate
	bind:paused
	bind:volume
	bind:muted
	bind:videoWidth
	bind:videoHeight
></video>
```

##### Liaisons des éléments de type `block`

---

Les éléments de type `block` ont 4 liaisons en lecture seule, mesurées en utilisant [une technique similaire à celle-ci](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/):

* `clientWidth`
* `clientHeight`
* `offsetWidth`
* `offsetHeight`

```sv
<div
	bind:offsetWidth={width}
	bind:offsetHeight={height}
>
	<Chart {width} {height}/>
</div>
```

#### bind:group

```sv
bind:group={variable}
```

---

Les inputs qui fonctionnent ensemble peuvent utiliser `bind:group`.

```sv
<script>
	let tortilla = 'Simple';
	let fillings = [];
</script>

<!-- les inputs radio groupés sont mutuellement exclusifs -->
<input type="radio" bind:group={tortilla} value="Simple">
<input type="radio" bind:group={tortilla} value="Complète">
<input type="radio" bind:group={tortilla} value="Épinards">

<!-- les inputs checkbox groupés remplissent un tableau -->
<input type="checkbox" bind:group={fillings} value="Riz">
<input type="checkbox" bind:group={fillings} value="Haricots">
<input type="checkbox" bind:group={fillings} value="Fromage">
<input type="checkbox" bind:group={fillings} value="Guacamole (supplément)">
```

#### bind:this

```sv
bind:this={dom_node}
```

---

Utiliser `bind:this` vous permet d'obtenir une référence à un noeud DOM.

```sv
<script>
	import { onMount } from 'svelte';

	let canvasElement;

	onMount(() => {
		const ctx = canvasElement.getContext('2d');
		drawStuff(ctx);
	});
</script>

<canvas bind:this={canvasElement}></canvas>
```



#### class:*name*

```sv
class:name={value}
```
```sv
class:name
```

---

Une directive `class:` fournit une méthode rapide pour ajouter ou enlever une classe à un élément.

```sv
<!-- Ces syntaxes sont équivalentes -->
<div class="{active ? 'active' : ''}">...</div>
<div class:active={active}>...</div>

<!-- Syntaxe raccourcie, quand le nom de la variable correspond au nom de la classe -->
<div class:active>...</div>

<!-- Plusieurs directives `class:` peuvent être utilisées -->
<div class:active class:inactive={!active} class:isAdmin>...</div>
```

#### style:*property*

```sv
style:property={value}
```
```sv
style:property="value"
```
```sv
style:property
```

---

La directive `style:` fournit un raccourci pour modifier directement le style d'un élément.

```sv
<!-- Ces syntaxes sont équivalentes -->
<div style:color="red">...</div>
<div style="color: red;">...</div>

<!-- Vous pouvez utiliser des variables -->
<div style:color={myColor}>...</div>

<!-- Syntaxe raccourcie, quand le nom de la variable correspond au nom de la propriété -->
<div style:color>...</div>

<!-- Plusieurs directives `style:` peuvent être utilisées -->
<div style:color style:width="12rem" style:background-color={darkMode ? "black" : "white"}>...</div>

<!-- Vous pouvez définir des styles comme importants -->
<div style:color|important="red">...</div>
```

---

Quand des directives `style:` sont combinées avec des attributs `style`, les directives sont prioritaires.

```sv
<div style="color: blue;" style:color="red">Ceci sera rouge</div>
```


#### use:*action*

```sv
use:action
```
```sv
use:action={parameters}
```

```ts
action = (node: HTMLElement, parameters: any) => {
	update?: (parameters: any) => void,
	destroy?: () => void
}
```

---

Les actions sont des fonctions exécutées lorsqu'un élément est créé. Elles peuvent renvoyer un objet avec une méthode `destroy` qui sera appelée lors de la destruction de l'élément.

```sv
<script>
	function foo(node) {
		// le noeud a été ajouté au DOM

		return {
			destroy() {
				// le noeud a été supprimé du DOM
			}
		};
	}
</script>

<div use:foo></div>
```

---

Une action peut avoir un argument. Si la valeur renvoyée possède une méthode `update`, celle-ci sera exécutée à chaque fois que cet argument changera, juste après que Svelte a appliqué les modifications au *markup*.

> Ne vous inquiétez pas du fait que l'on redéclare la fonction `foo` pour chaque instance — Svelte garde en mémoire toute fonction qui ne dépend pas d'un état local en dehors de la définition du composant.


```sv
<script>
	export let bar;

	function foo(node, bar) {
		// le noeud a été ajouté au DOM

		return {
			update(bar) {
				// la valeur de `bar` a changé
			},

			destroy() {
				// le noeud a été supprimé du DOM
			}
		};
	}
</script>

<div use:foo={bar}></div>
```

#### transition:*fn*

```sv
transition:fn
```
```sv
transition:fn={params}
```
```sv
transition:fn|local
```
```sv
transition:fn|local={params}
```

```ts
transition = (node: HTMLElement, params: any, options: { direction: 'in' | 'out' | 'both' }) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

---

Une transition est déclenchée lorsqu'un élément entre ou sort du DOM après un changement d'état.

Quand un bloc transitionne vers sa sortie, tous les éléments au sein du bloc, y compris ceux n'ayant pas de transition propre, sont laissés dans le DOM tant que toutes les transitions du bloc se soient terminées.

La directive `transition:` établit une transition *bidirectionnelle*, ce qui implique qu'elle peut être inversée sans heurts en cours de transition.

```sv
{#if visible}
	<div transition:fade>
		s'estompe en entrant et en sortant
	</div>
{/if}
```

> Par défaut, les transitions d'entrée ne sont pas jouées au premier rendu. Vous pouvez modifier ce comportement en appliquant `intro: true` lorsque vous [instanciez manuellement un composant](/docs#run-time-client-side-component-api).

##### Paramètres de transition

---

À l'instar des actions, les transitions peuvent avoir des paramètres.

(La syntaxe `{{accolades}}` n'est pas spéciale ; il s'agit simplement d'un objet dans une balise d'expression.)

```sv
{#if visible}
	<div transition:fade="{{ duration: 2000 }}">
		s'estompe en entrant et en sortant sur une durée de 2 secondes
	</div>
{/if}
```

##### Transitions personnalisées

---

Les transitions peuvent être définies par des fonctions personnalisées. Si l'objet retourné possède une fonction `css`, Svelte créera une animation CSS qui sera jouée sur l'élément.

L'argument `t` passé à `css` est une valeur entre `0` et `1` après que la fonction `easing` a été appliquée. Les transitions *entrantes* sont jouées de `0` à `1`, les transitions *sortantes* sont jouées de `1` à `0` — en d'autres termes, `1` est l'état normal de l'élément, comme si aucune transition ne lui était appliquée. L'argument `u` est égal à `1 - t`.

La fonction est régulièrement appelée *avant* que la transition ne commence, avec différentes valeurs pour `t` et `u`.

```sv
<script>
	import { elasticOut } from 'svelte/easing';

	export let visible;

	function whoosh(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t, u) => `transform: ${existingTransform} scale(${t})`
		};
	}
</script>

{#if visible}
	<div in:whoosh>
		entre en faisant woosh
	</div>
{/if}
```

---

Une fonction de transition personnalisée peut aussi renvoyer une fonction `tick`, qui est appelée *pendant* la transition avec les mêmes arguments `t` et `u`.

> Il est recommandé d'utiliser `css` plutôt que `tick`, si possible — les animations CSS sont exécutées sur un fil d'exécution (*thread*) différent de celui de JS, évitant ainsi de ralentir les machines les moins puissantes.

```sv
<script>
	export let visible = false;

	function typewriter(node, { speed = 1 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);

		if (!valid) {
			throw new Error(`Cette transition ne fonctionne que sur les éléments avec un seul noeud texte comme enfant`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: t => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

{#if visible}
	<p in:typewriter="{{ speed: 1 }}">
		Le renard marron et véloce saute au-dessus du chien fainéant
	</p>
{/if}
```

Si une transition retourne une fonction au lieu d'un objet transition, la fonction sera appelée lors de la prochaine micro-tâche. Cela permet à plusieurs transitions de se coordonner, rendant les effets de [fondu croisé](/tutorial/deferred-transitions) possibles.

Les fonctions de transition peuvent aussi avoir un troisième argument, `options`, qui contient des informations sur la transition.

Les valeurs possibles dans l'objet `options` sont:

* `direction` - `in`, `out`, or `both`, selon le type de transition

##### Évènements de transition

---

Un élément ayant des transitions génére les évènements suivants en plus des évènements DOM standards:

* `introstart`
* `introend`
* `outrostart`
* `outroend`

```sv
{#if visible}
	<p
		transition:fly="{{ y: 200, duration: 2000 }}"
		on:introstart="{() => status = "début de l'entrée"}"
		on:outrostart="{() => status = "début de la sortie"}"
		on:introend="{() => status = "fin de l'entrée"}"
		on:outroend="{() => status = "fin de la sortie"}"
	>
		Entre et sort en volant
	</p>
{/if}
```

---

Les transitions locales sont jouées uniquement lorsque le bloc auquel elles appartiennent est créé ou détruit, *pas* lorsqu'un bloc parent est créé ou détruit.

```sv
{#if x}
	{#if y}
		<p transition:fade>
      s'estompe en entrée et sortie lorsque x ou y change
		</p>

		<p transition:fade|local>
			s'estompe en entrée et sortie uniquement lorsque y change
		</p>
	{/if}
{/if}
```


#### in:*fn*/out:*fn*

```sv
in:fn
```
```sv
in:fn={params}
```
```sv
in:fn|local
```
```sv
in:fn|local={params}
```

```sv
out:fn
```
```sv
out:fn={params}
```
```sv
out:fn|local
```
```sv
out:fn|local={params}
```

---

Similaire à `transition:`, mais s'applique uniquement aux éléments entrant (`in:`) ou sortant (`out:`) du DOM

Contrairement à `transition:`, les transitions appliquées avec `in:` et `out:` ne sont pas bi-directionnelles — une transition entrante (*in*) continuera sa course en parallèle de la transition sortante (*out*), plutôt que d'être inversée, si le bloc est supprimé pendant la transition en cours. Si une transition sortante est annulée, les transitions seront rejouées du début.

```sv
{#if visible}
	<div in:fly out:fade>
		entre en volant, sort en fondu
	</div>
{/if}
```



#### animate:*fn*

```sv
animate:name
```

```sv
animate:name={params}
```

```ts
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

```ts
DOMRect {
	bottom: number,
	height: number,
	​​left: number,
	right: number,
	​top: number,
	width: number,
	x: number,
	y: number
}
```

---

Une animation est déclenchée quand le contenu d'un [bloc `each` avec clé](/docs#template-syntax-each) est réordonné. Les animations ne sont pas jouées lorsqu'un élément est ajouté ou supprimé, seulement lorsque l'indice d'un élément de liste change au sein d'un bloc `each`. Les directives `animate:` doivent appartenir à un élément enfant *direct* d'un bloc `each` avec clé.

Les animations peuvent être utilisées avec les [fonctions d'animation natives](/docs#run-time-svelte-animate) de Svelte ou avec des [fonctions d'animation personnalisées](/docs#template-syntax-element-directives-animate-fn-custom-animation-functions).

```sv
<!-- Quand `list` est réordonnée, l'animation sera jouée -->
{#each list as item, index (item)}
	<li animate:flip>{item}</li>
{/each}
```

##### Paramètres d'animation

---

À l'instar des actions et des transitions, les animations peuvent avoir des paramètres.

(La syntaxe `{{accolades}}` n'est pas spéciale; il s'agit simplement d'un objet dans une balise d'expression.)

```sv
{#each list as item, index (item)}
	<li animate:flip="{{ delay: 500 }}">{item}</li>
{/each}
```

##### Fonctions d'animation personnalisées

---

Les animations peuvent être définies par des fonctions fournissant un `node`, un objet `animation`, et n'importe quels `parameters` en arguments. L'argument `animation` est un objet ayant les propriétés `from` et `to`, chacune contenant un [DOMRect](https://developer.mozilla.org/fr/docs/Web/API/DOMRect#Properties) décrivant la géométrie de l'élément dans ses positions de départ (`start`) et arrivée (`end`). La propriété `from` est le DOMRect de l'élément dans sa position de départ, la propriété `to` est le DOMRect de l'élément dans sa position d'arrivée après que la liste a été réordonnée et le DOM mis à jour.

Si l'objet renvoyé a une méthode `css`, Svelte va créer une animation CSS qui sera jouée sur l'élément.

L'argument `t` passé à `css` est une valeur qui va de `0` à `1` avec que la fonction `easing` a été appliquée. L'argument `u` est égal à `1 - t`.

La fonction est régulièrement appelée *avant* que la transition ne commence, avec différentes valeurs pour `t` et `u`.


```sv
<script>
	import { cubicOut } from 'svelte/easing';

	function whizz(node, { from, to }, params) {

		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			css: (t, u) =>
				`transform: translate(${u * dx}px, ${u * dy}px) rotate(${t*360}deg);`
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```

---

Une fonction d'animation personnalisée peut aussi renvoyer une fonction `tick`, qui est appelée *pendant* la transition avec les mêmes arguments `t` et `u`.

> Il est recommandé d'utiliser `css` plutôt que `tick`, si possible — les animations CSS sont exécutées sur un *thread* différent de celui de JS, évitant ainsi de ralentir les machines les moins puissantes.

```sv
<script>
	import { cubicOut } from 'svelte/easing';

	function whizz(node, { from, to }, params) {

		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
		delay: 0,
		duration: Math.sqrt(d) * 120,
		easing: cubicOut,
		tick: (t, u) =>
			Object.assign(node.style, {
				color: t > 0.5 ? 'Pink' : 'Blue'
			});
	};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```


### Directives de composant

#### on:*eventname*

```sv
on:eventname={handler}
```

---

Les composants peuvent émettre des évènements en utilisant [createEventDispatcher](/docs#run-time-svelte-createeventdispatcher), ou en relayant les évènements DOM. Il est possible d'écouter des évènements de composant de la même manière que pour des évènements DOM :

```sv
<UnComposant on:peuimporte={handler} />
```

---

Comme pour les évènement DOM, si la directin `on:` est utilisée sans valeur, le composant va *relayer* l'évènement, ce qui permet au parent du composant de l'écouter.


```sv
<UnComposant on:peuimporte />
```

#### --style-props

```sv
--style-props="anycssvalue"
```

---

Vous pouvez aussi passer des props de style aux composants en utilisant les propriétés CSS personnalisées (*CSS custom properties*). Cela permet notamment d'appliquer des thèmes.

Cette fonctionnalité est principalement du sucre syntaxique, que Svelte va transformer pour entourer l'élément, comme dans cet exemple :

```sv
<Slider
  bind:value
  min={0}
  --rail-color="black"
  --track-color="rgb(0, 0, 255)"
/>
```

---

Qui va générer :

```sv
<div style="display: contents; --rail-color: black; --track-color: rgb(0, 0, 255)">
  <Slider
    bind:value
    min={0}
    max={100}
  />
</div>
```

**Note**: Faites attention, cette syntaxe ajoute une `<div>` à votre markup, qui pourra être ciblée accidentellement par votre CSS. Ayez conscience de cet ajout d'élément lorsque vous utilisez cette fonctionnalité.

---

Dans le namespace SVG, l'exemple ci-dessus va générer un `<g>` à la place d'une `<div>` :

```sv
<g style="--rail-color: black; --track-color: rgb(0, 0, 255)">
  <Slider
    bind:value
    min={0}
    max={100}
  />
</g>
```

**Note**: Faites attention, cette syntaxe ajoute un `<g>` à votre markup, qui pourra être ciblé accidentellement par votre CSS. Ayez conscience de cet ajout d'élément lorsque vous utilisez cette fonctionnalité.

---

Le support des variables CSS dans Svelte permet d'appliquer des thèmes aux composants de manière simple :

```sv
<!-- Slider.svelte -->
<style>
  .potato-slider-rail {
    background-color: var(--rail-color, var(--theme-color, 'purple'));
  }
</style>
```

---

Vous pouvez alors définir une couleur de thème à plus haut niveau :

```css
/* global.css */
html {
  --theme-color: black;
}
```

---

Ou l'écraser au niveau de l'instantiation du composant :

```sv
<Slider --rail-color="goldenrod"/>
```

#### bind:*property*

```sv
bind:property={variable}
```

---

Vous pouvez lier des props de composant en utilisant la même syntaxe que pour les éléments.

```sv
<Keypad bind:value={pin}/>
```

#### bind:this

```sv
bind:this={component_instance}
```

---

Les composants permettent aussi `bind:this`, permettant d'interagir avec les instances de composant programmatiquement.

> Notez qu'on ne peut pas écrire `{cart.empty}` puisque `cart` est `undefined` quand le bouton est rendu la première fois, ce qui provoquerait une erreur

```sv
<ShoppingCart bind:this={cart}/>

<button on:click={() => cart.empty()}>
	Caddie vide
</button>
```



### `<slot>`

```sv
<slot><!-- contenu par défaut optionnel --></slot>
```
```sv
<slot name="x"><!-- contenu par défaut optionnel --></slot>
```
```sv
<slot prop={value}></slot>
```

---

Les composants peuvent avoir du contenu enfant (ou *slot*), de la même façon que les éléments.

Le contenu est exposé dans le composant enfant avec l'élément `<slot>`, qui peut avoir un contenu par défaut qui sera utilisé si aucun enfant n'est fourni.

```sv
<!-- Widget.svelte -->
<div>
	<slot>
    ce contenu slot par défaut sera rendu si aucun contenu n'est fourni, comme dans le premier exemple
	</slot>
</div>

<!-- App.svelte -->
<Widget></Widget> <!-- ce composant va rendre le contenu par défaut -->

<Widget>
	<p>ceci est du contenu qui remplacera le contenu slot par défaut</p>
</Widget>
```


#### `<slot name="`*name*`">`

---

Les slots nommés permettent aux parents de cibler des zones spécifiques. Ils peuvent aussi avoir du contenu par défaut.

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">Aucun en-tête fourni</slot>
	<p>Du contenu entre l'en-tête et le bas de page</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<h1 slot="header">Bonjour</h1>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</Widget>
```

Les composants peuvent être placés dans un slot nommé en utilisant le syntaxe `<Component slot="name />`.
Pour positionner du contenu dans un slot sans l'entourer d'un élément, vous pouvez utiliser l'élément spécial `<svelte:fragment>`.

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">Aucun en-tête fourni</slot>
	<p>Du contenu entre l'en-tête et le bas de page</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<HeaderComponent slot="header" />
	<svelte:fragment slot="footer">
		<p>Tous droits réservés.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```

#### `$$slots`

---

L'objet `$$slots` a comme clés les noms des slots passés au composant par le parent. Si le parent ne fournit pas un slot avec un nom particulier, ce nom ne sera pas présent dans `$$slots`. Cela permet aux composants d'afficher un slot (et d'autres éléments, comment des *wrappers* de style) uniquement si le parent le fournit.

Notez que passer explicitement un slot nommés vide ajoutera le nom de ce slot à `$$slots`. Par exemple, si un parent fournit `<div slot="title" />` à un composant enfant, `$$slots.title` sera *truthy* dans l'enfant.

```sv
<!-- Card.svelte -->
<div>
	<slot name="title"></slot>
	{#if $$slots.description}
		<!-- Ce <hr> et ce <slot> seront rendus uniquement si un slot nommé "description" est fourni -->
		<hr>
		<slot name="description"></slot>
	{/if}
</div>

<!-- App.svelte -->
<Card>
	<h1 slot="title">Titre d'article de blog</h1>
	<!-- Aucun slot "description" n'est fourni, donc aucun des éléments dépendants de $$slots.description ne sera rendu -->
</Card>
```

#### `<slot key={`*value*`}>`

---

Les slors peuvent être rendus zéro ou plusieurs fois, et peuvent passer des valeurs *en retour* au parent en utilisant des props. Le parent expose ces valeurs au *template* de slot avec la directive `let:`.

Il est possible d'utiliser la syntaxe raccourcie usuelle — `let:item` est équivalent à `let:item={item}`, et `<slot {item}>` est équivalent à `<slot item={item}>`.

```sv
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot prop={item}></slot>
		</li>
	{/each}
</ul>

<!-- App.svelte -->
<FancyList {items} let:prop={thing}>
	<div>{thing.text}</div>
</FancyList>
```

---

Les slots nommés peuvent aussi exposer des valeurs. La directive `let:` ira sur l'élément avec l'attribut `slot` correspondant.

```sv
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot name="item" {item}></slot>
		</li>
	{/each}
</ul>

<slot name="footer"></slot>

<!-- App.svelte -->
<FancyList {items}>
	<div slot="item" let:item>{item.text}</div>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```

