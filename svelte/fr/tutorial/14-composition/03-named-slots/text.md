---
title: Slots nommés
---

L'exemple précédent contenait un <span class="vo">_slot_</span> par défaut, qui affiche l'enfant direct d'une instance de composant. Parfois vous aurez besoin de plus de contrôle sur le positionnement, comme avec cette `<ContactCard>`. Dans ces cas-là, nous pouvons utiliser des **<span class="vo">_slot_</span> nommés**.

Dans `ContactCard.svelte`, ajoutez un attribut `name` à chaque <span class="vo">_slot_</span> :

```html
<article class="contact-card">
	<h2>
		<slot name="name">
			<span class="missing">Nom inconnu</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Adresse inconnue</span>
		</slot>
	</div>

	<div class="email">
		<slot name="email">
			<span class="missing">e-mail inconnu</span>
		</slot>
	</div>
</article>
```

Puis, ajoutez des éléments avec l'attribut `slot="..."` correspondant dans le composant `<ContactCard>` :

```html
<ContactCard>
	<span slot="name">
		P. Dupont
	</span>

	<span slot="address">
		42 rue de la chocolatine<br>
		Bordeaux
	</span>
</ContactCard>
```
