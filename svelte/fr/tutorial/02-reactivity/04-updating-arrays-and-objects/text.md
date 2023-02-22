---
title: Mise à jour de tableaux et d'objets
---

La réactivité de Svelte est déclenchée par les assignations. Les méthodes qui mutent les tableaux ou les objets ne déclencheront donc pas de mises à jour en soi.

Dans cet exemple, cliquer sur le bouton "Ajouter un nombre" appelle la fonction `addNumber`, qui ajoute un nombre au tableau, mais ne déclenche pas le recalcul de `sum`.

Une façon de régler ça est d'assigner `numbers` à elle-même pour prévenir le compilateur que sa valeur a changé :

```ts
function addNumber() {
	numbers.push(numbers.length + 1);
	numbers = numbers;
}
```

Vous pourriez aussi écrire la même chose de manière plus concise en utilisant la [syntaxe ES6 de décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax) :

```ts
function addNumber() {
	numbers = [...numbers, numbers.length + 1];
}
```

La même règle s'applique aux méthodes de tableaux telles que `pop`, `shift`, et `splice`, ainsi qu'aux méthodes d'objets comme `Map.set`, `Set.add`, etc.

Les assignations aux **propriétés** de tableaux ou d'objets, — par ex. `obj.foo += 1` ou `array[i] = x` — fonctionnent de la même façon que des assignations à des variables.

```ts
function addNumber() {
	numbers[numbers.length] = numbers.length + 1;
}
```

Toutefois, des assignations indirectes à des références comme celle-ci...

```ts
const foo = obj.foo;
foo.bar = 'baz';
```

ou

```ts
function quox(thing) {
	thing.foo.bar = 'baz';
}
quox(obj);
```

... ne déclencheront pas de réactivité sur `obj.foo.bar`, à moins d'enchaîner avec `obj = obj`.

La règle à retenir : la variable mise à jour doit apparaître directement dans la partie gauche de l'assignation.

