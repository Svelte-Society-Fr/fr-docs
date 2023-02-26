---
title: Valeurs par défaut
---

Nous pouvons facilement définir des valeurs par défaut pour les <span class="vo">props</span> de `Nested.svelte` :

```html
<script>
	export let answer = 'un mystère';
</script>
```

Si nous ajoutons maintenant un second appel au composant *sans* la <span class="vo">props</span> `answer`, celle-ci prendra la valeur par défaut :

```html
<Nested answer={42}/>
<Nested/>
```
