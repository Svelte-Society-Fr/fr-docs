---
question: Comment documenter mes composants ?
---

Dans les éditeurs qui utilisent le Langage Serveur Svelte vous pouvez documenter les composants, fonctions et les exportations à l'aide de commentaires spécialement formatés.

````sv
<script>
	/** Comment doit-on appeler l'utilisateur ? */
	export let nom = 'world';
</script>

<!--
@component
Voici une documentation pour ce composant.
Il apparaîtra au survol

- Vous pouvez utiliser markdown ici.
- Vous pouvez également utiliser des blocs de code ici.
- Utilisation:
  ```tsx
  <main nom="Arethra">
  ```
-->
<main>
	<h1>
		Salut, {nom}
	</h1>
</main>
````

Note: Le `@component` est nécéssaire dans le commentaire HTML qui décrit votre composant.
