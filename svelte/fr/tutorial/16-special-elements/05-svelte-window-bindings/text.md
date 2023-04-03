---
title: Liaisons <svelte:window>
---

Nous pouvons également créer des liaisons avec certaines propriétés de `window`, comme `scrollY`. Modifiez la ligne 7 :

```html
<svelte:window bind:scrollY={y}/>
```

La liste des propriétés compatibles avec les liaisons est la suivante :

* `innerWidth`
* `innerHeight`
* `outerWidth`
* `outerHeight`
* `scrollX`
* `scrollY`
* `online` — alias de `window.navigator.onLine`

Toutes sauf `scrollX` et `scrollY` sont en lecture seule.
