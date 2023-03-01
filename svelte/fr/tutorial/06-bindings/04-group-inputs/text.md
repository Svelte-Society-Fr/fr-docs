---
title: Inputs groupés
---

Si vous avez plusieurs `<input>` dédiés à la même valeur, vous pouvez utiliser `bind:group` en plus de l'attribut `value`. Les `<input type=radio>` d'un même groupe sont mutuellement exclusifs ; les `<input type=checkbox>` d'un même groupe créent un tableau des valeurs sélectionnées.

Ajoutez `bind:group` à chaque input :

```html
<input type=radio bind:group={scoops} name="scoops" value={1}>
```

Dans ce cas, nous pourrions simplifier le code en déplaçant les `<input type=checkbox>` dans un bloc `each`. D'abord, ajoutez une variable `menu` au bloc `<script>`...


```ts
let menu = [
  'Cookie crémeux',
  'Éclats de menthe',
  'Vague à la fraise'
];
```

...puis remplacer la deuxième section par :

```html
<h2>Parfums</h2>

{#each menu as flavour}
	<label>
		<input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
		{flavour}
	</label>
{/each}
```

C'est maintenant plus facile d'enrichir notre menu de glaces avec de nouveaux parfums incroyables.
