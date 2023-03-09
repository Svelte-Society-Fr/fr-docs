---
title: Transitions retardées
---

Une fonctionnalité particulièrement puissante du moteur de transitions Svelte est la possibilité de **retarder** les transitions, de sorte qu'elles soient coordonnées entre plusieurs éléments.

Prenez cette liste de chose à faire, dans laquelle activer un élément l'envoie dans l'autre liste. Dans la vraie vie, les choses ne se comportent pas comme ça — au lieu de disparaître et de réapparaître ailleurs, elles se déplacent de position en position. L'usage d'animations peut grandement aider les gens à comprendre ce qu'il se passe dans votre application.

Nous pouvons mettre en place cet effet en utilisant la fonction `crossfade`, qui crée un couple de transitions appelées `send` et `receive`. Quand un élément est "envoyé", il cherche un élément correspondant qui est "reçu", et génère une transition qui transforme l'élément en son alter-ego et l'estompe. Quand un élément est "reçu", l'inverse se produit. S'il n'y a pas d'alter-ego, la transition `fallback` est jouée.

Trouvez l'élément `<label>` à la ligne 65, et ajoutez-lui les transitions `send` et `receive` :


```html
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
>
```

Faites la même chose pour l'élément `<label>` suivant :

```html
<label
	class="done"
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
>
```

Maintenant, lorsque vous activez ou désactivez des éléments, ils se déplacent tranquillement vers leur nouvelle position. Les éléments qui ne transitionnent pas ont toutefois toujours un effet de "saut" un peu bizarre — nous le règlerons dans le prochain chapitre.
