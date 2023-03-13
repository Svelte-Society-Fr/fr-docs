---
title: Les blocs key
---

Les blocs `key` détruisent et recréent leur contenu lorsque la valeur d'une expression change.

```html
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

C'est utile lorsque vous voulez qu'un élément joue sa transition à chaque fois qu'une valeur change plutôt qu'uniquement quand l'élément entre ou sort du <span class="vo">_DOM_</span>.

Encadrez l'élément `<span>` dans un bloc clé qui dépend de `number`. Cela va déclencher l'animation à chaque fois que vous cliquerez sur le bouton.

