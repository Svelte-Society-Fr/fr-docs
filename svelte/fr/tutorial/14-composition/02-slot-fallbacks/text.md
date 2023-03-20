---
title: Slot par défaut
---

Un composant peut définir un contenu par défaut pour tout <span class="vo">_slot_</span> qui n'a pas été rempli, simplement en mettant du contenu dans l'élément `<slot>` :

```html
<div class="box">
	<slot>
		<em>aucun contenu n'a été fourni</em>
	</slot>
</div>
```

Nous pouvons maintenant créer des instances de `<Box>` sans aucun enfant :

```html
<Box>
	<h2>Bonjour !</h2>
	<p>Ceci est une boîte. Elle peut contenir toutes sortes de choses.</p>
</Box>

<Box/>
```
