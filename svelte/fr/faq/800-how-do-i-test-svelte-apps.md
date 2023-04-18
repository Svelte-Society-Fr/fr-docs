---
question: Comment tester mes applications Svelte ?
---


La façon dont votre application est structurée et l'endroit où la logique est définie vont déterminer la meilleure façon de s'assurer qu'elle est correctement testée. Il est important de comprendre que certaines logiques ne devraient pas être définies dans un composant — notamment les sujets de transformation de données, de gestion d'état inter-composants, et l'affichage de <span class='vo'>_logs_</span>, entre autres. Ayez en tête que la librairie Svelte a sa propre suite de tests, vous n'avez donc pas besoin d'écrire des tests pour vérifier les détails d'implémentation fournis par Svelte.

Une application Svelte aura généralement trois types différents de tests : Unitaires, Composants et <span class='vo'>_End-to-End_<span> (E2E)

**Tests Unitaires** : Servent à tester la logique métier en isolation. Souvent il s'agit de valider des fonction individuelles et des cas particuliers. Minimiser la surface de ces tests permet de les garder légers et rapides, et extraire un maximum de logique de vos composants Svelte vous permet d'augmenter le nombre de ce type de tests pour couvrir votre application. Lorsque vous créez un nouveau projet SvelteKit, vous avez la possibilité de choisir d'installer [Vitest](https://vitest.dev/) pour les tests unitaires. D'autres moteurs de tests pourraient être également utilisés.

**Tests de composant** : Vérifier qu'un composant Svelte s'instancie et réagit comme prévu aux interactions au cours de sa vie nécessite un outil qui fournit un <span class='vo'>_DOM_</span>. Les composants peuvent être compilés (puisque Svelte est un compilateur et non une simple librairie) et montés pour permettre de vérifier la structure de l'élément, les gestionnaires d'évènements, l'état, et les autres fonctionnalités offertes par un composant Svelte. Les outils de test de composant vont d'une implémentation en mémoire type [jsdom](https://www.npmjs.com/package/jsdom) couplée à un moteur de test type [Vitest](https://vitest.dev/), à des solutions qui utilisent de vrais navigateurs pour fournir des fonctionnalités de tests visuels comme [Playwright](https://playwright.dev/docs/test-components) ou [Cypress](https://www.cypress.io/).

**Tests <span class='vo'>_End-to-End_</span>** : Pour vous assurer que votre application fonctionne comme prévu dans des cas réels d'utilisation, il est nécessaire de la tester d'une manière la plus proche possible de la production. Cela se fait avec des tests dits <span class='vo'>_End-to-End_</span> (E2E) qui chargent et interagissent avec une version déployée de votre application afin de simuler les interactions utilisateur. Lorsque vous créez un nouveau projet SvelteKit, vous avez la possibilité de choisir d'installer [Playwright](https://playwright.dev/) pour les tests <span class='vo'>_End-to-End_</span>. Il existe également d'autres librairies de tests E2E.

Quelques ressources pour démarrer avec les tests unitaires :

- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/example/)
- [Tests de composants Svelte avec Cypress](https://docs.cypress.io/guides/component-testing/svelte/overview)
- [Exemple utilisant vitest](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)
- [Exemple utilisant uvu avec JSDOM](https://github.com/lukeed/uvu/tree/master/examples/svelte)
- [Tests de composants Svelte Vitest et Playwright](https://davipon.hashnode.dev/test-svelte-component-using-vitest-playwright)
- [Tests de composants avec WebdriverIO](https://webdriver.io/docs/component-testing/svelte)
