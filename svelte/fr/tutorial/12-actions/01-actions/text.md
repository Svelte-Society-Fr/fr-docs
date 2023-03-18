---
title: La directive use
---

Les actions sont des fonctions de cycle de vie pour les éléments <span class="vo">_DOM_</span>.
Elles sont utiles dans différents cas, par exemple :

- s'interfacer avec des librairies tierces
- gérer le chargement retardé (<span class="vo">_lazy loading_</span>) des images
- créer des info-bulles (<span class="vo">_tooltips_</span>)
- ajouter des gestionnaires d'évènements personnalisés

Dans cette application, nous voulons fermer la modale orange lorsque l'on clique à l'extérieur de celle-ci. Nous aimerions pouvoir écouter l'évènement `outclick`, mais cet évènement n'existe pas nativement dans le DOM. Nous devons donc le générer nous-mêmes.

Tout d'abord, importez la fonction `clickOutside`...

```ts
import { clickOutside } from "./click_outside.js";
```

...puis utilisez-la sur l'élément avec `use:` :

```html
<div class="box" use:clickOutside on:outclick="{() => (showModal = false)}">
	Cliquez à l'extérieur !
</div>
```

Ouvrez le fichier `click_outside.js`. Comme pour les fonctions de transitions, une fonction d'action reçoit un noeud `node` (qui est l'élément sur lequel l'action est appliquée) et des paramètres optionnels, et retourne un objet d'action. Cet objet peut avoir une fonction `destroy` qui sera appelée lorsque l'élément est démonté.

Nous voulons déclencher l'évènement `outclick` lorsque l'on clique à l'extérieur de la boîte orange. Une implémentation possible ressemble à ceci :

```ts
export function clickOutside(node) {
	const handleClick = (event) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent("outclick"));
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}
```

Mettez à jour la fonction `clickOutside`, cliquez sur le bouton pour afficher la modale, puis cliquez en dehors de celle-ci pour la fermer.
