---
title: Vérifier l'existence du contenu
---

Dans certains cas, vous pouvez avoir besoin d'ajuster des parties de votre composant en fonction de si le parent lui fournit du contenu pour un <span class="vo">_slot_</span> particulier. Peut-être que vous avez un élément contenant ce <span class="vo">_slot_</span>, et vous ne voulez pas l'afficher si le <span class="vo">_slot_</span> est vide. Ou peut-être que vous voulez appliquer une classe seulement si le <span class="vo">_slot_</span> est présent. Vous pouvez faire cela en vérifiant les propriétés de la variable spéciale `$$slots`.

`$$slots` est un objet dont les clés sont les noms des <span class="vo">_slots_</span> passés au composant par son parent. Si le parent ne fournit pas de <span class="vo">_slot_</span>, alors `$$slots` n'aura pas de clé pour ce <span class="vo">_slot_</span>.

Notez que les deux instances de `<Project>` dans cet example affichent un conteneur pour les commentaires ainsi qu'une pastille de notifications, même si seulement l'un des deux a des commentaires. Nous voulons utiliser `$$slots` pour n'afficher que ces éléments si le parent `<App>` fournit du contenu pour le <span class="vo">_slot_</span> `comments`.

Dans `Project.svelte`, mettez à jour la directive `class:has-discussion` dans `<article>` :

```html
<article class:has-discussion={$$slots.comments}>
```

Ensuite, entourer le <span class="vo">_slot_</span> `comments` et la `<div>` qui le contient dans un bloc `{#if}` qui vérifie `$$slots` :

```html
{#if $$slots.comments}
	<div class="discussion">
		<h3>Commentaires</h3>
		<slot name="comments"></slot>
	</div>
{/if}
```

Le bloc de commentaires et la pastille de notification ne s'afficheront plus lorsque `<App>` laisse le <span class="vo">_slot_</span> `comments` vide.
