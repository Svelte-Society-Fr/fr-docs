---
title: <svelte:component>
---

Un composant peut changer de catégorie en utilisant `<svelte:component>`. À la place d'un enchaînement de blocs `if`...

```html
{#if selected.color === 'rouge'}
	<RedThing/>
{:else if selected.color === 'vert'}
	<GreenThing/>
{:else if selected.color === 'bleu'}
	<BlueThing/>
{/if}
```

...nous pouvons avoir un seul composant dynamique :

```html
<svelte:component this={selected.component}/>
```

La valeur `this` peut être n'importe quel constructor de composant, ou une valeur <span class="vo">_falsy_</span> — si la valeur est <span class="vo">_falsy_</span>, aucun composant n'est rendu.
