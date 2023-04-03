---
title: <svelte:fragment>
---

L'élément `<svelte:fragment>` vous permet de placer du contenu dans un <span class="vo">_slot_</span> nommé sans l'entourer dans un élément de <span class="vo">_DOM_</span> supplémentaire. Cela permet de garder intacte la structure hiérarchique de votre document.

Notez dans cet exemple que nous avons utilisé sur l'élément avec la classe `box` une disposition `flex` avec un `gap` de `1em`.

```sv
<!-- Box.svelte -->
<div class="box">
	<slot name="header">Aucun en-tête n'a été fourni</slot>
	<p>Un peu de contenu entre l'en-tête et le pied-de-page</p>
	<slot name="footer"></slot>
</div>

<style>
	.box {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
```

Toutefois, le contenu du pied-de-page n'est pas espacé selon nos critères <span class="vo">_CSS_</span> parce que nous avons dû l'entourer d'une `<div>`, ce qui a créé une nouvelle hiérarchie dans la page.

Nous pouvons résoudre ce problème en remplaçant `<div slot="footer">` dans le composant `App` par `<svelte:fragment>` :

```sv
<svelte:fragment slot="footer">
	<p>Tous droits réservés.</p>
	<p>Copyright (c) 2019 Svelte Industries</p>
</svelte:fragment>
```
