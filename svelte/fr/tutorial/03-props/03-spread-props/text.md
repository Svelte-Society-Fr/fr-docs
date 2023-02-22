---
title: Décomposition des props
---

Si vous avez un objet de propriétés, vous pouvez le décomposer à l'initialisation du composant plutôt que de les spécifier une par une :

```html
<Info {...pkg}/>
```

> Inversement, si vous avez besoin de référencer toutes les <span class="vo">props</span> qui ont été passées à un composant, y compris celles non spécifiées avec le mot clé `export`, vous pouvez le faire avec l'objet `$$props` directement. Ce n'est pas recommandé, car cela rend difficile l'optimisation pour Svelte, mais cela reste très pratique dans de rares cas.
