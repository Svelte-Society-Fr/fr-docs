---
title: Liaisons de store
---

Si un <span class="vo">_store_</span> est défini comme <span class="vo">_writable_</span> — c'est-à-dire qu'il a une méthode `set` — vous pouvez créer une liaison avec sa valeur, comme vous le feriez avec n'importe quel état local de composant.

Dans cet exemple, nous avons un <span class="vo">_store_</span> d'écriture et un <span class="vo">_store_</span> dérivé `greeting`. Modifiez l'élément `<input>` :

```html
<input bind:value={$name}>
```

La modification de la valeur de l'`<input>` va maintenant mettre à jour `name` ainsi que toutes ces dépendances.

Nous pouvons aussi assigner directement la valeur d'un <span class="vo">_store_</span> à l'intérieur d'un composant. Ajoutez un élément `<button>` :

```html
<button on:click="{() => $name += '!'}">
	Ajoutez un point d'exclamation !
</button>
```

L'assignation `$name += '!'` est équivalente à `name.set($name + '!')`.
