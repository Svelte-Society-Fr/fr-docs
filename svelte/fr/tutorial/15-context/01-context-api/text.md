---
title: setContext et getContext
---

L'<span class="vo">_API_</span> de contexte fournit un mécanisme permettant aux composants de communiquer entre eux sans avoir besoin de faire "voyager" la donnée en tant que props ou générer beaucoup d'évènements. C'est une fonctionnalité avancée, mais utile.


Prenez l'exemple de cette application qui utilise une carte [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/overview/). Nous aimerions afficher les marqueurs en utilisant le composant `<MapMarker>`, mais nous ne voulons pas avoir à passer une référence à l'instance Mapbox sous-jacente en tant que props pour chaque instance de marqueur.

L'<span class="vo">_API_</span> de contexte se compose de deux morceaux — `setContext` et `getContext`. Si un composant exécute `setContent(key, context)`, alors **tout composant enfant** peut récupérer le contexte avec `const context = getContext(key)`.

Commençons par déclarer le contexte. Dans `Map.svelte`, importez `setContext` depuis `svelte` et `key` depuis `mapbox.js`, puis appelez `setContext` :

```ts
import { onDestroy, setContext } from 'svelte';
import { mapbox, key } from './mapbox.js';

setContext(key, {
	getMap: () => map
});
```

L'objet de contexte peut être ce que vous voulez. Comme pour les [fonctions de cycle de vie](/tutorial/onmount), `setContext` et `getContext` doivent être exécutées dans l'instantiation du composant. L'exécuter plus tard — par exemple dans `onMount` — déclenchera une erreur. Dans cet exemple, puisque `map` n'est pas créé avant que le composant soit monté, notre objet de contexte contient une fonction `getMap` plutôt que la variable `map` elle-même.

De l'autre côté de l'équation, dans `MapMarker.svelte`, nous pouvons maintenant récupérer une référence à l'instance Mapbox :

```ts
import { getContext } from 'svelte';
import { mapbox, key } from './mapbox.js';

const { getMap } = getContext(key);
const map = getMap();
```

Les marqueurs peuvent maintenant être ajoutés à la carte.

> Une version plus aboutie de `<MapMarker>` s'occuperait également de la suppression des marqueurs ainsi que la mise à jour des props, mais ceci est une simple démo du contexte.

## Clés de contexte

Dans `mapbox.js` vous trouverez cette ligne :

```ts
const key = Symbol();
```

Techniquement, nous pouvons utiliser n'importe quelle valeur comme clé — nous pourrions aussi écrire `setContext('mpabox', ...)` par exemple. Le désavantage d'utiliser une chaîne de caractères est que d'autres librairies de composants pourraient accidentellement utiliser la même clé ; l'utilisation de [Symboles](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Symbol) en revanche permet de garantir que les clés ne seront jamais en conflit, même si vous avez plusieurs contextes différents sur plusieurs couches de composants, puisqu'un Symbole est par nature un identifiant unique.

## Contextes vs. <span class="vo">_stores_</span>

Les contextes et les <span class="vo">_stores_</span> sont des concepts similaires. Ils se distinguent toutefois dans le fait que les <span class="vo">_stores_</span> sont accessibles depuis **n'importe quelle partie** de l'application, tandis qu'un contexte ne s'applique que sur **un composant et ses descendants**. Cela peut être utile si vous souhaitez utiliser plusieurs instances d'un composant sans que l'état de l'une vienne interférer avec celui des autres.

Vous pourriez même utiliser les deux concepts ensemble. Puisque le contexte n'est pas réactive, les valeurs qui vont évoluer dans le temps devraient être représentées par des <span class="vo">_stores_</span>.

```ts
const { these, are, stores } = getContext(...);
```
