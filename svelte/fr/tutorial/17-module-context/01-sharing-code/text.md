---
title: Partager du code
---

Dans tous les exemples que nous avons vu jusque là, le bloc `<script>` contient du code qui est exécuté lorsque chaque instance de composant est initialisé. Pour la grande majorité des composants, vous n'avez pas besoin de plus.

Très rarement, vous aurez besoin d'exécuter du code en dehors d'une instance de composant individuelle. Par exemple, vous pouvez lancer ces cinq lecteurs audio simultanément ; il serait plus pratique si la lecture de l'un arrêtait la lecture de tous les autres.

Nous pouvons faire cela en déclarant un bloc `<script context="module">`. Le code contenu à l'intérieur sera exécuté une seule fois, lorsque le module est évalué la première fois, plutôt que lorsqu'un composant est instancié. Ajoutez le code suivant en haut de `AudioPlayer.svelte` :

```html
<script context="module">
	let current;
</script>
```

Nos instances de composant peuvent maintenant se "parler" sans aucune gestion de l'état :

```ts
function stopOthers() {
	if (current && current !== audio) current.pause();
	current = audio;
}
```
