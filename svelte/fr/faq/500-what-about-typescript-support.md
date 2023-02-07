---
question: Qu'en est-il de la prise en charge de TypeScript ?
---

Vous devez installer un préprocesseur tel que le [préprocesseur-svelte](https://github.com/sveltejs/svelte-preprocess). Vous pouvez exécuter la vérification de type à partir de la ligne de commande avec le [vérifieur-svelte](https://www.npmjs.com/package/svelte-check).

Pour déclarer le type d'une variable réactive dans un template Svelte, vous devez utiliser la syntaxe suivante :

```ts
let x: number;
$: x = compteur + 1;
```

Pour importer un type ou une interface, assurez-vous d'utiliser [le modificateur de `type` de TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export):

```ts
import type { UneInterface } from "./UnFichier";
```

Vous devez utiliser le modificateur `type` car `préprocesseur-svelte` ne sait pas si une importation est un type ou une valeur — il ne transpile qu'un seul fichier à la fois sans connaître les autres fichiers et ne peut donc pas effacer les importations qui ne contiennent que des types en toute sécurité sans ce modificateur présent.
