---
title: Modificateurs d'évènement
---

Les gestionnaires d'évènements DOM peuvent utiliser des **modificateurs** qui changent leur comportement. Par exemple, un gestionnaire avec le modificateur `once` ne s'exécutera qu'une seule fois :

```html
<script>
	function handleClick() {
		alert("plus d'alertes")
	}
</script>

<button on:click|once={handleClick}>
	Cliquez moi
</button>
```

La liste complète des modificateurs se trouve ici :

* `preventDefault` — appelle `event.preventDefault()` avant d'exécuter le gestionnaire. Utile, par exemple, pour la gestion de formulaire côté client.
* `stopPropagation` — appelle `event.stopPropagation()`, et empêche ainsi l'évènement d'atteindre le prochain élément
* `passive` — améliore la performance du défilement pour les évènements `touch`/`wheel` (Svelte l'ajoutera automatiquement aux endroits où ça ne pose pas de problème)
* `nonpassive` — déclare explicitement `passive: false`
* `capture` — déclenche le gestionnaire pendant la phase de <span class='vo'>**_capture_**</span> plutôt que pendant la phase de <span class='vo'>**_bubbling_**</span> ([MDN docs](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture))
* `once` — supprime le gestionnaire après qu'il ait été exécuté la première fois
* `self` — déclenche le gestionnaire uniquement si `event.target` est l'élément lui-même
* `trusted` — déclenche le gestionnaire uniquement si `event.isTrusted` est `true`, c'est-à-dire si l'évènement est généré par une action de l'utilisateur

Vous pouvez chaîner les modificateurs, par ex. `on:click|once|capture={...}`.
