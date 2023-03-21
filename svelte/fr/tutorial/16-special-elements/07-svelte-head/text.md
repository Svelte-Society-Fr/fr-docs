---
title: <svelte:head>
---

L'élément `<svelte:head>` vous permet d'insérer des éléments dans la balise `<head>` de votre document :

```html
<svelte:head>
	<link rel="stylesheet" href="/tutorial/dark-theme.css">
</svelte:head>
```

> En mode "rendu côté serveur" (<span class="vo">_SSR_</span>), le contenu de `<svelte:head>` est envoyé séparément du reste de votre <span class="vo">_HTML_</span>.
