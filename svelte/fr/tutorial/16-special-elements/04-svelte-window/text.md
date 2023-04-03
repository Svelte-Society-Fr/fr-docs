---
title: <svelte:window>
---

De même qu'il est possible d'ajouter des gestionnaires d'évènements à n'importe quel élément du <span class="vo">_DOM_</span>, vous pouvez en ajouter à l'objet `window` avec `<svelte:window>`.

À la ligne 11, ajoutez le gestionnaire `keydown` :

```html
<svelte:window on:keydown={handleKeydown}/>
```

> Comme pour les éléments du <span class="vo">_DOM_</span>, vous pouvez ajouter des [modificateurs d'évènements](/tutorial/event-modifiers) comme `preventDefault`.
