---
title: Liaison de bloc each
---

Vous pouvez aussi mettre en place des liaisons sur les propriétés à l'intérieur d'un bloc `each`.

```html
{#each todos as todo}
	<div class:done={todo.done}>
		<input
			type=checkbox
			bind:checked={todo.done}
		>

		<input
			placeholder="Qu'avez-vous besoin de faire ?"
			bind:value={todo.text}
		>
	</div>
{/each}
```
> Notez que l'interaction avec ces éléments `<input>` va muter le tableau. Si vous préférez travailler avec des données immutables, il est préférable d'éviter ces liaisons et d'utiliser des gestionnaires d'évènements à la place.
