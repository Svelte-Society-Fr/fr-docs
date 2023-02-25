---
title: Blocs each
---

Si vous avez besoin de boucler sur une liste de données, vous pouvez utiliser un bloc `each` :

```html
<ul>
  {#each cats as cat}
    <li>
      <a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
        {cat.name}
      </a>
    </li>
  {/each}
</ul>
```

> L'expression (ici, `cats`) peut être tout type de tableau ou d'objet similaire à un tableau (c-à-d avec une propriété `length`). Vous pouvez boucler sur des itérables génériques avec `each [... iterable]`.

Vous pouvez accéder à l'**indice** courant en deuxième argument, comme ceci :

```html
{#each cats as cat, i}
  <li>
    <a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
      {i + 1}: {cat.name}
    </a>
  </li>
{/each}
```

Si vous préférez, vous pouvez décomposer — `each cats as { id, name }` — et remplacer `cat.id` et `cat.name` par `id` et `name`.

