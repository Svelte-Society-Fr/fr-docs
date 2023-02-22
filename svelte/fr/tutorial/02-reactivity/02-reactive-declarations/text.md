---
title: Déclarations
---

La réactivité de Svelte ne se contente pas de garder le <span class='vo'>DOM</span> synchronisé avec les variables d'état de votre application, comme nous l'avons vu dans la section précédente. Cette réactivité permet aussi de garder les variables en phase les unes avec les autres en utilisant des déclarations réactives. Cela s'écrit :

```ts
let count = 0;
$: doubled = count * 2;
```

> Ne vous inquiétez pas si cela semble un peu étrange. Cette syntaxe est du JavaScript [valide](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/label), même si peu conventionnel, que Svelte interprète ainsi : "ré-exécute ce code dès qu'une des variables référencées change". Une fois l'habitude prise, vous ne pourrez plus vous en passer.

Utilisons `doubled` dans notre <span class='vo'>_markup_</span> :

```html
<p>{count} fois 2 vaut {doubled}</p>
```

Bien sûr, vous pourriez très bien vous contenter d'écrire `{count * 2}` dans le <span class='vo'>_markup_</span> — vous n'êtes pas obligé•e•s d'utiliser des valeurs réactives. Les valeurs réactives deviennent particulièrement utiles lorsque vous avez besoin de les référencer plusieurs fois, ou lorsque vous avez des valeurs qui dépendent d'**autres** valeurs réactives.
