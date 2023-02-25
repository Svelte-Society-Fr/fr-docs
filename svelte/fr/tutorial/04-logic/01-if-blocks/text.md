---
title: Blocs if
---

Le HTML n'est pas prévu pour exprimer de la **logique**, comme des conditions ou des boucles. Svelte si.

Pour afficher conditionnellement du <span class="vo">_markup_</span>, il faut l'entourer d'un bloc `if` :

```html
{#if user.loggedIn}
	<button on:click={toggle}>
    Déconnexion
  </button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}>
		Connexion
	</button>
{/if}
```

Essayez — mettez à jour le composant, et cliquez sur les boutons.
