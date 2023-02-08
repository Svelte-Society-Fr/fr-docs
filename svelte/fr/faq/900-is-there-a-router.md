---
question: Un routeur est-il intégré ?
---

La bibliothèque officielle de routage est [SvelteKit](https://kit.svelte.dev/). Sveltekit fournit un routeur basé sur le système de fichier, un rendu coté serveur (SSR) et un rechargement automatique de module (HMR) en une seule librairie facile à utiliser. Il est similaire à Next.js pour React.

Toutefois, vous pouvez utiliser n'importe quelle bibliothèque de routage de votre choix. Beaucoup de gens utilisent [page.js](https://github.com/visionmedia/page.js). Il y a aussi [navaid](https://github.com/lukeed/navaid), qui est très similaire. Et [universal-router](https://github.com/kriasoft/universal-router), qui est isomorphe avec les routes enfant, mais sans prise en charge intégrée de l'historique.

Si vous préférez une approche HTML déclarative, il existe la bibliothèque isomorphe [svelte-routing](https://github.com/EmilTholin/svelte-routing) et un fork appelé [svelte-navigator](https://github. com/mefechoel/svelte-navigator) contenant des fonctionnalités supplémentaires.

Si vous avez besoin d'un routage basé sur le hachage côté client, consultez [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router) ou [abstract-state-router](https://github.com/TehShrike/abstract-state-router/).
