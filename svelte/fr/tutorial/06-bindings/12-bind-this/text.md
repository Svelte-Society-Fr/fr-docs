---
title: This
---

La liaison en lecture seule `this` s'applique sur tous les éléments (et composants) et vous permettent de référencer les éléments affichés. Par exemple, nous pouvons référencer l'élément `<canvas>` :

```html
<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas>
```

Notez que la valeur de `canvas` sera `undefined` tant que le composant n'est pas monté. Nous mettons donc la logique liée dans la [fonction de cycle de vie `onMount`](/tutorial/onmount).
