---
question: Comment tester mes applications Svelte ?
---

Nous vous recommandons d'essayer de séparer votre logique de vue de votre logique métier. Il est préférable de conserver la transformation des données ou la gestion de l'état des composants en dehors des composants Svelte. Vous pouvez ainsi tester ces parties comme vous testeriez n'importe quelle fonctionnalité JavaScript. Lorsqu'il s'agit de tester les composants, il est préférable de tester la logique du composant et de se rappeler que la bibliothèque Svelte a ses propres tests. Vous n'avez donc pas besoin de tester les détails d'implémentation fournis par Svelte.

Il existe quelques approches que les gens adoptent lors de leurs tests, mais cela implique généralement de compiler le composant et de le monter sur quelque chose, puis d'effectuer les tests. Vous devez essentiellement créer un bundle pour chaque composant que vous testez (puisque Svelte est un compilateur et non une bibliothèque normale) et ensuite les monter. Vous pouvez notamment monter sur une instance JSDOM. Ou vous pouvez utiliser un vrai navigateur avec des bibliothèques comme Playwright, Puppeteer, WebdriverIO ou Cypress.

Quelques ressources pour démarrer avec les tests unitaires :

- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/example/)
- [Exemple utilisant vitest](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)
- [Exemple utilisant uvu avec JSDOM](https://github.com/lukeed/uvu/tree/master/examples/svelte)
- [Test de composant dans un vrai navigateur](https://webdriver.io/docs/component-testing/svelte)
