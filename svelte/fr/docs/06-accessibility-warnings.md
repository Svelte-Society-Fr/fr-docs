---
Titre: Avertissements d'accessibilité
---

L'accessibilité (souvent raccourcie en "a11y") est un sujet complexe, qu'il est courant de mal implémenter. Pour vous aider, Svelte vous avertit au moment de la compilation si vous écrivez du markup non accessible. Toutefois, gardez à l'esprit que de nombreux problèmes d'accessibilité ne peuvent être identifiés qu'au moment de l'exécution, à l'aide d'autres outils automatisés et en testant manuellement votre application.

Voici la liste des vérifications d'accessibilité que Svelte fera pour vous.

---

### `a11y-accesskey`

Veiller à ne pas utiliser l'attribut `accesskey` sur des éléments. L'attribut HTML `accesskey` permet aux développeurs web d'attribuer des raccourcis clavier aux éléments. Les incohérences entre les raccourcis clavier et les commandes clavier utilisées par le lecteur d'écran et les utilisateurs du clavier créent des complications d'accessibilité. Pour éviter les complications, les touches d'accès ne doivent pas être utilisées.

```sv
<!-- A11y: ne pas utiliser accessKey -->
<div accessKey='z'></div>
```

---

### `a11y-aria-attributes`

Certains éléments DOM spéciaux ne prennent pas en charge les rôles, états et propriétés ARIA. C'est souvent parce qu'ils ne sont pas visibles, comme `meta`, `html`, `script`, `style`. Cette règle garantit que ces éléments DOM ne contiennent pas des `aria-*` accessoires.

```sv
<!-- A11y: <meta> ne devrait pas avoir d'attribut aria-* -->
<meta aria-hidden="false">
```

---

### `a11y-autofocus`

Interdire l’usage d'`autofocus` sur les éléments. Le focus automatique d'éléments peut entraîner des problèmes d'usage pour les utilisateurs, qu'ils soient malvoyants, non voyants ou avec une vue parfaite.

```sv
<!-- A11y: ne pas utiliser autofocus -->
<input autofocus>
```

---

### `a11y-click-events-have-key-events`

Veiller à ce que `on:click` soit accompagné d'au moins l'un des éléments suivants: `onKeyUp`, `onKeyDown`, `onKeyPress`. Le codage du clavier est important pour les utilisateurs handicapés physiques qui ne peuvent pas utiliser une souris, la compatibilité AT et les utilisateurs de liseuse d'écran.

Cela ne s'applique pas aux éléments interactifs ou cachés.

```sv
<!-- A11y: les éléments visibles et non interactifs avec un événement on:click doivent être accompagnés d'un événement on:keydown, on:keyup ou on:keypress. -->
<div on:click={() => {}} />
```

---

### `a11y-distracting-elements`

Veiller à ce qu'aucun élément distrayant ne soit utilisé. Les éléments qui peuvent être distrayants visuellement peuvent causer des problèmes d'accessibilité avec les utilisateurs malvoyants. Ces éléments sont très probablement dépréciés et doivent être évités.

Les éléments suivants sont visuellement distrayants: `<marquee>` et `<blink>`.

```sv
<!-- A11y: Eviter les éléments <marquee> -->
<marquee />
```

---

### `a11y-hidden`

Certains éléments DOM sont utiles pour la navigation sur le lecteur d'écran et ne doivent pas être cachés.

```sv
<!-- A11y: l'élément <h2> ne doit pas être caché -->
<h2 aria-hidden="true">en-tête invisible</h2>
```

---

### `a11y-img-redundant-alt`

Veiller à ce que l'attribut `alt` de la balise `img` ne contient pas le mot image ou photo. Les lecteurs d'écran annoncent déjà `img` éléments comme image. Il n'est pas nécessaire d'utiliser des mots tels que, *photo*, et / ou *image*.

```sv
<img src="foo" alt="Foo mange un sandwich." />

<!-- aria-hidden, ne sera pas annoncé par le lecteur d'écran-->
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

Veiller à ce que le bon type de valeur soit utilisé pour les attributs `aria`. Par exemple, `aria-hidden` ne devrait recevoir qu'un booléen.

```sv
<!-- A11y: la valeur de 'aria-hidden' doit être exactement `true` ou `false` -->
<div aria-hidden="yes"/>
```

---
