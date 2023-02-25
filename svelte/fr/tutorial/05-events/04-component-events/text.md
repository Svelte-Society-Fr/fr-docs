---
title: Évènements de composant
---

Les composants peuvent aussi générer des évènements. Pour cela, ils doivent créer un générateur d'évènement (<span class="vo">_event dispatcher_</span>). Modifiez `Inner.svelte` de la façon suivante :

```html
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Bonjour !'
		});
	}
</script>
```

> `createEventDispatcher` doit être appelé quand le composant est instancié la première fois — vous ne pouvez pas le faire plus tard, par ex. dans le <span class="vo">_callback_</span> d'un `setTimeout`. Cela permet de lier `dispatch` à l'instance du composant.

Notez que le composant `App` écoute les messages générés par le composant `Inner` grâce à la directive `on:message`. Cette directive est un attribut `on:` suivi du nom de l'évènement que nous générons (dans ce cas, `message`).

Sans cet attribut, les messages seraient quand même générés, mais l'`App` n'y réagirait pas. Vous pouvez essayer d'appuyer une nouvelle fois sur le bouton après avoir enlevé l'attribut `on:message`.

> Vous pouvez aussi essayer de changer le nom de l'évènement. Par exemple, changer `dispatch('message')` en `dispatch('myevent')` dans `Inner.svelte`, puis changez le nom de l'attribut `on:message` en `'on:myevent` dans le composant `App.svelte`.
