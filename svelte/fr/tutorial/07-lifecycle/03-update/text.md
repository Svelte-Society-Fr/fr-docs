---
title: beforeUpdate and afterUpdate
---

La fonction `beforeUpdate` prévoit une mise-à-jour à effectuer juste avant la mise-à-jour du <span class="vo">_DOM_</span>. `afterUpdate` est son alter-ego, utile pour exécuter du code une fois que le DOM est synchronisé avec votre donnée.

Ensemble, elles permettent d'effectuer des actions de manière impérative, notamment des actions qu'il serait difficile de réaliser avec des méthodes se basant uniquement sur l'état, comme mettre à jour la position de défilement d'un élément.

Ce robot conversationnel [Eliza](https://fr.wikipedia.org/wiki/ELIZA) (qui ne parle qu'anglais), est pénible à utiliser, parce que vous devez en permanence faire défiler la fenêtre.
Corrigeons cela.

```ts
let div;
let autoscroll;

beforeUpdate(() => {
	autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
});

afterUpdate(() => {
	if (autoscroll) div.scrollTo(0, div.scrollHeight);
});
```

Notez que `beforeUpdate` sera exécuté la première fois avant le montage du composant, nous devons donc d'abord vérifier l'existence de `div` avant d'en lire les propriétés.
