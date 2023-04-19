---
title: Liaisons avec l'attribut contenteditable
---

Les éléments avec l'attribut `contenteditable` permettent les liaisons suivantes:
- [`innerHTML`](https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML)
- [`innerText`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/innerText)
- [`textContent`](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent)

Il y a de légères différences entre ces différentes liaisons, apprenez-en plus [ici](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent#Differences_from_innerText).

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```
