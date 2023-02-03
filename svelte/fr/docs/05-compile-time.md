---
title: Compilation
---

Vous n'intéragirez généralement pas avec le compilateur Svelte, mais vous l'intégrerez plutôt dans un processus de *build* en utilisant un plugin pour *bundler*. Le plugin recommandé est [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte). Le framework [SvelteKit](https://kit.svelte.dev/) fournit une configuration de `vite-plugin-svelte` qui permet de *builder* des applications et de *packager* des [librairies de composants Svelte](https://kit.svelte.dev/docs/packaging). La Svelte Society maintient des [plugins](https://sveltesociety.dev/tools/#bundling) pour d'autres bundler (notamment Rollup et Webpack).

Néanmoins, il est utile de comprendre comment utiliser le compilateur, puisque les plugins exposent généralement des options.



### `svelte.compile`

```js
result: {
	js,
	css,
	ast,
	warnings,
	vars,
	stats
} = svelte.compile(source: string, options?: {...})
```

---

C'est ici que la magie opère. `svelte.compile` convertit le code source des composants en module JavaScript qui exporte des classes.

```js
const svelte = require('svelte/compiler');

const result = svelte.compile(source, {
	// options
});
```

Les options suivantes peuvent être passées au compilateur. Aucune n'est recquise :

<!-- | option | type | default
| --- | --- | --- |
| `filename` | string | `null`
| `name` | string | `"Component"`
| `format` | `"esm"` or `"cjs"` | `"esm"`
| `generate` | `"dom"` or `"ssr"` or `false` | `"dom"`
| `errorMode` | `"throw"` or `"warn"` | `"throw"`
| `varsReport` | `"strict"` or `"full"` or `false` | `"strict"`
| `dev` | boolean | `false`
| `immutable` | boolean | `false`
| `hydratable` | boolean | `false`
| `legacy` | boolean | `false`
| `customElement` | boolean | `false`
| `tag` | string | null
| `accessors` | boolean | `false`
| `css` | boolean | `true`
| `loopGuardTimeout` | number | 0
| `preserveComments` | boolean | `false`
| `preserveWhitespace` | boolean | `false`
| `outputFilename` | string | `null`
| `cssOutputFilename` | string | `null`
| `sveltePath` | string | `"svelte"` -->

| option | valeur par défaut | description |
| --- | --- | --- |
| `filename` | `null` | `string` utilisé pour les conseils de débuggage et les *sourcemaps*. Le plugin du bundler la définit automatiquement.
| `name` | `"Component"` | `string` définit le nom de la classe JavaScript généré (bien que le compilateur la renomera si son nom entre en conflit avec une autre variable). Il est normalement déduit à partir l'option `filename`.
| `format` | `"esm"` | Si `"esm"`, crée un module JavaScript (avec `import` et `export`). Si `"cjs"`, crée un module CommonJS (avec `require` et `module.exports`), utile dans certains cas de rendu côté serveur et pour des tests.
| `generate` | `"dom"` | Si `"dom"`, Svelte émet une classe JavaScript pour monter le composant dans le DOM. Si `"ssr"`, Svelte émet un objet avec une méthode `render`, appropriée pour les rendus côté serveur. Si `false`, seuls les *metadata* sont retournées, sans JavaScript ni CSS.
| `errorMode` | `"throw"` | Si `"throw"`, Svelte lève une exception lorsqu'il rencontre une erreur de compilation. Si `"warn"`, Svelte traitera les erreurs comme des warnings et les ajoutera au rapport de warnings.
| `varsReport` | `"strict"` | Si `"strict"`, Svelte retourne un rapport de variables avec celles qui ne sont ni *globals* ni *internals*. Si `"full"`, Svelte retourne un rapport de variables avec toutes celles détectées. Si `false`, aucun rapport n'est retourné.
| `dev` | `false` | If `true`, entraîne l'ajout d'un code supplémentaire dans les composants qui permet d'éxecuter des vérifications au *runtime* et permet de fournir des informations de débuggage pendant les développements.
| `immutable` | `false` | Si `true`, indique au compilateur que vous vous engagez à ne pas *muter* d'objets. Cela permet au compilateur d'être moins conservateur quant aux vérifications de détéction de changement de valeurs.
| `hydratable` | `false` | Si `true`, lors de la génération du code DOM, autorise l'option de *runtime* `hydrate: true`, qui permet à un composant de mettre à jour le DOM existant sans avoir à créer un nouveau noeud depuis zéro. Lors de la génération de code *SSR*, cela ajoute des marqueurs à la section `<head>` pour identifier quels éléments *hydrater*.
| `legacy` | `false` | Si `true`, génère un code qui fonctionnera avec IE9 et IE10, qui ne supportent pas par exemple : `element.dataset`.
| `accessors` | `false` | Si `true`, des *getters* et *setters* seront générés pour les props des composants. Si `false`, ils ne seront créés que pour les *props* exportées en lecture seules (i.e. celles déclarées avec `const`, `class` et `function`). La compilation avec l'option `customElement: true` changera la valeur par défaut de `accessors` à `true`.
| `customElement` | `false` | Si `true`, indique au compilateur de générer un *web component* à la place d'un composant Svelte traditionnel.
| `tag` | `null` | Une `string` qui indique à Svelte le nom du *web component*. Ce doit être une chaine composée de caractères alphabétiques ou numériques uniquement avec au moins un tiret, e.g. `"mon-element"`.
| `css` | `'injected'` | Si `'injected'` (anciennement `true`), le style sera inclu dans les classes JavaScript et injecté au *runtime* pour les composants réellement affichés. Si `'external'` (anciennement `false`), le style sera renvoyé dans le bloc `css` du résultat de la compilation. La plupart des plugins pour bundler définiront la valeur de cette propripété à `'external'` et utiliseront le CSS généré statiquement. Cela permet d'atteindre de meilleurs performances, puisque les bundles JavaScript seront plus petits et le style généré sous forme de fichiers `.css` pourra être mis en cache. Si `'none'`, le style sera complètement ignoré et aucun CSS ne sera généré.
| `cssHash` | Voir la description | Une fonction définit avec les arguments `{ hash, css, name, filename }` et retourne un nom de classe utilisée pour le css *scopé*. La fonction par défaut retourne `svelte-${hash(css)}`.
| `loopGuardTimeout` | 0 | Un `number` qui indique à Svelte d'arrêter une boucle infinie si elle dépasse le temps `loopGuardTimeout` ms. Utile pour arrêter les boucles infinies. **Uniquement disponible lorsque `dev: true`**
| `preserveComments` | `false` | Si `true`, les commentaires HTML seront conservés au cours du rendu côté serveur. Par défault, ils sont supprimés.
| `preserveWhitespace` | `false` | Si `true`, les caractères blancs (espaces, tabulations) seront gardés tels quels, plutôt que supprimés ou fusionnés.
| `sourcemap` | `object \| string` | Une *sourcemap* initiale qui sera fusionné dans la sourcemap finale. C'est souvent la *sourcemap* du *préprocessor*.
| `enableSourcemap` | `boolean \| { js: boolean; css: boolean; }` | Si `true`, Svelte génère des *sourcemaps* pour les composants. Utilise un object avec `js` ou `css` pour un contrôle plus fin de la génération des *sourcemaps*. Par défaut, l'option est à `true`.
| `outputFilename` | `null` | Une `string` utilisée pour les *sourcemaps* JavaScript.
| `cssOutputFilename` | `null` | Une `string` utilisée pour les *sourcemaps* CSS.
| `sveltePath` | `"svelte"` | La localisation de la librairie `svelte`. Tous les imports à `svelte` ou `svelte/[module]` seront modifiés en conséquence.
| `namespace` | `"html"` | Le *namespace* de l'élément; e.g., `"mathml"`, `"svg"`, `"foreign"`.

---

L'object retourné `result` contient le code du composant ainsi que des métadonnées.

```js
const {
	js,
	css,
	ast,
	warnings,
	vars,
	stats
} = svelte.compile(source);
```

* `js` et `css` sont des objets avec les attributs suivants :
	* `code` est une châine de caractères JavaScript
	* `map` est une sourcemap avec les méthodes utilitaires `toString()` et `toUrl()`
* `ast` est l'arbre syntaxique abstrait représentant la structure du composant.
* `warnings` est un tableau de *warnings* générés pendant la compilation. Chaque *warning* possède les attributs suivants :
	* `code` est une chaine de caractère identifiant la catégorie du *warning*
	* `message` décrit le problème
	* `start` et `end`, si le *warning* est relevé à un endroit particulier, ce sont des objets avec les propriétés `line`, `column` et `character`
	* `frame`, si disponible, correspond à du texte précisant l'emplacement du code concerné, avec le numéro de ligne
* `vars` est un tableau reprenant les objets déclarés dans le composant, utilisé par [eslint-plugin-svelte3](https://github.com/sveltejs/eslint-plugin-svelte3) entre autre. Chaque variable continet les propriétés suivantes :
	* `name` est le nom de l'objet
	* `export_name` est le nom de l'objet si exporté (correspondra à `name` sauf si vous exportez de la manière suivante : `export...as`)
	* `injected` est `true` si la déclaration est injecté par Svelte plutôt que dans le code que vous avez écrit
	* `module` est `true` si l'objet est déclaré dans le script `context="module"`
	* `mutated` est `true` si les propriétés de l'objet sont assignées à l'intérieur du composant
	* `reassigned` est `true` si l'objet est réassigné à l'intérieur du composant
	* `referenced` est `true` si l'objet est utilisé dans le template HTML
	* `referenced_from_script` est `true` si l'objet est utilisé dans la balise `<script>` ailleurs qu'à sa déclaration
	* `writable` est `true` si l'objet est déclaré avec `let` ou `var` (mais pas `const`, `class` ni `function`)
* `stats` est un objet utilisé par l'équipe de développement de Svelte pour débugger le compilateur. Evitez d'y recourir car il pourrait changer à tout moment !


<!--

```js
compiled: {
	// `map` is a v3 sourcemap with toString()/toUrl() methods
	js: { code: string, map: {...} },
	css: { code: string, map: {...} },
	ast: {...}, // ESTree-like syntax tree for the component, including HTML, CSS and JS
	warnings: Array<{
		code: string,
		message: string,
		filename: string,
		pos: number,
		start: { line: number, column: number },
		end: { line: number, column: number },
		frame: string,
		toString: () => string
	}>,
	vars: Array<{
		name: string,
		export_name: string,
		injected: boolean,
		module: boolean,
		mutated: boolean,
		reassigned: boolean,
		referenced: boolean,
		referenced_from_script: boolean,
		writable: boolean
	}>,
	stats: {
		timings: { [label]: number }
	}
} = svelte.compile(source: string, options?: {...})
```

-->


### `svelte.parse`

```js
ast: object = svelte.parse(
	source: string,
	options?: {
		filename?: string,
		customElement?: boolean
	}
)
```

---

La méthode `parse` convertit un composant pour retourner son arbre syntaxique abstrait (*abstract syntax tree*, ou *AST*). Contrairement à la compilation avec l'option `generate: false`, aucune validation ni analyse n'est appliqué. Notez que l'*AST* n'est pas considéré comme une API publique ; des changements critiques pourraient survenir à n'importe quel moment.


```js
const svelte = require('svelte/compiler');

const ast = svelte.parse(source, { filename: 'App.svelte' });
```


### `svelte.preprocess`

Un certain nombre de [plugins de pré-compilation maintenus par la communauté](https://sveltesociety.dev/tools#preprocessors) est dispnible pour vous permettre d'utiliser Svelte avec des outils comme TypeScript, PostCSS, SCSS, et Less.

Vous pouvez écrire votre propre *préprocessor* en utilisant l'API `svelte.preprocess`.

```js
result: {
	code: string,
	dependencies: Array<string>
} = await svelte.preprocess(
	source: string,
	preprocessors: Array<{
		markup?: (input: { content: string, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>,
		script?: (input: { content: string, markup: string, attributes: Record<string, string>, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>,
		style?: (input: { content: string, markup: string, attributes: Record<string, string>, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>
	}>,
	options?: {
		filename?: string
	}
)
```

---

Le fonction de préprocessing fournit des hooks pour transformer le code source d'un composant, pour plusieurs langages. Par exemple, elle peut convertir un bloc `<style lang="sass">` en css natif.

Le premier argument est le code source du composant lui-même. Le second argument est un tableau de *préprocesseurs* (ou éventuellement un seul préprocesseur si vous n'en avez qu'un). Un *préprocesseur* est un objet contenant trois fonctions optionnelles : `markup`, `script` et `style`.

Chaque fonction `markup`, `script` et `style` doit retourner un objet (ou une promesse qui résout un objet) contenant un attribut `code`, représentant le code source transofrmé ainsi qu'un tableau facultatif de dépendances `dependencies`.

La fonction `markup` reçoit en argument le *markup* du composant, et le nom du composant `filename` s'il était spécifié comme troisième argument.

> Les fonctions de préprocessing doivent également retourner un objet `map` en plus de `code` et `dependencies`, où `map` correspond au *sourcemap* de la transformation.

```js
const svelte = require('svelte/compiler');
const MagicString = require('magic-string');

const { code } = await svelte.preprocess(source, {
	markup: ({ content, filename }) => {
		const pos = content.indexOf('foo');
		if(pos < 0) {
			return { code: content }
		}
		const s = new MagicString(content, { filename })
		s.overwrite(pos, pos + 3, 'bar', { storeName: true })
		return {
			code: s.toString(),
			map: s.generateMap()
		}
	}
}, {
	filename: 'App.svelte'
});
```

---

Les fonctions `script` et `style` reçoivent le contenu des blocs `<script>` et `<style>` respectivement (argument nommé `content`) ainsi que le `markup` du composant. En plus du nom du fichier `filename`, elles reçoivent un objet contenant les attributs de l'élément.

Si un tableau de dépendances et retourné, il sera inclut dans l'objet retourné. Ce tableau est utilisé par des librairies comme [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) pour surveiller les changements dans les fichiers, par exemple si un bloc `<style>` contient un import de type `@import`.

```js
const svelte = require('svelte/compiler');
const sass = require('node-sass');
const { dirname } = require('path');

const { code, dependencies } = await svelte.preprocess(source, {
	style: async ({ content, attributes, filename }) => {
		// traite uniquement <style lang="sass">
		if (attributes.lang !== 'sass') return;

		const { css, stats } = await new Promise((resolve, reject) => sass.render({
			file: filename,
			data: content,
			includePaths: [
				dirname(filename),
			],
		}, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		}));

		return {
			code: css.toString(),
			dependencies: stats.includedFiles
		};
	}
}, {
	filename: 'App.svelte'
});
```

---

Plusieurs *préprocesseurs* peuvent être utilisés ensemble. La sortie du premier devient l'argument du second. Les fonctions sont éxécutées dans l'ordre suivant : `markup`, `script` puis `style`.

```js
const svelte = require('svelte/compiler');

const { code } = await svelte.preprocess(source, [
	{
		markup: () => {
			console.log('ceci est éxécuté en premier');
		},
		script: () => {
			console.log('ça en troisième');
		},
		style: () => {
			console.log('ça en cinquième');
		}
	},
	{
		markup: () => {
			console.log('ça en deuxième');
		},
		script: () => {
			console.log('ça en quatrième');
		},
		style: () => {
			console.log('ça en sixième');
		}
	}
], {
	filename: 'App.svelte'
});
```


### `svelte.walk`

```js
walk(ast: Node, {
	enter(node: Node, parent: Node, prop: string, index: number)?: void,
	leave(node: Node, parent: Node, prop: string, index: number)?: void
})
```

---

La fonction `walk` fournit un un moyen de parcourir les arbres *AST* générés par le *parser*, en utilisant l'utilitaire du compilateur : [estree-walker](https://github.com/Rich-Harris/estree-walker).

La fonction prend comme argument l'arbre *AST* à traiter et un objet contenant 2 méthodes facultatives : `enter` et `leave`. `enter` est appelé pour chaque noeud (si la méthode est définit). Puis, à mois que `this.skip()` n'ait été appelé au cours du traitement de la méthode `enter`, chaque enfant est également traversé. Enfin, la méthode `leave` est appelé pour le noeud courrant.


```js
const svelte = require('svelte/compiler');
svelte.walk(ast, {
	enter(node, parent, prop, index) {
		do_something(node);
		if (should_skip_children(node)) {
			this.skip();
		}
	},
	leave(node, parent, prop, index) {
		do_something_else(node);
	}
});
```


### `svelte.VERSION`

---

La version courrante, définie dans le fichier `package.json`.

```js
const svelte = require('svelte/compiler');
console.log(`running svelte version ${svelte.VERSION}`);
```
