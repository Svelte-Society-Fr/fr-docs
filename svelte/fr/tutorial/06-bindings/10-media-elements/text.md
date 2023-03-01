---
title: Éléments media
---

Les éléments `<audio>` et `<video>` ont plusieurs propriétés avec lesquelles vous pouvez créer des liaisons. Cet exemple en met en valeur quelques unes.

À la ligne 63, ajoutez des liaisons `currentTime={time}`, `duration`, et `pause` :

```html
<video
	poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
	src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
	on:mousemove={handleMove}
	on:touchmove|preventDefault={handleMove}
	on:mousedown={handleMousedown}
	on:mouseup={handleMouseup}
	bind:currentTime={time}
	bind:duration
	bind:paused>
	<track kind="captions">
</video>
```

> `bind:duration` est équivalent à `bind:duration={duration}`

Maintenant, lorsque vous cliquez sur la vidéo, les variables `time`, `duration` et `paused` seront mises à jour en fonction des propriétés de la vidéo. Cela permet de nous en servir pour construire des contrôles personnalisés.

> Habituellement sur le web, nous suivons `currentTime` en écoutant les évènements `timeupdate`. Mais ces évènements sont trop rarement déclenchés, donnant lieu à une UI bancale. Svelte fait mieux — il suit `currentTime` à l'aide de `requestAnimationFrame`.

La liste complète de liaisons possibles pour les éléments `<audio>` et `<video>` est la suivante — six liaisons **en lecture seule**...

* `duration` (lecture seule) — durée totale de la vidéo, en secondes
* `buffered` (lecture seule) — un tableau d'objets `{start, end}`
* `seekable` (lecture seule) — idem
* `played` (lecture seule) — idem
* `seeking` (lecture seule) — booléen
* `ended` (lecture seule) — booléen

...et cinq liaisons **bilatérales** :

* `currentTime` — position actuelle de la vidéo, en secondes
* `playbackRate` — vitesse de lecture de la vidéo, où `1` est "normal"
* `paused` — celle-ci parle pour elle-même
* `volume` — valeur entre 0 et 1
* `muted` — valeur booléenne où `true` est "sourdine"

Les vidéos ont en plus les liaisons en lecture seule `videoWidth` et `videoHeight`.
