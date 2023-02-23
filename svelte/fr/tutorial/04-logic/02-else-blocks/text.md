---
title: Blocs else
---

Puisque les deux conditions — `if user.loggedIn` et `if !user.loggedIn` — sont mutuellement exclusives, nous pouvons simplifier un peu ce composant en utilisant un bloc `else` :

```html
{#if user.loggedIn}
	<button on:click={toggle}>
		Déconnexion
	</button>
{:else}
	<button on:click={toggle}>
		Connexion
	</button>
{/if}
```

> Un caractère `#` indique toujours une baliste d'**ouverture de bloc**. Un caractère `/` indique toujours une balise de **fermeture de bloc**. Un caractère `:`, comme dans `{:else}`, indique une balise de **continuité de bloc**. Ne vous en faites pas — vous avez déjà appris presque toute la syntaxe que Svelte ajoute au HTML.

