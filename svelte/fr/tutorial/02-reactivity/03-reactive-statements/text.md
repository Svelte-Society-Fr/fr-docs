---
title: Instructions
---

Nous ne sommes pas limité•e•s à la déclaration de **valeurs** réactives — nous pouvons aussi exécuter des **instructions** de manière réactive. Par exemple, nous pouvons afficher la valeur de `count` à chaque fois qu'elle change :

```ts
$: console.log('le compteur vaut ' + count);
```

Vous pouvez facilement grouper des instructions avec un bloc :

```ts
$: {
	console.log('le compteur vaut ' + count);
	alert("J'AI DIT QUE LE COMPTEUR VALAIT " + count);
}
```

Vous pouvez même ajouter `$:` devant des blocs `if` par exemple :

```ts
$: if (count >= 10) {
	alert('le compteur est dangereusement élevé !');
	count = 9;
}
```
