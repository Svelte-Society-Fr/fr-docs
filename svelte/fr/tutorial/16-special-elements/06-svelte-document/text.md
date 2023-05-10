---
title: <svelte:document>
---

À l'instar de `<svelte:window>`, l'élément `<svelte:document>` vous permet d'écouter des évènements générés par `document`. C'est utile pour les évènements comme `selectionchange`, qui ne sont pas déclenchés sur `window`.

Ajoutez le gestionnaire d'évènement `selectionchange` à la balise `<svelte:document>` :

```html
<svelte:document on:selectionchange={handleSelectionChange} />
```

> Évitez les gestionnaires `mouseenter` et `mouseleave` sur cet élément, tous les navigateurs ne supportent pas le déclenchement de ces évènements sur `document`. Dans ce cas, utilisez plutôt `<svelte:body>`.
