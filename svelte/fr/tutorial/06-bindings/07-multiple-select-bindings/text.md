---
title: Sélection multiple
---

Un élément `<select>` peut avoir un attribute `multiple`. Dans ce cas, la liaison va remplir un tableau plutôt que sélectionner une valeur unique.

Dans notre [exemple précédent de glaces](/tutorial/group-inputs), nous pouvons remplacer les `<input type=checkbox>` par un `<select multiple>` :

```html
<h2>Flavours</h2>

<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

> Laisser enfoncée la touche `control` (ou la touche `command` sur MacOS) pour sélectionner plusieurs options.
