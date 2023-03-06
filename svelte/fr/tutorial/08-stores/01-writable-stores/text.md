---
title: Stores d'écriture
---

Dans une application, certains états ne devraient pas être liés à une hiérarchie de composants. Vous aurez parfois des valeurs qui ont besoin d'être accessibles depuis plusieurs composants très différents, ou par un module JavaScript normal.

En Svelte, nous faisons cela avec des <span class="vo">_**stores**_</span>. Un <span class="vo">_store_</span> est juste un objet avec une méthode `subscribe` qui permet aux parties intéressées d'être notifiées lorsque la valeur du <span class="vo">_store_</span> change. Dans `App.svelte`, `count` est un <span class="vo">_store_</span>, et nous définissons la valeur de `countValue` dans le <span class="vo">_callback_</span> `count.subscribe`.

Cliquez sur l'onglet `stores.js` pour voir la définition de `count`. C'est un <span class="vo">_store_</span> d'**écriture**, ce qui veut dire qu'il possède les méthodes `set` et `update` en plus de `subscribe`.

Allez maintenant dans l'onglet `Incrementer.svelte` afin de connecter le bouton `+` :

```ts
function increment() {
	count.update(n => n + 1);
}
```

Un clic sur le bouton `+` devrait maintenant mettre à jour le compteur. Faites l'inverse pour `Decrementer.svelte`.

Enfin, dans `Resetter.svelte`, implémentez `reset` :

```ts
function reset() {
	count.set(0);
}
```
