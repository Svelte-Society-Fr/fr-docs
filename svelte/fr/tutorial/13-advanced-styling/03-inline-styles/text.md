---
title: Style inliné
---

En plus d'ajouter des styles dans des balises `<style>`, nous pouvons également ajouter individuellement du style aux éléments en utilisant l'attribut `style`. En général, il est tout de même préférable de gérer les styles via une feuille CSS. Mais lorsque les styles sont dynamiques, utiliser l'attribut `style` peut être pratique, en particulier combiné avec des propriétés CSS personnalisées.

Ajoutez l'attribut `style` suivant à l'élément `<p>` :
`style="color: {color}; --opacity: {bgOpacity};"`

Fantastique ! Vous pouvez maintenant styliser le paragraphe en utilisant des variables qui dépendent de votre `<input>` sans avoir besoin de créer une classe pour chaque valeur possible.
