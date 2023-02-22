---
title: Assignations
---

Au coeur de Svelte se trouve un système efficace de **réactivité** qui permet de garder le <span class='vo'>DOM</span> en phase avec l'état de votre application — par exemple en réaction à un évènement.

Pour le mettre en valeur, nous devons d'abord mettre en place une écoute d'évènement. Remplacez la ligne 9 par :

```html
<button on:click={incrementCount}>
```

Dans la fonction `incrementCount`, il suffit de changer la valeur de `count` :

```ts
function incrementCount() {
	count += 1;
}
```

Svelte "instrumente" cette assignation avec du code qui va informer le <span class='vo'>DOM</span> de ce qui a besoin d'être mis à jour.
