---
question: TypeScript est-il supporté ?
---

Vous devez installer un pré-processeur tel que [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess). Vous pouvez exécuter la vérification de type en ligne de commande avec [svelte-check](https://www.npmjs.com/package/svelte-check).

Pour déclarer le type d'une variable réactive dans un template Svelte, vous devez utiliser la syntaxe suivante :

```ts
let x: number;
$: x = compteur + 1;
```

Pour importer un type ou une interface, assurez-vous d'utiliser [le modificateur `type` de TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export):

```ts
import type { UneInterface } from "./UnFichier";
```

Vous devez utiliser le modificateur `type` car `svelte-preprocess` ne sait pas si une importation est un type ou une valeur — il ne transpile qu'un seul fichier à la fois sans connaître les autres fichiers et ne peut donc pas effacer en toute sécurité les imports qui ne contiennent que des types sans ce modificateur présent.
