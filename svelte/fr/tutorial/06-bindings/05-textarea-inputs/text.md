---
title: Inputs de zone de texte
---

En Svelte, l'élément `<textarea>` se comporte de manière similaire à un `<input>` de texte — vous pouvez utiliser `bind:value` :

```html
<textarea bind:value={value}></textarea>
```

Dans des cas comme celui-ci où les noms correspondent, nous pouvons également nous servir de la forme contractée :

```html
<textarea bind:value></textarea>
```

Ce raccourci s'applique à toutes les liaisons, pas seulement celles des `<textarea>`.
