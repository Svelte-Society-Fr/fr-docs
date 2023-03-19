---
title: Propriétés de slot
---

Dans cette application, nous avons un composant `<Hoverable>` capable de savoir si le curseur de la souris le survole ou non. Il a besoin de **renvoyer** de la donnée au composant parent, afin qu'il mette à jour le contenu du <span class="vo">_slot_</span>.

Pour cela, nous utilisons les propriétés de <span class="vo">_slot_</span>, ou <span class="vo">_slot_</span> props. Dans `Hoverable.svelte`, passez la valeur `hovering` dans le <span class="vo">_slot_</span> :

```html
<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot hovering={hovering}></slot>
</div>
```

> N'oubliez pas que vous pouvez aussi utiliser le raccourci `{hovering}`, si vous préférez.

Ensuite, pour exposer `hovering` au contenu enfant du composant `<Hoverable>`, nous utilisons la directive `let` :

```html
<Hoverable let:hovering={hovering}>
	<div class:active={hovering}>
		{#if hovering}
			<p>On me survole.</p>
		{:else}
			<p>Survolez-moi !</p>
		{/if}
	</div>
</Hoverable>
```

Vous pouvez renommer la variable, si vous le souhaitez — appelons-la `active` dans le composant parent :

```html
<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>On me survole.</p>
		{:else}
			<p>Survolez-moi !</p>
		{/if}
	</div>
</Hoverable>
```

Vous pouvez avoir autant d'instances de ce composant que vous voulez, et les propriétés de <span class="vo">_slot_</span> resteront locales à l'instance dans laquelle elles sont déclarées.

> Les <span class="vo">_slots_</span> nommés peuvent aussi avoir des props ; utilisez la directive `let` sur un élément avec un attribut `slot="..."`, plutôt que sur l'instance de composant elle-même.
