---
Titre: Avertissements d'accessibilité
---

L'accessibilité (souvent raccourcie en "a11y") est un sujet complexe, qu'il est courant de mal implémenter. Pour vous aider, Svelte vous avertit au moment de la compilation si vous écrivez du markup non accessible. Toutefois, gardez à l'esprit que de nombreux problèmes d'accessibilité ne peuvent être identifiés qu'au moment de l'exécution, à l'aide d'autres outils automatisés et en testant manuellement votre application.

Voici la liste des vérifications d'accessibilité que Svelte fera pour vous.

---

### `a11y-accesskey`

Assure de ne pas utiliser l'attribut `accesskey` sur des éléments. L'attribut HTML `accesskey` permet aux développeurs web d'attribuer des raccourcis clavier aux éléments. Les incohérences entre les raccourcis clavier et les commandes clavier utilisées par le lecteur d'écran et les utilisateurs du clavier créent des complications d'accessibilité. Pour éviter les complications, les touches d'accès ne doivent pas être utilisées.

```sv
<!-- A11y: ne pas utiliser accessKey -->
<div accessKey='z'></div>
```

---

### `a11y-aria-activedescendant-has-tabindex`

Un élément avec `aria-activedescendant`  doit pouvoir être navigable en utilisant la touche "Tabulation", il doit donc avoir un `tabindex` intrinsèque, ou déclarer `tabindex` comme attribut.

```sv
<!-- A11y: Les éléments avec l'attribut aria-activedescendant devraient avoir un tabindex -->
<div aria-activedescendant="some-id" />

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

Assure que `on:click` soit accompagné d'au moins l'un des éléments suivants: `on:keyup`, `on:keydown`, `on:keypress`. Penser à l'usage au clavier est important pour les utilisateurs avec des handicaps physiques qui ne peuvent pas utiliser de souris, pour les utilisateurs de liseuses d'écran, ainsi que pour la compatibilité AT.

Cela ne s'applique pas aux éléments interactifs ou cachés.

```sv
<!-- A11y: les éléments visibles et non interactifs avec un événement on:click doivent être accompagnés d'un événement on:keydown, on:keyup ou on:keypress. -->
<div on:click={() => {}} />
```

Notez que l'évènement `keypress` est maintenant déprécié, il est donc officiellement recommandé d'utiliser à la place les évènements `keyup` ou `keydown`, selon les besoins.

---

### `a11y-distracting-elements`

Assure qu'aucun élément distrayant ne soit utilisé. Les éléments distrayants visuellement peuvent causer des problèmes d'accessibilité avec les utilisateurs malvoyants. Ces éléments sont généralement dépréciés et doivent être évités.

Les éléments suivants sont visuellement distrayants: `<marquee>` et `<blink>`.

```sv
<!-- A11y: éviter les éléments <marquee> -->
<marquee />
```

---

### `a11y-hidden`

Certains éléments DOM sont utiles pour la navigation avec lecteur d'écran et ne doivent pas être cachés.

```sv
<!-- A11y: l'élément <h2> ne doit pas être caché -->
<h2 aria-hidden="true">en-tête invisible</h2>
```

---

### `a11y-img-redundant-alt`

Assure que l'attribut `alt` des balises `img` ne contienne pas le mot "image" ou "photo". Les lecteurs d'écran décrivent déjà les éléments `img` comme étant des images. Il n'est pas nécessaire d'utiliser des mots tels que *photo* et / ou *image*.

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

Assure que le bon type de valeur soit utilisé pour les attributs `aria`. Par exemple, `aria-hidden` ne devrait recevoir qu'un booléen.

```sv
<!-- A11y: la valeur de 'aria-hidden' doit être exactement `true` ou `false` -->
<div aria-hidden="yes"/>
```

---

### `a11y-invalid-attribute`

Assure que les attributs importants pour l'accessibilité aient une valeur valide. Par exemple, `href` ne devrait pas être vide, `'#'` ou `javascript:`.

```sv
<!-- A11y: '' n'est pas un attribut href valide -->
<a href=''>invalide</a>
```

---

### `a11y-interactive-supports-focus`

Assure que les éléments avec un rôle interactif et des gestionnaires d'évènements interactifs (de souris ou de clavier) soient focalisables ou accessibles avec la touche Tab.

```sv
<!-- A11y: Les éléments avec le rôle interactif 'button' doivent avoir une valeur pour l'attribut "tabindex". -->
<div role="button" on:keypress={() => {}} />
```

---

### `a11y-label-has-associated-control`

Assure qu'un élément `label` ait une étiquette de texte et un contrôle associé.

Il existe deux méthodes prises en charge pour associer une étiquette à un contrôle :

- Envelopper un contrôle dans un élément `label`.
- Ajouter `for` à une étiquette et lui attribuer l'ID d'un champ d'entrée sur la page.

```sv
<label for="id">B</label>

<label>C <input type="text" /></label>

<!-- A11y: Une étiquette de formulaire doit être associée à un contrôle. -->
<label>A</label>
```

---

### `a11y-media-has-caption`

Fournir des sous-titres pour les médias est essentiel afin que les utilisateurs sourds puissent suivre. Les sous-titres devraient être une transcription ou une traduction du dialogue, des effets sonores, des indications musicales pertinentes et d'autres informations audio pertinentes. Ce n'est pas seulement important pour l'accessibilité, mais peut également être utile pour tous les utilisateurs dans le cas où les médias ne sont pas disponibles (similaire au texte `alt` sur une image lorsqu'une image ne peut pas être chargée).

Les sous-titres doivent contenir toutes les informations importantes et pertinentes pour comprendre les médias correspondants. Cela peut signifier que les sous-titres ne sont pas une correspondance 1:1 du dialogue dans le contenu média. Cependant, les sous-titres ne sont pas nécessaires pour les composants vidéo avec l'attribut `muet`.

```sv
<video><track kind="captions"/></video>

<audio muted></audio>

<!-- A11y: Les éléments média doivent avoir une <track kind=\"captions\"> -->
<video></video>

<!-- A11y: Les éléments média doivent avoir une <track kind=\"captions\"> -->
<video><track /></video>
```

---

### `a11y-misplaced-role`

Certains éléments DOM réservés ne prennent pas en charge les rôles, états et propriétés ARIA. Cela est souvent dû à leur invisibilité, par exemple `meta`, `html`, `script`, `style`. Cette règle impose que ces éléments DOM ne contiennent pas l'attribut `role`.

```sv
<!-- A11y: <meta> ne devrait pas avoir l'attribut role -->
<meta role="tooltip">
```

---

### `a11y-misplaced-scope`

L'attribut `scope` ne devrait être utilisé que sur les éléments `<th>`.

```sv
<!-- A11y: L'attribut `scope` doit seulement être utilisé avec les élements <th> -->
<div scope="row" />
```

---

### `a11y-missing-attribute`

Assure que les attributs requis pour l'accessibilité soient présents sur un élément. Cela inclut les vérifications suivantes:

- `<a>` devrait avoir un href (sauf s'il s'agit d'une [balise définissant un fragment](https://github.com/sveltejs/svelte/issues/4697))
- `<area>` devrait avoir alt, aria-label ou aria-labelledby
- `<html>` devrait avoir lang
- `<iframe>` devrait avoir title
- `<img>` devrait avoir alt
- `<object>` devrait avoir title, aria-label ou aria-labelledby
- `<input type="image">` devrait avoir alt, aria-label ou aria-labelledby

```sv
<!-- A11y: L'élément <input type=\"image\"> devrait avoir un attribut alt, aria-label ou aria-labelledby -->
<input type="image">

<!-- A11y: <html> L'élément <html> devrait avoir un attribut lang -->
<html></html>

<!-- A11y: L'élément <a> devrait avoir un attribut href -->
<a>text</a>
```

---

### `a11y-missing-content`

Assure que les éléments d'en-tête (`h1`, `h2`, etc.) et les ancres aient un contenu, et que ce contenu soit accessible aux lecteurs d'écran.

```sv
<!-- A11y: L'élément <a> doit avoir un contenu enfant -->
<a href='/foo'></a>

<!-- A11y: L'élément <h1> doit avoir un contenu enfant -->
<h1></h1>
```

---

### `a11y-mouse-events-have-key-events`

Assure que `on:mouseover` and `on:mouseout` soient accompagnés de `on:focus` et `on:blur`, respectivement. Cela aide à garantir que toutes les fonctionnalités déclenchées par ces événements de souris soient également accessibles aux utilisateurs du clavier.

```sv
<!-- A11y: on:mouseover doit être accompagné de on:focus -->
<div on:mouseover={handleMouseover} />

<!-- A11y: on:mouseout doit être accompagné de on:blur -->
<div on:mouseout={handleMouseout} />
```

---

### `a11y-no-redundant-roles`

Certains éléments HTML ont des rôles ARIA par défaut. Donner à ces éléments un rôle ARIA déjà défini par le navigateur n'a aucun effet et est redondant.

```sv
<!-- A11y: rôle redondant 'button' -->
<button role="button" />

<!-- A11y: rôle redondant 'img' -->
<img role="img" src="foo.jpg" />
```

---

### `a11y-no-interactive-element-to-noninteractive-role`

Les rôles [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) ne devraient pas être utilisés pour convertir un élément interactif en un élément non interactif. Les rôles ARIA non interactifs incluent `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` et `tooltip`.

```sv
<!-- A11y: <textarea> ne peut pas avoir le rôle 'listitem' -->
<textarea role="listitem" />
```

---

### `a11y-no-noninteractive-element-to-interactive-role`


Les rôles [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) ne devraient pas être utilisés pour convertir un élément non interactif en élément interactif. Les rôles ARIA interactifs incluent `button`, `link`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `searchbox`, `switch` et `textbox`.

```sv
<!-- A11y: Les éléments non interactifs <h3> ne devraient pas avoir le rôle interactif 'searchbox' -->
<h3 role="searchbox">Bouton</h3>
```

---

### `a11y-no-noninteractive-tabindex`

La navigation à l'aide de la touche Tab doit être limitée aux éléments de la page avec lesquels il est possible d'interagir.

```sv
<!-- A11y: un élément non interactif ne peut pas avoir une valeur de tabIndex non négative -->
<div tabindex='0' />
```

---

### `a11y-positive-tabindex`

Évitez les valeurs positives pour la propriété `tabindex`. Cela positionnera des éléments en dehors de l'ordre de tabulation attendu, ce qui créera une expérience confuse pour les utilisateurs du clavier.

```sv
<!-- A11y: évitez les valeurs de tabindex supérieures à zéro -->
<div tabindex='1'/>
```

---

### `a11y-role-has-required-aria-props`

Les éléments avec des rôles ARIA doivent avoir tous les attributs requis pour ce rôle.

```sv
<!-- A11y: les éléments avec le rôle ARIA "checkbox" doivent avoir les attributs suivants définis: "aria-checked" -->
<span role="checkbox" aria-labelledby="foo" tabindex="0"></span>
```

---

### `a11y-role-supports-aria-props`

Les éléments avec un rôle explicite ou implicite doivent contenir uniquement des propriétés `aria-*` prévues pour ce rôles.
Elements with explicit or implicit roles defined contain only `aria-*` properties supported by that role.

```sv
<!-- A11y: L'attribut 'aria-multiline' n'est pas supporté par le rôle 'link'. -->
<div role="link" aria-multiline />
<!-- A11y: L'attribut 'aria-required' n'est pas supporté par le rôle 'listitem'. Ce rôle est implicite sur l'élément <li>. -->
<li aria-required />
```

---

### `a11y-structure`

Assure que certains éléments DOM aient la bonne structure.

```sv
<!-- A11y: <figcaption> doit être un enfant immédiat de <figure> -->
<div>
	<figcaption>Légende de l'image</figcaption>
</div>
```

---

### `a11y-unknown-aria-attribute`

Assure que seuls les attributs ARIA connus soient utilisés. Cela est basé sur la spécification [WAI-ARIA States and Properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties).

```sv
<!-- A11y: Attribut aria inconnu 'aria-labeledby' (vouliez-vous dire 'labelledby'?) -->
<input type="image" aria-labeledby="foo">
```

---

### `a11y-unknown-role`

Les éléments avec des rôles ARIA doivent utiliser un rôle ARIA valide et non abstrait. Une référence aux définitions de rôle peut être trouvée sur le site [WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions).

```sv
<!-- A11y: Rôle inconnu 'toooltip' (vouliez-vous dire 'tooltip'?) -->
<div role="toooltip"></div>
```
