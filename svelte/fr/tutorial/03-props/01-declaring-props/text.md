---
title: Déclarer des props
---

Jusqu'à maintenant, nous avons exclusivement travaillés avec l'état interne d'un commposant, c'est à dire, des valeurs qui sont uniquement accessibles à l'intérieur du composant.

Dans n'importe quelle application réelle, vous aurez besoin de passer des données depuis un composant parent vers ces enfants. Pour ça, nous devons déclarer des *propriétés*, générallement raccourcis en "<span class="vo">props</span>". En Svelte, nous faisons ça avec le mot clé `export`. Editez le composant `Nested.svelte` :

```html
<script>
	export let answer;
</script>
```

> Comme `$:`, cela peut parraitre étrange de prime abord. Ce n'est pas le fonctionnement habituel de `export` que l'on peut trouver avec les modules JavaScript ! Faites avec pour l'instant —  cela deviendra bientôt une seconde nature !