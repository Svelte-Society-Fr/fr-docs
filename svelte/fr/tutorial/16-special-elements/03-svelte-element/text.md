---
title: <svelte:element>
---

Nous ne savons pas toujours à l'avance quel type d'élément du <span class="vo">_DOM_</span> afficher. `<svelte:element>` sert dans ces situations. À la place d'un enchaînement de blocs `if`...

```html
{#if selected === 'h1'}
	<h1>Je suis une balise h1</h1>
{:else if selected === 'h3'}
	<h3>Je suis une balise h3</h3>
{:else if selected === 'p'}
	<p>Je suis une balise p</p>
{/if}
```

...nous pouvons avoir un simple composant dynamique :

```html
<svelte:element this={selected}>Je suis une balise {selected}</svelte:element>
```

La valeur `this` peut être n'importe quelle chaîne de caractères, ou une valeur <span class="vo">_falsy_</span> — si la valeur est <span class="vo">_falsy_</span>, aucun composant n'est rendu.
