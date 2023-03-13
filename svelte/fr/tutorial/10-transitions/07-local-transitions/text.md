---
title: Transitions locales
---

D'habitude, les transitions sont jouées sur les éléments lorsque n'importe quel bloc parent est ajouté ou supprimé. Dans cet exemple, alterner la visibilité de la liste globale applique également les transitions aux éléments individuels de la liste.

Nous aimerions plutôt des transitions qui se jouent uniquement lorsque les éléments individuels sont ajoutés ou supprimés — en d'autres termes lorsque l'on déplace le curseur.

Nous pouvons faire cela avec une transition **locale**, qui est jouée uniquement lorsque le bloc qui possède la transition est ajouté ou supprimé :

```html
<div transition:slide|local>
	{item}
</div>
```
