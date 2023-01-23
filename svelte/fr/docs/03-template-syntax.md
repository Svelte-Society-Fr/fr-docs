---
title: Syntaxe du template
---


### Balises

---

Une balise en minuscules, comme `<div>`, indique un élément HTML standard. Une balise avec la première lettre en majuscule, comme `<Widget>` ou `<Namespace.Widget>`, indique un *composant*.

```sv
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget/>
</div>
```


### Attributs et props

---

Par défaut, les attributs fonctionnent exactement comme leur équivalent HTML.

```sv
<div class="foo">
	<button disabled>pas touche</button>
</div>
```

---

Comme en HTML, les valeurs peuvent être fournies sans guillemets.

```sv
<input type=checkbox>
```

---

Les valeurs des attributs peuvent contenir des expressions JavaScript.

```sv
<a href="page/{p}">page {p}</a>
```

---

Ou elles peuvent *être définies* par des expressions JavaScript.

```sv
<button disabled={!clickable}>...</button>
```

---

Les attributs booléens sont inclus sur l'élément si leur valeur est [truthy](https://developer.mozilla.org/fr/docs/Glossary/Truthy) et exclus si leur valeur est [falsy](https://developer.mozilla.org/fr/docs/Glossary/Falsy).

Tous les autres attributs sont inclus à moins que leur valeur soit [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) (`null` ou `undefined`).

```sv
<input required={false} placeholder="Ce champ input n'est pas requis">
<div title={null}>Cette div n'a pas de titre</div>
```

---

Une expression peut éventuellement inclure des caractères qui casseraient la mise en valeur de la syntaxe dans du HTML classique, en conséquence il est permis de mettre la valeur en guillemets. Les guillemets n'ont pas d'influence sur le parsing de la valeur.

```sv
<button disabled="{number !== 42}">...</button>
```

---

Quand le nom d'un attribut et sa valeur sont identiques, (`name={name}`), il est possible d'écrire `{name}`.

```sv
<!-- Les syntaxes suivantes sont équivalentes -->
<button disabled={disabled}>...</button>
<button {disabled}>...</button>
```

---

Par convention, les valeurs passées aux composants sont appelées *propriétés* ou *props* plutôt qu'*attributs*, caractéristiques du DOM.

Comme pour les éléments, `name={name}` peut être raccourci en `{name}`.

```sv
<Widget foo={bar} answer={42} text="salut"/>
```

---

*Les attributs décomposés (spread attributes)* permettent de passer de nombreux attributs ou propriétés d'un seul coup.

Un élément ou un composant peut avoir plusieurs attributs décomposés, parsemés ou non d'attributs classiques.

```sv
<Widget {...things}/>
```
