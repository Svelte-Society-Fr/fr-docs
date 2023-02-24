---
title: Blocs else-if
---

Plusieurs conditions peuvent être "chaînées" entre elles avec `else if` :

```html
{#if x > 10}
	<p>{x} est plus grand que 10</p>
{:else if 5 > x}
	<p>{x} est plus petit que 5</p>
{:else}
	<p>{x} est entre 5 et 10</p>
{/if}
```
