---
title: Ajout de paramètres
---

Les fonctions de transition acceptent des arguments. Remplacez la transition `fade` par `fly`...

```html
<script>
	import { fly } from 'svelte/transition';
	let visible = true;
</script>
```

... et appliquez-là au `<p>` avec quelques options :

```html
<p transition:fly="{{ y: 200, duration: 2000 }}">
	Entre et sort en volant
</p>
```

Notez que la transition est **réversible** — si vous cliquez sur la <span class="vo">_checkbox_</span> pendant que la transition est en cours, l'élément transitionne dans l'autre sens à partir de son état courant, plutôt que de reprendre au début ou à la fin.
