---
title: Gestionnaires en ligne
---

Vous pouvez aussi déclarer les gestionnaires d'évènement en ligne :

```html
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	Le curseur se trouve à la position ({m.x} ; {m.y})
</div>
```

Les guillemets sont optionnels, mais sont utiles pour la coloration syntaxique dans certains environnements.

> Certains <span class='vo'>_frameworks_</span> recommendent d'éviter les gestionnaires d'évènements en ligne pour des raisons de performance, particulièrement au sein de boucles. Ce conseil ne s'applique pas pour Svelte — le compilateur prendra toujours la bonne décision, peu importe la forme que vous choisissez.
