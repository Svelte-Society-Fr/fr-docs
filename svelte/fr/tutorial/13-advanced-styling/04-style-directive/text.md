---
title: La directive de style
---

C'est bien d'être capable de gérer dynamiquement des propriétés CSS. Néanmoins, cela peut se révéler pénible si vous devez construire une longue chaîne de caractères. Manquer le moindre point-virgule peut rendre toute la chaîne de caractères invalide. Pour éviter ce problème, Svelte propose une manière plus élégante de fournir du style <span class="vo">_inline_</span> avec la directive de style.

Changez l'attribut de style du paragraphe comme suit :

```html
<p
	style:color
	style:--opacity="{bgOpacity}"
>
```

La directive de style partage quelques points avec la directive de classe. Il est possible d'utiliser une forme raccourcie lorsque le nom de la propriété CSS et celui de la variable sont les mêmes. Vous pouvez donc écrire `style:color="{color}"` de cette manière : `style:color`.

Comme pour la directive de classe, la directive de style est prioritaire si vous essayez d'appliquer la même propriété CSS avec un attribut de style.
