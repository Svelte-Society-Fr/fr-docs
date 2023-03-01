---
title: Inputs checkbox
---

Les <span class="vo">_checkboxes_</span> servent à inverser des états. Au lieu de créer une liaison sur `input.value`, nous en créons une sur `input.checked` :

```html
<input type=checkbox bind:checked={yes}>
```
