---
title: Évènements DOM
---

Nous avons déjà rapidement évoqué qu'il est possible d'écouter n'importe quel évènement sur un élément avec la directive `on:` :

```html
<div on:mousemove={handleMousemove}>
	La souris se trouve à la position ({m.x} ; {m.y})
</div>
```
