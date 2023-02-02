---
Titre: Avertissements d'accessibilité
---

<<<<<<< HEAD
L'accessibilité (raccourcie à a11y) n'est pas toujours facile à obtenir correctement, cependant Svelte vous aidera en vous avertissant au moment de la compilation si vous écrivez un balisage inaccessible. Toutefois, gardez à l'esprit que de nombreux problèmes d'accessibilité ne peuvent être identifiés qu'au moment de l'exécution à l'aide d'autres outils automatisés et en testant manuellement votre application.

Voici une liste des contrôles d'accessibilité que Svelte fera pour vous.
=======
L'accessibilité (souvent raccourcie en "a11y") est un sujet complexe, qu'il est courant de mal implémenter. Pour vous aider, Svelte vous avertit au moment de la compilation si vous écrivez du markup non accessible. Toutefois, gardez à l'esprit que de nombreux problèmes d'accessibilité ne peuvent être identifiés qu'au moment de l'exécution, à l'aide d'autres outils automatisés et en testant manuellement votre application.

Voici la liste des vérifications d'accessibilité que Svelte fera pour vous.
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))

---

### `a11y-accesskey`

<<<<<<< HEAD
Appliquer aucun `accesskey` sur l'élément. Les touches d'accès sont des attributs HTML qui permettent aux développeurs Web d'attribuer des raccourcis clavier aux éléments. Les incohérences entre les raccourcis clavier et les commandes clavier utilisées par le lecteur d'écran et les utilisateurs du clavier créent des complications d'accessibilité. Pour éviter les complications, les touches d'accès ne doivent pas être utilisées.

```sv
<!-- A11y: Évitez d'utiliser la touches d'accès -->
=======
Veiller à ne pas utiliser l'attribut `accesskey` sur des éléments. L'attribut HTML `accesskey` permet aux développeurs web d'attribuer des raccourcis clavier aux éléments. Les incohérences entre les raccourcis clavier et les commandes clavier utilisées par le lecteur d'écran et les utilisateurs du clavier créent des complications d'accessibilité. Pour éviter les complications, les touches d'accès ne doivent pas être utilisées.

```sv
<!-- A11y: ne pas utiliser accessKey -->
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))
<div accessKey='z'></div>
```

---

### `a11y-aria-attributes`

<<<<<<< HEAD
Certains éléments DOM réservés ne prennent pas en charge les rôles, états et propriétés ARIA. C'est souvent parce qu'ils ne sont pas visibles, par exemple `meta`, `html`, `script`, `style`. Cette règle garantit que ces éléments DOM ne contiennent pas `aria-*` accessoires.

```sv
<!-- A11y: <meta> should not have aria-* attributes -->
=======
Certains éléments DOM spéciaux ne prennent pas en charge les rôles, états et propriétés ARIA. C'est souvent parce qu'ils ne sont pas visibles, comme `meta`, `html`, `script`, `style`. Cette règle garantit que ces éléments DOM ne contiennent pas des `aria-*` accessoires.

```sv
<!-- A11y: <meta> ne devrait pas avoir d'attribut aria-* -->
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))
<meta aria-hidden="false">
```

---

### `a11y-autofocus`

<<<<<<< HEAD
Veiller à ce que l’autofocus ne soit pas utilisé sur les éléments. Les éléments d'autofocus peuvent entraîner des problèmes de convivialité pour les utilisateurs voyants et non myopes.

```sv
<!-- A11y: Eviter d'utiliser autofocus -->
=======
Interdire l’usage d'`autofocus` sur les éléments. Le focus automatique d'éléments peut entraîner des problèmes d'usage pour les utilisateurs, qu'ils soient malvoyants, non voyants ou avec une vue parfaite.

```sv
<!-- A11y: ne pas utiliser autofocus -->
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))
<input autofocus>
```

---

### `a11y-click-events-have-key-events`

<<<<<<< HEAD
Veiller à ce que `on:click` soit accompagné d'au moins l'un des éléments suivants: `onKeyUp`, `onKeyDown`, `onKeyPress`. Le codage du clavier est important pour les utilisateurs handicapés physiques qui ne peuvent pas utiliser une souris, la compatibilité AT et les utilisateurs de liseuse d'écran.
=======
Veiller à ce que `on:click` soit accompagné d'au moins l'un des éléments suivants: `onKeyUp`, `onKeyDown`, `onKeyPress`. Penser à l'usage au clavier est important pour les utilisateurs avec des handicaps physiques qui ne peuvent pas utiliser de souris, pour les utilisateurs de liseuses d'écran, ainsi que pour la compatibilité AT.
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))

Cela ne s'applique pas aux éléments interactifs ou cachés.

```sv
<!-- A11y: les éléments visibles et non interactifs avec un événement on:click doivent être accompagnés d'un événement on:keydown, on:keyup ou on:keypress. -->
<div on:click={() => {}} />
```

---

### `a11y-distracting-elements`

<<<<<<< HEAD
Veiller à ce qu'aucun élément distrayant ne soit utilisé. Les éléments qui peuvent être distrayants visuellement peuvent causer des problèmes d'accessibilité avec les utilisateurs malvoyants. Ces éléments sont très probablement dépréciés et doivent être évités.
=======
Veiller à ce qu'aucun élément distrayant ne soit utilisé. Les éléments distrayants visuellement peuvent causer des problèmes d'accessibilité avec les utilisateurs malvoyants. Ces éléments sont généralement dépréciés et doivent être évités.
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))

Les éléments suivants sont visuellement distrayants: `<marquee>` et `<blink>`.

```sv
<<<<<<< HEAD
<!-- A11y: Eviter les éléments <marquee> -->
=======
<!-- A11y: éviter les éléments <marquee> -->
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))
<marquee />
```

---

### `a11y-hidden`

<<<<<<< HEAD
Certains éléments DOM sont utiles pour la navigation sur le lecteur d'écran et ne doivent pas être cachés.
=======
Certains éléments DOM sont utiles pour la navigation avec lecteur d'écran et ne doivent pas être cachés.
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))

```sv
<!-- A11y: l'élément <h2> ne doit pas être caché -->
<h2 aria-hidden="true">en-tête invisible</h2>
```

---

### `a11y-img-redundant-alt`

<<<<<<< HEAD
Veiller à ce que l'attribut `alt` de la balise `img` ne contient pas le mot image ou photo. Les lecteurs d'écran annoncent déjà `img` éléments comme image. Il n'est pas nécessaire d'utiliser des mots tels que, *photo*, et / ou *image*.
=======
Veiller à ce que l'attribut `alt` des balises `img` ne contienne pas le mot "image" ou "photo". Les lecteurs d'écran décrivent déjà les éléments `img` comme étant des images. Il n'est pas nécessaire d'utiliser des mots tels que *photo* et / ou *image*.
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))

```sv
<img src="foo" alt="Foo mange un sandwich." />

<<<<<<< HEAD
<!-- aria-hidden, ne sera pas annoncer par le lecteur d'écran-->
=======
<!-- aria-hidden, ne sera pas annoncé par le lecteur d'écran-->
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))
<img src="bar" aria-hidden="true" alt="Photo de moi prenant une photo d'une image" />

<!-- A11y: Les lecteurs d'écran annoncent déjà les éléments <img> comme une image. -->
<img src="foo" alt="Photo de foo bizarre." />

<!-- A11y: Les lecteurs d'écran annoncent déjà les éléments <img> comme une image. -->
<img src="bar" alt="Photo de moi dans un bar !" />

<!-- A11y: Les lecteurs d'écran annoncent déjà les éléments <img> comme une image. -->
<img src="foo" alt="Image de baz corrigeant un bug." />
```

---

### `a11y-incorrect-aria-attribute-type`

<<<<<<< HEAD
Veiller à ce que le type de valeur utilisé soit correct pour les attributs `aria`. Par exemple, `aria-hidden` ne devrait recevoir qu'un booléen.

```sv
<!-- A11y: La valeur de 'aria-hidden' doit être exactement `true` ou `false` -->
=======
Veiller à ce que le bon type de valeur soit utilisé pour les attributs `aria`. Par exemple, `aria-hidden` ne devrait recevoir qu'un booléen.

```sv
<!-- A11y: la valeur de 'aria-hidden' doit être exactement `true` ou `false` -->
>>>>>>> bcdc5e9 (Début de la traduction du chapitre 06 (#5))
<div aria-hidden="yes"/>
```

---
