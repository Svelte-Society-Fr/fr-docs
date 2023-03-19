---
title: Slots
---

Tout comme les éléments peuvent avoir des enfants...

```html
<div>
	<p>Je suis un enfant de la div</p>
</div>
```

...les instances de composants aussi. Toutefois, avant qu'il puisse accepter des enfants, l'instance a besoin de savoir où les positionner. Nous pouvons faire cela avec l'élément `<slot>`. Faites ceci dans `Box.svelte` :

```html
<div class="box">
	<slot></slot>
</div>
```

Vous pouvez maintenant mettre des choses dans la boîte :

```html
<Box>
	<h2>Bonjour !</h2>
	<p>Ceci est une boîte. Elle peut contenir toutes sortes de choses.</p>
</Box>
```
