---
title: Stores dérivés
---

Vous pouvez créer un <span class="vo">_store_</span> dont la valeur est basée sur celle d'un ou plusieurs **autres** <span class="vo">_stores_</span>, à l'aide de `derived`. En reprenant l'exemple précédent, nous pouvons créer un store dérivé qui maintient à jour le temps depuis laquelle la page est ouverte :

```ts
export const elapsed = derived(
	time,
	$time => Math.round(($time - start) / 1000)
);
```

> Il est possible de dériver un <span class="vo">_store_</span> depuis plusieurs entrées, ainsi que de définir explicitement une valeur avec `set` au lieu de la retourner (ce qui est utile pour dériver des valeurs de manière asynchrone). Consultez la [documentation de référence](/docs#run-time-svelte-store-derived) pour plus d'informations.
