---
title: Blocs each à clé
---

Par défaut, quand vous modifiez la valeur d'un bloc `each`, celui-ci va ajouter et enlever les éléments à la **fin** du bloc, et mettre à jour les valeurs qui ont changé. cela n'est peut-être pas ce que vous souhaitez.

Ce cas est plus simple à montrer qu'à expliquer. Cliquez sur "Supprimer le premier élément" quelques fois, et notez ce qu'il se passe : le premier composant `<Thing>` n'est pas supprimé, mais plutôt le **dernier** noeud du DOM. Puis la valeur `name` dans les noeuds DOM restants est mise à jour, mais pas l'emoji correspondant.

Nous aimerions plutôt supprimer unniquement le premier composant `<Thing>` ainsi que son noeud DOM associé, et laisser les autres inchangés.

Pour faire cela, nous allons spécifier un identifiant unique (une "clé") pour le bloc `each` :

```html
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

Ici, `(thing.id)` est la **clé**, et aide Svelte à déterminer quel noeud DOM changer lorsque le composant se met à jour.

> Vous pouvez utiliser n'importe quel objet en tant que clé, puisque Svelte utilise une [`Map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map) en interne — en d'autres termes, vous pourriez utiliser `(thing)` au lieu de `(thing.id)`. Cependant, utiliser une <span class="vo">_string_</span> ou un <span class="vo">_number_</span> est généralement plus sécurisé, car l'identité sera persistée sans avoir à vérifier l'identité par référence, par exemple lorsque vous rafraîchissez de la donnée depuis une API.
