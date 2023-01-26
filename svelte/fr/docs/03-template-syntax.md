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

Si une expression *clé* est fournie — qui se doit d'identifier de manière unique chaque élément de la liste — Svelte s'en servira pour mettre à jour la liste avec précision lorsque la donnée changera, plutôt que d'ajouter ou enlever des éléments à la fin. La clé peut être n'importe quel objet, mais les chaînes de caractères ou les nombres sont recommandés car ils permettent de persister l'identité, ce qui n'est pas le cas des objets.

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
