<script>
	const emojis = {
        pomme: "🍎",
        banane: "🍌",
        carotte: "🥕",
        donut: "🍩",
        oeuf: "🥚"
	}

	// le nom est mis à jour à chaque fois que la valeur de la prop change...
	export let name;

	// ...mais la variable "emoji" est fixée au moment de l'instantiation du composant
	const emoji = emojis[name];
</script>

<p>
	<span>L'emoji { name } est { emoji }</span>
</p>

<style>
	p {
		margin: 0.8em 0;
	}
	span {
		display: inline-block;
		padding: 0.2em 1em 0.3em;
		text-align: center;
		border-radius: 0.2em;
		background-color: #FFDFD3;
	}
</style>
