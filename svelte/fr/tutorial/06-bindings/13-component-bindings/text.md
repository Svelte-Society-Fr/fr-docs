---
title: Liaison de composant
---

De la même façon que vous pouvez créer des liaisons avec les propriétés des éléments <span class="vo">_DOM_</span>, vous pouvez créer des liaisons avec les <span class="vo">_props_</span> des composants. Par exemple, nous pouvons créer une liaison avec la <span class="vo">_prop_</span> de ce composant `<Keypad>` comme si c'était un élément de formulaire :

```html
<Keypad bind:value={pin} on:submit={handleSubmit}/>
```

Maintenant, lorsque l'utilisateur interagit avec le clavier, la valeur de `pin` du composant parent est immédiatement mise à jour.

> Utilisez les liaisons de composant avec parcimonie. Avoir trop de liaisons de ce type rend difficile le suivi du flux de données au sein de votre application, particulièrement s'il n'y a pas de "source de vérité unique".
