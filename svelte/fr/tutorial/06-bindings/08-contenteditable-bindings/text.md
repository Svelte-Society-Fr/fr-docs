---
title: Liaisons avec l'attribut contenteditable
---

Les éléments avec un attribut `contenteditable="true"` supportent les liaisons avec `textContent` et `innerHTML` :

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```
