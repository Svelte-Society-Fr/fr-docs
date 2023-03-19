---
title: Ajouter des paramètres
---

À l'instar des transitions et des animations, une action peut prendre un argument de paramètres ; la fonction d'action sera alors appelée avec deux arguments : l'élément sur lequel cette fonction est appliquée (comme vu précédemment), et l'argument de paramètres.

Ici nous utilisons une action `longpress` qui déclenche un évènement du même nom lorsque l'on clique et que l'on maintient appuyé le bouton pour une certaine durée. Pour le moment, si vous allez voir le fichier `longpress.js`, vous verrez que cette durée est définie "en dur" à 500ms.

Nous pouvons changer ce comportement en fournissant un deuxième argument `duration` à la fonction d'action, et en passant cette valeur `duration` à l'appel du `setTimeout` :

```ts
export function longpress(node, duration) {
	// ...

	const handleMousedown = () => {
		timer = setTimeout(() => {
			node.dispatchEvent(
				new CustomEvent('longpress')
			);
		}, duration);
	};

	// ...
}
```

Dans le fichier `App.svelte`, nous pouvons alors passer une valeur `duration` à l'action :

```html
<button use:longpress={duration}
```

Cela fonctionne **presque** — l'évènement est bien déclenché après 2 secondes. Mais même si vous diminuez la durée avec le <span class="vo">_slider_</span>, l'évènement sera toujours déclenché au bout de 2 secondes.

Pour corriger cela, nous pouvons ajouter une méthode `update` dans `longpres.js`. Cette méthode sera exécutée à chaque fois que l'argument `duration` change :

```ts
return {
	update(newDuration) {
		duration = newDuration;
	},
	// ...
};
```

> Si vous souhaitez passer plusieurs arguments à une action, combinez-les dans un objet, par exemple :
`use:longpress={{duration, spiciness}}`
