---
title: La directive de classe
---

Comme pour tous les autres attributs, vous pouvez spécifier de classes avec un attribut JavaScript :

```html
<button
	class="{current === 'foo' ? 'selected' : ''}"
	on:click="{() => current = 'foo'}"
>foo</button>
```

Ce cas est tellement classique dans le développement d'interfaces que Svelte a prévu une directive spéciale pour en simplifier l'écriture :

```html
<button
	class:selected="{current === 'foo'}"
	on:click="{() => current = 'foo'}"
>foo</button>
```

La classe `selected` est ajoutée à l'élément dès que la valeur de l'expression est <span class="vo">_truthy_</span>, et enlevée lorsque cette valeur est <span class="vo">_falsy_</span>.
