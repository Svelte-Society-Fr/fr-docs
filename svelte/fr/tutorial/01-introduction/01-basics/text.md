---
title: Bases
---

Bienvenue dans le tutoriel Svelte. Vous y apprendrez tout ce qu'il y a savoir pour développer en toute simplicité des applications web rapides et légères.

Vous pouvez aussi consulter la [documentation de l'API](/docs) ainsi que les [exemples](/examples), ou — si vous êtes pressé•e•s de jouer sur votre machine en local — vous pouvez [créer un projet de base en 60 secondes](/docs#getting-started).

## C'est quoi Svelte ?

Svelte est un outil pour développer des applications web rapides.

C'est un *framework* JavaScript similaire à React ou Vue, qui ont en commun l'objectif de rendre facile le développement d'interfaces utilisateur interactives de grande qualité.

Mais il y a une différence fondamentale : plutôt que d'interpréter votre code applicatif *au moment de l'exécution* (*run time*), Svelte transforme votre application en du JavaScript optimisé *au moment de la compilation* (*build time*). Cela signifie que votre application ne subira pas le coût en performance des abstractions que le framework utilise, et ne sera pas pénalisée lors du premier chargement.

Vous pouvez construire votre application entièrement avec Svelte, ou l'ajouter au fur et à mesure à une base de code existante. Vous pouvez aussi générer des composants en tant que modules autonomes utilisables n'importe où, sans la contrainte d'une dépendance à un *framework* traditionnel.

## Comment se servir de ce tutoriel

Vous aurez besoin de connaissances de base en HTML, CSS et JavaScript pour comprendre Svelte.

À mesure que vous progresserez dans le tutorial, vous serez amené•e•s à faire à des mini exercices pensés pour illustrer de nouvelles fonctionnalités. Chaque chapitre se base sur ce que vous avez appris dans les chapitres précédents, de sorte qu'il est recommandé de suivre le tutoriel dans l'ordre, en commençant par le début. Si besoin, vous pouvez naviguer entre les chapitres à l'aide du menu déroulant ci-dessous (cliquez sur 'Introduction / Bases').

Chaque chapitre de ce tutoriel vous présente un bouton 'Je veux voir' sur lequel vous pouvez cliquer si vous bloquez malgré les instructions. Essayez de ne pas trop vous en servir ; vous apprendrez plus vite en trouvant vous-même où placer les blocs de code suggérés et en les tapant manuellement dans l'éditeur.

## Comprendre les composants

Une application Svelte est composée d'un ou plusieurs *composants*. Un composant est un bloc de code réutilisable qui encapsule du HTML, du CSS et du JavaScript qui fonctionnent ensemble, le tout dans un fichier `.svelte`. L'exemple "bonjour tout le monde" dans l'éditeur est un composant simple.
