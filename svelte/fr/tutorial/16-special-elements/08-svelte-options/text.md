---
title: <svelte:options>
---

L'élément `<svelte:options>` vous permet de préciser des options de compilateur.

Ici nous prenons l'option `immutable` comme exemple. Dans cette application, les instances `<Todo>` clignotent lorsqu'elles reçoivent une nouvelle donnée. Le clic sur un des éléments de la liste active ou désactive son état `done` en créant un nouveau tableau `todos` avec des données à jour. Cela entraîne le clignotement des **autres** `<Todo>`, même si au final aucun changement de <span class="vo">_DOM_</span> ne les concerne.

Nous pouvons améliorer ce comportement en disant au composant `Todo` d'attendre de la donnée **immutable**. Cela signifie que nous nous engageons à ne **jamais muter** la prop `todo`, mais à la place nous créerons des nouveaux objets `todo` dès que quelque chose changera.

Ajoutez ceci en haut du fichier `Todo.svelte` :

```html
<svelte:options immutable={true}/>
```

> Vous pouvez raccourcir avec `<svelte:options immutable/>` si vous préférez.

À partir de maintenant, lorsque vous cliquez sur les éléments de la liste, seul le composant cliqué clignote.

Les options possibles sont :

* `immutable={true}` — vous n'utilisez jamais de données mutable, le compilateur peut donc se contenter de vérifier l'égalité de valeur par référence pour déterminer si les valeurs ont changé
* `immutable={false}` — par défaut. Svelt sera conservatif pour vérifier si les objets mutables ont changé ou non
* `accessors={true}` — ajoute des <span class="vo">_getters_</span> et des <span class="vo">_setters_</span> aux props du composant
* `accessors={false}` — par défaut
* `namespace="..."` — le <span class="vo">_namespace_</span> dans lequel le composant sera utilisé, le plus souvent `"svg"`
* `tag="..."` — le nom à utiliser lorsque l'on compile ce composant en <span class="vo">_web component_</span>

Consultez la [documentation de référence](/docs) pour plus d'informations sur ces options.
