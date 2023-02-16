---
title: Ajouter de la donnée
---

Un composant qui se contente d'afficher du *markup* statique n'est pas très intéressant. Ajoutons-lui de la donnée.

D'abord, ajoutez une balise `<script>` à votre composant, et déclarez une variable `name` :

```html
<script>
	let name = 'tout le monde';
</script>

<h1>Bonjour tout le monde !</h1>
```

Puis, vous pouvez utilisez `name` dans le *markup* :

```html
<h1>Bonjour {name} !</h1>
```

À l'intérieur des accolades, il est possible d'utiliser n'importe quelle expression JavaScript. Essayez de remplacer `name` par `name.toUpperCase()` pour un accueil plus bruyant.
