---
title: Liaison d'instance de composant
---

De la même façon que vous pouvez créer des liaisons avec les éléments <span class="vo">_DOM_</span>, vous pouvez créer des liaisons avec les instances de composant elles-mêmes. Par exemple, nous pouvons créer une liaison entre l'instance de `<InputField>` et une variable `field` de la même façon que nous l'avons fait pour les liaisons aux éléments <span class="vo">_DOM_</span>.

```html
<script>
	let field;
</script>

<InputField bind:this={field} />
```

Nous pouvons maintenant interagir programmatiquement avec le composant en utilisant `field`.

```html
<button on:click="{() => field.focus()}">
	Mettre le focus sur le champ
</button>
```

> Notez que nous ne pouvons pas utiliser directement `{field.focus}`, puisque `field` est `undefined` quand le bouton est rendu la première fois, ce qui génèrerait une erreur.
