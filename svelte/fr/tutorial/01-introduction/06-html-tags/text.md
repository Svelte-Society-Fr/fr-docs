---
title: Balises HTML
---

D'habitude, les <span class='vo'>_strings_</span> sont traitées comme du texte simple, ce qui signifie que des caractères comme `<` et `>` n'ont pas de signification particulière.

Mais vous avez parfois besoin d'afficher du HTML directement dans un composant. Par exemple, les mots que vous lisez en ce moment même sont écrits dans un fichier markdown inclus dans cette page comme un morceau de HTML.

En Svelte, vous pouvez faire cela avec la balise spéciale `{@html ...}` :

```html
<p>{@html string}</p>
```

> Svelte ne fait aucune opération de nettoyage de l'expression à l'intérieur de `{@html ...}` avant de l'ajouter dans le DOM. Autrement dit, si vous utilisez cette fonctionnalité, il est primordial d'échapper le HTML dont vous ne maîtrisez pas la source, pour ne pas exposer vos utilisateurs et utilisatrices à des attaques <span class='vo'>_XSS_</span>.

