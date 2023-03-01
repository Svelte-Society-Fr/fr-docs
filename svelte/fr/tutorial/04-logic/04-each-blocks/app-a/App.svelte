<script>
  let cats = [
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' },
  ];
</script>

<h1>Les chats célèbres de Youtube</h1>

<ul>
  <!-- ouvrez un bloc each -->
  <li>
		<a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
			{cat.name}
		</a>
  </li>
  <!-- fermez un bloc each -->
</ul>
