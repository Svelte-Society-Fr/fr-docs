---
title: Composants imbriqués
---

Écrire toute une application dans un seul composant n'est pas très pratique. À la place, nous pouvons importer des composants depuis d'autres fichiers et les utiliser comme des éléments.

Vous trouverez 2 fichiers dans l'éditeur à droite (dans la barre supérieure) : `App.svelte` et `Nested.svelte`. Vous pouvez les visualiser en cliquant dessus.

Chaque fichier `.svelte` contient un composant, un bloc de code autonome et réutilisable qui encapsule du HTML, du CSS et du JavaScript fonctionnant ensemble.

Ajoutons une balise `<script>` à `App.svelte` pour importer le fichier (notre composant) `Nested.svelte` dans notre application...

```html
<script>
	import Nested from './Nested.svelte';
</script>
```

... puis utilisons le composant `Nested` dans le <span class='vo'>_markup_</span> de l'application :

```html
<p>Ceci est un paragraphe.</p>
<Nested/>
```

Notez que même si `Nested.svelte` a un élément `<p>`, les styles définis dans `App.svelte` ne s'appliquent pas.

Notez également que le nom du composant, `Nested`, a sa première lettre en majuscule. C'est une convention adoptée pour mieux différencier entre les composants, que nous définissons, des éléments HTML classiques.

